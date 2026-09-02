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
  { href: '/about', label: 'About' },
  { href: '/freight', label: 'Air & Sea' },
  { href: '/china-logistics', label: 'HK & China' },
  { href: '/contact', label: 'Contact' },
]

const pageSeo = {
  '/': {
    title: 'Sky Handlers Logistics | Hong Kong & China Freight Forwarding',
    description: 'Air freight, sea freight, warehousing, customs clearance and China logistics coordinated from Hong Kong to destinations worldwide.',
  },
  '/about': {
    title: 'About Sky Handlers Logistics | Hong Kong Freight Partner',
    description: 'Meet the Hong Kong logistics partner coordinating freight, warehousing, customs and cargo movement across China and global markets.',
  },
  '/freight': {
    title: 'Air & Sea Freight from Hong Kong and China | Sky Handlers',
    description: 'International air and sea freight for urgent, high-value, consolidated, project and oversized cargo from Hong Kong and Mainland China.',
  },
  '/china-logistics': {
    title: 'Hong Kong & China Logistics Services | Sky Handlers',
    description: 'Factory pickup, supplier collection, cross-border transport, warehousing, customs clearance and export handling across Hong Kong and China.',
  },
  '/contact': {
    title: 'Request a Freight Quote | Sky Handlers Logistics',
    description: 'Contact Sky Handlers Logistics for a tailored air freight, sea freight, warehousing, customs or China logistics quotation.',
  },
}

const validPaths = new Set(nav.map((item) => item.href))
const network = ['Hong Kong', 'Dubai', 'Mumbai', 'Istanbul', 'Jeddah', 'Bangkok']
const freightFactors = ['Cargo type', 'Weight', 'Volume', 'Urgency', 'Destination', 'Budget', 'Special handling']

const featuredServices = [
  {
    no: '01',
    title: 'Air Freight',
    href: '/freight',
    image: '/air-freight.jpg',
    icon: Plane,
    label: 'Time-critical cargo',
    text: 'Flexible air freight from and to Hong Kong and Mainland China, including express, general, Dangerous Goods and special cargo.',
  },
  {
    no: '02',
    title: 'Sea Freight',
    href: '/freight',
    image: '/sea-freight.jpg',
    icon: Ship,
    label: 'Capacity at scale',
    text: 'FCL, LCL, consolidation and project cargo solutions through Hong Kong and major Chinese ports.',
  },
  {
    no: '03',
    title: 'HK & China Logistics',
    href: '/china-logistics',
    image: '/china-logistics.jpg',
    icon: Route,
    label: 'Origin to gateway',
    text: 'Supplier collection, factory pickup, cross-border transport, customs support, warehousing and distribution.',
  },
]

const supportServices = [
  ['Warehousing', Warehouse, 'Storage, receiving, consolidation, packing and distribution support.'],
  ['Customs Clearance', ShieldCheck, 'Import and export documentation, permits and cargo release coordination.'],
  ['Dangerous Goods', Boxes, 'Assessment, packing, marking, carrier coordination and regulated handling.'],
]

