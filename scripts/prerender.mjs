import { mkdir, readFile, writeFile } from 'node:fs/promises'

const origin = 'https://sky-handlers-logistics-limited.vercel.app'
const pages = {
  about: {
    title: 'About Sky Handlers Logistics | Hong Kong Freight Partner',
    description: 'Meet the Hong Kong logistics partner coordinating freight, warehousing, customs and cargo movement across China and global markets.',
  },
  freight: {
    title: 'Air & Sea Freight from Hong Kong and China | Sky Handlers',
    description: 'International air and sea freight for urgent, high-value, consolidated, project and oversized cargo from Hong Kong and Mainland China.',
  },
  'china-logistics': {
    title: 'Hong Kong & China Logistics Services | Sky Handlers',
    description: 'Factory pickup, supplier collection, cross-border transport, warehousing, customs clearance and export handling across Hong Kong and China.',
  },
  contact: {
    title: 'Request a Freight Quote | Sky Handlers Logistics',
    description: 'Contact Sky Handlers Logistics for a tailored air freight, sea freight, warehousing, customs or China logistics quotation.',
  },
}

const template = await readFile('dist/index.html', 'utf8')

for (const [route, seo] of Object.entries(pages)) {
  const url = `${origin}/${route}`
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${seo.title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${seo.description}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${seo.title}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${seo.description}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${seo.title}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${seo.description}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)

  if (!html.includes(`<title>${seo.title}</title>`) || !html.includes(`href="${url}"`)) {
    throw new Error(`Failed to prerender SEO metadata for /${route}`)
  }

  await mkdir(`dist/${route}`, { recursive: true })
  await writeFile(`dist/${route}/index.html`, html)
}
