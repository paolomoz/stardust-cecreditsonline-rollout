#!/usr/bin/env node
/* Verify delivered pages: every roster path renders 200 on the LIVE tree,
   no about:error, has an <h1>. Reads roster.json + /index + fragments. */
import { readFileSync } from 'node:fs';

const ROOT = '/Users/paolo/stardust/rollout/stardust-cecreditsonline-rollout';
const ORG = 'paolomoz'; const REPO = 'stardust-cecreditsonline-rollout'; const BRANCH = 'main';
const base = `https://${BRANCH}--${REPO}--${ORG}.aem.live`;
const roster = JSON.parse(readFileSync(`${ROOT}/stardust/roster.json`, 'utf8'));
const norm = (p) => p.replace(/\.html$/, '').toLowerCase().replace(/\/$/, '') || '/';
const paths = ['/', ...roster.map((r) => norm(r.path))];

const results = [];
for (const p of paths) {
  const url = `${base}${p === '/' ? '/index' : p}.plain.html`;
  try {
    const r = await fetch(url);
    const body = r.ok ? await r.text() : '';
    results.push({ p, status: r.status, h1: /<h1/i.test(body), err: /about:error/i.test(body), len: body.length });
  } catch (e) { results.push({ p, status: 0, h1: false, err: false, len: 0, e: e.message }); }
}
const bad = results.filter((r) => r.status !== 200 || !r.h1 || r.err);
console.log(`Verified ${results.length} pages on LIVE tree`);
console.log(`  200 + <h1> + no about:error: ${results.length - bad.length}/${results.length}`);
if (bad.length) {
  console.log('\nFAILURES:');
  bad.forEach((r) => console.log(`  ${r.p}  status:${r.status} h1:${r.h1} err:${r.err} len:${r.len}`));
}
process.exit(bad.length ? 1 : 0);
