# vibe coding starter for websim-Quick Website Starter

Build a modern, SEO-optimized website in 5 minutes.

Powered by **websim**, **Gemini**, and **Claude**.

---

## Features

- ⚡ Rapid static site setup and deployment
- 🌍 Multi-language support (auto-generates sitemap for each language subfolder)
- 🤖 Automated SEO:
  - Auto-generate sitemap including all .html files
  - SEO checks to avoid Google redirection and indexing issues
  - Auto-submit URLs to Google (via IndexNow) and Bing
  - SEO metadata injection
  - Google Analytics & Microsoft Clarity integration
  - PWA support for offline and mobile
  - Keyword research tools (umbrella, trend, KGR, SpyFu)
- 🖼️ AI-powered image generation (logo, cover, etc.)
- ✍️ AI-powered blog/text generation ([auto-blog-g4f-action](https://github.com/wanghaisheng/auto-blog-g4f-action))
- 👤 User management via [workers-users-cloudflare](https://github.com/wanghaisheng/workers-users-cloudflare/tree/main)
- 🛠️ Modern, extensible codebase
- 💻 PC/mobile responsive
- 🚀 Static framework auto-deployment ([GitHub Pages Action](https://github.com/marketplace/actions/github-pages-action))

---

## Automated SEO Workflows

This project includes GitHub Actions for search engine integration:

- **Bing Webmaster:**  Automatically adds your site and submits your sitemap to Bing when you update `scripts/config.json` or `sitemap.xml`.
- **Google Search Console:**  Automatically adds your site and submits your sitemap to Google Search Console on config or sitemap updates.
- **IndexNow:**  Submits all URLs in your `sitemap.xml` to IndexNow on sitemap updates.

### Setup Required

1. **Bing Webmaster API Key:**  Add your Bing Webmaster API key as a repository secret named `BING_API_KEY`.
2. **Google Search Console Service Account:**
   - Create a service account with access to the Search Console API.
   - Upload the JSON credentials as a repository secret named `GOOGLE_APPLICATION_CREDENTIALS`.

---

## Getting Started

1. Clone this repo.
2. Run your static site generator or build process.
3. Push your changes to GitHub.
4. The SEO workflows will trigger automatically.

---

## Scripts

- `scripts/bing_webmaster.py` — Bing submission logic
- `scripts/google_search_console.py` — Google Search Console submission logic
- `scripts/submit_indexnow.py` — IndexNow submission logic
- `scripts/sitemap.js` — Generates sitemap based on language subfolders and .html files
- `scripts/validate-sitemap.js` — Checks sitemap and SEO requirements

---

## Related Resources

- User management: [workers-users-cloudflare](https://github.com/wanghaisheng/workers-users-cloudflare/tree/main)
- AI blog/text generation: [auto-blog-g4f-action](https://github.com/wanghaisheng/auto-blog-g4f-action)
- Static deployment: [GitHub Pages Action](https://github.com/marketplace/actions/github-pages-action)

---

## License

MIT