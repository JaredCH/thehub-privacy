// Generates the public legal pages from Markdown:
//   privacy-policy.md -> index.html
//   delete-account.md -> delete-account.html
//
// Run: node build.mjs
// Requires: npm install marked
//
// This mirrors the build in JaredCH/calbard-privacy on purpose: one pattern for
// every app's legal pages, so updating one is the same procedure as the others.

import { readFileSync, writeFileSync } from 'node:fs';
import { marked } from 'marked';

// GitHub-flavoured markdown: tables, autolinks.
marked.setOptions({ gfm: true, breaks: false });

const PAGES = [
  {
    source: 'privacy-policy.md',
    output: 'index.html',
    title: 'TheHub Privacy Policy',
    description:
      'TheHub privacy policy. A private family hub with live location, shared calendars, and weather. Location is encrypted on your device; no email address, no ads, no analytics.',
  },
  {
    source: 'delete-account.md',
    output: 'delete-account.html',
    title: 'Delete your TheHub account',
    description:
      'How to delete a TheHub account and all data attached to it, in the app or by email.',
  },
];

const NAV = `<nav class="site-nav">
  <a href="index.html">Privacy</a>
  <a href="delete-account.html">Delete account</a>
</nav>`;

const STYLE = `
  :root {
    color-scheme: light dark;
    --bg: #ffffff;
    --fg: #1a1a1a;
    --muted: #5c5c5c;
    --rule: #e2e2e2;
    --accent: #0b6bcb;
    --code-bg: #f4f4f5;
    --table-head: #f7f7f8;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #16181c;
      --fg: #e8e8ea;
      --muted: #a0a3a8;
      --rule: #2c2f35;
      --accent: #6cb0ff;
      --code-bg: #22252b;
      --table-head: #1d2026;
    }
  }
  * { box-sizing: border-box; }
  html { -webkit-text-size-adjust: 100%; }
  body {
    margin: 0;
    background: var(--bg);
    color: var(--fg);
    font: 16px/1.65 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          "Helvetica Neue", Arial, sans-serif;
  }
  main {
    max-width: 46rem;
    margin: 0 auto;
    padding: 2.5rem 1.25rem 5rem;
  }
  .site-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem 1rem;
    margin: 0 0 1.75rem;
    padding: 0 0 0.85rem;
    border-bottom: 1px solid var(--rule);
    font-size: 0.9rem;
  }
  .site-nav a {
    color: var(--muted);
    text-decoration: none;
  }
  .site-nav a:hover,
  .site-nav a[aria-current="page"] {
    color: var(--fg);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  h1 {
    font-size: 1.9rem;
    line-height: 1.2;
    margin: 0 0 0.5rem;
    letter-spacing: -0.02em;
  }
  h2 {
    font-size: 1.2rem;
    line-height: 1.3;
    margin: 2.5rem 0 0.75rem;
    padding-top: 1.25rem;
    border-top: 1px solid var(--rule);
    letter-spacing: -0.01em;
  }
  h3 {
    font-size: 1.02rem;
    margin: 1.75rem 0 0.5rem;
  }
  p { margin: 0 0 1rem; }
  ul, ol { margin: 0 0 1rem; padding-left: 1.4rem; }
  li { margin-bottom: 0.35rem; }
  a { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }
  a:hover { text-decoration-thickness: 2px; }
  strong { font-weight: 650; }
  hr { border: 0; border-top: 1px solid var(--rule); margin: 2rem 0; }
  code {
    background: var(--code-bg);
    padding: 0.12em 0.35em;
    border-radius: 4px;
    font-size: 0.9em;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 0 1.25rem;
    font-size: 0.94rem;
    display: block;
    overflow-x: auto;
  }
  th, td {
    text-align: left;
    padding: 0.55rem 0.7rem;
    border: 1px solid var(--rule);
    vertical-align: top;
  }
  th { background: var(--table-head); font-weight: 650; }
  blockquote {
    margin: 0 0 1rem;
    padding: 0.1rem 0 0.1rem 1rem;
    border-left: 3px solid var(--rule);
    color: var(--muted);
  }
  footer {
    margin-top: 3rem;
    padding-top: 1.25rem;
    border-top: 1px solid var(--rule);
    color: var(--muted);
    font-size: 0.875rem;
  }
  @media (max-width: 480px) {
    main { padding: 1.75rem 1rem 3rem; }
    h1 { font-size: 1.55rem; }
    table { font-size: 0.875rem; }
  }
`;

for (const page of PAGES) {
  const md = readFileSync(new URL(`./${page.source}`, import.meta.url), 'utf8');
  const body = marked.parse(md);
  const nav = NAV.replace(
    `href="${page.output}"`,
    `href="${page.output}" aria-current="page"`,
  );

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${page.title}</title>
<meta name="description" content="${page.description}">
<meta name="robots" content="index, follow">
<style>${STYLE}</style>
</head>
<body>
<main>
${nav}
${body}
<footer>
  <p>TheHub is a private family app. This page is referenced from the Google Play
  and Amazon Appstore listings and from the app's own Privacy screen.</p>
</footer>
</main>
</body>
</html>
`;

  writeFileSync(new URL(`./${page.output}`, import.meta.url), html);
  console.log(`${page.output} written (${html.length} bytes)`);
}
