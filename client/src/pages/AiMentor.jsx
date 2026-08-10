import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  FolderOpen,
  User,
  Cpu,
  Wallet,
  Handshake,
  ClipboardList,
  Star,
  Phone,
  Trophy,
  Monitor,
  ShieldCheck,
  Send,
  Copy,
  Trash2,
} from 'lucide-react'
import usePageMeta from '../hooks/usePageMeta'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const quickActions = [
  { icon: Sparkles, label: 'What services do you offer?', prompt: 'What services do you offer?' },
  { icon: FolderOpen, label: 'Show me your projects', prompt: 'Show me your projects' },
  { icon: User, label: 'About Zhanx Studio', prompt: 'Tell me about Zhanx Studio' },
  { icon: Cpu, label: 'Tech stack', prompt: 'What is your tech stack?' },
  { icon: Wallet, label: 'Pricing & timeline', prompt: 'How much does a website cost and how long does it take?' },
  { icon: Handshake, label: 'How can I hire you?', prompt: 'How can I hire you?' },
  { icon: ClipboardList, label: 'Your process', prompt: 'What is your working process?' },
  { icon: Star, label: 'Client testimonials', prompt: 'Show me client testimonials' },
  { icon: Phone, label: 'Contact details', prompt: 'How can I contact you?' },
  { icon: Trophy, label: 'Why choose Zhanx?', prompt: 'Why should I choose you?' },
  { icon: Monitor, label: 'Is this your portfolio?', prompt: 'Is this your portfolio?' },
  { icon: ShieldCheck, label: 'Support after launch', prompt: 'Do you offer support after launch?' },
]

function classifyIntent(text) {
  const lower = text.toLowerCase()

  if (/birthday|torte|fashion|cake|job.?portal|gedda/.test(lower)) return 'project_detail'
  if (/this site|this portfolio|this website|did you build|made this|built this|who made|this your portfolio/.test(lower)) return 'this_site'
  if (/who.*(for|best)|ideal|good fit|perfect for|small business|startup|freelancer/.test(lower)) return 'ideal_client'
  if (/why|what makes|different|stand.?out|best|worth|reasons? to|benefit|advantage|choose/.test(lower)) return 'why'
  if (/experience|years|how long.*(build|develop|coding)|seasoned|background|worked on/.test(lower)) return 'experience'
  if (/support|maintenance|maintain|update|after launch|post.?launch|fix|bug|help after/.test(lower)) return 'support'
  if (/seo|google|rank|ranking|performance|speed|lighthouse|load fast|fast site/.test(lower)) return 'seo'
  if (/redesign|revamp|rebuild|redo|existing site|old website|moderni[sz]e/.test(lower)) return 'redesign'
  if (/skill|expert|proficien|capab|speciali[sz]|know how/.test(lower)) return 'skills'
  if (/faq|common question|frequent/.test(lower)) return 'faq'
  if (/project|portfolio|work|showcase|live|demo|website(s)? you/.test(lower)) return 'projects'
  if (/tech.?stack|stack|language|framework|tools|react|node|mongodb|mern|tailwind|gsap/.test(lower)) return 'stack'
  if (/pric|cost|budget|charge|rate|quote|fee|how much/.test(lower)) return 'pricing'
  if (/timeline|duration|how long|time.*take|deliver/.test(lower)) return 'timeline'
  if (/hire|freelance|contract|job|career|work with|employ|vacanc|role/.test(lower)) return 'contact'
  if (/contact|email|phone|call|reach|message|whatsapp|connect/.test(lower)) return 'contact'
  if (/who|about|tamilan|zhanx|developer|designer|you\?$|tell me about/.test(lower)) return 'about'
  if (/process|how (do|does).*work|steps|start a project|begin/.test(lower)) return 'process'
  if (/testimonial|review|client|feedback|rating|what people/.test(lower)) return 'testimonials'
  if (/availab|status|open|busy|taking/.test(lower)) return 'availability'
  if (/web.?dev|application|app|develop/.test(lower)) return 'webdev'
  if (/e.?commerce|store|shop|payment|stripe|cart/.test(lower)) return 'ecommerce'
  if (/landing|lead|conversi/.test(lower)) return 'landing'
  if (/portfolio design|personal website/.test(lower)) return 'portfolio'
  if (/scroll|animat|motion|gsap|effect/.test(lower)) return 'scroll'
  if (/video|edit|cut|reel/.test(lower)) return 'video'
  if (/service|offer|what.*do|help with/.test(lower)) return 'services'
  if (/^(hi|hello|hey|yo|greetings|good (morning|afternoon|evening)|wassup|sup)\b/.test(lower)) return 'greeting'
  if (/thank|thanks|thx|great|awesome|perfect|good job|nice/.test(lower)) return 'thanks'
  return 'default'
}

