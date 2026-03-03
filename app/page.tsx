'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Register Plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // 2. Use gsap.context for safe React cleanup
    let ctx = gsap.context(() => {
      
      // Hero Animation
      gsap.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5,
        stagger: 0.2
      });

      // Section Reveals
      const sections = gsap.utils.toArray('.reveal-section');
      sections.forEach((section) => {
        const element = section as HTMLElement; // Explicitly cast to HTMLElement
        gsap.from(element, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      });

    }, containerRef); // Scope animations to the container

    // 3. Cleanup function (Crucial for Vercel/Next.js)
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="overflow-hidden">
          <h1 className="hero-title text-5xl md:text-9xl font-extralight tracking-tighter uppercase leading-none">
            Sandesh Mahajan
          </h1>
        </div>
        <p className="hero-title mt-8 text-gray-500 text-sm md:text-base tracking-[0.4em] uppercase font-light">
          Systems Builder • CS Student • Engineering the Future
        </p>
        <div className="absolute bottom-10 animate-pulse text-gray-600 text-[10px] tracking-[0.5em] uppercase">
          Scroll to explore the journey
        </div>
      </section>

      {/* 2. THE SUMMARY (The Vision) */}
      <section className="reveal-section min-h-screen flex flex-col justify-center max-w-5xl mx-auto py-20 px-6">
        <span className="text-gray-500 text-xs tracking-widest uppercase mb-4">01 — The Narrative</span>
        <h2 className="text-3xl md:text-5xl font-light leading-tight mb-10">
          Bridging <span className="text-gray-500">Academic Foundation</span> with <br /> 
          Practical <span className="text-gray-400 italic">Engineering.</span>
        </h2>
        <p className="text-gray-400 text-lg md:text-2xl leading-relaxed font-light max-w-3xl">
          Currently pursuing B.E at PDA College of Engineering, I focus on the intersection of 
          Python, Flask, and RESTful design. I recently automated complex manual workflows for 
          billing departments, transforming data into interactive visualizations.
        </p>
      </section>

      {/* 3. EXPERTISE (Skills Grouped) */}
      <section className="reveal-section min-h-screen flex flex-col justify-center py-20 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto w-full">
          <span className="text-gray-500 text-xs tracking-widest uppercase mb-10 block">02 — Expertise</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <h3 className="text-white text-lg mb-6 tracking-widest uppercase font-semibold">Languages</h3>
              <ul className="text-gray-500 space-y-3 font-light">
                <li>Python / Flask</li>
                <li>JavaScript / TypeScript</li>
                <li>C / C++ / Java</li>
                <li>SQL</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg mb-6 tracking-widest uppercase font-semibold">Development</h3>
              <ul className="text-gray-500 space-y-3 font-light">
                <li>React.js / Next.js</li>
                <li>Node.js / Express</li>
                <li>RESTful API Design</li>
                <li>Data Visualization (Chart.js)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg mb-6 tracking-widest uppercase font-semibold">Fundamentals</h3>
              <ul className="text-gray-500 space-y-3 font-light">
                <li>Data Structures & Algorithms</li>
                <li>DBMS & OS</li>
                <li>Object Oriented Programming</li>
                <li>Data Analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RECOGNITION (Achievements) */}
      <section className="reveal-section h-screen flex flex-col justify-center items-center text-center px-6">
        <span className="text-gray-500 text-xs tracking-widest uppercase mb-8">03 — Recognition</span>
        <h2 className="text-4xl md:text-7xl font-extralight italic tracking-tighter mb-6">
          "Winner: Tech Olympics"
        </h2>
        <p className="text-gray-500 text-sm tracking-widest uppercase">
          State Level Convention • ISTE Karnataka
        </p>
      </section>

      {/* 5. EXPERIENCE TIMELINE */}
      <section className="reveal-section min-h-screen py-20 px-6 max-w-5xl mx-auto">
        <span className="text-gray-500 text-xs tracking-widest uppercase mb-20 block text-center">04 — Timeline</span>
        <div className="space-y-32">
          <div className="flex flex-col md:flex-row justify-between border-t border-white/10 pt-10">
            <span className="text-gray-500 mb-4 md:mb-0 uppercase tracking-widest text-xs">2025 — Present</span>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-light uppercase">Cadmaxx Solutions Pvt Ltd</h3>
              <p className="text-gray-500 mt-2 italic font-light">Software Developer Intern • Bangalore</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between border-t border-white/10 pt-10">
            <span className="text-gray-500 mb-4 md:mb-0 uppercase tracking-widest text-xs">2023 — 2024</span>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-light uppercase">Dev Town</h3>
              <p className="text-gray-500 mt-2 italic font-light">Full stack Web Developer Intern</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CALL */}
      <section className="reveal-section h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl md:text-5xl font-light mb-12 tracking-tight">
          Interested in <span className="text-gray-500">collaboration?</span>
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          <a href="mailto:sandeshmahajan422@gmail.com" className="px-12 py-5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest text-[10px]">
            Email Me
          </a>
          <a href="https://github.com/SandeshMahajan07" target="_blank" className="px-12 py-5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest text-[10px]">
            GitHub
          </a>
        </div>
      </section>

    </main>
  );
}