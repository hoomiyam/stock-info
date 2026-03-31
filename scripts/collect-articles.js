/**
 * 스톡인포 논문 수집: Semantic Scholar
 */
const https = require('https');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const { getImage } = require('../../shared/unsplash-image-service');

const CATEGORIES = {
  global: [
    'US stock market return prediction machine learning',
    'international equity portfolio diversification',
    'S&P 500 factor investing momentum value',
    'global stock market volatility forecasting',
    'earnings surprise stock price reaction',
    'ESG investing performance global stocks',
    'technology sector stock valuation growth',
    'dividend policy stock return relationship',
  ],
  korea: [
    'KOSPI Korea stock market return prediction',
    'Korean equity market efficiency anomaly',
    'Korea stock exchange foreign investor behavior',
    'KOSDAQ small cap Korea stock performance',
    'Korean corporate governance firm value',
    'Korea financial market volatility spillover',
  ],
  strategy: [
    'quantitative investing factor model portfolio',
    'momentum strategy stock market return',
    'value investing fundamental analysis return',
    'systematic trading algorithmic strategy backtesting',
    'portfolio optimization mean variance efficient frontier',
    'factor investing quality profitability low volatility',
    'smart beta strategy ETF performance',
    'long short equity hedge fund strategy',
    'market timing strategy equity premium',
    'risk parity portfolio allocation strategy',
  ],
  behavioral: [
    'behavioral finance investor bias stock market anomaly',
    'investor sentiment stock return predictability',
    'overconfidence trading behavior finance',
    'loss aversion prospect theory investment decision',
    'herding behavior institutional investors stock',
    'noise trader behavioral stock pricing',
    'anchoring bias stock valuation investor psychology',
  ],
  technical: [
    'technical analysis stock price prediction machine learning',
    'moving average trading signal stock return',
    'relative strength index RSI momentum trading',
    'stock price trend forecasting neural network LSTM',
    'candlestick pattern prediction deep learning',
    'volume price relationship stock market microstructure',
  ],
  insights: [
    'value investing stock selection long term return',
    'growth investing stock return long term compounding',
    'contrarian investment strategy mean reversion',
    'IPO initial public offering long run stock performance',
    'stock buyback share repurchase market signal',
    'insider trading stock return information',
    'passive investing index fund performance active',
  ],
};

function fetchJSON(url, maxRedirects = 3) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : require('http');
    mod.get(url, { headers: { 'User-Agent': 'StockInfo/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && maxRedirects > 0) {
        return fetchJSON(res.headers.location, maxRedirects - 1).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); } catch(e) { reject(new Error('JSON parse error')); } });
    }).on('error', reject);
  });
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').substring(0, 120) + '-' + Date.now().toString(36);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

const EXCLUDE = [
  /\b(medical|clinical|patient|drug|disease|cancer|covid|genomic)\b/i,
  /\b(physics|chemistry|biology|neuroscience)\b/i,
];

async function main() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1', port: 3306, user: 'user', password: 'devapril#aws123', database: 'stock'
  });

  const [cats] = await conn.query('SELECT * FROM categories');
  const catMap = {};
  for (const c of cats) catMap[c.slug] = c;

  let totalAdded = 0;

  for (const [catSlug, queries] of Object.entries(CATEGORIES)) {
    const cat = catMap[catSlug];
    if (!cat) continue;
    const selected = queries.sort(() => Math.random() - 0.5).slice(0, 2);
    for (const query of selected) {
      console.log(`\n📂 ${cat.name_ko} — "${query}"`);
      try {
        const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&limit=5&fields=paperId,title,abstract,authors,venue,year,citationCount,externalIds,publicationDate`;
        const data = await fetchJSON(url);
        const papers = (data.data || []).filter(p => p.abstract && p.abstract.length >= 150);

        for (const paper of papers) {
          const pmid = paper.externalIds?.PubMed || paper.externalIds?.ArXiv || `s2-${paper.paperId?.substring(0, 10)}`;
          const title = paper.title || '';
          const abstract = paper.abstract || '';
          const combined = (title + ' ' + abstract).toLowerCase();

          if (EXCLUDE.some(p => p.test(combined))) { console.log(`  ⏭ 부적합: ${title.substring(0, 50)}`); continue; }

          const [dup] = await conn.query('SELECT id FROM articles WHERE source_pmid=? OR source_title=?', [pmid, title]);
          if (dup.length > 0) { console.log(`  ↩ 중복: ${title.substring(0, 50)}`); continue; }

          const slug = slugify(title.substring(0, 60));
          const thumbnail = await getImage(title, catSlug);
          await conn.query(
            `INSERT INTO articles (category_id, status, title, title_ko, slug, summary, summary_ko, content, content_ko, thumbnail, source_title, source_authors, source_journal, source_pubdate, source_pmid, source_url)
             VALUES (?, 'pending_write', ?, ?, ?, ?, '', '', '', ?, ?, ?, ?, ?, ?, ?)`,
            [cat.id, title, title.substring(0, 80), slug,
             abstract.substring(0, 200),
             thumbnail, title,
             (paper.authors || []).slice(0, 5).map(a => a.name).join(', '),
             paper.venue || '', paper.publicationDate || `${paper.year || ''}`,
             pmid,
             paper.externalIds?.ArXiv ? `https://arxiv.org/abs/${paper.externalIds.ArXiv}` : `https://www.semanticscholar.org/paper/${paper.paperId}`
            ]
          );
          totalAdded++;
          const badge = paper.citationCount > 100 ? '🔥' : '✅';
          console.log(`  ${badge} ${title.substring(0, 65)} (인용: ${paper.citationCount || 0})`);
          await sleep(200);
        }
      } catch (e) { console.log(`  ❌ 에러: ${e.message}`); }
      await sleep(700);
    }
  }

  console.log(`\n✅ 총 ${totalAdded}건 추가`);
  const [[count]] = await conn.query('SELECT COUNT(*) as cnt FROM articles');
  console.log(`📊 전체: ${count.cnt}건`);

  const logDir = path.resolve(__dirname, '..', 'logs');
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
  if (totalAdded > 0) {
    fs.writeFileSync(path.join(logDir, 'collect-notify.json'),
      JSON.stringify({ timestamp: new Date().toISOString(), added: totalAdded, total: count.cnt }));
  }
  await conn.end();
}
main().catch(e => { console.error(e); process.exit(1); });
