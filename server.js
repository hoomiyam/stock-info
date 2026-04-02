const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3855;
const viewsDir = path.resolve(__dirname, 'views');
const publicDir = path.resolve(__dirname, 'public');

const pool = mysql.createPool({
  host: '127.0.0.1', port: 3306, user: 'user', password: 'devapril#aws123',
  database: 'stock', waitForConnections: true, connectionLimit: 10,
});

app.use(express.json());
app.use(express.static(publicDir));

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: https://${req.hostname}/sitemap.xml\n`);
});

app.get('/ads.txt', (req, res) => {
  res.type('text/plain').send('google.com, pub-5440006732512769, DIRECT, f08c47fec0942fa0\n');
});

app.get('/sitemap.xml', async (req, res) => {
  const host = req.hostname;
  const [articles] = await pool.query(`SELECT slug, updated_at FROM articles WHERE status='published' ORDER BY created_at DESC LIMIT 500`);
  const [cats] = await pool.query('SELECT slug FROM categories');
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://${host}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`;
  for (const c of cats) xml += `\n  <url><loc>https://${host}/category/${c.slug}</loc><changefreq>daily</changefreq><priority>0.8</priority></url>`;
  for (const a of articles) {
    const date = a.updated_at ? new Date(a.updated_at).toISOString().split('T')[0] : '';
    xml += `\n  <url><loc>https://${host}/article/${a.slug}</loc>${date ? `<lastmod>${date}</lastmod>` : ''}<changefreq>weekly</changefreq><priority>0.6</priority></url>`;
  }
  xml += '\n</urlset>';
  res.type('application/xml').send(xml);
});

// Pages
app.get('/', (req, res) => res.type('html').send(fs.readFileSync(path.join(viewsDir, 'index.html'), 'utf8')));
app.get('/category/:slug', (req, res) => res.type('html').send(fs.readFileSync(path.join(viewsDir, 'index.html'), 'utf8')));

