import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createServer } from 'vite'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { pageSeo, siteOrigin, structuredData } from '../src/seo.js'

const escape = (text) => text.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])
const template = (await readFile('dist/index.html', 'utf8')).replaceAll('https://sky-handlers-logistics-limited.vercel.app', siteOrigin)
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })

try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const fullText = []
  for (const [path, seo] of Object.entries(pageSeo)) {
    const url = siteOrigin + path
    const body = renderToStaticMarkup(createElement(App, { initialPath: path }))
    let html = template
      .replace(/<title>.*?<\/title>/, `<title>${escape(seo.title)}</title>`)
      .replace(/(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*/g, (_, prefix) => prefix + escape(seo.description))
      .replace(/(<meta (?:name|property)="(?:og:title|twitter:title)" content=")[^"]*/g, (_, prefix) => prefix + escape(seo.title))
      .replace(/(<meta property="og:url" content=")[^"]*/, (_, prefix) => prefix + url)
      .replace(/(<link rel="canonical" href=")[^"]*/, (_, prefix) => prefix + url)
      .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(structuredData(path)).replace(/</g, '\\u003c')}</script>`)
      .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`)
    if (path !== '/') html = html.replace(/\s*<link rel="preload"[^>]+>/g, '')
    const directory = path === '/' ? 'dist' : `dist${path}`
    await mkdir(directory, { recursive: true })
    await writeFile(`${directory}/index.html`, html)
    const main = body.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1]
    const text = main.replace(/<\/(?:p|h[1-6]|div|section|span|a)>/g, '\n').replace(/<[^>]*>/g, '')
      .replace(/&(?:amp|lt|gt|quot|#x27|#39);/g, (entity) => ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#x27;': "'", '&#39;': "'" })[entity])
      .replace(/\n\s*\n/g, '\n\n').trim()
    fullText.push(`# ${seo.title}\n\nSource: ${url}\n\n${text}`)
  }
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(pageSeo).map((path) => `  <url><loc>${siteOrigin}${path}</loc></url>`).join('\n')}\n</urlset>\n`)
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`)
  await writeFile('dist/llms.txt', `# SKY HANDLERS LOGISTICS LIMITED\n\n> Hong Kong-based freight forwarding and logistics coordination across Hong Kong, Mainland China and international markets.\n\nServices include air and sea freight, local and cross-border transportation, warehousing, customs clearance, dangerous goods coordination and cargo consolidation. Dangerous goods acceptance is subject to cargo classification, carrier requirements and applicable regulations.\n\nContact details on the site are placeholders; no verified address, telephone, email or office hours are supplied.\n\n## Pages\n\n${Object.entries(pageSeo).map(([path, seo]) => `- [${seo.title}](${siteOrigin}${path}): ${seo.description}`).join('\n')}\n\n## Reference\n\n- [Full site text](${siteOrigin}/llms-full.txt): Text extracted from the current published pages.\n- [Sitemap](${siteOrigin}/sitemap.xml): Canonical page URLs.\n`)
  await writeFile('dist/llms-full.txt', fullText.join('\n\n---\n\n') + '\n')
  await writeFile('dist/404.html', '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | Sky Handlers</title></head><body><main><h1>Page not found</h1><p>This page does not exist.</p><a href="/">Return to Sky Handlers</a></main></body></html>')
} finally {
  await server.close()
}
