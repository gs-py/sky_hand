export const siteOrigin = 'https://sky-handlers-logistics-limited.vercel.app'

export const pageSeo = {
  '/': {
    title: 'Hong Kong & China Freight Forwarding | Sky Handlers',
    description: 'Air and sea freight, customs clearance, warehousing and cargo coordination connecting Hong Kong and Mainland China with international markets.',
  },
  '/about': {
    title: 'About Sky Handlers | Hong Kong Logistics Company',
    description: 'Meet Sky Handlers Logistics Limited, a Hong Kong-based freight forwarding company coordinating cargo across Mainland China and international markets.',
  },
  '/freight': {
    title: 'Air & Sea Freight from Hong Kong & China | Sky Handlers',
    description: 'Explore international air freight, FCL, LCL, cargo consolidation and origin services from Hong Kong and China, with routing to suit your shipment.',
  },
  '/china-logistics': {
    title: 'Hong Kong & China Logistics Services | Sky Handlers',
    description: 'Local and cross-border transport, warehousing, customs clearance, dangerous goods support and cargo consolidation across Hong Kong and Mainland China.',
  },
  '/contact': {
    title: 'Contact Sky Handlers | Request a Freight Quote',
    description: 'Discuss your Hong Kong and China cargo requirements with Sky Handlers. Share shipment details for air freight, sea freight and supporting logistics.',
  },
}

export function structuredData(path) {
  const seo = pageSeo[path]
  const url = siteOrigin + path
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': siteOrigin + '/#organization',
        name: 'SKY HANDLERS LOGISTICS LIMITED', url: siteOrigin + '/',
        logo: siteOrigin + '/icon-512.png',
        description: pageSeo['/'].description,
        areaServed: ['Hong Kong', 'Mainland China', 'Worldwide'],
      },
      {
        '@type': 'WebSite', '@id': siteOrigin + '/#website',
        url: siteOrigin + '/', name: 'Sky Handlers Logistics Limited',
        publisher: { '@id': siteOrigin + '/#organization' }, inLanguage: 'en-HK',
      },
      {
        '@type': path === '/about' ? 'AboutPage' : path === '/contact' ? 'ContactPage' : 'WebPage',
        '@id': url + '#webpage', url, name: seo.title, description: seo.description,
        isPartOf: { '@id': siteOrigin + '/#website' },
        about: { '@id': siteOrigin + '/#organization' }, inLanguage: 'en-HK',
      },
    ],
  }
}
