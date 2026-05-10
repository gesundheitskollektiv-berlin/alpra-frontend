# Alpra frontend → Strapi migrations

One-shot scripts that talk to the Strapi backend configured for this app.

## Configuration

The Strapi base URL is read from the parent [`alpra-frontend/.env`](../.env) (`PUBLIC_STRAPI_URL`). Override inline if needed:

```bash
cd alpra-frontend/migration
PUBLIC_STRAPI_URL=http://localhost:1337 STRAPI_TOKEN=<token> node migrate-sprechzeiten.js
```

> `PUBLIC_STRAPI_URL` in `.env` may be quoted (`'http://...'`); the script strips surrounding quotes so axios gets a valid URL.

A Strapi API token with write access on `alpra-page-landing` and `alpra-personnel` (create if missing doctors) is expected via `STRAPI_TOKEN` when your instance requires auth.

## Scripts

### `migrate-sprechzeiten.js`

Replaces the `alpra-page-blocks.sprechstunden` component on `alpra-page-landing` with the legacy content from [`geko-allgemeinarzt/collections/_blocks/de/sprechzeiten.md`](../../../geko-allgemeinarzt/collections/_blocks/de/sprechzeiten.md), translated to English for the `en` locale.

Install dependencies once (in `migration/`, where `axios` / `dotenv` live):

```bash
cd alpra-frontend/migration && npm install
```

From **`alpra-frontend/migration`** (after `npm install` there):

```bash
node migrate-sprechzeiten.js
```

Or from **`alpra-frontend`** (app root), without `cd` into `migration`:

```bash
npm run migrate:sprechzeiten
```

That runs `node migration/migrate-sprechzeiten.js`; all script files stay under `migration/`.

Use `STRAPI_TOKEN=...` (and optionally `PUBLIC_STRAPI_URL=...`) in the environment when your Strapi requires it.

The script:

1. Loads `PUBLIC_STRAPI_URL` from `../.env`.
2. Ensures ten `alpra-personnel` rows from the legacy About page (five doctors referenced in sprechzeiten + five further staff): looks up by `last_name` (published, then draft); if missing, creates via `POST /api/alpra-personnels` with `first_name` / `position`. No image uploads.
3. Resolves personnel `documentId`s for slot `doctors` relations (by last_name).
4. For each locale (`de`, `en`): fetches `alpra-page-landing`, replaces or appends the sprechstunden block, PUTs the full content array back.
5. Bootstraps the `en` entry by cloning the `de` content if `en` does not yet exist (other blocks stay German until separately translated).

The intro paragraphs from the markdown ("Online-Termine werden 6 Wochen..." / "Für die Akutsprechstunde...") are intentionally dropped; the schema has no top-level description on the sprechstunden block.
