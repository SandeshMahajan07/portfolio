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
  { label: 'Languages',  value: 'Python · JavaScript · TypeScript · C++ · Java · SQL' },
  { label: 'Web',        value: 'React · Next.js · Node.js · Flask · REST APIs' },
  { label: 'Tools',      value: 'Git · VS Code · Jupyter · Chart.js · Supabase' },
  { label: 'CS Core',    value: 'DSA · OOP · DBMS · Operating Systems' },
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
  ['Full Stack Web Development',          'Dev Town'],
  ['HTML and CSS',                        'Certiport'],
  ['Python & Artificial Intelligence',   'Dev Town'],
  ['Backend Web Dev — Node.js & Express', 'AWS'],
];

/* ─── MONO LABEL ─────────────────────────────────────────── */
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

/* ─── COMPONENT ──────────────────────────────────────────── */
export default function Home() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const imgMaskRef    = useRef<HTMLDivElement>(null);
  const progressRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      /* ── Scroll progress bar ── */
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 0 },
        });
      }

      /* ── Hero: staggered line reveal ── */
      gsap.from('.hero-line', {
        y: 140,
        duration: 1.6,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.1,
      });
      gsap.from('.hero-sub', {
        opacity: 0,
        y: 24,
        duration: 1.2,
        delay: 0.8,
        ease: 'power3.out',
      });
      gsap.from('.hero-scroll-indicator', {
        opacity: 0,
        duration: 1,
        delay: 1.4,
        ease: 'power2.out',
      });

      /* ── Photo parallax ── */
      gsap.to('.me-image', {
        y: -90,
        ease: 'none',
        scrollTrigger: {
          trigger: '.me-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      /* ── Horizontal scroll ── */
      if (horizontalRef.current) {
        const totalWidth = horizontalRef.current.scrollWidth;
        gsap.to(horizontalRef.current, {
          x: () => -(totalWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: '.projects-trigger',
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => '+=' + totalWidth,
            invalidateOnRefresh: true,
          },
        });
      }

      /* ── Reveal elements ── */
      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        });
      });

      /* ── Section number counters ── */
      gsap.utils.toArray<HTMLElement>('.section-num').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          x: -20,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        });
      });

      /* ── Horizontal line expand ── */
      gsap.utils.toArray<HTMLElement>('.line-expand').forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: 'left',
          duration: 1.4,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        });
      });

    }, containerRef);

    /* ── Cursor-follow image mask on hero ── */
    const mask        = imgMaskRef.current;
    const heroSection = document.querySelector('.hero-section') as HTMLElement | null;
    let cleanupHero   = () => {};

    if (mask && heroSection) {
      let mx = 0, my = 0, cx = 0, cy = 0, raf: number;

      const onMove  = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
      const lerp    = () => {
        cx += (mx - cx) * 0.07;
        cy += (my - cy) * 0.07;
        mask.style.left = cx + 'px';
        mask.style.top  = cy + 'px';
        raf = requestAnimationFrame(lerp);
      };
      const show = () => { mask.style.opacity = '1'; raf = requestAnimationFrame(lerp); };
      const hide = () => { mask.style.opacity = '0'; cancelAnimationFrame(raf); };

      heroSection.addEventListener('mousemove',  onMove);
      heroSection.addEventListener('mouseenter', show);
      heroSection.addEventListener('mouseleave', hide);

      cleanupHero = () => {
        heroSection.removeEventListener('mousemove',  onMove);
        heroSection.removeEventListener('mouseenter', show);
        heroSection.removeEventListener('mouseleave', hide);
        cancelAnimationFrame(raf);
      };
    }

    return () => { ctx.revert(); cleanupHero(); };
  }, []);

  return (
    <main ref={containerRef} className="bg-white text-black overflow-x-hidden">

      {/* ── Scroll progress bar ── */}
      <div className="fixed top-0 left-0 right-0 h-[1px] z-[600] bg-gray-100">
        <div
          ref={progressRef}
          className="h-full bg-black origin-left scale-x-0"
        />
      </div>

      {/* ── Cursor-follow image mask ── */}
      <div ref={imgMaskRef} className="hero-image-mask">
        <Image src="/me.png" alt="Sandesh Mahajan" fill className="object-cover" priority />
      </div>

      {/* ── Fixed nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-[500] mix-blend-difference">
        <div className="flex items-center justify-between px-8 md:px-12 py-6">
          <span
            className="text-[10px] tracking-[0.4em] uppercase text-white"
            style={{ fontFamily: 'DM Mono, monospace' }}
          >
            Sandesh Mahajan
          </span>
          <div
            className="flex gap-8 text-[10px] tracking-[0.4em] uppercase text-white"
            style={{ fontFamily: 'DM Mono, monospace' }}
          >
            <a href="#about"      className="hover:opacity-50 transition-opacity">About</a>
            <a href="#works"      className="hover:opacity-50 transition-opacity">Works</a>
            <a href="#contact"    className="hover:opacity-50 transition-opacity">Contact</a>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════
          01 — HERO
      ══════════════════════════════════════ */}
      <section className="hero-section h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden select-none">

        {/* Ambient background shape */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] left-[5%] w-[1px] h-[30vh] bg-gray-100" />
          <div className="absolute top-[15%] right-[5%] w-[1px] h-[30vh] bg-gray-100" />
        </div>

        {/* Side label */}
        <div
          className="absolute top-1/2 right-10 -translate-y-1/2 rotate-90 origin-center hidden md:block"
          style={{ fontFamily: 'DM Mono, monospace' }}
        >
          <Label>Portfolio — 2025</Label>
        </div>
        <div
          className="absolute top-1/2 left-10 -translate-y-1/2 -rotate-90 origin-center hidden md:block"
          style={{ fontFamily: 'DM Mono, monospace' }}
        >
          <Label>CSE · PDA College · Kalaburagi</Label>
        </div>

        {/* Main type */}
        <div className="overflow-hidden mb-[-0.1em]">
          <h1
            className="hero-line text-[clamp(5rem,15vw,14rem)] font-black tracking-[-0.04em] leading-[0.88] uppercase"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Sandesh
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1
            className="hero-line text-[clamp(5rem,15vw,14rem)] tracking-[-0.04em] leading-[0.88] uppercase italic text-gray-100"
            style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}
          >
            Mahajan
          </h1>
        </div>

        <p
          className="hero-sub mt-10 text-[9px] tracking-[0.6em] uppercase text-gray-400"
          style={{ fontFamily: 'DM Mono, monospace' }}
        >
          Systems Builder &bull; Engineering with Intent
        </p>

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
          <Label>Scroll</Label>
        </div>
      </section>

      {/* ══════════════════════════════════════
          02 — ABOUT
      ══════════════════════════════════════ */}
      <section id="about" className="relative border-t border-gray-100">

        {/* Section number */}
        <div className="absolute top-10 right-12 hidden md:block">
          <Label className="section-num">02 / 07</Label>
        </div>

        <div className="flex flex-col md:flex-row min-h-screen">

          {/* Left: text */}
          <div className="w-full md:w-1/2 flex flex-col justify-between px-[8%] py-24 border-r border-gray-100">
            <div>
              <Label className="reveal-up block mb-16">Introduction</Label>

              <h2
                className="reveal-up text-[clamp(2.2rem,4vw,3.8rem)] font-light leading-[1.1] tracking-tight text-black mb-10"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                I build{' '}
                <em style={{ fontFamily: 'Playfair Display, serif' }}>intelligent</em>{' '}
                systems<br />
                and{' '}
                <em className="text-gray-300" style={{ fontFamily: 'Playfair Display, serif' }}>scalable</em>{' '}
                architectures.
              </h2>

              <p
                className="reveal-up text-base text-gray-400 max-w-sm leading-[1.85] italic mb-12"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                "My focus is on the bridge between raw logic and human interaction —
                ensuring performance never sacrifices elegance."
              </p>

              {/* Divider */}
              <div className="line-expand h-px bg-gray-100 w-full mb-12" />

              {/* Stats */}
              <div className="reveal-up grid grid-cols-3 gap-0">
                {[['8.6', 'CGPA'], ['2+', 'Internships'], ['1st', 'State Prize']].map(([n, l], i) => (
                  <div key={l} className={`py-6 ${i !== 0 ? 'pl-8 border-l border-gray-100' : ''}`}>
                    <p
                      className="text-3xl font-black tracking-tight mb-1"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {n}
                    </p>
                    <Label>{l}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom meta */}
            <div className="reveal-up grid grid-cols-2 gap-8 pt-10 border-t border-gray-100">
              <div>
                <Label className="block mb-2">Core Stack</Label>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'DM Mono, monospace' }}>
                  Python / Next.js / SQL
                </p>
              </div>
              <div>
                <Label className="block mb-2">Education</Label>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'DM Mono, monospace' }}>
                  B.E CSE · PDA College
                </p>
              </div>
            </div>
          </div>

          {/* Right: photo — full bleed */}
          <div className="me-container w-full md:w-1/2 relative overflow-hidden bg-gray-50 min-h-[60vh] md:min-h-0">
            <div className="me-image absolute inset-0 w-full h-[115%] -top-[7.5%]">
              <Image
                src="/me.png"
                alt="Sandesh Mahajan"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s]"
                priority
              />
            </div>
            {/* Photo overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-10">
              <Label className="text-white/50">Kalaburagi, IN</Label>
              <Label className="text-white/50">© 2025</Label>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          03 — SKILLS
      ══════════════════════════════════════ */}
      <section className="relative py-32 px-[8%] border-t border-gray-100">
        <div className="absolute top-10 right-12 hidden md:block">
          <Label className="section-num">03 / 07</Label>
        </div>

        <div className="flex flex-col md:flex-row gap-24 max-w-5xl">
          <div className="md:w-1/3 flex-shrink-0">
            <Label className="reveal-up block mb-6">Technical Skills</Label>
            <h2
              className="reveal-up text-[clamp(2rem,3.5vw,3rem)] font-black tracking-tight leading-tight"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              What I<br />work with
            </h2>
          </div>

          <div className="flex-1 grid grid-cols-1 gap-0">
            {SKILLS.map((s, i) => (
              <div key={i} className="reveal-up group py-8 border-b border-gray-100 hover:border-gray-400 transition-colors duration-500 flex flex-col md:flex-row md:items-baseline md:gap-12">
                <Label className="flex-shrink-0 md:w-24 mb-2 md:mb-0">{s.label}</Label>
                <p
                  className="text-sm text-gray-700 tracking-wide leading-relaxed group-hover:text-black transition-colors duration-500"
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
      <section className="relative py-32 px-[8%] border-t border-gray-100 bg-[#f9f9f9]">
        <div className="absolute top-10 right-12 hidden md:block">
          <Label className="section-num">04 / 07</Label>
        </div>

        <div className="flex flex-col md:flex-row gap-24 max-w-5xl">
          <div className="md:w-1/3 flex-shrink-0">
            <Label className="reveal-up block mb-6">Experience</Label>
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
                className="reveal-up group py-10 border-b border-gray-200 hover:border-gray-500 transition-colors duration-500 last:border-b-0"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                  <h3
                    className="text-xl font-bold tracking-tight group-hover:translate-x-1 transition-transform duration-500"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {e.role}
                  </h3>
                  <Label className="flex-shrink-0">{e.period}</Label>
                </div>
                <div className="flex gap-4 mb-4">
                  <Label>{e.company}</Label>
                  <span className="text-gray-200" style={{ fontFamily: 'DM Mono, monospace' }}>·</span>
                  <Label>{e.location}</Label>
                </div>
                <p
                  className="text-sm text-gray-600 leading-[1.85] max-w-xl"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {e.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          05 — PROJECTS (Horizontal)
      ══════════════════════════════════════ */}
      <div id="works" className="projects-trigger relative bg-white border-t border-gray-100">
        <div ref={horizontalRef} className="flex h-screen w-max">

          {/* Title panel */}
          <div className="w-[45vw] h-screen flex flex-col justify-between px-[8%] py-16 flex-shrink-0 border-r border-gray-100">
            <div className="flex justify-between items-start">
              <Label>Selected Works</Label>
              <Label className="section-num">05 / 07</Label>
            </div>
            <div>
              <h2
                className="text-[clamp(4rem,11vw,10rem)] font-black tracking-[-0.04em] uppercase leading-[0.88] text-black"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Works
              </h2>
              <p
                className="mt-6 text-sm text-gray-400 italic max-w-xs leading-relaxed"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Drag or scroll to explore selected projects.
              </p>
            </div>
            <Label>{PROJECTS.length} Projects</Label>
          </div>

          {/* Project cards */}
          {PROJECTS.map((p) => (
            <div
              key={p.id}
              className="w-[80vw] h-screen flex flex-col justify-between py-16 px-14 flex-shrink-0 border-r border-gray-100 group"
            >
              {/* Top row */}
              <div className="flex justify-between items-start">
                <Label>{p.category}</Label>
                <Label>{p.year}</Label>
              </div>

              {/* Image */}
              <div className="flex-1 my-8 bg-gray-50 border border-gray-100 relative overflow-hidden flex items-center justify-center">
                {p.img ? (
                  <Image src={p.img} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
                    <span
                      className="relative text-[8px] tracking-[1em] uppercase text-gray-200 group-hover:tracking-[1.4em] transition-all duration-[1.2s]"
                      style={{ fontFamily: 'DM Mono, monospace' }}
                    >
                      {p.category}
                    </span>
                    {/* Decorative cross */}
                    <div className="relative">
                      <div className="w-px h-8 bg-gray-200 absolute left-1/2 -translate-x-1/2" />
                      <div className="w-8 h-px bg-gray-200 absolute top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom row */}
              <div className="flex justify-between items-end gap-8">
                <div>
                  <h3
                    className="text-[clamp(2rem,5vw,4.5rem)] font-black uppercase tracking-tight leading-none mb-3 group-hover:tracking-[-0.05em] transition-all duration-500"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-lg text-gray-400 italic mb-4"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {p.sub}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[8px] tracking-[0.35em] uppercase text-gray-300 border border-gray-100 px-2.5 py-1 hover:border-gray-400 hover:text-gray-600 transition-colors"
                        style={{ fontFamily: 'DM Mono, monospace' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span
                  className="text-[6rem] font-light italic text-gray-50 leading-none flex-shrink-0 group-hover:text-gray-100 transition-colors duration-500"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {p.id}
                </span>
              </div>
            </div>
          ))}

          {/* End panel */}
          <div className="w-[35vw] h-screen flex flex-col items-center justify-center gap-6 flex-shrink-0">
            <div className="w-px h-16 bg-gray-200" />
            <a
              href="https://github.com/SandeshMahajan07"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <Label className="group-hover:text-black transition-colors">View all on GitHub</Label>
              <div className="w-0 group-hover:w-16 h-px bg-black transition-all duration-500" />
            </a>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════
          06 — CERTIFICATIONS
      ══════════════════════════════════════ */}
      <section className="relative py-32 px-[8%] border-t border-gray-100 bg-[#f9f9f9]">
        <div className="absolute top-10 right-12 hidden md:block">
          <Label className="section-num">06 / 07</Label>
        </div>

        <div className="flex flex-col md:flex-row gap-24 max-w-5xl">
          <div className="md:w-1/3 flex-shrink-0">
            <Label className="reveal-up block mb-6">Certifications</Label>
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
                className="reveal-up group flex justify-between items-baseline py-7 border-b border-gray-200 hover:border-gray-500 transition-colors duration-400 last:border-b-0"
              >
                <div className="flex items-baseline gap-4">
                  <Label className="tabular-nums">{String(i + 1).padStart(2, '0')}</Label>
                  <span
                    className="text-sm font-medium text-black group-hover:translate-x-1 transition-transform duration-400 inline-block"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {name}
                  </span>
                </div>
                <Label className="flex-shrink-0 ml-4">{issuer}</Label>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          07 — CONNECT
      ══════════════════════════════════════ */}
      <section id="contact" className="relative min-h-screen flex flex-col border-t border-gray-100 overflow-hidden">

        <div className="absolute top-10 right-12 hidden md:block">
          <Label className="section-num">07 / 07</Label>
        </div>

        {/* Big type — top */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center pt-24 pb-4">
          <div className="overflow-hidden">
            <h2
              className="reveal-up text-[clamp(5rem,16vw,15rem)] font-black tracking-[-0.05em] uppercase leading-[0.88] text-black"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Let's
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2
              className="reveal-up text-[clamp(5rem,16vw,15rem)] tracking-[-0.05em] uppercase leading-[0.88] text-gray-100 italic"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}
            >
              connect
            </h2>
          </div>
        </div>

        {/* Contact details — bottom strip */}
        <div className="border-t border-gray-100 px-[8%] py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">

            {/* Email */}
            <a
              href="mailto:sandeshmahajan422@gmail.com"
              className="reveal-up group flex flex-col gap-2"
            >
              <Label>Email</Label>
              <span
                className="text-xl md:text-2xl font-light tracking-tight border-b border-transparent group-hover:border-black transition-all duration-500 pb-0.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                sandeshmahajan422@gmail.com
              </span>
            </a>

            {/* Social links */}
            <div className="reveal-up flex flex-col gap-4">
              <Label>Elsewhere</Label>
              <div
                className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400"
                style={{ fontFamily: 'DM Mono, monospace' }}
              >
                <a href="https://linkedin.com/in/sandesh-mahajan-97a233281" target="_blank" rel="noreferrer"
                  className="hover:text-black transition-colors duration-300 border-b border-transparent hover:border-black pb-0.5">
                  LinkedIn
                </a>
                <a href="https://github.com/SandeshMahajan07" target="_blank" rel="noreferrer"
                  className="hover:text-black transition-colors duration-300 border-b border-transparent hover:border-black pb-0.5">
                  GitHub
                </a>
                <a href="tel:+916360911344"
                  className="hover:text-black transition-colors duration-300 border-b border-transparent hover:border-black pb-0.5">
                  +91 6360 911 344
                </a>
              </div>
            </div>

            {/* Availability badge */}
            <div className="reveal-up flex flex-col gap-2">
              <Label>Status</Label>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span
                  className="text-xs font-bold uppercase tracking-widest text-green-500"
                  style={{ fontFamily: 'DM Mono, monospace' }}
                >
                  Available for Internships
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-10 px-[8%] text-left border-t border-gray-100 flex justify-between items-center flex-wrap gap-4"
        style={{ fontFamily: 'DM Mono, monospace' }}
      >
        <Label>&copy; 2025 Sandesh Mahajan</Label>
        <Label>Intentionally Crafted</Label>
        <Label>Kalaburagi · Karnataka · IN</Label>
      </footer>

    </main>
  );
}