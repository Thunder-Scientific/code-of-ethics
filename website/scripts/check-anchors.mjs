// Verifies that every pinned heading anchor in the content still exists in the
// built HTML.
//
// Docusaurus' own `onBrokenAnchors` only checks that internal *links* point at
// real anchors. It does not notice when a pinned anchor disappears from the
// output, which is the failure that actually breaks citations: moderators link
// people to /section-b/b1/#unit-4 from appeals and mod logs, and nothing in the
// build warns when such an address stops resolving.
//
// Run after `docusaurus build`, from the website/ directory.

import {readFileSync} from 'node:fs';
import {readdir} from 'node:fs/promises';
import path from 'node:path';

const CONTENT = path.resolve('..');
const BUILD = path.resolve('build');

async function contentDirs() {
  const entries = await readdir(CONTENT, {withFileTypes: true});
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((n) => n === 'about' || /^section-[a-z]$/.test(n))
    .sort();
}

const pinned = [];   // {dir, page, id, line}
const onH1 = [];     // {dir, page, id, line} -- always a bug, see below

for (const dir of await contentDirs()) {
  const files = (await readdir(path.join(CONTENT, dir))).filter((f) => f.endsWith('.md'));
  for (const file of files.sort()) {
    const page = file.replace(/\.md$/, '');
    const text = readFileSync(path.join(CONTENT, dir, file), 'utf8');
    text.split(/\r?\n/).forEach((line, i) => {
      const heading = line.match(/^ {0,3}(#{1,6})\s+.*\{#([^}]+)\}\s*$/);
      if (heading) {
        const target = heading[1].length === 1 ? onH1 : pinned;
        target.push({dir, page, id: heading[2], line: i + 1});
        return;
      }
      const raw = line.match(/^<a id="([^"]+)"><\/a>\s*$/);
      if (raw) pinned.push({dir, page, id: raw[1], line: i + 1});
    });
  }
}

const errors = [];

// Docusaurus strips the first H1 into the page title and renders later H1s
// without an id, so `{#id}` on an H1 silently vanishes from the output.
for (const a of onH1) {
  errors.push(
    `${a.dir}/${a.page}.md:${a.line}  {#${a.id}} is on an H1 and will be dropped.\n` +
    `    Use "## Heading {#${a.id}}", or if this heading is the page title, ` +
    `put <a id="${a.id}"></a> on its own line AFTER it.`,
  );
}

let resolved = 0;
for (const a of pinned) {
  const html = path.join(BUILD, a.dir, a.page, 'index.html');
  let doc;
  try {
    doc = readFileSync(html, 'utf8');
  } catch {
    errors.push(`${a.dir}/${a.page}.md:${a.line}  page did not build (${path.relative(BUILD, html)})`);
    continue;
  }
  if (doc.includes(`id="${a.id}"`)) resolved += 1;
  else errors.push(`${a.dir}/${a.page}.md:${a.line}  anchor #${a.id} is missing from the built page`);
}

const total = pinned.length + onH1.length;
if (errors.length) {
  console.error(`\nAnchor check FAILED - ${resolved}/${total} anchors resolve\n`);
  for (const e of errors) console.error('  ' + e);
  console.error('\nAnchors are published addresses. Fix the content, do not remove the anchor.\n');
  process.exit(1);
}

console.log(`Anchor check passed - ${resolved}/${total} pinned anchors resolve.`);
