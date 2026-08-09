# public/assets

<!-- retest after confirming AWS_DEPLOY_ROLE_ARN / AWS_S3_BUCKET / AWS_REGION secrets -->

Drop the real files here:

- `resume.pdf`
- `photo.jpg` (or update the extension in `src/lib/data.ts` / `src/lib/assets.ts` if you use a different format)

These sync to S3 automatically via `.github/workflows/sync-assets.yml` on every push to `main` that touches this folder. Locally (or if `NEXT_PUBLIC_ASSETS_URL` isn't set), the site reads directly from here instead — see `src/lib/assets.ts`.
