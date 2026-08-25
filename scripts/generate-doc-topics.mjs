// Scans docs/ for chapter files and extracts their "## " (H2) headings as
// topics, keyed by each doc's fully-qualified id (its path relative to
// docs/, joined with the frontmatter `id` — matching the `docId` Docusaurus
// puts on sidebar link items for nested docs, e.g.
// "my-book/chapter-1-foo/chapter-1"). Used by src/theme/DocCardList to show
// a dropdown of topics under each chapter on category index pages, instead
// of Docusaurus's default card grid.
//
// Regenerated automatically before `npm start` / `npm run build` (see
// package.json "prestart"/"prebuild"). Safe to re-run any time.
import fs from 'node:fs';
import path from 'node:path';
import githubSlugger from 'github-slugger';
const githubSlug = githubSlugger.slug;

const DOCS_DIR = path.join(process.cwd(), 'docs');
const OUT_FILE = path.join(process.cwd(), 'src', 'data', 'docTopics.generated.json');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (/\.mdx?$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function extractFrontmatterId(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const idLine = match[1].split(/\r?\n/).find((l) => /^id:\s*/.test(l));
  if (!idLine) return null;
  return idLine.replace(/^id:\s*/, '').trim().replace(/^['"]|['"]$/g, '');
}

function extractH2Topics(content) {
  const body = content.replace(/^---\r?\n[\s\S]*?\r?\n---/, '');
  const topics = [];
  let inFence = false;
  for (const line of body.split(/\r?\n/)) {
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const heading = line.match(/^##\s+(.+?)\s*$/);
    if (heading) {
      const title = heading[1].trim();
      topics.push({title, anchor: githubSlug(title)});
    }
  }
  return topics;
}

const topicsById = {};
for (const file of walk(DOCS_DIR)) {
  const content = fs.readFileSync(file, 'utf8');
  const id = extractFrontmatterId(content);
  if (!id) continue;

  const relDir = path.relative(DOCS_DIR, path.dirname(file)).split(path.sep).join('/');
  const qualifiedId = relDir ? `${relDir}/${id}` : id;

  const topics = extractH2Topics(content);
  if (topics.length) {
    topicsById[qualifiedId] = topics;
  }
}

fs.mkdirSync(path.dirname(OUT_FILE), {recursive: true});
fs.writeFileSync(OUT_FILE, JSON.stringify(topicsById, null, 2) + '\n');
console.log(`Wrote topics for ${Object.keys(topicsById).length} docs to ${path.relative(process.cwd(), OUT_FILE)}`);
