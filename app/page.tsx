'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ─── DATA ───────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: '01',
    title: 'HC & Billing Portal',
    sub: 'Data-driven Automation',
    category: 'Infrastructure',
    year: '2025',
    tags: ['Python', 'Flask', 'Chart.js', 'SQL'],
    img: null,
  },
  {
    id: '02',
    title: 'Zomato Clone',
    sub: 'Front-End Engineering',
    category: 'Interface',
    year: '2024',
    tags: ['HTML', 'CSS', 'Responsive'],
    img: null,
  },
  {
    id: '03',
    title: 'Tech Olympics',
    sub: 'State Level — 1st Prize',
    category: 'Achievement',
    year: '2024',
    tags: ['ISTE Karnataka', 'New Horizon College'],
    img: null,
  },
];

const SKILLS = [
  { label: 'Languages', value: 'Python · JavaScript · TypeScript · C++ · Java · SQL' },
  { label: 'Web',       value: 'React · Next.js · Node.js · Flask · REST APIs' },
  { label: 'Tools',     value: 'Git · VS Code · Jupyter · Chart.js · Supabase' },
  { label: 'CS Core',   value: 'DSA · OOP · DBMS · Operating Systems' },
];

const EXPERIENCE = [
  {
    period: '07.2025 — 09.2025',
    role: 'Software Developer Intern',
    company: 'Cadmaxx Solutions Pvt Ltd',
    location: 'Bangalore, IN',
    desc: 'Built and deployed a full HC & Billing Portal — automating manual workflows and delivering real-time analytics dashboards for the billing department.',
  },
  {
    period: '11.2023 — 03.2024',
    role: 'Full Stack Web Developer Intern',
    company: 'Dev Town',
    location: 'Kalaburagi, IN',
    desc: 'Developed and shipped responsive full-stack applications end-to-end using modern JavaScript frameworks and RESTful API design.',
  },
];

const CERTS = [
  ['Full Stack Web Development',           'Dev Town'],
  ['HTML and CSS',                         'Certiport'],
  ['Python & Artificial Intelligence',    'Dev Town'],
  ['Backend Web Dev — Node.js & Express',  'AWS'],
];

/* ─── LABEL ──────────────────────────────────────────────── */
function Label({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`text-[9px] tracking-[0.5em] uppercase text-gray-500 ${className}`}
      style={{ fontFamily: 'DM Mono, monospace' }}
    >
      {children}
    </span>
  );
}

