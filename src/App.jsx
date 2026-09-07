import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import ScrollLockedVideoHero from './components/ui/scroll-locked-video-hero'
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  ChevronRight,
  MapPin,
  Menu,
  PackageCheck,
  Plane,
  Route,
  ShieldCheck,
  Ship,
  Truck,
  Warehouse,
  X,
} from 'lucide-react'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/freight', label: 'Air & Sea Freight' },
  { href: '/china-logistics', label: 'Hong Kong & China Logistics' },
  { href: '/contact', label: 'Contact Us' },
]

const pageSeo = {
  '/': {
    title: 'Your Logistics Gateway to Hong Kong, China & the World',
    description: 'Freight Forwarding & Logistics Solutions Connecting Asia to Global Markets',
  },
  '/about': {
    title: 'About SKY HANDLERS LOGISTICS LIMITED Hong Kong',
    description: 'Local Expertise. Regional Connectivity. Global Reach.',
  },
  '/freight': {
    title: 'International Freight Solutions from Hong Kong & China',
    description: 'Connecting Your Cargo to Global Markets',
  },
  '/china-logistics': {
    title: 'More Than Freight Forwarding',
    description: 'Complete Logistics Support Across Hong Kong & Mainland China',
  },
  '/contact': {
    title: "Let's Move Your Cargo",
    description: 'Talk to SKY HANDLERS LOGISTICS LIMITED Hong Kong',
  },
}

const validPaths = new Set(nav.map((item) => item.href))
const network = ['Hong Kong', 'Dubai', 'Mumbai', 'Istanbul', 'Jeddah', 'Bangkok']
const freightFactors = ['Cargo Type', 'Weight', 'Volume', 'Urgency', 'Destination', 'Budget', 'Special Handling Requirements']

const featuredServices = [
  {
    no: '01',
    title: 'Air Freight',
    href: '/freight',
    image: '/air-freight.jpg',
    icon: Plane,
    label: 'Air Freight',
    text: 'Flexible air freight solutions for shipments from and to Hong Kong and Mainland China, connecting businesses with major international destinations.',
    items: ['Airport-to-Airport', 'Door-to-Airport', 'Airport-to-Door', 'Door-to-Door', 'Import & Export Air Freight', 'Consolidation Services', 'Express & Time-Critical Cargo', 'General Cargo', 'Dangerous Goods', 'Special Cargo'],
    cta: 'EXPLORE AIR FREIGHT →',
    itemsLabel: 'Our services can include:',
  },
  {
    no: '02',
    title: 'Sea Freight',
    href: '/freight',
    image: '/sea-freight.jpg',
    icon: Ship,
    label: 'Sea Freight',
    text: 'Cost-effective ocean freight solutions connecting Hong Kong and major ports across Mainland China with destinations worldwide.',
    items: ['Full Container Load (FCL)', 'Less than Container Load (LCL)', 'Import & Export', 'Port-to-Port', 'Door-to-Port', 'Port-to-Door', 'Door-to-Door', 'Consolidation', 'Special & Project Cargo'],
    cta: 'EXPLORE SEA FREIGHT →',
    itemsLabel: 'Solutions include:',
  },
  {
    no: '03',
    title: 'HK & China Logistics',
    href: '/china-logistics',
    image: '/china-logistics.jpg',
    icon: Route,
    label: 'Hong Kong & China Logistics',
    text: 'Our regional capabilities support cargo movement between Hong Kong and Mainland China through coordinated local transportation, customs support, warehousing and distribution.',
    cta: 'EXPLORE HK & CHINA SOLUTIONS →',
  },
]

const supportServices = [
  ['Warehousing', Warehouse, 'Flexible warehousing and cargo handling solutions supporting storage, consolidation, distribution and inventory requirements.'],
  ['Customs Clearance', ShieldCheck, 'Professional coordination of import and export clearance, documentation and regulatory requirements in Hong Kong and Mainland China.'],
  ['Dangerous Goods', Boxes, 'Specialized logistics support for Dangerous Goods shipments requiring appropriate documentation, handling, packaging coordination and regulatory compliance.'],
]

const airServices = ['International Air Freight', 'Import & Export', 'Airport-to-Airport', 'Door-to-Airport', 'Airport-to-Door', 'Door-to-Door', 'Air Freight Consolidation', 'Express Cargo', 'Time-Critical Shipments', 'General Cargo', 'Dangerous Goods', 'Special Cargo', 'High-Value Cargo']
const seaServices = ['FCL', 'LCL', 'Import & Export', 'Port-to-Port', 'Door-to-Port', 'Port-to-Door', 'Door-to-Door', 'Cargo Consolidation', 'Containerized Cargo', 'Special Cargo', 'Project Cargo', 'Oversized Cargo']
const originServices = ['Factory pickup', 'Supplier coordination', 'Trucking', 'Cargo consolidation', 'Warehousing', 'Packing coordination', 'Documentation', 'Customs clearance', 'Export handling', 'International sea freight']
const localServices = ['Factory Pickup', 'Supplier Collection', 'Airport Pickup & Delivery', 'Port Pickup & Delivery', 'Warehouse Transfers', 'Commercial Cargo Delivery', 'Cross-Border Transportation', 'Last-Mile Commercial Delivery']
const warehousing = ['Short-Term Storage', 'Long-Term Storage', 'Cargo Receiving', 'Cargo Consolidation', 'Deconsolidation', 'Inventory Handling', 'Sorting', 'Labelling', 'Packing & Repacking', 'Palletization', 'Cargo Preparation', 'Distribution']
const clearance = ['Import Clearance', 'Export Clearance', 'Customs Documentation', 'Shipment Documentation Review', 'Import & Export Coordination', 'Permit Coordination where applicable', 'Cargo Release Coordination']
const dangerousGoods = ['DG Shipment Assessment', 'Documentation Coordination', 'Packing Coordination', 'Labelling & Marking', 'Airline / Carrier Coordination', 'Customs Documentation', 'DG Warehousing Coordination', 'Air Freight', 'Sea Freight', 'Local Transportation']