const PORTFOLIO = {
  brand: 'Zhanx Studio',
  role: 'Full-Stack Developer & UI/UX Designer',
  email: 'zhanxstudio@gmail.com',
  location: 'India (IST · GMT+5:30)',
  availability: 'Open to freelance projects and full-time roles',
  response: 'within 24 hours',
  stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
  process: [
    { num: '01', title: 'Discover', desc: 'We map your goals, audience, and requirements into a clear project blueprint.' },
    { num: '02', title: 'Design', desc: 'Wireframes and high-fidelity UI with your brand at the center — no generic templates.' },
    { num: '03', title: 'Develop', desc: 'Clean, scalable code with modern frameworks and performance budgets from day one.' },
    { num: '04', title: 'Deploy', desc: 'Production rollout with CI/CD, monitoring, and post-launch support.' },
  ],
  services: [
    { title: 'Web Development', desc: 'Custom web applications built with modern frameworks — fast, scalable, and production-ready.', duration: '2–4 wks' },
    { title: 'Portfolio Designs', desc: 'Professional portfolio websites that showcase your work with stunning design and smooth animations.', duration: '1–2 wks' },
    { title: 'Scroll Animation Websites', desc: 'Engaging scroll-triggered animations that bring your content to life and captivate visitors.', duration: '1–2 wks' },
    { title: 'E-Commerce', desc: 'Full-featured online stores with secure payments, product management, and seamless checkout.', duration: '3–5 wks' },
    { title: 'Landing Pages', desc: 'High-converting landing pages designed to capture leads and drive engagement.', duration: '3–5 days' },
    { title: 'Video Editing', desc: 'Professional video editing services — cuts, transitions, effects, and color grading.', duration: 'Per project' },
  ],
  projects: [
    { title: 'Birthday Special', label: 'React', tech: 'React · Tailwind · Framer Motion', url: 'https://birthday-specialonee.netlify.app', desc: 'A personal birthday celebration site with smooth animations and a unique gift experience.' },
    { title: 'Lively Torte', label: 'UI Design', tech: 'React · UI/UX · Animation', url: 'https://lively-torte-a4e687.netlify.app', desc: 'A dessert brand showcase with clean UI and delightful motion design.' },
    { title: 'Zhanx Fashion', label: 'E-Commerce', tech: 'React · Node · Stripe', url: 'https://tamilan-fashion.netlify.app', desc: 'A full fashion e-commerce store with cart, checkout, and Stripe payments.' },
    { title: 'Zhanx Job Portal', label: 'Full Stack', tech: 'MERN · REST API · Auth', url: 'https://tamilan-jobportal.netlify.app', desc: 'A complete job portal — job listings, applications, and user auth built on the MERN stack.' },
    { title: 'Zhanx Gedda', label: 'Landing Page', tech: 'React · Vite · GSAP', url: 'https://gedda.netlify.app', desc: 'A high-energy landing page powered by GSAP scroll animations.' },
    { title: 'Zhanx Cake Shop', label: 'Bakery Site', tech: 'React · Node · CMS', url: 'https://cake-shop-me.netlify.app', desc: 'A bakery website with an admin CMS for managing menu and orders.' },
  ],
  testimonials: [
    { quote: 'It was great working with the Zhanx Studio team. Communication was clear, feedback was helpful, and the entire process went smoothly.', name: 'Moovendhan', company: 'KMS Deccors' },
    { quote: 'The portfolio website Zhanx Studio built exceeded my expectations. Attention to detail and smooth animations really made it stand out.', name: 'Sathish', company: 'Freelance Designer' },
    { quote: 'Professional, creative, and delivered on time. The Zhanx Studio team understood exactly what I needed and brought it to life perfectly.', name: 'Vignesh', company: 'Tech Ventures' },
  ],
  skills: {
    frontend: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Responsive mobile-first UI'],
    backend: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'JWT Authentication'],
    design: ['UI/UX Design', 'Figma prototyping', 'Design systems', 'Typography', 'Color grading'],
    tools: ['Git/GitHub', 'Stripe payments', 'Netlify', 'Vercel', 'CI/CD'],
  },
  experience: {
    years: '3+ years of hands-on development',
    focus: 'Web apps, portfolio sites, e-commerce stores, landing pages and scroll-animation experiences',
    scale: 'From one-page landing sites to full-stack MERN applications',
  },
  faqs: [
    { q: 'Do you work with clients worldwide?', a: 'Yes — remote friendly, clear communication, timezone aware.' },
    { q: 'Do you provide support after launch?', a: 'Absolutely. Every project ships with a support window and maintenance plans.' },
    { q: 'Can you redesign my existing website?', a: 'Yes — old sites get a modern, fast, animated upgrade while keeping your content and SEO.' },
    { q: 'What do you need from me to start?', a: 'Just your idea, goals, and any brand assets. I handle the rest from design to deployment.' },
    { q: 'Do you write the content too?', a: 'I structure and polish copy for maximum impact, and you approve everything before launch.' },
  ],
}

function projectByKeyword(text) {
  const lower = text.toLowerCase()
  if (/birthday/.test(lower)) return PORTFOLIO.projects[0]
  if (/torte/.test(lower)) return PORTFOLIO.projects[1]
  if (/fashion/.test(lower)) return PORTFOLIO.projects[2]
  if (/job.?portal/.test(lower)) return PORTFOLIO.projects[3]
  if (/gedda/.test(lower)) return PORTFOLIO.projects[4]
  if (/cake/.test(lower)) return PORTFOLIO.projects[5]
  return null
}

