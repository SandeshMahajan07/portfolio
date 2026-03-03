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
    tags: ['Python', 'Flask', 'Chart.js', 'SQL'],
    img: null, // replace with '/images/project1.jpg'
  },
  {
    id: '02',
    title: 'Zomato Clone',
    sub: 'Front-End Engineering',
    category: 'Interface',
    tags: ['HTML', 'CSS', 'Responsive'],
    img: null, // replace with '/images/project2.jpg'
  },
  {
    id: '03',
    title: 'Tech Olympics',
    sub: 'State Level — 1st Prize',
    category: 'Achievement',
    tags: ['ISTE Karnataka', 'New Horizon College'],
    img: null,
  },
];

const SKILLS = [
  { label: 'Languages',  value: 'Python · JS · TS · C++ · Java · SQL' },
  { label: 'Web',        value: 'React · Next.js · Node.js · Flask' },
  { label: 'Tools',      value: 'Git · VS Code · Jupyter · Chart.js' },
  { label: 'CS Core',    value: 'DSA · OOP · DBMS · OS · REST APIs' },
];

const EXPERIENCE = [
  {
    period: '07.2025 — 09.2025',
    role: 'Software Developer Intern',
    company: 'Cadmaxx Solutions Pvt Ltd',
    location: 'Bangalore',
    desc: 'Built and deployed a full HC & Billing Portal automating manual workflows with real-time data analytics dashboards.',
  },
  {
    period: '11.2023 — 03.2024',
    role: 'Full Stack Web Developer Intern',
    company: 'Dev Town',
    location: 'Kalaburagi',
    desc: 'Developed and shipped responsive full-stack web applications end-to-end using modern JavaScript frameworks.',
  },
];

const CERTS = [
  ['Full Stack Web Development',        'Dev Town'],
  ['HTML and CSS',                       'Certiport'],
  ['Python & Artificial Intelligence',  'Dev Town'],
  ['Backend Web Dev — Node.js & Express','AWS'],
];

