# TheHub legal pages

Public hosting for TheHub's privacy policy and account-deletion page, served via
GitHub Pages.

**Live URLs:**

- <https://jaredch.github.io/thehub-privacy/> — privacy policy
- <https://jaredch.github.io/thehub-privacy/delete-account.html> — delete your account

These URLs are referenced from:

- The Google Play and Amazon Appstore listings (privacy policy, account deletion)
- The TheHub app itself: `/privacy` and `/delete-account`, which carry the same text

## Why this repo exists

Both stores require a publicly reachable privacy policy, and both now require a
public way to request account deletion. The TheHub source repository is private,
so those pages are published here as plain static HTML.

## Structure

| Path | Purpose |
|---|---|
| `privacy-policy.md` | Privacy policy source. **Copy of `docs/privacy/policy.md` in the TheHub repo.** |
| `delete-account.md` | Deletion page source. Copy of `docs/privacy/delete-account.md`. |
| `build.mjs` | Converts both Markdown files to `index.html` and `delete-account.html`. |
| `*.html` | Generated output. **Do not edit by hand.** |
| `.nojekyll` | Serve the files as they are, without Jekyll processing. |

## Updating a page

Edit the Markdown in the TheHub repo first — that is the source of truth — then:

```powershell
# from the TheHub repo, with this repo cloned next to it
npm run privacy:publish          # copies the markdown here and runs build.mjs
cd ../thehub-privacy
git add -A
git commit -m "Update privacy policy"
git push                         # Pages redeploys automatically
```

`npm run privacy:publish` is `tools/publish-privacy.mjs` in the TheHub repo. It
refuses to publish if the two copies of the policy disagree on their headings.

## Keeping in sync with the app

`privacy-policy.md` and `delete-account.md` here are copies of `docs/privacy/*.md`
in the private TheHub repo. The app's `/privacy` page is checked against
`docs/privacy/policy.md` by a test in `apps/web/src/pages/privacy-sync.test.ts`,
so the app, this repo, and the store listing cannot drift apart without something
going red.

The policy promises that changes appear "at the same URL". Keeping this repo and
its Pages site alive is what makes that promise true.

## Local preview

```powershell
npm install     # first time only
node build.mjs
start index.html
```