const airServices = ['International Air Freight', 'Import & Export', 'Airport-to-Airport', 'Door-to-Airport', 'Airport-to-Door', 'Door-to-Door', 'Air Freight Consolidation', 'Express Cargo', 'Time-Critical Shipments', 'General Cargo', 'Dangerous Goods', 'Special Cargo', 'High-Value Cargo']
const seaServices = ['Full Container Load — FCL', 'Less than Container Load — LCL', 'Import & Export', 'Port-to-Port', 'Door-to-Port', 'Port-to-Door', 'Door-to-Door', 'Cargo Consolidation', 'Containerized Cargo', 'Special Cargo', 'Project Cargo', 'Oversized Cargo']
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
    <header className="fixed inset-x-0 top-3 z-50 px-4 lg:top-5">
      <div className="nav-shell mx-auto flex h-14 max-w-[1120px] items-center rounded-2xl border border-white/60 bg-white/90 px-3 shadow-[0_16px_40px_rgba(17,32,37,.15)] backdrop-blur-xl lg:h-16 lg:px-4">
        <a href="/" onClick={go('/')} className="focus-ring flex items-center gap-3">
          <span className="brand-mark">SH</span>
          <span>
            <strong className="block text-[11px] uppercase tracking-[0.15em] text-ink">Sky Handlers</strong>
            <span className="mt-0.5 block text-[8px] uppercase tracking-[0.18em] text-ink/45">Logistics Limited</span>
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
          Get a quotation <ArrowUpRight className="h-3.5 w-3.5" />
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
      <CapabilityBar />
      <EditorialIntro
        eyebrow="About Sky Handlers"
        title="One logistics partner from supplier collection to international departure."
        text="Sky Handlers combines local knowledge, regional capability and an international network for businesses importing, exporting and distributing cargo."
      />
      <FeaturedServices />
      <Process
        eyebrow="A coordinated route"
        title="From factory floor to global departure."
        steps={['Supplier collection', 'Origin transport', 'Warehousing & consolidation', 'Export clearance', 'Air or sea freight', 'Destination handling']}
      />
      <SupportServices />
      <CTA title="Tell us what needs to move." text="Share the origin, destination, cargo type and timing. We will help shape the right logistics solution." />
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
          eyebrow="Sky Handlers Logistics / Hong Kong"
          title="The world opens"
          tagline="Your gateway to Hong Kong, China and the world."
        />
      </div>
    )
  }

  return (
    <section className="mobile-home-hero">
      <img src="/gateway-opens-poster.jpg" alt="Cargo gateway doors" />
      <div className="mobile-home-hero-shade" />
      <div className="mobile-home-hero-content">
        <p className="eyebrow text-acid">International freight coordination</p>
        <h1 className="serif-display">One partner.<br />Every shipment.</h1>
        <p>Air freight, sea freight and China logistics, coordinated from origin to destination.</p>
        <a href="/contact" onClick={(event) => { event.preventDefault(); navigateTo('/contact') }} className="focus-ring touchable inline-flex items-center gap-2 rounded-lg bg-acid px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-ink">
          Request a quotation <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  )
}

function CapabilityBar() {
  return (
    <div className="mx-4 rounded-2xl bg-[#f4f4f1] px-5 py-6 lg:mx-9 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <span className="eyebrow text-ink/45">One coordinated partner</span>
        {['Air freight', 'Sea freight', 'China logistics', 'Warehousing', 'Customs', 'Dangerous goods'].map((item) => <span key={item} className="flex items-center gap-2 text-[10px] font-semibold text-ink/58"><span className="h-1.5 w-1.5 rounded-full bg-blue/45" />{item}</span>)}
      </div>
    </div>
  )
}

function EditorialIntro({ eyebrow, title, text }) {
  return (
    <section className="content-shell py-24 lg:py-36">
      <Reveal className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr]">
        <p className="eyebrow text-ink/45">+ {eyebrow}</p>
        <div>
          <h2 className="serif-display max-w-5xl text-[clamp(2.7rem,5.4vw,5.6rem)] leading-[0.94] tracking-[-0.055em]">{title}</h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-muted">{text}</p>
        </div>
      </Reveal>
    </section>
  )
}

function FeaturedServices() {
  return (
    <section className="content-shell pb-24 lg:pb-36">
      <SectionHeading eyebrow="Core services" title="Designed around the shipment, not a template." />
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
            <img src={service.image} alt="" className="h-full w-full object-cover" />
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
          </div>
        </div>
      </a>
    </Reveal>
  )
}

function SupportServices() {
  return (
    <section className="content-shell py-24 lg:py-32">
      <SectionHeading eyebrow="Supporting operations" title="The work around the freight matters." />
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
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
        eyebrow="Company / Hong Kong"
        title="Local knowledge. Global coordination."
        text="Sky Handlers brings the individual parts of a shipment together through one logistics partner."
        image="/hero-logistics.png"
        imageAlt="Hong Kong cargo gateway"
      />
      <EditorialIntro eyebrow="A coordinated approach" title="Logistics works when every handoff is understood." text="A shipment may require supplier collection, transport, warehousing, consolidation, export clearance, international freight, destination clearance and final delivery. We coordinate those elements as one route." />
      <Process eyebrow="Hong Kong + Mainland China" title="Capability across the complete origin journey." steps={['Supplier cargo collection', 'Factory pickup', 'Cross-border transportation', 'Cargo consolidation', 'Warehousing', 'Export preparation', 'Customs clearance', 'International distribution']} />
      <NetworkSection />
      <ReasonSection />
      <CTA title="One team across the handoffs." text="Bring us the complete requirement—not just one booking—and we will help coordinate the route." />
    </>
  )
}