function generateDynamicResponse(userText, intent) {
  switch (intent) {
    case 'greeting':
      return `Hey there! 👋 Welcome to ${PORTFOLIO.brand}. I'm your portfolio assistant — ask me about services, projects, pricing, or how to work together.`
    case 'thanks':
      return `You're very welcome! 😊 Anything else you'd like to know about ${PORTFOLIO.brand}?`
    case 'services': {
      const list = PORTFOLIO.services.map((s, i) => `${i + 1}. **${s.title}** — ${s.desc} (${s.duration})`).join('\n')
      return `**Here's what ${PORTFOLIO.brand} offers** ✨\n\n${list}\n\nWant a detailed quote for one of these? Ask about pricing or use the contact form!`
    }
    case 'webdev':
      return `**Web Development** 💻\n\nCustom web applications built with modern frameworks — fast, scalable, and production-ready.\n\n- **Tech:** ${PORTFOLIO.stack.join(', ')}\n- **Timeline:** 2–4 weeks\n- **Examples:** ${PORTFOLIO.projects[3].title} (job portal) and the live customer app.\n\nWant me to build something like this for you? Let's talk about your idea!`
    case 'ecommerce':
      return `**E-Commerce Development** 🛒\n\nFull-featured online stores with secure payments, product management, and seamless checkout.\n\n- **Example:** ${PORTFOLIO.projects[2].title} — ${PORTFOLIO.projects[2].desc}\n- **Stack:** ${PORTFOLIO.projects[2].tech}\n- **Timeline:** 3–5 weeks\n\nReady to launch your own store? Let's get started!`
    case 'landing':
      return `**Landing Pages** 🚀\n\nHigh-converting landing pages designed to capture leads and drive engagement.\n\n- **Timeline:** 3–5 days\n- **Example:** ${PORTFOLIO.projects[4].title} — ${PORTFOLIO.projects[4].desc}\n- **Stack:** ${PORTFOLIO.projects[4].tech}\n\nIdeal for product launches, campaigns, and lead generation. Want to see a live demo?`
    case 'portfolio':
      return `**Portfolio Designs** 🎨\n\nProfessional portfolio websites that showcase your work with stunning design and smooth animations.\n\n- **Timeline:** 1–2 weeks\n- **Examples:** ${PORTFOLIO.projects[1].title} and ${PORTFOLIO.projects[0].title}\n\nThis very site is a ${PORTFOLIO.brand} portfolio — want yours to look this good?`
    case 'scroll':
      return `**Scroll Animation Websites** ✨\n\nEngaging scroll-triggered animations that bring your content to life and captivate visitors.\n\n- **Tech:** Framer Motion + GSAP\n- **Timeline:** 1–2 weeks\n- **Example:** ${PORTFOLIO.projects[4].title} — ${PORTFOLIO.projects[4].url}\n\nFeel the difference on this portfolio — every section animates as you scroll. Let's make yours unforgettable!`
    case 'video':
      return `**Video Editing** 🎬\n\nProfessional video editing services — cuts, transitions, effects, and color grading.\n\n- **Timeline:** Per project\n- **Pricing:** Custom-quoted based on length and complexity\n\nSend over your footage and I'll craft a polished final cut!`
    case 'projects': {
      const list = PORTFOLIO.projects.map((p, i) => `${i + 1}. **${p.title}** — ${p.tech}\n   🔗 ${p.url}`).join('\n')
      return `**Here are some projects by ${PORTFOLIO.brand}** 🚀\n\n${list}\n\nWant details on any of these? Just ask!`
    }
    case 'project_detail': {
      const p = projectByKeyword(userText)
      if (p) return `**${p.title}**\n\n${p.desc}\n\n- **Stack:** ${p.tech}\n- **Live:** ${p.url}\n\nWant something like this built for you? Let's chat!`
      return `Here are some of my featured projects:\n\n${PORTFOLIO.projects.map((p, i) => `${i + 1}. **${p.title}** — ${p.tech} — ${p.url}`).join('\n')}\n\nWhich one would you like to know more about?`
    }
    case 'stack':
      return `**Tech Stack** 🛠️\n\n- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, GSAP\n- **Backend:** Node.js, Express, MongoDB\n- **Payments:** Stripe\n- **Tooling:** Git/GitHub, Netlify, Vercel, CI/CD\n\nI build fast, modern, and maintainable applications with this stack.`
    case 'pricing':
      return `**Pricing & Timeline** 💰\n\nPricing is custom-quoted per project based on scope and complexity.\n\n- **Landing Pages:** from 3–5 days\n- **Portfolio / Animation Sites:** 1–2 weeks\n- **Web Apps & E-Commerce:** 2–5 weeks\n\nTypical schedule: deposit before work starts, balance on completion. Want an exact quote? Share your idea via the contact form or ask for my email!`
    case 'timeline':
      return `**Typical Timelines** ⏱️\n\n- **Landing Pages:** 3–5 days\n- **Portfolio Designs:** 1–2 weeks\n- **Scroll Animation Websites:** 1–2 weeks\n- **Web Development:** 2–4 weeks\n- **E-Commerce:** 3–5 weeks\n\nEvery project follows a clear ${PORTFOLIO.process.length}-step process so you always know what's happening and when.`
    case 'process': {
      const steps = PORTFOLIO.process.map(s => `${s.num}. **${s.title}** — ${s.desc}`).join('\n')
      return `**My Working Process** 🧭\n\n${steps}\n\nTo start: just your idea, goals, and any brand assets. I handle the rest from design to deployment.`
    }
    case 'testimonials': {
      const list = PORTFOLIO.testimonials.map(t => `- **${t.name}** (${t.company}) — "${t.quote}"`).join('\n')
      return `**What Clients Say** ⭐\n\n${list}\n\nWant to become the next one? Let's build something together — the contact form is one click away!`
    }
    case 'about':
      return `**About ${PORTFOLIO.brand}** ✨\n\n- **Brand:** ${PORTFOLIO.brand}\n- **Role:** ${PORTFOLIO.role}\n- **Based in:** ${PORTFOLIO.location}\n- **Experience:** ${PORTFOLIO.experience.years}\n- **Focus:** ${PORTFOLIO.experience.focus}\n\n${PORTFOLIO.experience.scale}.\n\n🟢 ${PORTFOLIO.availability}.\n\n- **Response time:** ${PORTFOLIO.response}\n\nAsk me about services, projects, or pricing!`
    case 'availability':
      return `**Availability** 🟢\n\n${PORTFOLIO.availability}.\n\n- **Response time:** ${PORTFOLIO.response}\n- **Email:** ${PORTFOLIO.email}\n\nGrab a slot while it's open — good projects get booked fast!`
    case 'contact':
      return `**Let's Connect!** 📬\n\n- 📧 **Email:** ${PORTFOLIO.email}\n- 📍 **Location:** ${PORTFOLIO.location}\n\nUse the **Contact form** on this site — I respond ${PORTFOLIO.response}. Ready to start? Tell me about your project!`
    case 'experience':
      return `**Experience** 📈\n\n${PORTFOLIO.experience.years} — building products people actually use.\n\n${PORTFOLIO.experience.focus}.\n\n${PORTFOLIO.experience.scale}.\n\nCheck out the **Projects** tab for live examples, or ask me anything about a specific build!`
    case 'skills':
      return `**Skills & Expertise** 💪\n\n- **Frontend:** ${PORTFOLIO.skills.frontend.join(', ')}\n- **Backend:** ${PORTFOLIO.skills.backend.join(', ')}\n- **Design:** ${PORTFOLIO.skills.design.join(', ')}\n- **Tools:** ${PORTFOLIO.skills.tools.join(', ')}\n\nI turn ideas into polished, performant products.`
    case 'why':
      return `**Why ${PORTFOLIO.brand}?** 🏆\n\n- **Design + Code:** Every project looks stunning AND performs beautifully\n- **Modern Stack:** ${PORTFOLIO.stack.slice(0, 4).join(', ')} + more\n- **Performance First:** fast, optimized builds\n- **Clear Process:** design, develop, deploy — no surprises\n- **Ongoing Support:** every project ships with support after launch\n\nCheck the testimonials — happy clients say it best!`
    case 'support':
      return `**Support After Launch** 🛡️\n\nAbsolutely. Every project ships with a support window and maintenance plans.\n\n- Bug fixes and updates\n- Performance monitoring\n- Content management help\n\nHave an issue? Reach out — I've got you covered.`
    case 'seo':
      return `**SEO & Performance** 📈\n\nEvery build is performance-first:\n\n- Fast load times and high Lighthouse scores\n- Clean, semantic markup\n- Mobile-first responsive design\n\nA fast, well-structured site ranks better — and converts better too.`
    case 'redesign':
      return `**Website Redesign** 🔄\n\nYes — old sites get a modern, fast, animated upgrade while keeping your content and SEO.\n\n- **Portfolio redesign:** 1–2 weeks\n- **Full site revamp:** 2–4 weeks\n\nSend me your current site and goals — I'll show you the difference!`
    case 'this_site':
      return `Yes — this very portfolio was built by ${PORTFOLIO.brand}. 😎\n\nIt's a Vite + React + Tailwind build with Framer Motion and GSAP animations, Lenis smooth scrolling, and a custom AI mentor (that's me!).\n\nWant yours like this? Just ask!`
    case 'ideal_client':
      return `**Who ${PORTFOLIO.brand} is a great fit for:**\n\n- Small businesses & startups needing a strong web presence\n- Professionals wanting a standout portfolio\n- Brands that need e-commerce or landing pages\n- Anyone who values design + performance + clear communication\n\nRemote friendly and timezone aware — I work with clients worldwide! 🌍`
    case 'faq': {
      const list = PORTFOLIO.faqs.map(f => `- **${f.q}** — ${f.a}`).join('\n')
      return `**Common Questions** 💬\n\n${list}\n\nAnything else? Just ask!`
    }
    default:
      return `I can help you with:\n\n- What services ${PORTFOLIO.brand} offers\n- Projects & live demos\n- Tech stack\n- Pricing & timelines\n- The working process\n- Contact details\n\nWhat would you like to know? 😊`
  }
}