/* ─── COMPONENT ──────────────────────────────────────────── */
export default function Home() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const imgMaskRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      // Hero lines
      gsap.from('.hero-line', {
        y: 120,
        duration: 1.4,
        stagger: 0.18,
        ease: 'power4.out',
        delay: 0.2,
      });

      // Hero sub
      gsap.from('.hero-sub', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.9,
        ease: 'power3.out',
      });

      // Parallax photo
      gsap.to('.me-image', {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: '.me-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Horizontal scroll
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

      // Reveal elements
      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      });

    }, containerRef);

    // Cursor-follow image on hero
    const mask        = imgMaskRef.current;
    const heroSection = document.querySelector('.hero-section') as HTMLElement | null;

    let cleanupHero = () => {};

    if (mask && heroSection) {
      let mx = 0, my = 0, cx = 0, cy = 0;
      let raf: number;

      const onMove  = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
      const lerp    = () => {
        cx += (mx - cx) * 0.08;
        cy += (my - cy) * 0.08;
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

    return () => {
      ctx.revert();
      cleanupHero();
    };
  }, []);

  return (
    <main ref={containerRef} className="bg-white text-black overflow-x-hidden">

      {/* ── Cursor-follow image mask ── */}
      <div ref={imgMaskRef} className="hero-image-mask">
        <Image
          src="/me.png"
          alt="Sandesh Mahajan"
          fill
          className="object-cover grayscale"
          priority
        />
      </div>

      {/* ══════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════ */}
      <section className="hero-section h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden select-none">

        {/* Side label */}
        <div
          className="absolute top-1/2 right-8 -translate-y-1/2 text-[9px] tracking-[0.8em] uppercase text-gray-300 rotate-90 origin-center hidden md:block"
          style={{ fontFamily: 'DM Mono, monospace' }}
        >
          Portfolio — 2025
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-gray-300 animate-pulse" />
          <span
            className="text-[8px] tracking-[0.5em] uppercase text-gray-300"
            style={{ fontFamily: 'DM Mono, monospace' }}
          >
            Scroll
          </span>
        </div>

        <div className="overflow-hidden">
          <h1
            className="hero-line text-[clamp(4rem,14vw,13rem)] font-bold tracking-tighter leading-[0.85] uppercase"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Sandesh
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1
            className="hero-line text-[clamp(4rem,14vw,13rem)] tracking-tighter leading-[0.85] uppercase italic text-gray-200"
            style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}
          >
            Mahajan
          </h1>
        </div>

        <p
          className="hero-sub mt-8 text-[10px] tracking-[0.5em] uppercase text-gray-400"
          style={{ fontFamily: 'DM Mono, monospace' }}
        >
          Systems Builder &bull; Engineering with Intent
        </p>
      </section>

      {/* ══════════════════════════════════════
          SECTION 2 — ABOUT
      ══════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-[8%] py-28 gap-16 border-t border-gray-50">

        <div className="w-full md:w-1/2 space-y-10">
          <span
            className="reveal-up block text-[9px] tracking-[0.5em] uppercase text-gray-300 font-bold"
            style={{ fontFamily: 'DM Mono, monospace' }}
          >
            Introduction
          </span>

          <h2
            className="reveal-up text-[clamp(2rem,4.5vw,4rem)] font-light leading-tight tracking-tight text-black"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            I build{' '}
            <span className="italic" style={{ fontFamily: 'Playfair Display, serif' }}>
              intelligent
            </span>{' '}
            systems <br />
            and{' '}
            <span className="italic text-gray-300" style={{ fontFamily: 'Playfair Display, serif' }}>
              scalable
            </span>{' '}
            architectures.
          </h2>

          <p
            className="reveal-up text-lg text-gray-400 max-w-md leading-relaxed italic"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            "My focus is on the bridge between raw logic and human interaction —
            ensuring performance never sacrifices elegance."
          </p>

          {/* Quick stats */}
          <div className="reveal-up grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
            {[['8.6', 'CGPA'], ['2+', 'Internships'], ['1st', 'State Prize']].map(([n, l]) => (
              <div key={l}>
                <p className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  {n}
                </p>
                <p className="text-[9px] tracking-widest text-gray-300 uppercase mt-1" style={{ fontFamily: 'DM Mono, monospace' }}>
                  {l}
                </p>
              </div>
            ))}
          </div>

          <div className="reveal-up grid grid-cols-2 gap-8 pt-6 border-t border-gray-100">
            <div>
              <p className="text-[9px] tracking-widest text-gray-300 uppercase font-bold mb-1" style={{ fontFamily: 'DM Mono, monospace' }}>
                Core Stack
              </p>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'DM Mono, monospace' }}>
                Python / Next.js / SQL
              </p>
            </div>
            <div>
              <p className="text-[9px] tracking-widest text-gray-300 uppercase font-bold mb-1" style={{ fontFamily: 'DM Mono, monospace' }}>
                Education
              </p>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'DM Mono, monospace' }}>
                CSE @ PDA College
              </p>
            </div>
          </div>
        </div>

        {/* Photo */}
        <div className="me-container w-full md:w-[38%] aspect-[3/4] relative overflow-hidden bg-gray-50 rounded-sm shadow-2xl shadow-gray-200/80 flex-shrink-0">
          <div className="me-image absolute inset-0 w-full h-[120%] -top-[10%]">
            <Image
              src="/me.png"
              alt="Sandesh Mahajan"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              priority
            />
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10">
            <span className="text-[9px] tracking-[0.4em] uppercase text-white/60" style={{ fontFamily: 'DM Mono, monospace' }}>
              Kalaburagi, IN
            </span>
            <span className="text-[9px] tracking-[0.4em] uppercase text-white/60" style={{ fontFamily: 'DM Mono, monospace' }}>
              2025
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 3 — SKILLS
      ══════════════════════════════════════ */}
      <section className="py-28 px-[8%] border-t border-gray-50">
        <span
          className="reveal-up block text-[9px] tracking-[0.5em] uppercase text-gray-300 mb-12"
          style={{ fontFamily: 'DM Mono, monospace' }}
        >
          Technical Skills
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 max-w-4xl">
          {SKILLS.map((s, i) => (
            <div key={i} className="reveal-up">
              <p className="text-[9px] tracking-[0.4em] uppercase text-gray-300 mb-3" style={{ fontFamily: 'DM Mono, monospace' }}>
                {s.label}
              </p>
              <p className="text-sm text-black tracking-wide leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {s.value}
              </p>
              <div className="mt-3 h-px bg-gray-100 w-full" />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 4 — EXPERIENCE
      ══════════════════════════════════════ */}
      <section className="py-28 px-[8%] border-t border-gray-50">
        <span
          className="reveal-up block text-[9px] tracking-[0.5em] uppercase text-gray-300 mb-12"
          style={{ fontFamily: 'DM Mono, monospace' }}
        >
          Experience
        </span>

        <div className="space-y-0 max-w-3xl">
          {EXPERIENCE.map((e, i) => (
            <div
              key={i}
              className="reveal-up group grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-12 py-10 border-b border-gray-100 hover:border-gray-300 transition-colors duration-500"
            >
              <div className="space-y-1">
                <p className="text-[9px] tracking-[0.4em] uppercase text-gray-300" style={{ fontFamily: 'DM Mono, monospace' }}>
                  {e.period}
                </p>
                <p className="text-[9px] tracking-[0.3em] uppercase text-gray-300" style={{ fontFamily: 'DM Mono, monospace' }}>
                  {e.location}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold tracking-tight" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  {e.role}
                </h3>
                <p className="text-xs tracking-widest uppercase text-gray-400" style={{ fontFamily: 'DM Mono, monospace' }}>
                  {e.company}
                </p>
                <p className="text-sm text-gray-400 leading-relaxed pt-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  {e.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 5 — PROJECTS (Horizontal)
      ══════════════════════════════════════ */}
      <div className="projects-trigger relative bg-white border-t border-gray-50">
        <div ref={horizontalRef} className="flex h-screen w-max bg-white">

          {/* Title card */}
          <div className="w-[50vw] h-screen flex flex-col items-start justify-end px-[8%] pb-20 flex-shrink-0">
            <span
              className="text-[9px] tracking-[0.5em] uppercase text-gray-300 mb-8"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              Selected Works
            </span>
            <h2
              className="text-[clamp(4rem,12vw,11rem)] font-bold tracking-tighter uppercase leading-[0.85] text-black"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Works
            </h2>
          </div>

          {/* Project cards */}
          {PROJECTS.map((p) => (
            <div
              key={p.id}
              className="w-[85vw] h-screen flex flex-col justify-center px-16 flex-shrink-0 group"
            >
              {/* Image area */}
              <div className="w-full aspect-video bg-gray-50 border border-gray-100 rounded-sm mb-10 flex items-center justify-center overflow-hidden relative">
                {p.img ? (
                  <Image src={p.img} alt={p.title} fill className="object-cover" />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-transparent opacity-60" />
                    <span
                      className="text-gray-200 text-[9px] tracking-[0.8em] uppercase group-hover:tracking-[1.2em] transition-all duration-1000 z-10"
                      style={{ fontFamily: 'DM Mono, monospace' }}
                    >
                      {p.category}
                    </span>
                  </>
                )}
              </div>

              <div className="flex justify-between items-end gap-8">
                <div className="space-y-3">
                  <h3
                    className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold uppercase tracking-tighter leading-none"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-xl text-gray-400 italic" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {p.sub}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[8px] tracking-[0.4em] uppercase text-gray-300 border border-gray-100 px-2 py-1"
                        style={{ fontFamily: 'DM Mono, monospace' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span
                  className="text-[5rem] font-light italic text-gray-100 flex-shrink-0"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {p.id}
                </span>
              </div>
            </div>
          ))}

          {/* End card */}
          <div className="w-[40vw] h-screen flex items-center justify-center flex-shrink-0">
            <a
              href="https://github.com/SandeshMahajan07"
              target="_blank"
              rel="noreferrer"
              className="text-[9px] tracking-[0.6em] uppercase text-gray-300 hover:text-black transition-colors border-b border-gray-200 pb-1"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              View all on GitHub →
            </a>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════
          SECTION 6 — CERTIFICATIONS
      ══════════════════════════════════════ */}
      <section className="py-28 px-[8%] border-t border-gray-50">
        <span
          className="reveal-up block text-[9px] tracking-[0.5em] uppercase text-gray-300 mb-12"
          style={{ fontFamily: 'DM Mono, monospace' }}
        >
          Certifications
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-3xl">
          {CERTS.map(([name, issuer], i) => (
            <div
              key={i}
              className="reveal-up flex justify-between items-baseline py-6 border-b border-gray-100 hover:border-gray-400 transition-colors duration-300 pr-8"
            >
              <span className="text-sm font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {name}
              </span>
              <span
                className="text-[9px] tracking-[0.3em] uppercase text-gray-300 flex-shrink-0 ml-4"
                style={{ fontFamily: 'DM Mono, monospace' }}
              >
                {issuer}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 7 — CONNECT
      ══════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative border-t border-gray-50 overflow-hidden">

        <div
          className="absolute left-8 bottom-24 text-[9px] tracking-[0.5em] uppercase text-gray-200 -rotate-90 origin-left hidden md:block"
          style={{ fontFamily: 'DM Mono, monospace' }}
        >
          Available for Internships
        </div>

        <div className="overflow-hidden">
          <h2
            className="reveal-up text-[clamp(4rem,15vw,14rem)] font-bold tracking-tighter uppercase leading-[0.85] text-black"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Let's
          </h2>
        </div>
        <div className="overflow-hidden mb-14">
          <h2
            className="reveal-up text-[clamp(4rem,15vw,14rem)] tracking-tighter uppercase leading-[0.85] text-gray-200 italic"
            style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}
          >
            connect
          </h2>
        </div>

        <div className="reveal-up flex flex-col items-center gap-10 mt-4">
          <a
            href="mailto:sandeshmahajan422@gmail.com"
            className="text-lg md:text-3xl font-light tracking-tight border-b border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-all duration-500"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            sandeshmahajan422@gmail.com
          </a>
          <div
            className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400"
            style={{ fontFamily: 'DM Mono, monospace' }}
          >
            <a
              href="https://linkedin.com/in/sandesh-mahajan-97a233281"
              target="_blank"
              rel="noreferrer"
              className="hover:text-black transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/SandeshMahajan07"
              target="_blank"
              rel="noreferrer"
              className="hover:text-black transition-colors duration-300"
            >
              GitHub
            </a>
            <a
              href="tel:+916360911344"
              className="hover:text-black transition-colors duration-300"
            >
              +91 6360 911 344
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-16 text-center text-[9px] tracking-[1em] uppercase text-gray-200 border-t border-gray-50"
        style={{ fontFamily: 'DM Mono, monospace' }}
      >
        &copy; 2025 Sandesh Mahajan &bull; Intentionally Crafted
      </footer>

    </main>
  );
}