#!/usr/bin/env node
/* CE Credits Online — batch author + deploy.
   Fetch each source page, extract real main content, emit DA HTML + metadata,
   deploy (PUT->preview->live), verify. Logs OK/FAIL per page. */
import { chromium } from '/Users/paolo/.nvm/versions/node/v25.2.1/lib/node_modules/playwright/index.mjs';
import { readFileSync, writeFileSync, mkdirSync, appendFileSync } from 'node:fs';
import { deploy, normalizePath } from './deploy.mjs';

const ROOT = '/Users/paolo/stardust/rollout/stardust-cecreditsonline-rollout';
const MIG = `${ROOT}/stardust/migrated`;
const LOG = `${ROOT}/stardust/deploy-log.tsv`;
const ROSTER = JSON.parse(readFileSync(`${ROOT}/stardust/roster.json`, 'utf8'));

const fix = (s) => (s || '')
  .replace(/â€"/g, '—').replace(/â€™/g, '’').replace(/â€œ/g, '“').replace(/â€\x9d/g, '”')
  .replace(/â€¦/g, '…').replace(/Â/g, '').replace(/\s+/g, ' ').trim();
const esc = (s) => fix(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// In-page extraction of clean main content
const extractFn = () => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const main = document.querySelector('main#MainContent, main, [role=main]') || document.body;
  const JUNK = /^(quick links|categories|contents|block settings|read more|share|cart|search|menu|skip to content|added to your cart|your cart|subscribe and save)/i;
  const out = { blocks: [] };
  // metadata
  const meta = (s) => document.querySelector(s)?.getAttribute('content') || null;
  out.title = document.title;
  out.description = meta('meta[name="description"]');
  out.ogImage = meta('meta[property="og:image"]');
  out.publishdate = meta('meta[property="article:published_time"]');
  out.h1 = norm((main.querySelector('h1') || document.querySelector('h1'))?.textContent);
  // walk main content in order
  const seen = new Set();
  const push = (type, data) => out.blocks.push({ type, ...data });
  const walk = (root) => {
    root.querySelectorAll('h1, h2, h3, h4, p, ul, ol, img').forEach((el) => {
      if (seen.has(el)) return;
      // skip if inside header/footer/nav/form/aside
      if (el.closest('header, footer, nav, form, [role=banner], [role=contentinfo], .cart, .header, .footer, .site-footer, .site-header, .announcement-bar, .breadcrumb')) return;
      const tag = el.tagName.toLowerCase();
      if (tag === 'img') {
        const src = el.currentSrc || el.src;
        if (!src || src.startsWith('data:')) return;
        const r = el.getBoundingClientRect();
        if (el.naturalWidth < 200 && r.width < 200) return; // skip icons
        if (/logo|icon|sprite|payment|badge/i.test(src)) return;
        push('img', { src, alt: el.alt || '' });
        seen.add(el);
        return;
      }
      const text = norm(el.textContent);
      if (!text || text.length < 2) return;
      if (JUNK.test(text)) return;
      if (/^[h]/.test(tag)) {
        seen.add(el);
        push('heading', { level: +tag[1], text });
      } else if (tag === 'p') {
        if (text.length < 3) return;
        seen.add(el);
        push('p', { text });
      } else { // ul/ol
        const items = [...el.querySelectorAll(':scope > li')].map((li) => norm(li.textContent)).filter((t) => t && !JUNK.test(t));
        if (!items.length) return;
        seen.add(el);
        [...el.querySelectorAll('li')].forEach((li) => seen.add(li));
        push('list', { ordered: tag === 'ol', items });
      }
    });
  };
  walk(main);
  return out;
};

function toDaHtml(page, data, tmpl) {
  const sections = [];
  let cur = [];
  // first section: h1
  if (data.h1) cur.push(`<h1>${esc(data.h1)}</h1>`);
  let h1done = false;
  let imgCount = 0;
  for (const b of data.blocks) {
    if (b.type === 'heading') {
      if (b.level === 1) { if (h1done) continue; h1done = true; if (!data.h1) cur.push(`<h1>${esc(b.text)}</h1>`); continue; }
      // start a new section on h2
      if (b.level === 2 && cur.length > 1) { sections.push(cur); cur = []; }
      cur.push(`<h${b.level}>${esc(b.text)}</h${b.level}>`);
    } else if (b.type === 'p') {
      cur.push(`<p>${esc(b.text)}</p>`);
    } else if (b.type === 'list') {
      const tag = b.ordered ? 'ol' : 'ul';
      cur.push(`<${tag}>${b.items.map((i) => `<li>${esc(i)}</li>`).join('')}</${tag}>`);
    } else if (b.type === 'img' && imgCount < 8) {
      imgCount += 1;
      cur.push(`<picture><img src="${b.src.replace(/&/g, '&amp;')}" alt="${esc(b.alt)}"></picture>`);
    }
  }
  if (cur.length) sections.push(cur);
  // back-link CTA section
  sections.push([`<p><strong><a href="/collections/courses">Browse Courses</a></strong></p>`]);
  // metadata block
  const md = [['Title', fix(data.title || data.h1 || page.title || '')], ['Description', fix(data.description || '')]];
  if (data.ogImage) md.push(['og:image', data.ogImage]);
  if (tmpl === 'blog-article' && data.publishdate) md.push(['publishdate', data.publishdate.slice(0, 10)]);
  if (tmpl === 'blog-article' && page.category) md.push(['category', page.category]);
  const mdRows = md.map(([k, v]) => `<div><div>${esc(k)}</div><div>${k === 'og:image' ? v.replace(/&/g, '&amp;') : esc(v)}</div></div>`).join('\n');
  const metaBlock = `<div class="metadata">\n${mdRows}\n</div>`;
  const body = sections.map((s) => `<div>\n${s.join('\n')}\n</div>`).join('\n');
  return `<body>\n<header></header>\n<main>\n${body}\n<div>\n${metaBlock}\n</div>\n</main>\n<footer></footer>\n</body>\n`;
}

(async () => {
  mkdirSync(MIG, { recursive: true });
  writeFileSync(LOG, 'status\tpath\tput\tprev\tlive\tverify\th1\terr\tlen\n');
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36' });
  let ok = 0; let fail = 0;
  for (const page of ROSTER) {
    const daPath = normalizePath(page.path);
    let line;
    try {
      const p = await ctx.newPage();
      const resp = await p.goto(page.src, { waitUntil: 'domcontentloaded', timeout: 30000 });
      if (!resp || resp.status() >= 400) { throw new Error(`source ${resp ? resp.status() : 'no-resp'}`); }
      await p.waitForTimeout(1200);
      const data = await p.evaluate(extractFn);
      await p.close();
      if (!data.h1 && !data.blocks.length) throw new Error('empty content');
      const html = toDaHtml(page, data, page.template);
      const file = `${MIG}${daPath}.html`;
      mkdirSync(file.substring(0, file.lastIndexOf('/')), { recursive: true });
      writeFileSync(file, html);
      const res = await deploy(daPath, html);
      line = `${res.ok ? 'OK' : 'FAIL'}\t${daPath}\t${res.putCode}\t${res.prev}\t${res.live}\t${res.verify.status}\t${res.verify.h1}\t${res.verify.err}\t${res.verify.len}`;
      if (res.ok) ok += 1; else fail += 1;
    } catch (e) {
      line = `FAIL\t${daPath}\t-\t-\t-\t-\t-\t${String(e.message).slice(0, 40)}\t-`;
      fail += 1;
    }
    appendFileSync(LOG, `${line}\n`);
    console.log(line);
  }
  await browser.close();
  console.log(`\nDONE ok:${ok} fail:${fail}`);
})();