function App() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname))
  const [menuOpen, setMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname))
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    const seo = pageSeo[path]
    const canonical = window.location.origin + path
    document.title = seo.title
    document.querySelector('meta[name="description"]').content = seo.description
    document.querySelector('meta[property="og:title"]').content = seo.title
    document.querySelector('meta[property="og:description"]').content = seo.description
    document.querySelector('meta[property="og:url"]').content = canonical
    document.querySelector('meta[name="twitter:title"]').content = seo.title
    document.querySelector('meta[name="twitter:description"]').content = seo.description
    document.querySelector('link[rel="canonical"]').href = canonical
  }, [path])

  const page = useMemo(() => ({
    '/': <HomePage />,
    '/about': <AboutPage />,
    '/freight': <FreightPage />,
    '/china-logistics': <ChinaLogisticsPage />,
    '/contact': <ContactPage />,
  }[path]), [path])

  const go = (href) => (event) => {
    event.preventDefault()
    setMenuOpen(false)
    if (href !== path) navigateTo(href)
  }

  return (
    <div className="site-shell min-h-screen">
      <Header path={path} go={go} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <motion.main
        key={path}
        initial={{ opacity: 0, transform: reduceMotion ? 'none' : 'translateY(10px)' }}
        animate={{ opacity: 1, transform: 'translateY(0px)' }}
        transition={{ duration: reduceMotion ? 0.15 : 0.42, ease: [0.23, 1, 0.32, 1] }}
        className="page-canvas"
      >
        {page}
      </motion.main>
      <Footer path={path} go={go} />
    </div>
  )
}

function normalizePath(path) {
  return validPaths.has(path) ? path : '/'
}

function useMobileLayout() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 720px)').matches)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 720px)')
    const update = () => setIsMobile(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return isMobile
}