function formatResponse(text) {
  const parts = []
  const lines = text.split('\n')
  let inCodeBlock = false
  let codeContent = ''
  let codeLang = ''

  for (const line of lines) {
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        parts.push({ type: 'code', lang: codeLang, content: codeContent.replace(/\n+$/, '') })
        codeContent = ''
        codeLang = ''
        inCodeBlock = false
      } else {
        inCodeBlock = true
        codeLang = line.slice(3).trim()
      }
      continue
    }
    if (inCodeBlock) { codeContent += line + '\n'; continue }

    if (line.startsWith('### ')) parts.push({ type: 'heading', content: line.slice(4) })
    else if (line.startsWith('**') && line.endsWith('**')) parts.push({ type: 'bold', content: line.slice(2, -2) })
    else if (line.startsWith('- **') && line.includes('**')) {
      const rest = line.slice(4)
      const boldEnd = rest.indexOf('**')
      parts.push({ type: 'listItem', bold: rest.slice(0, boldEnd), rest: rest.slice(boldEnd + 2).replace(/^ — /, '').trim() })
    }
    else if (line.startsWith('- ')) parts.push({ type: 'listItemSimple', content: line.slice(2) })
    else if (line.startsWith('> ')) parts.push({ type: 'quote', content: line.slice(2) })
    else if (/^\d+\./.test(line)) parts.push({ type: 'orderedItem', content: line.replace(/^\d+\.\s*/, '') })
    else if (line.startsWith('|')) parts.push({ type: 'tableRow', content: line })
    else if (line.trim() === '') { if (parts.length > 0 && parts[parts.length - 1].type !== 'spacer') parts.push({ type: 'spacer' }) }
    else {
      const withInlineBold = line.replace(/\*\*(.+?)\*\*/g, (_, b) => `\x01${b}\x02`)
      parts.push({ type: 'text', content: withInlineBold })
    }
  }
  if (inCodeBlock && codeContent) parts.push({ type: 'code', lang: codeLang, content: codeContent.replace(/\n+$/, '') })
  if (parts.length > 0 && parts[parts.length - 1].type === 'spacer') parts.pop()
  return parts
}

function renderInline(text) {
  const segments = text.split(/(\x01[^\x02]+\x02)/g)
  return segments.map((seg, i) => {
    if (seg.startsWith('\x01') && seg.endsWith('\x02')) return <strong key={i} className="font-bold text-[--foreground]">{seg.slice(1, -1)}</strong>
    return <span key={i}>{seg}</span>
  })
}

function CopyIcon({ size = 12 }) {
  return <Copy size={size} strokeWidth={2} />
}

