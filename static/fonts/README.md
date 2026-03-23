# Cerebri Sans Pro (WOFF2)

Place these licensed font files in this folder so they are served at `/fonts/...` and work on Vercel (and locally):

- `CerebriSansPro-Regular.woff2`
- `CerebriSansPro-Bold.woff2`
- `CerebriSansPro-ExtraBold.woff2`

They are referenced from `src/typography.scss` via root-relative URLs (no Vite bundling at build time).

If you cannot commit them, copy them into `static/fonts/` in CI before `yarn build` (e.g. from secrets or object storage).