function navigateTo(href) {
  window.history.pushState({}, '', href)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function Header({ path, go, menuOpen, setMenuOpen }) {
  return (
    <header className="fixed inset-x-0 top-[calc(1.25rem+env(safe-area-inset-top))] z-50 px-5 lg:top-8 lg:px-10">
      <div className="nav-shell mx-auto flex h-14 max-w-[1120px] items-center rounded-2xl border border-white/60 bg-white/90 px-3 shadow-[0_16px_40px_rgba(17,32,37,.15)] backdrop-blur-xl lg:h-16 lg:px-4">
        <a href="/" onClick={go('/')} className="focus-ring flex items-center gap-3">
          <span className="brand-mark">SH</span>
          <span>
            <strong className="block text-[11px] uppercase tracking-[0.15em] text-ink">SKY HANDLERS</strong>
            <span className="mt-0.5 block text-[8px] uppercase tracking-[0.18em] text-ink/45">LOGISTICS LIMITED</span>
          </span>
        </a>

        <nav className="mx-auto hidden h-full items-center lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={go(item.href)} className={'nav-link ' + (path === item.href ? 'is-active' : '')}>
              {item.label}
            </a>
          ))}
        </nav>

        <a href="/contact" onClick={go('/contact')} className="focus-ring touchable ml-auto hidden items-center gap-2 rounded-lg bg-acid px-4 py-3 text-[9px] font-bold uppercase tracking-[0.14em] text-ink lg:inline-flex">
          Request a Quote <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
        <button aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="focus-ring touchable ml-auto grid h-10 w-10 place-items-center rounded-lg bg-ink text-white lg:hidden">
          {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {menuOpen && (
        <motion.nav initial={{ opacity: 0, transform: 'translateY(-8px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }} className="mx-auto mt-2 grid max-w-[1120px] rounded-2xl bg-white p-3 shadow-xl lg:hidden">
          {nav.map((item) => <a key={item.href} href={item.href} onClick={go(item.href)} className={'border-b border-ink/10 px-3 py-3 text-xs font-semibold uppercase tracking-[0.1em] last:border-0 ' + (path === item.href ? 'text-blue' : 'text-ink')}>{item.label}</a>)}
        </motion.nav>
      )}
    </header>
  )
}

function HomePage() {
  return (
    <>
      <HomeHero />
      <EditorialIntro
        className="home-intro"
        title="Freight Forwarding & Logistics Solutions Connecting Asia to Global Markets"
        paragraphs={[
          "Strategically positioned in one of Asia's most important logistics hubs, SKY HANDLERS LOGISTICS LIMITED provides reliable freight forwarding and logistics solutions for businesses moving cargo to and from Hong Kong, Mainland China and international markets.",
          "From air and sea freight to local transportation, warehousing, customs clearance and Dangerous Goods handling, our team coordinates your cargo requirements through one reliable logistics network.",
        ]}
      />
      <CapabilityBar />
      <EditorialIntro
        eyebrow="Connecting Hong Kong & China to Global Markets"
        title="Hong Kong is a major gateway between Mainland China and the international market."
        paragraphs={[
          "SKY HANDLERS LOGISTICS LIMITED Hong Kong combines local knowledge, regional capabilities and the international network of SKY HANDLERS LOGISTICS LIMITED to support companies importing, exporting and distributing cargo throughout Hong Kong, Mainland China and overseas destinations.",
          "Whether you are moving an urgent air shipment, full container, consolidated cargo or specialized goods, our team works with you to identify the appropriate logistics solution for your requirements.",
        ]}
      />
      <FeaturedServices />
      <SupportServices />
      <Process
        eyebrow="One Logistics Partner. Multiple Solutions."
        title="Every shipment is different."
        paragraphs={[
          "Our role is not simply to move cargo from one location to another. We work with customers to understand the complete logistics requirement and coordinate the right combination of freight, clearance, transportation, warehousing and distribution services.",
          "SKY HANDLERS LOGISTICS LIMITED. Multiple Solutions. One Client.",
        ]}
      />
      <CTA title="From Asia to the World" paragraphs={["Whether your cargo originates from Hong Kong, Shenzhen, Guangzhou, Dongguan or other major manufacturing and commercial centers across China, SKY HANDLERS LOGISTICS LIMITED can coordinate its movement through our logistics network."]} buttonLabel="TALK TO OUR HONG KONG TEAM" />
    </>
  )
}

function HomeHero() {
  const isMobile = useMobileLayout()

  if (!isMobile) {
    return (
      <div className="home-desktop-hero">
        <ScrollLockedVideoHero
          videoSrc="/gateway-opens.mp4"
          posterSrc="/gateway-opens-poster.jpg"
          eyebrow="Freight Forwarding & Logistics Solutions"
          title="Your Logistics Gateway to Hong Kong, China & the World"
          tagline="Connecting Asia to Global Markets"
        />
      </div>
    )
  }

  return (
    <section className="mobile-home-hero">
      <img src="/gateway-opens-poster.jpg" alt="Cargo gateway doors" />
      <div className="mobile-home-hero-shade" />
      <div className="mobile-home-hero-content">
        <p className="eyebrow text-acid">Freight Forwarding & Logistics Solutions</p>
        <h1 className="serif-display">Your Logistics Gateway to Hong Kong, China & the World</h1>
        <p>Connecting Asia to Global Markets</p>
        <a href="/contact" onClick={(event) => { event.preventDefault(); navigateTo('/contact') }} className="focus-ring touchable inline-flex items-center gap-2 rounded-lg bg-acid px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-ink">
          REQUEST A QUOTE <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  )
}

function CapabilityBar() {
  return (
    <section className="mx-4 overflow-hidden rounded-[20px] bg-ink px-5 py-6 text-white lg:mx-9 lg:px-8 lg:py-7">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center">
        <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4 xl:grid-cols-7">
          {['Air Freight', 'Sea Freight', 'China Logistics', 'Hong Kong Local Services', 'Warehousing', 'Customs Clearance', 'Dangerous Goods'].map((item) => <span key={item} className="flex items-start gap-2 text-sm font-semibold leading-6 text-white/85 xl:text-xs"><span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-acid/75" />{item}</span>)}
        </div>
        <LinkButton href="/contact" className="max-xl:w-full min-h-12 shrink-0 justify-center px-5 text-[10px]">REQUEST A QUOTE</LinkButton>
      </div>
    </section>
  )
}

function EditorialIntro({ eyebrow, title, text, paragraphs, className = '' }) {
  return (
    <section className={'content-shell py-24 lg:py-36 ' + className}>
      <Reveal className={'grid gap-10 ' + (eyebrow ? 'lg:grid-cols-[0.55fr_1.45fr]' : '')}>
        {eyebrow && <p className="eyebrow text-ink/45">+ {eyebrow}</p>}
        <div>
          <h2 className="serif-display max-w-5xl text-[clamp(2.7rem,5.4vw,5.6rem)] leading-[0.94] tracking-[-0.055em]">{title}</h2>
          {paragraphs ? <div className="mt-7 max-w-2xl space-y-5 text-base leading-8 text-muted">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div> : <p className="mt-7 max-w-2xl text-base leading-8 text-muted">{text}</p>}
        </div>
      </Reveal>
    </section>
  )
}

function FeaturedServices() {
  return (
    <section className="content-shell pb-24 lg:pb-36">
      <SectionHeading title="Our Core Services" />
      <div className="mt-12 grid gap-5 lg:grid-cols-12">
        {featuredServices.map((service, index) => <ServiceFeature key={service.title} service={service} index={index} />)}
      </div>
    </section>
  )
}

function ServiceFeature({ service, index }) {
  const Icon = service.icon
  return (
    <Reveal delay={index * 0.06} className={'service-feature group ' + (index === 0 ? 'lg:col-span-7' : index === 1 ? 'lg:col-span-5' : 'lg:col-span-12')}>
      <a href={service.href} onClick={(event) => { event.preventDefault(); navigateTo(service.href) }} className="focus-ring block h-full">
        <div className={'relative overflow-hidden rounded-[22px] ' + (index === 2 ? 'lg:grid lg:grid-cols-[1.1fr_.9fr]' : '')}>
          <div className={'image-zoom relative ' + (index === 2 ? 'min-h-[340px]' : 'aspect-[4/3]')}>
            <img src={service.image} alt="" className={(index === 2 ? 'absolute inset-0 ' : '') + 'h-full w-full object-cover'} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <span className="absolute left-5 top-5 rounded-full border border-white/35 bg-white/10 px-3 py-1.5 text-[9px] font-bold tracking-[0.15em] text-white backdrop-blur">{service.no}</span>
            <span className="absolute bottom-5 left-5 eyebrow text-white/70">{service.label}</span>
          </div>
          <div className="bg-[#eff1ee] p-6 lg:p-8">
            <div className="flex items-start justify-between">
              <Icon className="h-6 w-6 text-blue" strokeWidth={1.4} />
              <ArrowUpRight className="service-arrow h-5 w-5 text-ink/35" />
            </div>
            <h3 className="serif-display mt-12 text-4xl tracking-[-0.045em] lg:text-5xl">{service.title}</h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted">{service.text}</p>
            {service.items && <><p className="mt-6 text-xs font-semibold text-ink">{service.itemsLabel}</p><div className="mt-2 flex flex-wrap gap-2">{service.items.map((item) => <span key={item} className="rounded-full border border-ink/12 bg-white/65 px-3 py-2 text-[9px] font-semibold text-ink/65">{item}</span>)}</div></>}
            {service.cta && <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.14em] text-blue">{service.cta}</p>}
          </div>
        </div>
      </a>
    </Reveal>
  )
}

function SupportServices() {
  return (
    <section className="content-shell pt-12 pb-24 lg:pt-20 lg:pb-32">
      <div className="grid gap-4 lg:grid-cols-3">
        {supportServices.map(([title, Icon, text], index) => (
          <Reveal key={title} delay={index * 0.05} className="rounded-[22px] border border-ink/10 bg-[#f4f4f1] p-6 lg:min-h-[275px] lg:p-8">
            <div className="flex items-center justify-between"><span className="eyebrow text-blue">0{index + 4}</span><Icon className="h-6 w-6 text-ink/35" strokeWidth={1.4} /></div>
            <h3 className="serif-display mt-16 text-3xl tracking-[-0.04em]">{title}</h3>
            <p className="mt-4 text-sm leading-7 text-muted">{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function AboutPage() {
  return (
    <>
      <PageHero
        index="01"
        className="about-hero"
        eyebrow="About Us"
        title="About SKY HANDLERS LOGISTICS LIMITED Hong Kong"
        subtitle="Local Expertise. Regional Connectivity. Global Reach."
        paragraphs={[
          "SKY HANDLERS LOGISTICS LIMITED is a Hong Kong-based freight forwarding and logistics company providing transportation and supply chain solutions across Hong Kong, Mainland China and international markets.",
          "Our strategic location in Hong Kong places us at the center of one of Asia's most important trading regions and provides direct access to Mainland China's extensive manufacturing and commercial network.",
          "We support businesses with international freight forwarding and the local services required before and after transportation, providing customers with a coordinated approach to their logistics requirements.",
        ]}
        image="/hero-logistics.png"
        imageAlt="Hong Kong cargo gateway"
      />
      <EditorialIntro eyebrow="Our Approach" title="Logistics is rarely about one service." paragraphs={["A shipment may require collection from a supplier in China, transportation to a warehouse, consolidation, export clearance, international freight, destination clearance and final delivery.", "SKY HANDLERS LOGISTICS LIMITED brings these elements together.", "Our team coordinates the different stages of the shipment, helping customers manage their supply chain through a single logistics partner."]} />
      <Process eyebrow="Hong Kong + Mainland China" title="Our solutions can support:" paragraphs={["Our regional capabilities allow us to support customers requiring cargo movement across:", "Hong Kong and major commercial and manufacturing areas across Mainland China including the Greater Bay Area and major logistics gateways throughout China."]} steps={['Supplier cargo collection', 'Factory pickup', 'Cross-border transportation', 'Cargo consolidation', 'Warehousing', 'Export preparation', 'Customs clearance', 'Air freight', 'Sea freight', 'International distribution']} />
      <NetworkSection />
      <ReasonSection />
      <CTA title="Our Commitment" paragraphs={["We aim to build long-term logistics partnerships by providing responsive communication, practical solutions and reliable shipment coordination."]} buttonLabel="DISCOVER OUR SERVICES" />
    </>
  )
}

function FreightPage() {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="Air & Sea Freight"
        title="International Freight Solutions from Hong Kong & China"
        subtitle="Connecting Your Cargo to Global Markets"
        paragraphs={[
          "Whether speed, capacity or cost is the priority, SKY HANDLERS LOGISTICS LIMITED Hong Kong provides air and sea freight solutions designed around your shipment requirements.",
          "Our team coordinates cargo originating from Hong Kong and Mainland China as well as imports arriving into the region.",
        ]}
        image="/air-freight.jpg"
        imageAlt="Cargo being loaded into a freighter aircraft"
        secondaryImage="/sea-freight.jpg"
      />
      <FreightModes />
      <IndexedList eyebrow="" title="Origin Services in China" intro="We can coordinate cargo originating from different suppliers and locations across China." itemsLabel="Services may include:" items={originServices} />
      <DecisionSection />
      <CTA title="Not Sure Whether to Ship by Air or Sea?" paragraphs={["Our team can assess your shipment based on:", "Cargo Type | Weight | Volume | Urgency | Destination | Budget | Special Handling Requirements", "We can then recommend an appropriate routing and transportation solution."]} buttonLabel="REQUEST A FREIGHT QUOTE" />
    </>
  )
}

function PageHero({ index, eyebrow, title, subtitle, text, paragraphs, image, imageAlt, secondaryImage, className = '' }) {
  const reduceMotion = useReducedMotion()
  return (
    <section className={'hero-wrap ' + className}>
      <div className="hero-media">
        <motion.img src={image} alt={imageAlt} initial={{ transform: reduceMotion ? 'none' : 'scale(1.035)' }} animate={{ transform: 'scale(1)' }} transition={{ duration: reduceMotion ? 0 : 1.2, ease: [0.23, 1, 0.32, 1] }} className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-outline" />
        {secondaryImage && <div className="absolute bottom-8 right-8 z-20 hidden w-[28%] overflow-hidden rounded-2xl border-[6px] border-white shadow-2xl lg:block"><img src={secondaryImage} alt="" className="aspect-[4/3] h-full w-full object-cover" /><span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-[8px] font-bold uppercase tracking-[0.15em] text-ink">Sea freight</span></div>}

        <div className="page-hero-content relative z-10 flex h-full flex-col justify-between px-6 pb-8 pt-32 text-white lg:px-12 lg:pb-12 lg:pt-40">
          <Reveal>
            <p className="eyebrow text-white/65"><span className="text-acid">{index}</span> / {eyebrow}</p>
            <h1 className="serif-display mt-8 max-w-5xl text-[clamp(3.7rem,7.7vw,7.8rem)] leading-[0.84] tracking-[-0.065em]">{title}</h1>
            {subtitle && <p className="mt-7 max-w-2xl text-xl font-semibold leading-7 text-white/85 lg:text-2xl">{subtitle}</p>}
          </Reveal>
          <Reveal delay={0.08}>
            {(paragraphs || text) && <div className="max-w-xl space-y-4 border-l border-acid pl-5 text-base leading-7 text-white/75 lg:text-lg lg:leading-8">{paragraphs ? paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>) : <p>{text}</p>}</div>}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function FreightModes() {
  return (
    <>
      <section className="content-shell py-24 lg:py-36">
        <SectionHeading title="Air Freight" />
        <div className="mt-12">
          <FreightCard no="01" title="Air Freight from & to Hong Kong and China" label="Air Freight" image="/air-freight.jpg" icon={Plane} text="For urgent, high-value, time-sensitive or specialized shipments, our air freight solutions provide access to major international destinations through Hong Kong and key airports across Mainland China." itemsLabel="Our Air Freight Services" items={airServices} />
        </div>
      </section>
      <Process eyebrow="Air Freight from China" title="Need to collect cargo directly from your supplier or factory?" paragraphs={["SKY HANDLERS LOGISTICS LIMITED can coordinate cargo collection from locations across Mainland China and arrange transportation to the appropriate airport or logistics facility for international export.", "Depending on your requirements, we can coordinate:", "Supplier Pickup → Local Transportation → Warehousing/Consolidation → Export Clearance → Air Freight → Destination Handling", "This gives customers a single logistics partner from origin through international transportation."]} steps={['Supplier Pickup', 'Local Transportation', 'Warehousing/Consolidation', 'Export Clearance', 'Air Freight', 'Destination Handling']} />
      <section className="content-shell py-24 lg:py-36">
        <SectionHeading title="Sea Freight" />
        <div className="mt-12">
          <FreightCard no="02" title="Sea Freight" subtitle="Flexible Ocean Freight Solutions" label="Sea Freight" image="/sea-freight.jpg" icon={Ship} text="For larger shipments or cargo where cost efficiency is a priority, SKY HANDLERS LOGISTICS LIMITED provides sea freight solutions connecting Hong Kong and major Chinese ports with international destinations." highlights={[["Full Container Load — FCL", "Dedicated container solutions for larger cargo volumes, including standard and specialized container requirements."], ["Less than Container Load — LCL", "Consolidation solutions for customers who do not require a full container, allowing smaller shipments to share container capacity."]]} itemsLabel="Our Sea Freight Services" items={seaServices} />
        </div>
      </section>
    </>
  )
}

function FreightCard({ no, title, subtitle, label, image, icon: Icon, text, highlights, itemsLabel, items }) {
  return (
    <Reveal className="overflow-hidden rounded-[24px] border border-ink/10 bg-[#f4f4f1]">
      <div className="image-zoom relative aspect-[16/9] overflow-hidden">
        <img src={image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white"><span className="eyebrow">{label}</span><Icon className="h-6 w-6" strokeWidth={1.4} /></div>
      </div>
      <div className="p-6 lg:p-8">
        <span className="eyebrow text-blue">{no}</span>
        <h2 className="serif-display mt-4 text-5xl tracking-[-0.05em]">{title}</h2>
        {subtitle && <h3 className="mt-4 text-xl font-semibold">{subtitle}</h3>}
        <p className="mt-5 max-w-xl text-sm leading-7 text-muted">{text}</p>
        {highlights && <div className="mt-7 space-y-5">{highlights.map(([heading, description]) => <div key={heading}><h3 className="text-sm font-semibold">{heading}</h3><p className="mt-2 text-sm leading-7 text-muted">{description}</p></div>)}</div>}
        {itemsLabel && <p className="mt-8 border-t border-ink/12 pt-6 text-xs font-semibold text-ink">{itemsLabel}</p>}
        <div className="mt-2 grid gap-x-5 border-t border-ink/12 sm:grid-cols-2">
          {items.map((item) => <span key={item} className="flex items-center gap-2 border-b border-ink/10 py-3 text-[11px] font-semibold text-ink/75"><Check className="h-3 w-3 text-blue" />{item}</span>)}
        </div>
      </div>
    </Reveal>
  )
}

function DecisionSection() {
  return (
    <section className="mx-4 rounded-[26px] bg-blue px-5 py-20 text-white lg:mx-9 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-[1260px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading title="Not Sure Whether to Ship by Air or Sea?" light />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {freightFactors.map((factor, index) => <Reveal key={factor} delay={index * 0.035} className="rounded-2xl bg-white/12 p-5 backdrop-blur"><span className="text-[8px] font-bold tracking-[0.16em] text-acid">0{index + 1}</span><p className="mt-9 text-sm font-semibold">{factor}</p></Reveal>)}
        </div>
      </div>
    </section>
  )
}

function ChinaLogisticsPage() {
  return (
    <>
      <PageHero index="03" eyebrow="Hong Kong & China Logistics Solutions" title="More Than Freight Forwarding" subtitle="Complete Logistics Support Across Hong Kong & Mainland China" paragraphs={["Moving cargo internationally often involves much more than booking an aircraft or container.", "SKY HANDLERS LOGISTICS LIMITED Hong Kong provides supporting logistics services that help customers manage cargo before departure, during transit and after arrival."]} image="/china-logistics.jpg" imageAlt="South China cargo consolidation warehouse and truck" />
      <OperationsPair />
      <Process eyebrow="China–Hong Kong Cross-Border Logistics" title="A typical movement may include:" paragraphs={["Hong Kong's proximity to Mainland China's major manufacturing regions makes it an important gateway for international trade.", "SKY HANDLERS LOGISTICS LIMITED can coordinate cargo movements between Mainland China and Hong Kong, supporting customers requiring cross-border collection, consolidation, clearance and onward international transportation."]} steps={['Factory in China', 'Cargo Collection', 'Cross-Border Transportation', 'Hong Kong Warehouse / Cargo Terminal', 'Consolidation & Documentation', 'Air or Sea Freight', 'International Destination']} />
      <OperationsPair warehouse />
      <CompliancePair />
      <EditorialIntro eyebrow="Cargo Consolidation" title="Consolidate Multiple Suppliers into One Shipment" paragraphs={["For customers purchasing products from several suppliers across China, SKY HANDLERS LOGISTICS LIMITED can coordinate cargo collection and consolidation before international shipment.", "Instead of managing multiple shipments separately, cargo can be collected from different suppliers, brought to a designated facility and prepared for consolidated export.", "This can help customers simplify their logistics operations and potentially optimize transportation costs.", "Supplier A + Supplier B + Supplier C → Consolidation → One International Shipment"]} />
      <CTA title="One Partner Across the Supply Chain" paragraphs={["From factory collection in China to final international transportation, our objective is to simplify the logistics process.", "Collection → Transportation → Warehousing → Consolidation → Clearance → International Freight → Destination"]} buttonLabel="DISCUSS YOUR LOGISTICS REQUIREMENTS" />
    </>
  )
}

function OperationsPair({ warehouse = false }) {
  return (
    <section className="content-shell py-12 lg:py-20">
      <div>
        {!warehouse && <OperationCard no="01" title="Local Transportation" subtitle="Cargo Collection & Delivery" icon={Truck} text="We coordinate local cargo transportation within Hong Kong and Mainland China, including pickup from factories, suppliers, warehouses, airports and ports." itemsLabel="Services can include:" items={localServices} />}
        {warehouse && <OperationCard no="02" title="Warehousing" subtitle="Flexible Warehousing & Cargo Handling" icon={Warehouse} paragraphs={["Our warehousing solutions support customers who require temporary or longer-term storage as part of their logistics operations.", "Warehousing can be integrated with our freight forwarding and local transportation services to provide a more complete logistics solution."]} itemsLabel="Services can include:" items={warehousing} accent />}
      </div>
    </section>
  )
}

function OperationCard({ no, title, subtitle, icon: Icon, text, paragraphs, itemsLabel, items, accent = false }) {
  return (
    <Reveal className={'rounded-[24px] p-6 lg:p-12 ' + (accent ? 'bg-[#dce9eb]' : 'bg-[#f4f4f1]')}>
      <div className="flex items-center justify-between"><span className="eyebrow text-blue">{no}</span><Icon className="h-6 w-6 text-ink/40" strokeWidth={1.4} /></div>
      <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-2 lg:gap-16">
      <div>
      <h2 className="serif-display text-[clamp(2.25rem,3.5vw,3.25rem)] leading-[1.08] tracking-[-0.04em]">{title}</h2>
      {subtitle && <h3 className="mt-4 text-lg font-semibold">{subtitle}</h3>}
      {paragraphs ? <div className="mt-5 max-w-xl space-y-4 text-sm leading-7 text-muted">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div> : <p className="mt-5 max-w-xl text-sm leading-7 text-muted">{text}</p>}
      </div>
      <div>
      {itemsLabel && <p className="border-t border-ink/20 pt-5 text-sm font-semibold text-ink">{itemsLabel}</p>}
      <div className="mt-3 grid gap-x-6 sm:grid-cols-2">
        {items.map((item) => <span key={item} className="border-b border-ink/10 py-4 text-sm font-medium leading-6 text-ink/80">{item}</span>)}
      </div>
      </div>
      </div>
    </Reveal>
  )
}

function CompliancePair() {
  return (
    <section className="content-shell py-24 lg:py-36">
      <SectionHeading title="Customs & Dangerous Goods Support" />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <TagCard icon={ShieldCheck} title="Customs Clearance" subtitle="Import & Export Clearance Support" paragraphs={["Customs procedures can significantly affect the speed and efficiency of international shipments.", "Our team coordinates customs clearance and documentation requirements for cargo entering or leaving Hong Kong and Mainland China."]} itemsLabel="Services can include:" items={clearance} note="Our objective is to help customers prepare the correct documentation and reduce unnecessary delays during the clearance process." />
        <TagCard icon={PackageCheck} title="Dangerous Goods Logistics" subtitle="Specialized Handling for Dangerous Goods" paragraphs={["Dangerous Goods require additional care, documentation and compliance throughout the transportation process.", "SKY HANDLERS LOGISTICS LIMITED provides logistics coordination for DG shipments in accordance with applicable transportation and regulatory requirements."]} itemsLabel="Our DG support can include:" items={dangerousGoods} note="Examples may include certain: Chemicals | Batteries | Industrial Materials | Automotive Products | Electronic Equipment | Other Regulated Cargo\nAcceptance remains subject to the cargo classification, applicable regulations, carrier requirements and destination restrictions." />
      </div>
    </section>
  )
}

function TagCard({ icon: Icon, title, subtitle, text, paragraphs, itemsLabel, items, note }) {
  return (
    <Reveal className="rounded-[24px] border border-ink/10 bg-[#f4f4f1] p-6 lg:p-8">
      <Icon className="h-7 w-7 text-blue" strokeWidth={1.4} />
      <h3 className="serif-display mt-10 text-4xl tracking-[-0.045em]">{title}</h3>
      {subtitle && <h4 className="mt-4 text-lg font-semibold">{subtitle}</h4>}
      {paragraphs ? <div className="mt-4 space-y-4 text-sm leading-7 text-muted">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div> : <p className="mt-4 text-sm leading-7 text-muted">{text}</p>}
      {itemsLabel && <p className="mt-7 text-xs font-semibold text-ink">{itemsLabel}</p>}
      <div className="mt-3 flex flex-wrap gap-2">{items.map((item) => <span key={item} className="rounded-full border border-ink/12 bg-white/65 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.07em] text-ink/65">{item}</span>)}</div>
      {note && <div className="mt-6 space-y-3 text-sm leading-7 text-muted">{note.split('\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>}
    </Reveal>
  )
}

function Process({ eyebrow, title, paragraphs, steps }) {
  return (
    <section className="mx-4 mb-4 rounded-[28px] bg-ink px-5 py-20 text-white lg:mx-9 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1260px]">
        <SectionHeading eyebrow={eyebrow} title={title} light />
        {paragraphs && <div className="mt-8 max-w-3xl space-y-4 text-sm leading-7 text-white/70">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>}
        {steps && <div className="mt-14 grid lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step} delay={index * 0.045} className="relative border-l border-white/15 py-4 pl-5 lg:min-h-[155px] lg:border-l-0 lg:border-t lg:px-4 lg:pt-6">
              <span className="absolute -left-[4px] top-6 h-2 w-2 rounded-full bg-acid lg:-top-[4px] lg:left-4" />
              <span className="text-[8px] font-bold tracking-[0.16em] text-acid">{String(index + 1).padStart(2, '0')}</span>
              <p className="mt-7 max-w-[210px] text-sm font-semibold leading-6 text-white/80">{step}</p>
              {index < steps.length - 1 && <ChevronRight className="absolute right-2 top-6 hidden h-4 w-4 text-white/25 lg:block" />}
            </Reveal>
          ))}
        </div>}
      </div>
    </section>
  )
}

function NetworkSection() {
  return (
    <section className="content-shell py-24 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <div><SectionHeading title="Our International Network" /><div className="mt-6 max-w-lg space-y-4 text-sm leading-7 text-muted"><p>SKY HANDLERS LOGISTICS LIMITED has an expanding international presence, with branches in Hong Kong, Dubai, Mumbai, Istanbul, Jeddah, and Bangkok, strategically positioned across key global trade and logistics hubs.</p><p>Our network enables us to coordinate cargo movements across multiple markets while providing local expertise and support at both origin and destination.</p><p>With our presence across Asia, the Middle East, India and Türkiye, supported by our wider global network, SKY HANDLERS LOGISTICS LIMITED delivers flexible logistics solutions tailored to the specific requirements of each shipment.</p></div></div>
        <Reveal className="relative min-h-[390px] overflow-hidden rounded-[26px] bg-[#dce9eb]">
          <div className="map-grid absolute inset-0" />
          <div className="absolute left-[8%] right-[8%] top-1/2 h-px rotate-6 bg-ink/20" />
          {network.map((city, index) => {
            const positions = ['left-[10%] top-[28%]', 'left-[30%] top-[65%]', 'left-[48%] top-[40%]', 'left-[64%] top-[68%]', 'left-[77%] top-[32%]', 'left-[89%] top-[58%]']
            return <div key={city} className={'absolute -translate-x-1/2 -translate-y-1/2 ' + positions[index]}><span className="block h-3 w-3 rounded-full border-[3px] border-[#dce9eb] bg-blue shadow-[0_0_0_1px_rgba(17,32,37,.22)]" /><span className="mt-2 block whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.13em]">{city}</span></div>
          })}
        </Reveal>
      </div>
    </section>
  )
}

function ReasonSection() {
  const reasons = [
    ['Strategic Location', 'Operating from Hong Kong provides direct access to one of Asia\'s most established international trading and logistics hubs.'],
    ['China Connectivity', 'Our regional capabilities support cargo originating from or destined for major commercial and manufacturing locations across Mainland China.'],
    ['Multiple Freight Solutions', 'Air, sea, local transport, warehousing, customs clearance and specialized cargo services can be coordinated through one logistics partner.'],
    ['Local Knowledge', 'Our team understands the operational requirements involved in moving cargo between Hong Kong, Mainland China and international destinations.'],
    ['Global Network', 'As part of SKY HANDLERS LOGISTICS LIMITED, our customers benefit from broader international freight forwarding capabilities and destination support.'],
  ]
  return (
    <section className="content-shell pb-24 lg:pb-36">
      <SectionHeading title="Why Work With SKY HANDLERS LOGISTICS LIMITED Hong Kong?" />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{reasons.map(([title, text], index) => <Reveal key={title} delay={index * 0.04} className="rounded-[22px] bg-[#f4f4f1] p-6 lg:min-h-[220px]"><span className="eyebrow text-blue">0{index + 1}</span><h3 className="serif-display mt-12 text-3xl tracking-[-0.04em]">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{text}</p></Reveal>)}</div>
    </section>
  )
}

function IndexedList({ eyebrow, title, intro, itemsLabel, items }) {
  return (
    <section className="content-shell py-24 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div>{intro && <p className="mb-6 max-w-lg text-sm leading-7 text-muted">{intro}</p>}{itemsLabel && <p className="mb-3 text-xs font-semibold text-ink">{itemsLabel}</p>}<div className="border-t border-ink/15">{items.map((item, index) => <Reveal key={item} delay={index * 0.025} className="grid grid-cols-[48px_1fr_auto] items-center border-b border-ink/12 py-4"><span className="text-[8px] font-bold tracking-[0.14em] text-blue">{String(index + 1).padStart(2, '0')}</span><span className="text-sm font-semibold">{item}</span><ArrowRight className="h-3.5 w-3.5 text-ink/25" /></Reveal>)}</div></div>
      </div>
    </section>
  )
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <section className="hero-wrap pb-8">
      <div className="grid overflow-hidden rounded-[26px] bg-[#dce9eb] lg:min-h-[760px] lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative isolate overflow-hidden px-6 pb-10 pt-32 text-white lg:px-12 lg:pb-12 lg:pt-40">
          <img src="/hero-gateway.jpg" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-ink/78" />
          <Reveal>
            <p className="eyebrow text-white/60"><span className="text-acid">04</span> / Contact / Request a Quote</p>
            <h1 className="serif-display mt-8 text-[clamp(4rem,7vw,7rem)] leading-[0.84] tracking-[-0.065em]">Let's Move Your Cargo</h1>
            <h2 className="mt-8 max-w-lg text-2xl font-semibold leading-tight text-white/90">Talk to SKY HANDLERS LOGISTICS LIMITED Hong Kong</h2>
            <div className="mt-6 max-w-lg space-y-3 border-l border-acid pl-5 text-base leading-7 text-white/70"><p>Whether you are importing into Hong Kong, exporting from China or moving cargo between Asia and international markets, our team is ready to discuss your logistics requirements.</p><p>Tell us what you need to move, where it is coming from and where it needs to go.</p><p>We will work with you to identify the appropriate logistics solution.</p></div>
          </Reveal>
        </div>

        <div className="px-6 py-14 text-ink lg:px-12 lg:py-20">
          <div className="mb-10 flex items-center justify-between border-b border-ink/12 pb-5"><p className="eyebrow text-ink/45">Request a Quote</p><MapPin className="h-4 w-4 text-blue" /></div>
          {submitted ? (
            <motion.div initial={{ opacity: 0, transform: 'translateY(12px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} className="flex min-h-[460px] flex-col justify-center">
              <PackageCheck className="h-9 w-9 text-blue" strokeWidth={1.4} />
              <p className="eyebrow mt-7 text-blue">Inquiry received</p>
              <h2 className="serif-display mt-5 max-w-xl text-5xl leading-[0.95] tracking-[-0.05em]">Your shipment details are ready for review.</h2>
              <button type="button" onClick={() => setSubmitted(false)} className="focus-ring mt-9 w-fit border-b border-ink pb-2 text-[9px] font-bold uppercase tracking-[0.14em]">Send another inquiry</button>
            </motion.div>
          ) : <QuoteForm onSubmit={() => setSubmitted(true)} />}
          <div className="mt-16 border-t border-ink/12 pt-8"><h2 className="serif-display text-4xl tracking-[-0.045em]">Need Help Choosing the Right Solution?</h2><div className="mt-4 space-y-3 text-sm leading-7 text-muted"><p>Not every customer knows exactly which logistics service is required.</p><p>Send us your shipment details and our team can help assess the appropriate combination of freight and supporting logistics services.</p></div></div>
          <div className="mt-12 border-t border-ink/12 pt-8 text-sm leading-7 text-muted"><h2 className="serif-display text-4xl tracking-[-0.045em]">SKY HANDLERS LOGISTICS LIMITED Hong Kong</h2><strong className="eyebrow mt-7 block text-ink">Hong Kong Office</strong><p className="mt-3">[Insert Full Hong Kong Office Address]</p><p className="mt-5">Telephone:<br />[Insert Hong Kong Number]</p><p className="mt-5">Email:<br />[Insert Hong Kong Email]</p><p className="mt-5">WhatsApp:<br />[Insert Number]</p><p className="mt-5">Office Hours:<br />[Insert Office Hours]</p></div>
        </div>
      </div>
    </section>
  )
}

function QuoteForm({ onSubmit }) {
  return (
    <form onSubmit={(event) => { event.preventDefault(); onSubmit() }} className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
      <Field id="name" label="Name" required />
      <Field id="company" label="Company Name" />
      <Field id="email" label="Email Address" type="email" required />
      <Field id="phone" label="Telephone / WhatsApp" />
      <label className="field sm:col-span-2"><span>Message *</span><textarea id="message" required rows="5" /></label>
      <button className="focus-ring touchable mt-2 inline-flex min-h-13 items-center justify-between gap-8 rounded-lg bg-acid px-5 text-[9px] font-bold uppercase tracking-[0.15em] text-ink sm:col-span-2 sm:w-fit">SUBMIT YOUR INQUIRY <ArrowUpRight className="h-4 w-4" /></button>
    </form>
  )
}

function Field({ id, label, type = 'text', required = false }) {
  return <label className="field"><span>{label}{required ? ' *' : ''}</span><input id={id} required={required} type={type} /></label>
}

function SectionHeading({ eyebrow, title, light = false }) {
  return (
    <Reveal>
      {eyebrow && <p className={'eyebrow ' + (light ? 'text-white/55' : 'text-ink/45')}>+ {eyebrow}</p>}
      <h2 className={'serif-display ' + (eyebrow ? 'mt-6 ' : '') + 'max-w-4xl text-[clamp(2.7rem,5vw,5.2rem)] leading-[0.94] tracking-[-0.055em] ' + (light ? 'text-white' : '')}>{title}</h2>
    </Reveal>
  )
}

function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, transform: reduceMotion ? 'none' : 'translateY(20px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduceMotion ? 0.15 : 0.5, delay: reduceMotion ? 0 : delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function CTA({ title, text, paragraphs, buttonLabel = 'REQUEST A QUOTE' }) {
  return (
    <section className="mx-4 mb-4 overflow-hidden rounded-[28px] bg-blue text-white lg:mx-9 lg:mb-9">
      <div className="mx-auto grid max-w-[1260px] gap-10 px-6 py-20 lg:grid-cols-[1fr_auto] lg:items-end lg:px-10 lg:py-24">
        <Reveal><h2 className="serif-display max-w-4xl text-[clamp(3.2rem,5.8vw,6rem)] leading-[0.9] tracking-[-0.06em]">{title}</h2>{paragraphs ? <div className="mt-6 max-w-2xl space-y-3 text-sm leading-7 text-white/70">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div> : <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70">{text}</p>}</Reveal>
        <Reveal delay={0.08}><LinkButton href="/contact" light>{buttonLabel}</LinkButton></Reveal>
      </div>
    </section>
  )
}

function LinkButton({ href, children, light = false, className = '' }) {
  return <a href={href} onClick={(event) => { event.preventDefault(); navigateTo(href) }} className={'focus-ring touchable group inline-flex min-h-11 w-fit items-center gap-3 rounded-lg px-4 text-[9px] font-bold uppercase tracking-[0.14em] ' + (light ? 'bg-white text-ink' : 'bg-acid text-ink') + ' ' + className}>{children}<ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
}

function Footer({ path, go }) {
  return (
    <footer className="mx-auto max-w-[1500px] rounded-t-[28px] bg-ink px-6 py-14 text-white lg:px-12 lg:py-16">
      <div className="grid gap-12 border-b border-white/12 pb-12 lg:grid-cols-[1.3fr_.7fr_1fr]">
        <div><div className="flex items-center gap-3"><span className="brand-mark brand-mark-light">SH</span><strong className="text-[10px] uppercase tracking-[0.16em]">SKY HANDLERS LOGISTICS LIMITED Hong Kong</strong></div><p className="serif-display mt-8 max-w-md text-3xl leading-9 tracking-[-0.04em] text-white/85">Your Logistics Gateway to Hong Kong, China & the World</p></div>
        <nav><p className="eyebrow text-white/40">Quick Links</p><div className="mt-5 grid gap-3 text-xs">{nav.map((item) => <a key={item.href} href={item.href} onClick={go(item.href)} className={path === item.href ? 'text-acid' : 'text-white/50 hover:text-white'}>{item.label}</a>)}<a href="/contact" onClick={go('/contact')} className="text-white/50 hover:text-white">Request a Quote</a></div></nav>
        <div><p className="eyebrow text-white/40">Services</p><p className="mt-5 text-xs leading-7 text-white/48">Air Freight / Sea Freight / China Logistics / Hong Kong Local Services / Warehousing / Customs Clearance / Dangerous Goods / Cargo Consolidation</p><p className="eyebrow mt-8 text-white/40">Connect With SKY HANDLERS LOGISTICS LIMITED</p><p className="mt-3 text-xs leading-7 text-white/48">Hong Kong | China | UAE | Central Asia | India | International Network</p></div>
      </div>
      <div className="flex flex-col justify-between gap-4 pt-7 text-[8px] uppercase tracking-[0.14em] text-white/30 sm:flex-row"><span>© 2026 SKY HANDLERS LOGISTICS LIMITED. All Rights Reserved.</span><span>Privacy Policy | Cookies Policy | Terms & Conditions</span></div>
    </footer>
  )
}

export default App