function MessageContent({ parts }) {
  return (
    <div className="space-y-2">
      {parts.map((part, i) => {
        switch (part.type) {
          case 'heading': return <h3 key={i} className="text-sm font-bold font-display text-[--gold] mt-3 first:mt-0">{part.content}</h3>
          case 'bold': return <p key={i} className="text-sm font-bold text-[--foreground]">{part.content}</p>
          case 'text': return <p key={i} className="text-sm text-[--foreground]/90 leading-relaxed">{renderInline(part.content)}</p>
          case 'listItem': return <div key={i} className="flex items-start gap-2 text-sm text-[--foreground]/90"><span className="text-[--gold] mt-0.5 flex-shrink-0">•</span><span><strong className="text-[--foreground]">{part.bold}</strong>{part.rest ? <span className="text-[--foreground]/80"> — {part.rest}</span> : null}</span></div>
          case 'listItemSimple': return <div key={i} className="flex items-start gap-2 text-sm text-[--foreground]/90"><span className="text-[--gold] mt-0.5 flex-shrink-0">•</span><span>{part.content}</span></div>
          case 'orderedItem': return <div key={i} className="flex items-start gap-2 text-sm text-[--foreground]/90"><span className="text-[--gold] mt-0.5 flex-shrink-0 font-mono text-xs">{i + 1}.</span><span>{part.content}</span></div>
          case 'quote': return <div key={i} className="border-l-2 border-[rgba(201,168,76,0.4)] pl-3 py-1 text-sm text-[--foreground]/70 italic">{part.content}</div>
          case 'tableRow':
            if (part.content.startsWith('|---')) return null
            const cells = part.content.split('|').filter(c => c.trim()).map(c => c.trim())
            return <div key={i} className="grid grid-cols-3 gap-2 text-[11px] font-mono text-[--foreground]/80 border-b border-[--border] py-1">{cells.map((c, j) => <span key={j}>{c}</span>)}</div>
          case 'code': return (
            <div key={i} className="rounded-xl overflow-hidden border border-[--border] my-2 bg-black/60">
              {part.lang && (
                <div className="px-4 py-1.5 bg-[--background]/60 border-b border-[--border] flex items-center justify-between">
                  <span className="text-[9px] font-mono text-[--gold] uppercase tracking-wider">{part.lang}</span>
                  <button onClick={() => navigator.clipboard.writeText(part.content)} className="text-[9px] font-mono text-[--muted-foreground] hover:text-[--gold] transition-colors cursor-pointer flex items-center gap-1">
                    <CopyIcon />Copy
                  </button>
                </div>
              )}
              <pre className="p-4 text-[12px] font-mono text-[--foreground]/90 leading-relaxed overflow-x-auto"><code>{part.content}</code></pre>
            </div>
          )
          case 'spacer': return <div key={i} className="h-2" />
          default: return null
        }
      })}
    </div>
  )
}

function TypingIndicator() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-start gap-3 max-w-[92%]">
      <div className="w-9 h-9 rounded-full border border-[rgba(201,168,76,0.4)] bg-[rgba(201,168,76,0.1)] flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(201,168,76,0.15)]">
        <span className="text-[9px] font-bold text-[--gold] font-mono">AI</span>
      </div>
      <div className="rounded-2xl rounded-tl-sm px-5 py-4 border border-[--border] bg-[--card]/60 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[--gold-bright] to-[rgba(201,168,76,0.1)]" />
        <div className="flex items-center gap-2"><span className="text-[10px] font-bold text-[--gold] font-mono uppercase tracking-widest">AI Mentor ▸ Processing</span><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /></div>
        <div className="flex items-center gap-1.5 mt-3">{[0, 1, 2].map(i => <motion.span key={i} className="w-2 h-2 rounded-full bg-[--gold]/70" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }} />)}</div>
      </div>
    </motion.div>
  )
}

function SuggestedFollowUps({ suggestions, onSelect }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-2 mt-3">
      {suggestions.map((s, i) => (
        <button key={i} onClick={() => onSelect(s)} className="text-[10px] font-mono px-3 py-1.5 rounded-full border border-[--border] text-[--muted-foreground] hover:border-[rgba(201,168,76,0.4)] hover:text-[--gold] transition-all cursor-pointer bg-[--card]/50 hover:bg-[--card]">{s}</button>
      ))}
    </motion.div>
  )
}

function getFollowUps(intent) {
  const base = ['What services do you offer?', 'Show me your projects', 'How much does a website cost?']
  const map = {
    services: ['Tell me about e-commerce', 'Show me your projects', 'How much does it cost?'],
    webdev: ['Show me a web app example', 'How much for a web app?', 'What is your tech stack?'],
    skills: ['Show me your projects', 'What is your tech stack?', 'About Zhanx Studio'],
    experience: ['Show me your projects', 'What is your tech stack?', 'How do I hire you?'],
    why: ['Show me your projects', 'How do I start a project?', 'Contact details'],
    support: ['Show me your process', 'Contact details', 'What is your tech stack?'],
    seo: ['What is your tech stack?', 'Show me your projects', 'How much does it cost?'],
    redesign: ['Show me a portfolio example', 'How much for a redesign?', 'Contact details'],
    this_site: ['What is your tech stack?', 'What services do you offer?', 'Show me your projects'],
    faq: ['What services do you offer?', 'Show me your projects', 'How do I hire you?'],
    ideal_client: ['What services do you offer?', 'Show me your projects', 'How do I hire you?'],
    ecommerce: ['Show me the Zhanx Fashion store', 'How much for e-commerce?', 'How do I hire you?'],
    portfolio: ['Show me portfolio examples', 'How much for a portfolio?', 'Can you animate my site?'],
    scroll: ['Show me an animated site', 'How much for scroll animations?', 'What is your tech stack?'],
    landing: ['Show me a landing page example', 'How much for a landing page?', 'Contact details'],
    video: ['Video editing pricing', 'How do I contact you?', 'What else do you offer?'],
    projects: ['Tell me about Zhanx Fashion', 'About the Job Portal', 'What is your tech stack?'],
    project_detail: ['Show me more projects', 'How much to build something similar?', 'How do I hire you?'],
    stack: ['Show me projects built with this', 'What services do you offer?', 'About Zhanx Studio'],
    pricing: ['Get an exact quote', 'Show me projects', 'How do I contact you?'],
    timeline: ['Show me your process', 'How much does it cost?', 'Contact details'],
    process: ['How do I start a project?', 'Contact details', 'Show me projects'],
    testimonials: ['Show me projects', 'How do I hire you?', 'Contact details'],
    about: ['Show me your projects', 'What services do you offer?', 'How do I hire you?'],
    availability: ['How do I contact you?', 'Show me your services', 'Show me projects'],
    contact: ['What services do you offer?', 'Show me projects', 'About Zhanx Studio'],
    greeting: ['What services do you offer?', 'Show me projects', 'About Zhanx Studio'],
    thanks: ['Show me your projects', 'How much does it cost?', 'How do I hire you?'],
    default: ['What services do you offer?', 'Show me projects', 'How much does it cost?'],
  }
  return (map[intent] || base).slice(0, 3)
}

