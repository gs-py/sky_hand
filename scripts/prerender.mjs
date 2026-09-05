import { mkdir, readFile, writeFile } from 'node:fs/promises'

const origin = 'https://sky-handlers-logistics-limited.vercel.app'
const pages = {
  about: {
    title: 'About SKY HANDLERS LOGISTICS LIMITED Hong Kong',
    description: 'Local Expertise. Regional Connectivity. Global Reach.',
  },
  freight: {
    title: 'International Freight Solutions from Hong Kong & China',
    description: 'Connecting Your Cargo to Global Markets',
  },
  'china-logistics': {
    title: 'More Than Freight Forwarding',
    description: 'Complete Logistics Support Across Hong Kong & Mainland China',
  },
  contact: {
    title: "Let's Move Your Cargo",
    description: 'Talk to SKY HANDLERS LOGISTICS LIMITED Hong Kong',
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
