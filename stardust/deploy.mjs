#!/usr/bin/env node
/* CE Credits Online — DA deploy: PUT source → preview → live → verify.
   Usage: node stardust/deploy.mjs <da-path> <html-file>
   <da-path> is the EDS path WITHOUT extension (e.g. /pages/about-us or /index). */
import { readFileSync } from 'node:fs';

const ORG = 'paolomoz';
const REPO = 'stardust-cecreditsonline-rollout';
const BRANCH = 'main';
const TOKEN = (readFileSync(new URL('../.env', import.meta.url), 'utf8').match(/DA_TOKEN=(.+)/) || [])[1].trim();

// Path normalization (path-safety contract)
export function normalizePath(p) {
  let s = p.trim();
  if (!s.startsWith('/')) s = `/${s}`;
  s = s.replace(/\.html$/i, '');
  s = s.toLowerCase();
  s = s.split('/').map((seg) => seg
    .replace(/_/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')).join('/');
  s = s.replace(/\/{2,}/g, '/');
  if (s.length > 1) s = s.replace(/\/$/, '');
  return s || '/';
}

async function put(daPath, html) {
  const form = new FormData();
  form.append('data', new Blob([html], { type: 'text/html' }), 'page.html');
  const url = `https://admin.da.live/source/${ORG}/${REPO}${daPath}.html`;
  const r = await fetch(url, { method: 'PUT', headers: { Authorization: `Bearer ${TOKEN}` }, body: form });
  return r.status;
}
async function admin(action, daPath) {
  const url = `https://admin.hlx.page/${action}/${ORG}/${REPO}/${BRANCH}${daPath}`;
  const r = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${TOKEN}` } });
  return r.status;
}
async function verify(daPath) {
  const url = `https://${BRANCH}--${REPO}--${ORG}.aem.live${daPath}.plain.html`;
  const r = await fetch(url);
  const body = r.ok ? await r.text() : '';
  const h1 = /<h1/i.test(body);
  const err = /about:error/i.test(body);
  return { status: r.status, h1, err, len: body.length };
}

export async function deploy(rawPath, html) {
  const daPath = normalizePath(rawPath);
  const putCode = await put(daPath, html);
  const prev = await admin('preview', daPath);
  const live = await admin('live', daPath);
  const v = await verify(daPath);
  const ok = putCode < 400 && prev < 400 && live < 400 && v.status === 200 && v.h1 && !v.err;
  return { daPath, putCode, prev, live, verify: v, ok };
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const [, , rawPath, file] = process.argv;
  if (!rawPath || !file) { console.error('usage: deploy.mjs <da-path> <html-file>'); process.exit(1); }
  const html = readFileSync(file, 'utf8');
  const res = await deploy(rawPath, html);
  console.log(`${res.ok ? 'OK  ' : 'FAIL'} ${res.daPath}  put:${res.putCode} prev:${res.prev} live:${res.live} verify:${res.verify.status} h1:${res.verify.h1} err:${res.verify.err} len:${res.verify.len}`);
  process.exit(res.ok ? 0 : 1);
}
