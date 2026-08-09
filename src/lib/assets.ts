// Resolves "content" assets (resume, profile photo) to their S3 URL in
// production, falling back to the local /public/assets copy when
// NEXT_PUBLIC_ASSETS_URL isn't set (e.g. local dev before the bucket
// exists, or if you decide not to use S3 at all — the site still works).
//
// Set NEXT_PUBLIC_ASSETS_URL in Vercel's project env vars once the S3
// bucket is up, e.g. https://your-bucket.s3.us-east-1.amazonaws.com

const ASSETS_BASE_URL = process.env.NEXT_PUBLIC_ASSETS_URL;

export function assetUrl(filename: string): string {
  if (ASSETS_BASE_URL) {
    return `${ASSETS_BASE_URL.replace(/\/$/, "")}/assets/${filename}`;
  }
  return `/assets/${filename}`;
}