/* ─── BLOB ILLUSTRATIONS ─────────────────────────────────── */
function Blob1({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M44.7,-67.3C56.3,-58.4,62.7,-42.6,67.2,-26.8C71.7,-11,74.3,4.8,70.2,18.7C66.1,32.6,55.3,44.5,42.4,53.6C29.5,62.7,14.7,68.9,-0.8,69.9C-16.3,70.9,-32.6,66.7,-44.6,57.4C-56.6,48.1,-64.4,33.7,-68.1,18.1C-71.8,2.5,-71.5,-14.3,-64.9,-27.9C-58.3,-41.5,-45.5,-51.9,-32,-59.3C-18.4,-66.7,-4.1,-71.2,10.3,-69.6C24.7,-68,33.1,-76.2,44.7,-67.3Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

function Blob2({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M39.5,-65.3C50.3,-56.1,57.5,-43.2,63.8,-29.5C70.1,-15.8,75.5,-1.3,73.2,12C70.9,25.3,60.8,37.4,49.1,47.1C37.4,56.8,24.1,64.2,9.2,68.2C-5.7,72.3,-22.2,73.1,-35.2,66.4C-48.2,59.8,-57.7,45.6,-63.8,30.4C-69.9,15.2,-72.7,-1,-68.7,-15.3C-64.7,-29.6,-54,-42,-41.8,-51.2C-29.7,-60.4,-16.2,-66.4,-0.9,-65.1C14.5,-63.9,28.7,-74.5,39.5,-65.3Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

function Blob3({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M47.3,-71.2C59.4,-62.1,66,-46.2,70.8,-30C75.7,-13.8,78.8,2.7,74.3,17.1C69.8,31.5,57.6,43.8,44.3,53.9C31,64,16.5,71.9,0.2,71.6C-16.1,71.3,-32.2,62.8,-44.6,51.5C-57,40.2,-65.7,26.1,-68.8,10.7C-71.9,-4.7,-69.4,-21.4,-61.5,-34.5C-53.6,-47.6,-40.3,-57.1,-26.7,-65.4C-13.1,-73.7,0.8,-80.8,14.2,-79C27.6,-77.2,35.2,-80.3,47.3,-71.2Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

/* ─── MAIN ───────────────────────────────────────────────── */
export default function Home() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const imgMaskRef    = useRef<HTMLDivElement>(null);
  const progressRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      /* ── Scroll progress ── */
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1, ease: 'none',
          scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 0 },
        });
      }

      /* ── Hero ── */
      gsap.from('.hero-line', { y: 140, duration: 1.6, stagger: 0.15, ease: 'power4.out', delay: 0.1 });
      gsap.from('.hero-sub',  { opacity: 0, y: 24, duration: 1.2, delay: 0.8, ease: 'power3.out' });
      gsap.from('.hero-scroll-indicator', { opacity: 0, duration: 1, delay: 1.4 });

      /* ── Floating blobs ── */
      gsap.utils.toArray<HTMLElement>('.blob-float').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -28 : 22,
          x: i % 3 === 0 ? 14 : -10,
          rotation: i % 2 === 0 ? 18 : -14,
          duration: 5 + i * 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.6,
        });
      });

      /* ── Photo parallax ── */
      gsap.to('.me-image', {
        y: -80, ease: 'none',
        scrollTrigger: { trigger: '.me-container', start: 'top bottom', end: 'bottom top', scrub: true },
      });

      /* ── Horizontal scroll — desktop only ── */
      const mq = window.matchMedia('(min-width: 768px)');
      if (mq.matches && horizontalRef.current) {
        const totalWidth = horizontalRef.current.scrollWidth;
        gsap.to(horizontalRef.current, {
          x: () => -(totalWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: '.projects-trigger',
            pin: true, scrub: 1,
            start: 'top top',
            end: () => '+=' + totalWidth,
            invalidateOnRefresh: true,
          },
        });
      }

      /* ── Reveal ── */
      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
        gsap.from(el, {
          y: 48, opacity: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        });
      });

      /* ── Line expand ── */
      gsap.utils.toArray<HTMLElement>('.line-expand').forEach((el) => {
        gsap.from(el, {
          scaleX: 0, transformOrigin: 'left', duration: 1.4, ease: 'power3.inOut',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        });
      });

    }, containerRef);

    /* ── Cursor follow image ── */
    const mask = imgMaskRef.current;
    const hero = document.querySelector('.hero-section') as HTMLElement | null;
    let cleanupHero = () => {};

    if (mask && hero) {
      let mx = 0, my = 0, cx = 0, cy = 0, raf: number;
      const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
      const lerp   = () => { cx += (mx-cx)*0.07; cy += (my-cy)*0.07; mask.style.left=cx+'px'; mask.style.top=cy+'px'; raf=requestAnimationFrame(lerp); };
      const show   = () => { mask.style.opacity='1'; raf=requestAnimationFrame(lerp); };
      const hide   = () => { mask.style.opacity='0'; cancelAnimationFrame(raf); };
      hero.addEventListener('mousemove', onMove);
      hero.addEventListener('mouseenter', show);
      hero.addEventListener('mouseleave', hide);
      cleanupHero = () => { hero.removeEventListener('mousemove',onMove); hero.removeEventListener('mouseenter',show); hero.removeEventListener('mouseleave',hide); cancelAnimationFrame(raf); };
    }

    return () => { ctx.revert(); cleanupHero(); };
  }, []);

  return (
    <main ref={containerRef} className="bg-white text-black overflow-x-hidden">

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[1px] z-[600] bg-gray-100">
        <div ref={progressRef} className="h-full bg-black origin-left scale-x-0" />
      </div>

      {/* Cursor follow image */}
      <div ref={imgMaskRef} className="hero-image-mask hidden md:block">
        <Image src="/me.png" alt="Sandesh Mahajan" fill className="object-cover" priority />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-[500] mix-blend-difference">
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          <span className="text-[10px] tracking-[0.4em] uppercase text-white" style={{ fontFamily: 'DM Mono, monospace' }}>
            Sandesh Mahajan
          </span>
          <div className="flex gap-6 md:gap-8 text-[10px] tracking-[0.4em] uppercase text-white" style={{ fontFamily: 'DM Mono, monospace' }}>
            <a href="#about"   className="hover:opacity-50 transition-opacity">About</a>
            <a href="#works"   className="hover:opacity-50 transition-opacity">Works</a>
            <a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════
          01 — HERO
      ══════════════════════════════════════ */}
      <section className="hero-section h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden select-none">

        {/* ── Blob illustrations ── */}
        <Blob1 className="blob-float absolute -top-16 -left-16 w-72 h-72 text-gray-50 opacity-80 pointer-events-none" />
        <Blob2 className="blob-float absolute -bottom-20 -right-10 w-80 h-80 text-gray-50 opacity-60 pointer-events-none" />
        <Blob3 className="blob-float absolute top-1/3 right-[8%] w-32 h-32 text-gray-100 opacity-70 pointer-events-none hidden md:block" />

        {/* Side labels — desktop only */}
        <div className="absolute top-1/2 right-8 -translate-y-1/2 rotate-90 origin-center hidden md:block">
          <Label>Portfolio — 2025</Label>
        </div>
        <div className="absolute top-1/2 left-8 -translate-y-1/2 -rotate-90 origin-center hidden md:block">
          <Label>CSE · PDA College</Label>
        </div>

        {/* Vertical accent lines */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <div className="absolute top-[12%] left-[6%] w-px h-[28vh] bg-gray-100" />
          <div className="absolute top-[12%] right-[6%] w-px h-[28vh] bg-gray-100" />
        </div>

        {/* Hero type */}
        <div className="overflow-hidden mb-[-0.08em]">
          <h1
            className="hero-line text-[clamp(4.5rem,15vw,14rem)] font-black tracking-[-0.04em] leading-[0.88] uppercase"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Sandesh
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1
            className="hero-line text-[clamp(4.5rem,15vw,14rem)] tracking-[-0.04em] leading-[0.88] uppercase italic text-gray-100"
            style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}
          >
            Mahajan
          </h1>
        </div>

        <p className="hero-sub mt-8 text-[9px] tracking-[0.55em] uppercase text-gray-500" style={{ fontFamily: 'DM Mono, monospace' }}>
          Systems Builder &bull; Engineering with Intent
        </p>

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="w-px h-14 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
          <Label>Scroll</Label>
        </div>
      </section>

      {/* ══════════════════════════════════════
          02 — ABOUT
      ══════════════════════════════════════ */}
      <section id="about" className="relative border-t border-gray-100 overflow-hidden">

        {/* Blob */}
        <Blob2 className="blob-float absolute top-20 -right-24 w-96 h-96 text-gray-50 opacity-50 pointer-events-none" />

        <div className="absolute top-8 right-6 md:right-12 hidden md:block">
          <Label className="section-num">02 / 07</Label>
        </div>

        {/* MOBILE: stack vertically. DESKTOP: side by side */}
        <div className="flex flex-col md:flex-row min-h-screen">

          {/* Text side */}
          <div className="w-full md:w-1/2 flex flex-col justify-between px-6 md:px-[8%] py-20 md:py-24 md:border-r border-gray-100 order-2 md:order-1">
            <div>
              <Label className="reveal-up block mb-10 md:mb-16">Introduction</Label>

              <h2
                className="reveal-up text-[clamp(1.8rem,4vw,3.5rem)] font-light leading-[1.15] tracking-tight text-black mb-8"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                I build{' '}
                <em style={{ fontFamily: 'Playfair Display, serif' }}>intelligent</em>{' '}
                systems<br className="hidden md:block" /> and{' '}
                <em className="text-gray-300" style={{ fontFamily: 'Playfair Display, serif' }}>scalable</em>{' '}
                architectures.
              </h2>

              <p
                className="reveal-up text-base text-gray-600 max-w-sm leading-[1.9] italic mb-10"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                "My focus is on the bridge between raw logic and human interaction —
                ensuring performance never sacrifices elegance."
              </p>

              <div className="line-expand h-px bg-gray-100 w-full mb-10" />

              {/* Stats */}
              <div className="reveal-up grid grid-cols-3 gap-0 mb-10">
                {[['8.6','CGPA'],['2+','Internships'],['1st','State Prize']].map(([n,l],i)=>(
                  <div key={l} className={`py-5 ${i!==0?'pl-6 border-l border-gray-100':''}`}>
                    <p className="text-2xl md:text-3xl font-black tracking-tight mb-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>{n}</p>
                    <Label>{l}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Meta */}
            <div className="reveal-up grid grid-cols-2 gap-6 pt-8 border-t border-gray-100">
              <div>
                <Label className="block mb-2">Core Stack</Label>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'DM Mono, monospace' }}>Python / Next.js / SQL</p>
              </div>
              <div>
                <Label className="block mb-2">Education</Label>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'DM Mono, monospace' }}>B.E CSE · PDA College</p>
              </div>
            </div>
          </div>

          {/* Photo side */}
          {/* MOBILE: fixed height card. DESKTOP: full bleed */}
          <div className="order-1 md:order-2 w-full md:w-1/2">
            {/* Mobile photo card */}
            <div className="md:hidden mx-6 mt-20 mb-0 relative">
              <div className="me-container aspect-[4/5] relative overflow-hidden bg-gray-50 rounded-sm shadow-xl">
                <div className="me-image absolute inset-0 w-full h-[115%] -top-[7.5%]">
                  <Image
                    src="/me.png"
                    alt="Sandesh Mahajan"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s]"
                    priority
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between z-10">
                  <Label className="text-white/70">Kalaburagi, IN</Label>
                  <Label className="text-white/70">© 2025</Label>
                </div>
              </div>
              {/* Decorative blob behind card on mobile */}
              <Blob1 className="blob-float absolute -bottom-10 -right-10 w-48 h-48 text-gray-100 opacity-60 pointer-events-none -z-10" />
            </div>

            {/* Desktop full-bleed photo */}
            <div className="me-container hidden md:block h-full min-h-screen relative overflow-hidden bg-gray-50">
              <div className="me-image absolute inset-0 w-full h-[115%] -top-[7.5%]">
                <Image
                  src="/me.png"
                  alt="Sandesh Mahajan"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s]"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8 flex justify-between z-10">
                <Label className="text-white/60">Kalaburagi, IN</Label>
                <Label className="text-white/60">© 2025</Label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          03 — SKILLS
      ══════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 md:px-[8%] border-t border-gray-100 overflow-hidden">

        {/* Blob */}
        <Blob3 className="blob-float absolute -bottom-20 -left-16 w-72 h-72 text-gray-50 opacity-60 pointer-events-none" />

        <div className="absolute top-8 right-6 md:right-12 hidden md:block">
          <Label className="section-num">03 / 07</Label>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-24 max-w-5xl">
          <div className="md:w-1/3 flex-shrink-0">
            <Label className="reveal-up block mb-4 md:mb-6">Technical Skills</Label>
            <h2
              className="reveal-up text-[clamp(2rem,3.5vw,3rem)] font-black tracking-tight leading-tight"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              What I<br />work with
            </h2>
          </div>

          <div className="flex-1 grid grid-cols-1 gap-0">
            {SKILLS.map((s, i) => (
              <div
                key={i}
                className="reveal-up group py-6 md:py-8 border-b border-gray-100 hover:border-gray-400 transition-colors duration-500 flex flex-col md:flex-row md:items-baseline md:gap-12"
              >
                <Label className="flex-shrink-0 md:w-24 mb-2 md:mb-0">{s.label}</Label>
                <p
                  className="text-sm text-gray-600 tracking-wide leading-relaxed group-hover:text-black transition-colors duration-500"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          04 — EXPERIENCE
      ══════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 md:px-[8%] border-t border-gray-100 bg-[#f9f9f9] overflow-hidden">

        {/* Blob */}
        <Blob1 className="blob-float absolute -top-16 right-0 w-80 h-80 text-gray-100 opacity-40 pointer-events-none" />

        <div className="absolute top-8 right-6 md:right-12 hidden md:block">
          <Label className="section-num">04 / 07</Label>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-24 max-w-5xl">
          <div className="md:w-1/3 flex-shrink-0">
            <Label className="reveal-up block mb-4 md:mb-6">Experience</Label>
            <h2
              className="reveal-up text-[clamp(2rem,3.5vw,3rem)] font-black tracking-tight leading-tight"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Where I've<br />worked
            </h2>
          </div>

          <div className="flex-1">
            {EXPERIENCE.map((e, i) => (
              <div
                key={i}
                className="reveal-up group py-8 md:py-10 border-b border-gray-200 hover:border-gray-500 transition-colors duration-500 last:border-b-0"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-3">
                  <h3
                    className="text-lg md:text-xl font-bold tracking-tight group-hover:translate-x-1 transition-transform duration-500"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {e.role}
                  </h3>
                  <Label className="flex-shrink-0">{e.period}</Label>
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Label>{e.company}</Label>
                  <span className="text-gray-200" style={{ fontFamily: 'DM Mono, monospace' }}>·</span>
                  <Label>{e.location}</Label>
                </div>
                <p className="text-sm text-gray-600 leading-[1.85] max-w-xl" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  {e.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          05 — PROJECTS
          Desktop: horizontal scroll
          Mobile: vertical card stack
      ══════════════════════════════════════ */}
      <div id="works" className="border-t border-gray-100">

        {/* ── MOBILE: vertical stack ── */}
        <div className="md:hidden px-6 py-20">
          <Label className="block mb-4">Selected Works</Label>
          <h2
            className="text-[clamp(3rem,12vw,6rem)] font-black tracking-tight uppercase leading-[0.88] mb-14"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Works
          </h2>

          <div className="flex flex-col gap-0">
            {PROJECTS.map((p) => (
              <div key={p.id} className="reveal-up group py-8 border-b border-gray-100 hover:border-gray-400 transition-colors duration-500">
                <div className="flex justify-between items-start mb-5">
                  <Label>{p.category}</Label>
                  <Label>{p.year}</Label>
                </div>

                {/* Image placeholder */}
                <div className="w-full aspect-video bg-gray-50 border border-gray-100 relative overflow-hidden mb-5 flex items-center justify-center">
                  {p.img ? (
                    <Image src={p.img} alt={p.title} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
                      <div className="relative flex flex-col items-center gap-3">
                        <div className="relative w-6 h-6">
                          <div className="absolute inset-x-0 top-1/2 h-px bg-gray-200" />
                          <div className="absolute inset-y-0 left-1/2 w-px bg-gray-200" />
                        </div>
                        <Label>{p.category}</Label>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <h3
                      className="text-2xl font-black uppercase tracking-tight leading-none mb-2"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-500 italic mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {p.sub}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[8px] tracking-[0.3em] uppercase text-gray-400 border border-gray-100 px-2 py-1" style={{ fontFamily: 'DM Mono, monospace' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-5xl font-light italic text-gray-100 leading-none" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {p.id}
                  </span>
                </div>
              </div>
            ))}

            <div className="pt-10">
              <a
                href="https://github.com/SandeshMahajan07"
                target="_blank" rel="noreferrer"
                className="group inline-flex flex-col gap-2"
              >
                <Label className="group-hover:text-black transition-colors">View all on GitHub</Label>
                <div className="w-0 group-hover:w-full h-px bg-black transition-all duration-500" />
              </a>
            </div>
          </div>
        </div>

        {/* ── DESKTOP: horizontal scroll ── */}
        <div className="projects-trigger relative bg-white hidden md:block">
          <div ref={horizontalRef} className="flex h-screen w-max">

            {/* Title panel */}
            <div className="w-[45vw] h-screen flex flex-col justify-between px-[8%] py-16 flex-shrink-0 border-r border-gray-100">
              <div className="flex justify-between">
                <Label>Selected Works</Label>
                <Label className="section-num">05 / 07</Label>
              </div>
              <div>
                <h2
                  className="text-[clamp(4rem,11vw,10rem)] font-black tracking-[-0.04em] uppercase leading-[0.88]"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  Works
                </h2>
                <p className="mt-5 text-sm text-gray-500 italic max-w-xs leading-relaxed" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Scroll to explore selected projects.
                </p>
              </div>
              <Label>{PROJECTS.length} Projects</Label>
            </div>

            {/* Cards */}
            {PROJECTS.map((p) => (
              <div key={p.id} className="w-[80vw] h-screen flex flex-col justify-between py-16 px-14 flex-shrink-0 border-r border-gray-100 group">
                <div className="flex justify-between">
                  <Label>{p.category}</Label>
                  <Label>{p.year}</Label>
                </div>

                <div className="flex-1 my-8 bg-gray-50 border border-gray-100 relative overflow-hidden flex items-center justify-center">
                  {p.img ? (
                    <Image src={p.img} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
                      <div className="relative w-8 h-8">
                        <div className="absolute inset-x-0 top-1/2 h-px bg-gray-200" />
                        <div className="absolute inset-y-0 left-1/2 w-px bg-gray-200" />
                      </div>
                      <span className="relative text-[8px] tracking-[1em] uppercase text-gray-300 group-hover:tracking-[1.4em] transition-all duration-[1.2s]" style={{ fontFamily: 'DM Mono, monospace' }}>
                        {p.category}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-end gap-8">
                  <div>
                    <h3 className="text-[clamp(2rem,5vw,4.5rem)] font-black uppercase tracking-tight leading-none mb-3 group-hover:tracking-[-0.05em] transition-all duration-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {p.title}
                    </h3>
                    <p className="text-xl text-gray-500 italic mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {p.sub}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[8px] tracking-[0.35em] uppercase text-gray-400 border border-gray-100 px-2.5 py-1 hover:border-gray-400 hover:text-gray-700 transition-colors" style={{ fontFamily: 'DM Mono, monospace' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-[6rem] font-light italic text-gray-100 leading-none flex-shrink-0 group-hover:text-gray-200 transition-colors duration-500" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {p.id}
                  </span>
                </div>
              </div>
            ))}

            {/* End panel */}
            <div className="w-[35vw] h-screen flex flex-col items-center justify-center gap-4 flex-shrink-0">
              <div className="w-px h-16 bg-gray-200" />
              <a href="https://github.com/SandeshMahajan07" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-3">
                <Label className="group-hover:text-black transition-colors">View all on GitHub</Label>
                <div className="w-0 group-hover:w-16 h-px bg-black transition-all duration-500" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          06 — CERTIFICATIONS
      ══════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 md:px-[8%] border-t border-gray-100 overflow-hidden">

        {/* Blob */}
        <Blob2 className="blob-float absolute top-10 -right-20 w-72 h-72 text-gray-50 opacity-50 pointer-events-none" />

        <div className="absolute top-8 right-6 md:right-12 hidden md:block">
          <Label className="section-num">06 / 07</Label>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-24 max-w-5xl">
          <div className="md:w-1/3 flex-shrink-0">
            <Label className="reveal-up block mb-4 md:mb-6">Certifications</Label>
            <h2
              className="reveal-up text-[clamp(2rem,3.5vw,3rem)] font-black tracking-tight leading-tight"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Credentials
            </h2>
          </div>

          <div className="flex-1">
            {CERTS.map(([name, issuer], i) => (
              <div
                key={i}
                className="reveal-up group flex justify-between items-baseline py-6 md:py-7 border-b border-gray-100 hover:border-gray-500 transition-colors duration-400 last:border-b-0"
              >
                <div className="flex items-baseline gap-3 md:gap-4">
                  <Label className="tabular-nums flex-shrink-0">{String(i+1).padStart(2,'0')}</Label>
                  <span
                    className="text-sm font-medium text-black group-hover:translate-x-1 transition-transform duration-400 inline-block"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {name}
                  </span>
                </div>
                <Label className="flex-shrink-0 ml-3">{issuer}</Label>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          07 — CONNECT
      ══════════════════════════════════════ */}
      <section id="contact" className="relative min-h-screen flex flex-col border-t border-gray-100 overflow-hidden">

        {/* Blobs */}
        <Blob1 className="blob-float absolute -top-20 -left-20 w-80 h-80 text-gray-50 opacity-60 pointer-events-none" />
        <Blob3 className="blob-float absolute bottom-20 -right-16 w-72 h-72 text-gray-50 opacity-50 pointer-events-none" />

        <div className="absolute top-8 right-6 md:right-12 hidden md:block">
          <Label className="section-num">07 / 07</Label>
        </div>

        {/* Big type */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center pt-20 pb-4">
          <div className="overflow-hidden">
            <h2
              className="reveal-up text-[clamp(4.5rem,16vw,15rem)] font-black tracking-[-0.05em] uppercase leading-[0.88] text-black"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Let's
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2
              className="reveal-up text-[clamp(4.5rem,16vw,15rem)] tracking-[-0.05em] uppercase leading-[0.88] text-gray-100 italic"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}
            >
              connect
            </h2>
          </div>
        </div>

        {/* Contact strip */}
        <div className="border-t border-gray-100 px-6 md:px-[8%] py-10 md:py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">

            <a href="mailto:sandeshmahajan422@gmail.com" className="reveal-up group flex flex-col gap-2">
              <Label>Email</Label>
              <span
                className="text-base md:text-2xl font-light tracking-tight border-b border-transparent group-hover:border-black transition-all duration-500 pb-0.5 break-all md:break-normal"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                sandeshmahajan422@gmail.com
              </span>
            </a>

            <div className="reveal-up flex flex-col gap-4">
              <Label>Elsewhere</Label>
              <div className="flex gap-6 md:gap-8 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500 flex-wrap" style={{ fontFamily: 'DM Mono, monospace' }}>
                <a href="https://linkedin.com/in/sandesh-mahajan-97a233281" target="_blank" rel="noreferrer" className="hover:text-black transition-colors border-b border-transparent hover:border-black pb-0.5">LinkedIn</a>
                <a href="https://github.com/SandeshMahajan07" target="_blank" rel="noreferrer" className="hover:text-black transition-colors border-b border-transparent hover:border-black pb-0.5">GitHub</a>
                <a href="tel:+916360911344" className="hover:text-black transition-colors border-b border-transparent hover:border-black pb-0.5">+91 6360 911 344</a>
              </div>
            </div>

            <div className="reveal-up flex flex-col gap-2">
              <Label>Status</Label>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-green-600" style={{ fontFamily: 'DM Mono, monospace' }}>
                  Available for Internships
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 md:py-10 px-6 md:px-[8%] border-t border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 flex-wrap" style={{ fontFamily: 'DM Mono, monospace' }}>
        <Label>&copy; 2025 Sandesh Mahajan</Label>
        <Label>Intentionally Crafted</Label>
        <Label>Kalaburagi · Karnataka · IN</Label>
      </footer>

    </main>
  );
}