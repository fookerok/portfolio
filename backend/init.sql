CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    login VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    descr TEXT NOT NULL,
    "linkSite" TEXT,
    "linkGit" TEXT,
    category_id INTEGER REFERENCES category(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS settings (
    id SERIAL PRIMARY KEY,
    site_title TEXT NOT NULL,
    site_name TEXT,
    site_description TEXT,
    link_tg TEXT,
    link_git TEXT
);

INSERT INTO settings (id, site_title, site_name, site_description, link_tg, link_git)VALUES (
    1, 
    'Портфолио by DimaRojer', 
    'Frontend pet project', 
    'Мои пет-проекты', 
    'https://t.me/fookernya', 
    'https://github.com/fookerok'

)ON CONFLICT (id) DO UPDATE SET
    site_title = EXCLUDED.site_title,
    site_name = EXCLUDED.site_name,
    site_description = EXCLUDED.site_description,
    link_tg = EXCLUDED.link_tg,
    link_git = EXCLUDED.link_git;

INSERT INTO category (name) 
VALUES ('Vue project'), ('React project'), ('Backend')
ON CONFLICT (name) DO NOTHING;