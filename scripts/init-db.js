const mysql = require('mysql2/promise');

async function init() {
  const conn = await mysql.createConnection({ host:'127.0.0.1', port:3306, user:'user', password:'devapril#aws123', database:'stock' });

  await conn.query(`CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    name_ko VARCHAR(200),
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(20),
    article_count INT DEFAULT 0
  )`);

  await conn.query(`CREATE TABLE IF NOT EXISTS articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    status ENUM('pending_write','draft','published','rejected') DEFAULT 'published',
    title VARCHAR(500) NOT NULL,
    title_ko VARCHAR(500),
    slug VARCHAR(500) NOT NULL UNIQUE,
    summary TEXT NOT NULL DEFAULT '',
    summary_ko TEXT,
    content LONGTEXT NOT NULL DEFAULT '',
    content_ko LONGTEXT,
    thumbnail VARCHAR(500),
    source_title VARCHAR(500),
    source_authors VARCHAR(500),
    source_journal VARCHAR(200),
    source_pubdate VARCHAR(50),
    source_pmid VARCHAR(20),
    source_url VARCHAR(500),
    view_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    share_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category_id),
    INDEX idx_status (status),
    UNIQUE INDEX idx_slug (slug(200))
  )`);

  await conn.query(`CREATE TABLE IF NOT EXISTS article_likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    article_id INT NOT NULL,
    user_ip VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uniq_like (article_id, user_ip),
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
  )`);

  await conn.query(`CREATE TABLE IF NOT EXISTS link_shares (
    id INT AUTO_INCREMENT PRIMARY KEY,
    article_id INT NOT NULL,
    shared_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
  )`);

  // 카테고리 삽입
  const cats = [
    ['Global Stocks', '해외주식·글로벌', 'global', '📈'],
    ['Korean Stocks', '국내주식·한국', 'korea', '🏢'],
    ['Investment Strategy & Quant', '투자전략·퀀트', 'strategy', '💰'],
    ['Behavioral Finance', '행동재무·심리', 'behavioral', '🧠'],
    ['Technical Analysis', '기술적 분석', 'technical', '📊'],
    ['Investment Insights', '투자비법·인사이트', 'insights', '💡'],
  ];
  for (const [name, name_ko, slug, icon] of cats) {
    await conn.query('INSERT IGNORE INTO categories (name, name_ko, slug, icon) VALUES (?,?,?,?)', [name, name_ko, slug, icon]);
  }

  console.log('✅ DB 초기화 완료');
  const [cats2] = await conn.query('SELECT * FROM categories');
  console.table(cats2.map(c => ({ id: c.id, slug: c.slug, name_ko: c.name_ko })));
  await conn.end();
}
init().catch(console.error);
