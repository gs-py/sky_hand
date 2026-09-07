# Sky Handlers Logistics

## SEO and crawler files

`npm run build` produces complete static HTML for all five routes and runs `npm run test:seo`. React takes over for navigation and interactions after loading. The visible page content is available without JavaScript.

Edit route titles, descriptions and the production domain in `src/seo.js`. This is the source for built canonical URLs, Open Graph and Twitter metadata, Organization/WebSite/page structured data, and crawler discovery URLs. Visible website copy remains in `src/App.jsx`.

The build generates these files in `dist/`:

- `sitemap.xml`: all five canonical routes, without invented last-modified dates.
- `robots.txt`: allows crawling and links to the sitemap.
- `llms.txt`: a site overview and canonical page links.
- `llms-full.txt`: text extracted from the same rendered page content.
- `404.html`: a noindex error page; unknown paths are not rewritten to the homepage.

The files in `public/robots.txt` and `public/sitemap.xml` are development defaults; the build replaces them with generated versions. Use `npm run preview` to inspect production HTML and generated crawler files locally. The Vite development server does not serve the build-generated LLM files.

Vercel configuration normalizes trailing slashes and index.html URLs. Test response codes and redirects on the deployed host; Vite preview does not emulate Vercel routing.

After deployment, submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools using the site owner's verified accounts. No verification token or account details are stored in this repository. Contact information is still placeholder text: provide the real address, email, telephone and office hours before adding location-specific business schema. The existing inquiry form also needs a real delivery integration before it can receive requests.

`llms.txt` is a discovery convention, not an indexing or ranking guarantee. No analytics, fabricated reviews, contact details or search verification tokens are added.

## Development

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
