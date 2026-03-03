'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2,
        stagger: 0.1
      });

      // Section Reveals
      const sections = gsap.utils.toArray('.reveal-section');
      sections.forEach((section) => {
        const element = section as HTMLElement;
        gsap.from(element, {
          opacity: 0,
          y: 30,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative bg-white text-[#111111]">
      
      {/* 1. HERO SECTION */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="overflow-hidden">
          <h1 className="hero-title text-6xl md:text-[10rem] font-light tracking-tighter uppercase leading-[0.85]">
            Sandesh <br /> Mahajan
          </h1>
        </div>
        <p className="hero-title mt-12 text-[#888888] text-[10px] md:text-xs tracking-[0.6em] uppercase font-medium">
          Systems Builder &bull; Computer Science &bull; Engineering the Future
        </p>
        <div className="absolute bottom-12 animate-bounce text-[#bbbbbb] text-[9px] tracking-[0.4em] uppercase">
          Scroll to explore
        </div>
      </section>

      {/* 2. THE SUMMARY */}
      <section className="reveal-section min-h-screen flex flex-col justify-center max-w-5xl mx-auto py-20 px-6">
        <span className="text-[#aaaaaa] text-[10px] tracking-[0.3em] uppercase mb-6">01 &mdash; The Vision</span>
        <h2 className="text-4xl md:text-6xl font-light leading-[1.1] tracking-tight mb-12">
          Bridging <span className="text-[#888888]">Theoretical Logic</span> <br /> 
          with <span className="italic">Functional Systems.</span>
        </h2>
        <p className="text-[#555555] text-xl md:text-3xl leading-relaxed font-light max-w-4xl">
          Currently pursuing B.E at PDA College of Engineering. Specialized in 
          Python, Flask, and RESTful design. I build tools that turn complex 
          manual workflows into automated, data-driven experiences.
        </p>
      </section>

      {/* 3. EXPERTISE GRID */}
      <section className="reveal-section min-h-screen flex flex-col justify-center py-20 px-6 border-y border-black/[0.03]">
        <div className="max-w-6xl mx-auto w-full">
          <span className="text-[#aaaaaa] text-[10px] tracking-[0.3em] uppercase mb-16 block text-center">02 &mdash; Technical Expertise</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            <div>
              <h3 className="text-[#111111] text-xs mb-8 tracking-[0.2em] uppercase font-bold">Languages</h3>
              <ul className="text-[#666666] space-y-4 text-lg font-light">
                <li>Python / Flask</li>
                <li>JavaScript / TypeScript</li>
                <li>C / C++ / Java</li>
                <li>SQL</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#111111] text-xs mb-8 tracking-[0.2em] uppercase font-bold">Development</h3>
              <ul className="text-[#666666] space-y-4 text-lg font-light">
                <li>React.js / Next.js</li>
                <li>Node.js / Express</li>
                <li>RESTful API Design</li>
                <li>Chart.js Visualization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#111111] text-xs mb-8 tracking-[0.2em] uppercase font-bold">Fundamentals</h3>
              <ul className="text-[#666666] space-y-4 text-lg font-light">
                <li>Data Structures & Algorithms</li>
                <li>DBMS & Operating Systems</li>
                <li>Object Oriented Design</li>
                <li>Data Analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RECOGNITION */}
      <section className="reveal-section h-screen flex flex-col justify-center items-center text-center px-6">
        <span className="text-[#aaaaaa] text-[10px] tracking-[0.3em] uppercase mb-10">03 &mdash; Recognition</span>
        <h2 className="text-5xl md:text-8xl font-light italic tracking-tighter text-[#111111] mb-6">
          "Winner: Tech Olympics"
        </h2>
        <p className="text-[#888888] text-[10px] tracking-[0.4em] uppercase">
          ISTE Karnataka State Level Convention
        </p>
      </section>

      {/* 5. TIMELINE */}
      <section className="reveal-section min-h-screen py-24 px-6 max-w-5xl mx-auto">
        <span className="text-[#aaaaaa] text-[10px] tracking-[0.3em] uppercase mb-24 block text-center">04 &mdash; Experience</span>
        <div className="space-y-32">
          <div className="flex flex-col md:flex-row justify-between border-t border-black/10 pt-12">
            <span className="text-[#aaaaaa] mb-4 md:mb-0 uppercase tracking-widest text-[10px]">2025 &mdash; PRESENT</span>
            <div className="md:w-2/3">
              <h3 className="text-3xl font-light uppercase tracking-tight">Cadmaxx Solutions</h3>
              <p className="text-[#777777] mt-3 text-lg font-light italic">Software Developer Intern &bull; Bangalore</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between border-t border-black/10 pt-12">
            <span className="text-[#aaaaaa] mb-4 md:mb-0 uppercase tracking-widest text-[10px]">2023 &mdash; 2024</span>
            <div className="md:w-2/3">
              <h3 className="text-3xl font-light uppercase tracking-tight">Dev Town</h3>
              <p className="text-[#777777] mt-3 text-lg font-light italic">Full stack Web Developer Intern</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT */}
      <section className="reveal-section h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl md:text-6xl font-light mb-16 tracking-tight">
          Let's build the <span className="text-[#888888]">future</span> together.
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <a href="mailto:sandeshmahajan422@gmail.com" className="group relative px-16 py-6 border border-black/10 rounded-full overflow-hidden transition-all duration-500 hover:border-black">
            <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] group-hover:text-white transition-colors duration-500">Email Me</span>
            <div className="absolute inset-0 bg-black translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500"></div>
          </a>
          <a href="https://github.com/SandeshMahajan07" target="_blank" className="px-16 py-6 border border-black/10 rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-500">
            GitHub
          </a>
        </div>
      </section>

      <footer className="py-10 text-center text-[#cccccc] text-[9px] uppercase tracking-[0.5em]">
        &copy; {new Date().getFullYear()} Sandesh Mahajan
      </footer>

    </main>
  );
}