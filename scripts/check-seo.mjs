import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { pageSeo, siteOrigin } from '../src/seo.js'

const decode = (text) => text.replace(/&(?:amp|quot|#39);/g, (entity) => ({ '&amp;': '&', '&quot;': '"', '&#39;': "'" })[entity])
const sitemap = await readFile('dist/sitemap.xml', 'utf8')
const robots = await readFile('dist/robots.txt', 'utf8')
const llms = await readFile('dist/llms.txt', 'utf8')
const full = await readFile('dist/llms-full.txt', 'utf8')
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
assert.deepEqual(urls, Object.keys(pageSeo).map((path) => siteOrigin + path))
assert(robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`))
assert(!robots.includes('Disallow: /'))
assert(llms.startsWith('# SKY HANDLERS'))
assert(llms.includes('/llms-full.txt'))

for (const [path, seo] of Object.entries(pageSeo)) {
  const html = await readFile(`dist${path === '/' ? '' : path}/index.html`, 'utf8')
  assert.equal(decode(html.match(/<title>(.*?)<\/title>/)[1]), seo.title, path)
  assert.equal(decode(html.match(/<meta name="description" content="([^"]*)"/)[1]), seo.description, path)
  assert(html.includes(`rel="canonical" href="${siteOrigin}${path}"`), path)
  assert(html.includes(`property="og:url" content="${siteOrigin}${path}"`), path)
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${path}: one H1`)
  assert(html.includes('<div id="root"><'), `${path}: rendered body`)
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1]
  assert(main.length > 1000, `${path}: meaningful HTML`)
  assert(!main.includes('opacity:0'), `${path}: visible without JavaScript`)
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])
  assert.equal(schema['@graph'].find((item) => item['@id'] === siteOrigin + path + '#webpage').url, siteOrigin + path)
  assert(!JSON.stringify(schema).includes('[Insert'), `${path}: no placeholder business data`)
  assert(llms.includes(siteOrigin + path))
  assert(full.includes(`Source: ${siteOrigin}${path}\n`))
  for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)"/g)) {
    if (!Object.hasOwn(pageSeo, match[1])) await access('dist' + match[1])
  }
}
const config = JSON.parse(await readFile('vercel.json', 'utf8'))
assert.equal(config.trailingSlash, false)
assert.equal(config.rewrites.length, Object.keys(pageSeo).length - 1)
assert((await readFile('dist/404.html', 'utf8')).includes('content="noindex"'))
console.log('SEO checks passed: 5 rendered routes, metadata, schema, assets, sitemap, robots, LLM files and 404 configuration.')
