# public/assets

<!-- touched to trigger the sync-assets workflow as an OIDC test run -->

Drop the real files here:

- `resume.pdf`
- `photo.jpg` (or update the extension in `src/lib/data.ts` / `src/lib/assets.ts` if you use a different format)

These sync to S3 automatically via `.github/workflows/sync-assets.yml` on every push to `main` that touches this folder. Locally (or if `NEXT_PUBLIC_ASSETS_URL` isn't set), the site reads directly from here instead — see `src/lib/assets.ts`.