app.get('/article/:slug', async (req, res) => {
  let html = fs.readFileSync(path.join(viewsDir, 'index.html'), 'utf8');
  try {
    const [rows] = await pool.query(`
      SELECT a.*, c.name AS category_name, c.name_ko AS category_name_ko, c.icon AS category_icon
      FROM articles a LEFT JOIN categories c ON a.category_id = c.id
      WHERE a.slug=? AND a.status='published'`, [req.params.slug]);
    if (rows.length) {
      const a = rows[0];
      const host = req.hostname;
      const title_ko = a.title_ko || a.title;
      const summary_ko = a.summary_ko || a.summary || '';
      const catName = a.category_name_ko || a.category_name || '';
      const catIcon = a.category_icon || '';

      // OG + title: 기존 태그 교체 (중복 방지)
      const safeTitle   = title_ko.replace(/"/g,'&quot;');
      const safeDesc200 = summary_ko.replace(/"/g,'&quot;').substring(0,200);
      const safeDesc160 = summary_ko.replace(/"/g,'&quot;').substring(0,160);
      html = html.replace(/<title>[^<]*<\/title>/, `<title>${title_ko} — 스톡인포</title>`);
      html = html.replace(/(<meta name="description" content=")[^"]*(")/,  `$1${safeDesc160}$2`);
      html = html.replace(/(<meta property="og:title" content=")[^"]*(")/,  `$1${safeTitle}$2`);
      html = html.replace(/(<meta property="og:description" content=")[^"]*(")/,  `$1${safeDesc200}$2`);
      html = html.replace(/(<meta property="og:type" content=")[^"]*(")/,   `$1article$2`);
      const extraOg = `
    <meta property="og:image" content="${a.thumbnail || ''}">
    <meta property="og:url" content="https://${host}/article/${a.slug}">`;
      html = html.replace('</head>', extraOg + '\n</head>');

      function mdToHtml(text) {
        if (!text) return '';
        return text
          .replace(/## (.+)/g, '<h2>$1</h2>')
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
          .replace(/^- (.+)/gm, '<li>$1</li>')
          .replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')
          .replace(/---/g, '<hr>')
          .split('\n\n').map(p => {
            if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<hr')) return p;
            return `<p>${p.replace(/\n/g, ' ')}</p>`;
          }).join('\n');
      }

      const pubDate = a.created_at ? new Date(a.created_at).toLocaleDateString('ko-KR', {year:'numeric',month:'long',day:'numeric'}) : '';
      const contentKoHtml = mdToHtml(a.content_ko || '');
      const contentEnHtml = mdToHtml(a.content || '');
      const thumbHtml = a.thumbnail ? `<img class="article-img" src="${a.thumbnail}" alt="${title_ko.replace(/"/g,'&quot;')}">` : '';

      const ssrContent = `
        <button class="back-btn" onclick="goHome(event)">← 목록으로</button>
        <div>
          <span class="card-cat">${catIcon} ${catName}</span>
          <h1 class="article-title">${title_ko}</h1>
          <div class="article-meta">
            <span>📅 ${pubDate}</span>
            <span>📰 ${a.source_journal || ''}</span>
            <span>👀 조회 ${(a.view_count||0)+1}</span>
          </div>
          <button class="share-btn" onclick="copyArticleLink('${a.slug}', this)">🔗 링크 복사</button>
          <button class="like-btn" id="like-btn" onclick="toggleLike('${a.slug}')">👍 <span class="like-count" id="like-count">${a.like_count||0}</span></button>
        </div>
        ${thumbHtml}
        <div class="article-content" id="ssr-content-ko">${contentKoHtml}</div>
        <div class="article-content hidden" id="ssr-content-en">${contentEnHtml}</div>
        <div class="ad-slot" style="margin-top:24px">
          <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-5440006732512769" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});<\/script>
        </div>`;

      html = html.replace('id="page-list"', 'id="page-list" class="hidden"');
      html = html.replace('id="page-article" class="hidden"', 'id="page-article"');
      html = html.replace('<div class="main article" id="article-content"></div>',
        `<div class="main article" id="article-content">${ssrContent}</div>`);

      const ssrInitScript = `
<script>
(function(){
  var l = localStorage.getItem('stock-lang') || 'ko';
  if (l === 'en') {
    var ko = document.getElementById('ssr-content-ko');
    var en = document.getElementById('ssr-content-en');
    if (ko) ko.classList.add('hidden');
    if (en) en.classList.remove('hidden');
  }
  window.__ssrArticleSlug = '${a.slug}';
  window.__ssrArticle = true;
})();
<\/script>`;
      html = html.replace('</body>', ssrInitScript + '\n</body>');
    }
  } catch (e) { console.error('SSR error:', e); }
  res.type('html').send(html);
});

app.get('/about', (req, res) => res.type('html').send(fs.readFileSync(path.join(viewsDir, 'about.html'), 'utf8')));
app.get('/privacy', (req, res) => res.type('html').send(fs.readFileSync(path.join(viewsDir, 'privacy.html'), 'utf8')));
app.get('/contact', (req, res) => res.type('html').send(fs.readFileSync(path.join(viewsDir, 'contact.html'), 'utf8')));
app.get('/terms', (req, res) => res.type('html').send(fs.readFileSync(path.join(viewsDir, 'terms.html'), 'utf8')));

// Admin
const ADMIN_PASS = 'admin1234';
app.get('/admin', (req, res) => res.type('html').send(fs.readFileSync(path.join(viewsDir, 'admin.html'), 'utf8')));

function authCheck(req, res) {
  const auth = req.headers.authorization;
  if (!auth || auth !== `Bearer ${ADMIN_PASS}`) { res.status(401).json({ error: 'Unauthorized' }); return false; }
  return true;
}

app.get('/api/admin/articles', async (req, res) => {
  if (!authCheck(req, res)) return;
  const { status = 'pending_write' } = req.query;
  const [rows] = await pool.query(
    `SELECT a.*, c.name_ko as category_name_ko, c.icon as category_icon FROM articles a
     LEFT JOIN categories c ON a.category_id=c.id WHERE a.status=? ORDER BY a.id DESC`, [status]);
  res.json(rows);
});

app.get('/api/admin/articles/:id', async (req, res) => {
  if (!authCheck(req, res)) return;
  const [[row]] = await pool.query('SELECT * FROM articles WHERE id=?', [req.params.id]);
  res.json(row);
});

app.post('/api/admin/articles/:id/approve', async (req, res) => {
  if (!authCheck(req, res)) return;
  await pool.query("UPDATE articles SET status='published' WHERE id=?", [req.params.id]);
  await pool.query('UPDATE categories c SET article_count=(SELECT COUNT(*) FROM articles a WHERE a.category_id=c.id AND a.status=\'published\')');
  res.json({ ok: true });
});

app.post('/api/admin/articles/:id/reject', async (req, res) => {
  if (!authCheck(req, res)) return;
  await pool.query("UPDATE articles SET status='rejected' WHERE id=?", [req.params.id]);
  res.json({ ok: true });
});

app.put('/api/admin/articles/:id', async (req, res) => {
  if (!authCheck(req, res)) return;
  const { title_ko, title, content_ko, content, summary_ko } = req.body;
  await pool.query('UPDATE articles SET title_ko=?,title=?,content_ko=?,content=?,summary_ko=? WHERE id=?',
    [title_ko, title, content_ko, content, summary_ko, req.params.id]);
  res.json({ ok: true });
});

app.delete('/api/admin/articles/:id', async (req, res) => {
  if (!authCheck(req, res)) return;
  await pool.query('DELETE FROM article_likes WHERE article_id=?', [req.params.id]);
  await pool.query('DELETE FROM link_shares WHERE article_id=?', [req.params.id]);
  await pool.query('DELETE FROM articles WHERE id=?', [req.params.id]);
  res.json({ ok: true });
});

// Public API
app.get('/api/categories', async (req, res) => {
  const [rows] = await pool.query(`
    SELECT c.*, (SELECT COUNT(*) FROM articles a WHERE a.category_id=c.id AND a.status='published') as article_count
    FROM categories c ORDER BY c.id`);
  res.json(rows);
});

app.get('/api/articles', async (req, res) => {
  const { page = 1, limit = 12, category, search } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);
  let where = "a.status='published'";
  const params = [];
  if (category) { where += ' AND c.slug=?'; params.push(category); }
  if (search) { where += ' AND (a.title_ko LIKE ? OR a.title LIKE ? OR a.content_ko LIKE ?)'; const s = `%${search}%`; params.push(s,s,s); }

  const [total] = await pool.query(`SELECT COUNT(*) as cnt FROM articles a LEFT JOIN categories c ON a.category_id=c.id WHERE ${where}`, params);
  const [rows] = await pool.query(
    `SELECT a.id, a.slug, a.title, a.title_ko, a.summary, a.summary_ko, a.thumbnail, a.view_count, a.like_count, a.created_at,
            c.name as category_name, c.name_ko as category_name_ko, c.icon as category_icon, c.slug as category_slug
     FROM articles a LEFT JOIN categories c ON a.category_id=c.id
     WHERE ${where} ORDER BY a.created_at DESC LIMIT ? OFFSET ?`,
    [...params, parseInt(limit), offset]);
  res.json({ articles: rows, total: total[0].cnt, totalPages: Math.ceil(total[0].cnt / parseInt(limit)) });
});

app.get('/api/articles/:slug', async (req, res) => {
  const [[row]] = await pool.query(
    `SELECT a.*, c.name as category_name, c.name_ko as category_name_ko, c.icon as category_icon
     FROM articles a LEFT JOIN categories c ON a.category_id=c.id
     WHERE a.slug=? AND a.status='published'`, [req.params.slug]);
  if (!row) return res.status(404).json({ error: 'Not found' });
  await pool.query('UPDATE articles SET view_count=view_count+1 WHERE id=?', [row.id]);
  res.json(row);
});

app.post('/api/articles/:slug/like', async (req, res) => {
  const [[row]] = await pool.query("SELECT id, like_count FROM articles WHERE slug=? AND status='published'", [req.params.slug]);
  if (!row) return res.status(404).json({ error: 'Not found' });
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  try {
    await pool.query('INSERT INTO article_likes (article_id, user_ip) VALUES (?,?)', [row.id, ip]);
    await pool.query('UPDATE articles SET like_count=like_count+1 WHERE id=?', [row.id]);
    const [[updated]] = await pool.query('SELECT like_count FROM articles WHERE id=?', [row.id]);
    res.json({ liked: true, like_count: updated.like_count });
  } catch (e) {
    await pool.query('DELETE FROM article_likes WHERE article_id=? AND user_ip=?', [row.id, ip]);
    await pool.query('UPDATE articles SET like_count=GREATEST(0,like_count-1) WHERE id=?', [row.id]);
    const [[updated]] = await pool.query('SELECT like_count FROM articles WHERE id=?', [row.id]);
    res.json({ liked: false, like_count: updated.like_count });
  }
});

app.get('/api/articles/:slug/like-status', async (req, res) => {
  const [[row]] = await pool.query("SELECT id, like_count FROM articles WHERE slug=? AND status='published'", [req.params.slug]);
  if (!row) return res.status(404).json({ liked: false, like_count: 0 });
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const [[like]] = await pool.query('SELECT id FROM article_likes WHERE article_id=? AND user_ip=?', [row.id, ip]);
  res.json({ liked: !!like, like_count: row.like_count });
});

app.post('/api/articles/:slug/share', async (req, res) => {
  const [[row]] = await pool.query("SELECT id FROM articles WHERE slug=? AND status='published'", [req.params.slug]);
  if (!row) return res.status(404).json({ error: 'Not found' });
  await pool.query('INSERT INTO link_shares (article_id) VALUES (?)', [row.id]);
  await pool.query('UPDATE articles SET share_count=share_count+1 WHERE id=?', [row.id]);
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`✅ 스톡인포 서버 실행 중 — http://localhost:${PORT}`));