export default function AiMentor() {
  usePageMeta({
    title: 'AI Mentor',
    description: 'Chat with the Zhanx Studio AI mentor — get answers about services, projects, skills and availability.',
  })
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [typingParts, setTypingParts] = useState([])
  const [typingIndex, setTypingIndex] = useState(0)
  const [currentIntent, setCurrentIntent] = useState('default')
  const [clockTime, setClockTime] = useState('')
  const [telemetryLogs, setTelemetryLogs] = useState([
    '> Establishing AI tunnel...',
    '> Neural core key exchange: OK',
    '> Portfolio knowledge base loaded.',
    '> Mentor node ZX-AI-77 online.',
  ])
  const chatEndRef = useRef(null)
  const chatScrollRef = useRef(null)
  const stickToBottom = useRef(true)
  const historyRef = useRef([])

  useEffect(() => { historyRef.current = messages }, [messages])

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }
      setClockTime(new Date().toLocaleTimeString('en-US', options))
    }
    updateTime()
    const clockInterval = setInterval(updateTime, 1000)
    return () => clearInterval(clockInterval)
  }, [])

  useEffect(() => {
    const saved = sessionStorage.getItem('zhanx_ai_mentor')
    if (saved) { try { const p = JSON.parse(saved); if (p.length > 0) { setMessages(p); return } } catch {} }
  }, [])

  useEffect(() => { if (messages.length > 0) sessionStorage.setItem('zhanx_ai_mentor', JSON.stringify(messages)) }, [messages])

  useEffect(() => {
    const el = chatScrollRef.current
    if (el && stickToBottom.current) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
    }
  }, [messages, typingParts, typingIndex])

  useEffect(() => {
    if (typingParts.length > 0 && typingIndex < typingParts.length) {
      const timer = setTimeout(() => setTypingIndex(p => p + 1), 25 + Math.random() * 35)
      return () => clearTimeout(timer)
    } else if (typingParts.length > 0 && typingIndex >= typingParts.length) {
      setMessages(p => [...p, { role: 'ai', parts: typingParts, intent: currentIntent }])
      setTypingParts([])
      setTypingIndex(0)
      setIsTyping(false)
    }
  }, [typingParts, typingIndex, currentIntent])

  const generateResponse = useCallback(async (userText) => {
    const intent = classifyIntent(userText)
    setCurrentIntent(intent)
    setIsTyping(true)
    setTypingParts([])
    setTypingIndex(0)
    setTelemetryLogs(prev => [
      ...prev.slice(-4),
      `> Query parsed → intent: ${intent.toUpperCase()}`,
      '> Routing to GROQ inference node...',
    ])

    const history = [
      ...historyRef.current.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.role === 'user'
          ? m.content
          : (m.parts || []).map(p => p.content || '').join('\n'),
      })),
      { role: 'user', content: userText },
    ]

    try {
      const res = await fetch(`${API_URL}/api/mentor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || 'Mentor unavailable')

      setTypingParts(formatResponse(data.content))
      setTypingIndex(0)
      setTelemetryLogs(prev => [...prev.slice(-4), '> Response streamed from GROQ ✔'])
    } catch {
      const responseText = generateDynamicResponse(userText, intent)
      setTypingParts(formatResponse(responseText))
      setTypingIndex(0)
      setTelemetryLogs(prev => [...prev.slice(-4), '> Fallback: local knowledge base used.'])
    }
  }, [])

  const sendMessage = useCallback((text) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return
    stickToBottom.current = true
    setMessages(p => [...p, { role: 'user', content: trimmed }])
    setInput('')
    generateResponse(trimmed)
  }, [isTyping, generateResponse])

  const handleFollowUp = useCallback((text) => {
    stickToBottom.current = true
    setMessages(p => [...p, { role: 'user', content: text }])
    generateResponse(text)
  }, [generateResponse])

  const handleChatScroll = () => {
    const el = chatScrollRef.current
    if (!el) return
    stickToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 120
  }

  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) } }
  const clearChat = () => {
    setMessages([])
    setTypingParts([])
    setTypingIndex(0)
    setIsTyping(false)
    sessionStorage.removeItem('zhanx_ai_mentor')
  }

  return (
    <main className="relative min-h-screen pt-20 bg-[--background] text-[--foreground] overflow-hidden">
      <div className="absolute inset-0 diagonal-lines opacity-[0.06] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.06)_0%,transparent_60%)] pointer-events-none" />
      <motion.span className="absolute top-28 left-[8%] w-2 h-2 rounded-full bg-[--gold] shadow-[0_0_12px_rgba(201,168,76,0.8)] pointer-events-none" animate={{ y: [0, 26, 0], opacity: [0.3, 1, 0.3] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.span className="absolute top-44 right-[6%] w-1.5 h-1.5 rounded-full bg-[--gold] shadow-[0_0_10px_rgba(201,168,76,0.8)] pointer-events-none" animate={{ y: [0, -22, 0], opacity: [1, 0.3, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.span className="absolute bottom-32 left-[15%] w-1.5 h-1.5 rounded-full bg-[--gold] shadow-[0_0_10px_rgba(201,168,76,0.8)] pointer-events-none" animate={{ y: [0, 18, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 pt-8 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start min-h-[calc(100vh-80px)]">
        {/* LEFT COLUMN: Node Telemetry Stream */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-4 space-y-6 order-2 lg:order-none flex flex-col">
          <motion.div variants={itemVariants} className="p-6 rounded-[24px] border border-[--border] bg-[--card]/60 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[rgba(201,168,76,0.15)] via-[--gold] to-[rgba(201,168,76,0.15)]" />
            <div className="flex justify-between items-center border-b border-[--border] pb-3 mb-4">
              <span className="text-[10px] font-mono text-[--gold] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                AI Mentor Telemetry
              </span>
              <span className="text-[9px] font-mono text-[--muted-foreground]">Core: ZX-MNT-77</span>
            </div>

            <div className="bg-black/90 rounded-xl p-4 font-mono text-[11px] text-green-400 min-h-[170px] flex flex-col justify-between overflow-hidden shadow-inner border border-[--border]">
              <div className="space-y-1.5">
                {telemetryLogs.map((log, idx) => (
                  <p key={idx} className={log.includes('✔') ? 'text-green-400' : log.includes('intent') ? 'text-yellow-500' : 'text-green-400'}>
                    {log}
                  </p>
                ))}
                {isTyping && <p className="text-yellow-500 animate-pulse">&gt; Mentor processing query...</p>}
              </div>
            </div>

            <button
              onClick={() => setTelemetryLogs(prev => [
                ...prev.slice(-4),
                '> Handshake initiated → ZX-AI-77',
                '> Key exchange: RSA-4096 OK',
                '> Tunnel: CLIENT ⇄ ZHANX-GATEWAY ✔',
              ])}
              className="w-full mt-4 py-3 rounded-xl border border-[--gold]/30 text-[--gold] hover:bg-[--gold] hover:text-[--background] font-bold font-mono text-[11px] uppercase transition-all tracking-wider cursor-pointer bg-transparent"
            >
              Trigger Handshake Test
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="p-6 rounded-[24px] border border-[--border] bg-[--card]/30">
            <h5 className="text-[11px] font-mono text-[--gold] font-bold uppercase tracking-wider mb-2">Operational Hubs</h5>
            <div className="text-xs text-[--muted-foreground] space-y-1 font-mono">
              <p>📍 India Hub: 12.1211° N (Active)</p>
              <p>📍 London HQ: 51.5074° W (Bridge)</p>
              <p>📍 Singapore Hub: 1.3521° E (Edge Routing)</p>
            </div>
          </motion.div>
        </motion.div>

        {/* CENTER COLUMN: AI Mentor Chat */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-5 flex flex-col min-w-0 order-1 lg:order-none">
          <motion.div variants={itemVariants} className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-mono text-[--gold] font-bold tracking-[0.3em] uppercase mb-3 block">
                // Zhanx Studio · Knowledge Interface
              </span>
              <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight leading-none uppercase">
                AI <span className="text-[--gold]">Mentor</span>
              </h1>
              <span className="block mt-3 h-px w-16 bg-gradient-to-r from-[--gold-bright] to-transparent" />
            </div>
            <div className="flex items-center gap-3 pb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                <span className="text-[10px] font-mono text-green-400 font-bold tracking-wider">ONLINE</span>
              </div>
              <button onClick={clearChat} className="rounded-xl px-3 py-2 flex items-center gap-1.5 border border-[--border] bg-[--card]/40 hover:border-[rgba(201,168,76,0.3)] transition-all cursor-pointer group" title="Clear chat">
                <Trash2 size={13} strokeWidth={1.8} className="text-[--muted-foreground] group-hover:text-[--gold] transition-colors" />
                <span className="text-[10px] font-mono text-[--muted-foreground] group-hover:text-[--gold] transition-colors uppercase tracking-wider hidden sm:inline">Clear</span>
              </button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-[24px] border border-[--border] bg-[--card]/40 backdrop-blur-md overflow-hidden flex flex-col">
            <div ref={chatScrollRef} onScroll={handleChatScroll} data-lenis-prevent className="h-[46vh] lg:h-[54vh] overflow-y-auto px-5 md:px-7 py-6 space-y-4" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(201,168,76,0.2) transparent' }}>
              {messages.length === 0 && typingParts.length === 0 ? (
                <div className="flex flex-col justify-center h-full">
                  <div className="mb-4">
                    <span className="text-[10px] font-mono text-[--muted-foreground] tracking-widest uppercase block mb-1">Session Ready</span>
                    <p className="text-sm text-[--muted-foreground] font-light max-w-md">Ask me anything about Zhanx Studio — services, projects, pricing, process and more. Pick a module below or type your own question.</p>
                  </div>
                  <div>
                    {quickActions.map((action) => (
                      <button
                        key={action.label}
                        onClick={() => sendMessage(action.prompt)}
                        className="group flex items-center justify-between w-full gap-4 text-left py-3 border-b border-[--border]/70 last:border-b-0 hover:border-[rgba(201,168,76,0.4)] transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-4 min-w-0">
                          <span className="w-10 h-10 rounded-full border border-[--border] bg-[--card]/60 flex items-center justify-center group-hover:border-[rgba(201,168,76,0.5)] group-hover:bg-[rgba(201,168,76,0.1)] transition-all flex-shrink-0">
                            <action.icon size={17} strokeWidth={1.8} className="text-[--gold]" />
                          </span>
                          <span className="font-display text-base md:text-xl font-extrabold tracking-tight uppercase group-hover:text-[--gold] transition-colors truncate">{action.label}</span>
                        </span>
                        <span className="text-[--gold] text-sm group-hover:translate-x-1 transition-transform flex-shrink-0">▸</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <AnimatePresence mode="popLayout">
                    {messages.map((msg, i) => (
                      msg.role === 'user' ? (
                        <motion.div key={`user-${i}`} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="flex justify-end">
                          <div className="max-w-[85%] md:max-w-[75%]">
                            <div className="rounded-2xl rounded-tr-sm px-5 py-3.5 border border-[rgba(201,168,76,0.35)] bg-[rgba(201,168,76,0.08)]">
                              <p className="text-[9px] font-mono text-[--gold] uppercase tracking-widest font-bold mb-1.5">Operator ▸</p>
                              <p className="text-sm text-[--foreground] leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div key={`ai-${i}`} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="flex items-start gap-3 max-w-[92%]">
                          <div className="w-9 h-9 rounded-full border border-[rgba(201,168,76,0.4)] bg-[rgba(201,168,76,0.1)] flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(201,168,76,0.15)] mt-1">
                            <span className="text-[9px] font-bold text-[--gold] font-mono">AI</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="rounded-2xl rounded-tl-sm px-5 py-4 border border-[--border] bg-[--card]/60 relative overflow-hidden">
                              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[--gold-bright] to-[rgba(201,168,76,0.1)]" />
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-[--gold] font-mono uppercase tracking-widest">AI Mentor ▸ Response</span>
                                <button onClick={() => navigator.clipboard.writeText(msg.parts.map(p => p.content || '').join('\n'))} className="text-[9px] font-mono text-[--muted-foreground] hover:text-[--gold] transition-colors cursor-pointer flex items-center gap-1">
                                  <CopyIcon />Copy
                                </button>
                              </div>
                              <MessageContent parts={msg.parts} />
                            </div>
                            <SuggestedFollowUps suggestions={getFollowUps(msg.intent)} onSelect={handleFollowUp} />
                          </div>
                        </motion.div>
                      )
                    ))}
                  </AnimatePresence>

                  <AnimatePresence>
                    {isTyping && typingParts.length > 0 && (
                      <motion.div key="typing" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex items-start gap-3 max-w-[92%]">
                        <div className="w-9 h-9 rounded-full border border-[rgba(201,168,76,0.4)] bg-[rgba(201,168,76,0.1)] flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(201,168,76,0.15)] mt-1">
                          <span className="text-[9px] font-bold text-[--gold] font-mono">AI</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="rounded-2xl rounded-tl-sm px-5 py-4 border border-[--border] bg-[--card]/60 relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[--gold-bright] to-[rgba(201,168,76,0.1)]" />
                            <div className="flex items-center gap-2 mb-2"><span className="text-[10px] font-bold text-[--gold] font-mono uppercase tracking-widest">AI Mentor ▸ Streaming</span><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /></div>
                            <MessageContent parts={typingParts.slice(0, typingIndex)} />
                            {typingIndex < typingParts.length && <motion.span className="inline-block w-[3px] h-4 bg-[--gold] ml-0.5 align-middle" animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} />}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {isTyping && typingParts.length === 0 && <TypingIndicator />}
                </>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="flex-shrink-0 px-5 md:px-7 py-4 border-t border-[--border] bg-[--card]/30">
              <div className="flex items-center gap-3">
                <span className="text-green-400 font-mono text-sm font-bold select-none hidden sm:inline">❯</span>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about services, projects, pricing..."
                  className="flex-1 bg-transparent text-sm text-[--foreground] placeholder-[--muted-foreground] outline-none border-none font-light"
                  disabled={isTyping}
                />
                <button onClick={() => sendMessage(input)} disabled={!input.trim() || isTyping} className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[--gold] to-[--gold-bright] flex items-center justify-center hover:shadow-[0_0_18px_rgba(201,168,76,0.35)] transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed">
                  <Send size={16} strokeWidth={2.2} className="text-black" />
                </button>
              </div>
            </div>
          </motion.div>

          <p className="text-[9px] font-mono text-[--muted-foreground] mt-3 tracking-wide">Mentor core streams live telemetry to the left console. Responses reference the Zhanx Studio knowledge base (12 modules indexed).</p>
        </motion.div>

        {/* RIGHT COLUMN: Clock & Telemetry */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-3 space-y-8 flex flex-col justify-between py-2 text-sm border-t lg:border-t-0 lg:border-l border-[--border] max-lg:pt-6 lg:pl-10 order-3 lg:order-none">
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <span className="text-[10px] font-mono text-[--muted-foreground] tracking-widest uppercase block mb-1">MENTOR CLOCK</span>
              <span className="font-mono text-2xl md:text-3xl font-extrabold text-[--gold] tracking-wider">{clockTime || '00:00:00'}</span>
              <span className="text-[10px] text-[--muted-foreground] font-mono block">GMT+5:30 (India Standard Time)</span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <span className="text-[10px] font-mono text-[--muted-foreground] tracking-widest uppercase block mb-1">CORE TELEMETRY</span>
              <div className="space-y-2.5 font-mono text-xs mt-2">
                <div className="flex justify-between border-b border-[--border] pb-1.5">
                  <span className="text-[--muted-foreground]">Core Uptime</span>
                  <span className="text-[--foreground] font-bold">99.9997%</span>
                </div>
                <div className="flex justify-between border-b border-[--border] pb-1.5">
                  <span className="text-[--muted-foreground]">Active Nodes</span>
                  <span className="text-[--foreground] font-bold">148 / 150</span>
                </div>
                <div className="flex justify-between border-b border-[--border] pb-1.5">
                  <span className="text-[--muted-foreground]">Knowledge Index</span>
                  <span className="text-[--foreground] font-bold">12 modules</span>
                </div>
                <div className="flex justify-between border-b border-[--border] pb-1.5">
                  <span className="text-[--muted-foreground]">Session Queries</span>
                  <span className="text-[--foreground] font-bold">{messages.filter(m => m.role === 'user').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[--muted-foreground]">Status</span>
                  <span className="text-green-500 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                    ONLINE
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <span className="text-[10px] font-mono text-[--muted-foreground] tracking-widest uppercase block mb-2">OPERATOR</span>
            <span className="font-mono text-xs text-[--foreground] font-bold tracking-wider">ZHANX STUDIO</span>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