function FreightPage() {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="Air / Sea Freight"
        title="Speed when it matters. Scale when it counts."
        text="International freight from Hong Kong and Mainland China, designed around cargo, timing and destination."
        image="/air-freight.jpg"
        imageAlt="Cargo being loaded into a freighter aircraft"
        secondaryImage="/sea-freight.jpg"
      />
      <FreightModes />
      <DecisionSection />
      <Process eyebrow="Air freight from China" title="A clear sequence from supplier to destination." steps={['Supplier pickup', 'Local transportation', 'Warehousing / consolidation', 'Export clearance', 'Air freight', 'Destination handling']} />
      <IndexedList eyebrow="Origin services in China" title="Prepared before international movement." items={originServices} />
      <CTA title="Not sure whether to ship by air or sea?" text="We assess urgency, cargo profile, budget, destination and handling requirements before recommending the route." />
    </>
  )
}

function PageHero({ index, eyebrow, title, text, image, imageAlt, secondaryImage }) {
  const reduceMotion = useReducedMotion()
  return (
    <section className="hero-wrap">
      <div className="hero-media">
        <motion.img src={image} alt={imageAlt} initial={{ transform: reduceMotion ? 'none' : 'scale(1.035)' }} animate={{ transform: 'scale(1)' }} transition={{ duration: reduceMotion ? 0 : 1.2, ease: [0.23, 1, 0.32, 1] }} className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-outline" />
        {secondaryImage && <div className="absolute bottom-8 right-8 z-20 hidden w-[28%] overflow-hidden rounded-2xl border-[6px] border-white shadow-2xl lg:block"><img src={secondaryImage} alt="" className="aspect-[4/3] h-full w-full object-cover" /><span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-[8px] font-bold uppercase tracking-[0.15em] text-ink">Sea freight</span></div>}

        <div className="relative z-10 flex h-full flex-col justify-between px-6 pb-8 pt-32 text-white lg:px-12 lg:pb-12 lg:pt-40">
          <Reveal>
            <p className="eyebrow text-white/65"><span className="text-acid">{index}</span> / {eyebrow}</p>
            <h1 className="serif-display mt-8 max-w-5xl text-[clamp(3.7rem,7.7vw,7.8rem)] leading-[0.84] tracking-[-0.065em]">{title}</h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-xl border-l border-acid pl-5 text-base leading-7 text-white/75 lg:text-lg lg:leading-8">{text}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function FreightModes() {
  return (
    <section className="content-shell py-24 lg:py-36">
      <SectionHeading eyebrow="Two modes. One requirement." title="Choose for speed, capacity and handling." />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <FreightCard no="01" title="Air Freight" label="Time-critical / high-value" image="/air-freight.jpg" icon={Plane} text="For urgent, high-value, time-sensitive or specialized shipments through Hong Kong and key airports across Mainland China." items={airServices} />
        <FreightCard no="02" title="Sea Freight" label="Capacity / cost efficiency" image="/sea-freight.jpg" icon={Ship} text="For larger shipments where capacity and cost efficiency are the priority, through Hong Kong and major Chinese ports." items={seaServices} />
      </div>
    </section>
  )
}

function FreightCard({ no, title, label, image, icon: Icon, text, items }) {
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
        <p className="mt-5 max-w-xl text-sm leading-7 text-muted">{text}</p>
        <div className="mt-8 grid gap-x-5 border-t border-ink/12 sm:grid-cols-2">
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
        <SectionHeading eyebrow="Mode selection" title="The right answer depends on the shipment." light />
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
      <PageHero index="03" eyebrow="Hong Kong / Mainland China" title="The route before the route." text="Complete logistics support before departure, during transit and after arrival." image="/china-logistics.jpg" imageAlt="South China cargo consolidation warehouse and truck" />
      <EditorialIntro eyebrow="More than freight forwarding" title="International movement starts long before the aircraft or vessel." text="We coordinate the supporting logistics services that keep cargo moving between factories, suppliers, warehouses, airports and ports." />
      <OperationsPair />
      <Process eyebrow="China to Hong Kong" title="A coordinated cross-border movement." steps={['Factory in China', 'Cargo collection', 'Cross-border transportation', 'Hong Kong warehouse / terminal', 'Consolidation & documentation', 'Air or sea freight', 'International destination']} />
      <CompliancePair />
      <CTA title="Multiple suppliers. One international shipment." text="Cargo from Supplier A, B and C can be collected, consolidated and prepared as one coordinated movement." />
    </>
  )
}

function OperationsPair() {
  return (
    <section className="content-shell pb-24 lg:pb-36">
      <div className="grid gap-6 lg:grid-cols-2">
        <OperationCard no="01" title="Local Transportation" icon={Truck} text="Cargo collection and delivery within Hong Kong and Mainland China, including factories, suppliers, warehouses, airports and ports." items={localServices} />
        <OperationCard no="02" title="Warehousing" icon={Warehouse} text="Flexible cargo handling for temporary storage, consolidation, distribution and inventory requirements." items={warehousing} accent />
      </div>
    </section>
  )
}

function OperationCard({ no, title, icon: Icon, text, items, accent = false }) {
  return (
    <Reveal className={'rounded-[24px] p-6 lg:p-8 ' + (accent ? 'bg-[#dce9eb]' : 'bg-[#f4f4f1]')}>
      <div className="flex items-center justify-between"><span className="eyebrow text-blue">{no}</span><Icon className="h-6 w-6 text-ink/40" strokeWidth={1.4} /></div>
      <h2 className="serif-display mt-14 text-5xl tracking-[-0.05em]">{title}</h2>
      <p className="mt-5 max-w-xl text-sm leading-7 text-muted">{text}</p>
      <div className="mt-8 grid gap-x-5 border-t border-ink/12 sm:grid-cols-2">
        {items.map((item) => <span key={item} className="border-b border-ink/10 py-3 text-[11px] font-semibold text-ink/72">{item}</span>)}
      </div>
    </Reveal>
  )
}

function CompliancePair() {
  return (
    <section className="content-shell py-24 lg:py-36">
      <SectionHeading eyebrow="Regulated movement" title="Documentation and handling stay connected." />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <TagCard icon={ShieldCheck} title="Customs Clearance" text="Import and export clearance support for cargo entering or leaving Hong Kong and Mainland China." items={clearance} />
        <TagCard icon={PackageCheck} title="Dangerous Goods" text="Specialized handling subject to classification, carrier requirements and destination restrictions." items={dangerousGoods} />
      </div>
    </section>
  )
}

function TagCard({ icon: Icon, title, text, items }) {
  return (
    <Reveal className="rounded-[24px] border border-ink/10 bg-[#f4f4f1] p-6 lg:p-8">
      <Icon className="h-7 w-7 text-blue" strokeWidth={1.4} />
      <h3 className="serif-display mt-10 text-4xl tracking-[-0.045em]">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-muted">{text}</p>
      <div className="mt-7 flex flex-wrap gap-2">{items.map((item) => <span key={item} className="rounded-full border border-ink/12 bg-white/65 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.07em] text-ink/65">{item}</span>)}</div>
    </Reveal>
  )
}

function Process({ eyebrow, title, steps }) {
  return (
    <section className="mx-4 rounded-[28px] bg-ink px-5 py-20 text-white lg:mx-9 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1260px]">
        <SectionHeading eyebrow={eyebrow} title={title} light />
        <div className="mt-14 grid lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step} delay={index * 0.045} className="relative border-l border-white/15 py-4 pl-5 lg:min-h-[155px] lg:border-l-0 lg:border-t lg:px-4 lg:pt-6">
              <span className="absolute -left-[4px] top-6 h-2 w-2 rounded-full bg-acid lg:-top-[4px] lg:left-4" />
              <span className="text-[8px] font-bold tracking-[0.16em] text-acid">{String(index + 1).padStart(2, '0')}</span>
              <p className="mt-7 max-w-[210px] text-sm font-semibold leading-6 text-white/80">{step}</p>
              {index < steps.length - 1 && <ChevronRight className="absolute right-2 top-6 hidden h-4 w-4 text-white/25 lg:block" />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function NetworkSection() {
  return (
    <section className="content-shell py-24 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <div><SectionHeading eyebrow="International network" title="Regional presence. Connected execution." /><p className="mt-6 max-w-lg text-sm leading-7 text-muted">Branches across key trade and logistics hubs support wider international freight forwarding and destination coordination.</p></div>
        <Reveal className="relative min-h-[390px] overflow-hidden rounded-[26px] bg-[#dce9eb]">
          <div className="map-grid absolute inset-0" />
          <div className="absolute left-[8%] right-[8%] top-1/2 h-px rotate-6 bg-ink/20" />
          {network.map((city, index) => {
            const positions = ['left-[10%] top-[28%]', 'left-[30%] top-[65%]', 'left-[48%] top-[40%]', 'left-[64%] top-[68%]', 'left-[77%] top-[32%]', 'left-[89%] top-[58%]']
            return <div key={city} className={'absolute -translate-x-1/2 -translate-y-1/2 ' + positions[index]}><span className="block h-3 w-3 rounded-full border-[3px] border-[#dce9eb] bg-blue shadow-[0_0_0_1px_rgba(17,32,37,.22)]" /><span className="mt-2 block whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.13em]">{city}</span></div>
          })}
          <span className="absolute bottom-4 right-4 text-[8px] uppercase tracking-[0.14em] text-ink/35">Network schematic / not to scale</span>
        </Reveal>
      </div>
    </section>
  )
}

function ReasonSection() {
  const reasons = [
    ['Strategic location', 'Access to one of Asia’s established international trading and logistics hubs.'],
    ['China connectivity', 'Regional capability across major commercial and manufacturing locations.'],
    ['Multiple solutions', 'Air, sea, transport, warehousing, customs and specialized cargo.'],
    ['Local knowledge', 'Operational understanding of movement across Hong Kong and Mainland China.'],
    ['Global network', 'International forwarding capability and destination support.'],
  ]
  return (
    <section className="content-shell pb-24 lg:pb-36">
      <SectionHeading eyebrow="Why Sky Handlers" title="Capability where the route gets complex." />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{reasons.map(([title, text], index) => <Reveal key={title} delay={index * 0.04} className="rounded-[22px] bg-[#f4f4f1] p-6 lg:min-h-[220px]"><span className="eyebrow text-blue">0{index + 1}</span><h3 className="serif-display mt-12 text-3xl tracking-[-0.04em]">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{text}</p></Reveal>)}</div>
    </section>
  )
}

function IndexedList({ eyebrow, title, items }) {
  return (
    <section className="content-shell py-24 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="border-t border-ink/15">{items.map((item, index) => <Reveal key={item} delay={index * 0.025} className="grid grid-cols-[48px_1fr_auto] items-center border-b border-ink/12 py-4"><span className="text-[8px] font-bold tracking-[0.14em] text-blue">{String(index + 1).padStart(2, '0')}</span><span className="text-sm font-semibold">{item}</span><ArrowRight className="h-3.5 w-3.5 text-ink/25" /></Reveal>)}</div>
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
            <p className="eyebrow text-white/60"><span className="text-acid">04</span> / Shipment enquiry</p>
            <h1 className="serif-display mt-8 text-[clamp(4rem,7vw,7rem)] leading-[0.84] tracking-[-0.065em]">Let’s move your cargo.</h1>
            <p className="mt-8 max-w-lg border-l border-acid pl-5 text-base leading-7 text-white/70">Tell us what needs to move, where it is coming from and where it needs to go.</p>
          </Reveal>
          <div className="mt-24 grid gap-7 border-t border-white/15 pt-7 text-xs leading-6 text-white/55 sm:grid-cols-2">
            <div><strong className="eyebrow block text-white">Hong Kong Office</strong><span className="mt-3 block">[Insert Full Hong Kong Office Address]</span></div>
            <div><strong className="eyebrow block text-white">Direct contact</strong><span className="mt-3 block">[Insert Hong Kong Number]<br />[Insert Hong Kong Email]<br />[Insert WhatsApp Number]</span></div>
          </div>
        </div>

        <div className="px-6 py-14 text-ink lg:px-12 lg:py-20">
          <div className="mb-10 flex items-center justify-between border-b border-ink/12 pb-5"><p className="eyebrow text-ink/45">Request a quote</p><MapPin className="h-4 w-4 text-blue" /></div>
          {submitted ? (
            <motion.div initial={{ opacity: 0, transform: 'translateY(12px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} className="flex min-h-[460px] flex-col justify-center">
              <PackageCheck className="h-9 w-9 text-blue" strokeWidth={1.4} />
              <p className="eyebrow mt-7 text-blue">Inquiry received</p>
              <h2 className="serif-display mt-5 max-w-xl text-5xl leading-[0.95] tracking-[-0.05em]">Your shipment details are ready for review.</h2>
              <button type="button" onClick={() => setSubmitted(false)} className="focus-ring mt-9 w-fit border-b border-ink pb-2 text-[9px] font-bold uppercase tracking-[0.14em]">Send another inquiry</button>
            </motion.div>
          ) : <QuoteForm onSubmit={() => setSubmitted(true)} />}
        </div>
      </div>
    </section>
  )
}

function QuoteForm({ onSubmit }) {
  return (
    <form onSubmit={(event) => { event.preventDefault(); onSubmit() }} className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
      <Field id="name" label="Name" required />
      <Field id="company" label="Company name" />
      <Field id="email" label="Email address" type="email" required />
      <Field id="phone" label="Telephone / WhatsApp" />
      <Field id="origin" label="Cargo origin" />
      <Field id="destination" label="Destination" />
      <label className="field sm:col-span-2"><span>Shipment details *</span><textarea id="message" required rows="5" placeholder="Cargo type, dimensions, weight, timing and special handling" /></label>
      <button className="focus-ring touchable mt-2 inline-flex min-h-13 items-center justify-between gap-8 rounded-lg bg-acid px-5 text-[9px] font-bold uppercase tracking-[0.15em] text-ink sm:col-span-2 sm:w-fit">Submit inquiry <ArrowUpRight className="h-4 w-4" /></button>
    </form>
  )
}

function Field({ id, label, type = 'text', required = false }) {
  return <label className="field"><span>{label}{required ? ' *' : ''}</span><input id={id} required={required} type={type} /></label>
}

function SectionHeading({ eyebrow, title, light = false }) {
  return (
    <Reveal>
      <p className={'eyebrow ' + (light ? 'text-white/55' : 'text-ink/45')}>+ {eyebrow}</p>
      <h2 className={'serif-display mt-6 max-w-4xl text-[clamp(2.7rem,5vw,5.2rem)] leading-[0.94] tracking-[-0.055em] ' + (light ? 'text-white' : '')}>{title}</h2>
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

function CTA({ title, text }) {
  return (
    <section className="mx-4 mb-4 overflow-hidden rounded-[28px] bg-blue text-white lg:mx-9 lg:mb-9">
      <div className="mx-auto grid max-w-[1260px] gap-10 px-6 py-20 lg:grid-cols-[1fr_auto] lg:items-end lg:px-10 lg:py-24">
        <Reveal><p className="eyebrow text-white/55">Next movement</p><h2 className="serif-display mt-6 max-w-4xl text-[clamp(3.2rem,5.8vw,6rem)] leading-[0.9] tracking-[-0.06em]">{title}</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-white/70">{text}</p></Reveal>
        <Reveal delay={0.08}><LinkButton href="/contact" light>Start an enquiry</LinkButton></Reveal>
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
        <div><div className="flex items-center gap-3"><span className="brand-mark brand-mark-light">SH</span><strong className="text-[10px] uppercase tracking-[0.16em]">Sky Handlers Logistics Limited</strong></div><p className="serif-display mt-8 max-w-md text-3xl leading-9 tracking-[-0.04em] text-white/85">Your logistics gateway to Hong Kong, China and the world.</p></div>
        <nav><p className="eyebrow text-white/40">Navigation</p><div className="mt-5 grid gap-3 text-xs">{nav.map((item) => <a key={item.href} href={item.href} onClick={go(item.href)} className={path === item.href ? 'text-acid' : 'text-white/50 hover:text-white'}>{item.label}</a>)}</div></nav>
        <div><p className="eyebrow text-white/40">Services</p><p className="mt-5 text-xs leading-7 text-white/48">Air Freight / Sea Freight / China Logistics / Warehousing / Customs Clearance / Dangerous Goods / Cargo Consolidation</p></div>
      </div>
      <div className="flex flex-col justify-between gap-4 pt-7 text-[8px] uppercase tracking-[0.14em] text-white/30 sm:flex-row"><span>© 2026 Sky Handlers Logistics Limited.</span><span>Hong Kong / China / UAE / Central Asia / India / International Network</span></div>
    </footer>
  )
}

export default App
