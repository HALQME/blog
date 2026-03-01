# CV PDF generation and deployment

This project adds a Typst-based CV at `src/content/cv.typst`, a Nix flake to provide Typst in the development environment, and a GitHub Actions workflow to build the PDF and deploy it to Cloudflare Pages.

How to build locally:

- Ensure Nix is installed with flakes enabled
- Run: `nix develop` to enter the dev shell (Typst will be available)
- Run: `npm run build:cv` (or `typst build src/content/cv.typst -o dist/cv.pdf`)

GitHub Actions:

- On push to main, the workflow builds the PDF via Nix and uploads the artifact, then publishes to Cloudflare Pages using wrangler.
