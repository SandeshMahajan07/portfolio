'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  // TypeScript Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // GSAP Context ensures everything cleans up properly and works in React
    let ctx = gsap.context(() => {
      
      // 1. HERO ANIMATION (Reveal with Skew)
      gsap.from(".hero-text", {
        y: 150,
        skewY: 7,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out"
      });

      // 2. HORIZONTAL SCROLL FOR PROJECTS
      if (horizontalRef.current) {
        const totalWidth = horizontalRef.current.scrollWidth;
        
        gsap.to(horizontalRef.current, {
          x: () => -(totalWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: ".projects-trigger",
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => "+=" + (totalWidth),
            invalidateOnRefresh: true,
          }
        });
      }

      // 3. FADE IN ABOUT TEXT
      gsap.from(".about-animate", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".about-animate",
          start: "top 80%",
        }
      });

    }, containerRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <main ref={containerRef} className="bg-white text-black overflow-x-hidden">
      
      {/* SECTION 1: HERO */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="overflow-hidden">
          <h1 className="hero-text text-[12vw] font-bold tracking-tighter leading-[0.8] uppercase">
            Sandesh <br /> <span className="italic font-serif font-light text-gray-400 lowercase">Mahajan</span>
          </h1>
        </div>
        <p className="hero-text mt-10 text-xs md:text-sm tracking-[0.5em] uppercase text-gray-400 font-medium">
          Full-Stack Developer &bull; CSE @ PDA College &bull; Problem Solver
        </p>
      </section>

      {/* SECTION 2: THE PHILOSOPHY */}
      <section className="h-screen flex flex-col items-center justify-center px-[10%]">
        <h2 className="about-animate text-[4vw] font-light leading-tight tracking-tight max-w-6xl text-center">
          Crafting <span className="italic font-serif">intelligent</span> workflows and <br /> 
          <span className="italic font-serif text-gray-400">scalable</span> architectures with Python, Flask, and React.
        </h2>
        <div className="about-animate mt-16 grid grid-cols-2 md:grid-cols-4 gap-12 text-[9px] tracking-[0.3em] uppercase text-gray-400 font-bold border-t border-gray-100 pt-10">
           <span>Python / Java / C++</span>
           <span>Node.js / Express</span>
           <span>SQL / DBMS</span>
           <span>Data Structures</span>
        </div>
      </section>

      {/* SECTION 3: PROJECTS (Horizontal Scroll Area) */}
      <div className="projects-trigger relative bg-white">
        <div ref={horizontalRef} className="flex h-screen w-max bg-white">
          
          {/* Slide 1: Title */}
          <div className="w-[100vw] h-screen flex items-center justify-center flex-shrink-0">
             <h2 className="text-[15vw] font-bold tracking-tighter uppercase">Selected Works</h2>
          </div>

          {/* Slide 2: HC & Billing Portal */}
          <div className="w-[85vw] h-screen flex flex-col justify-center px-20 flex-shrink-0">
             <div className="w-full aspect-video bg-gray-50 border border-gray-100 rounded-sm mb-8 flex items-center justify-center group overflow-hidden">
                <span className="text-gray-300 text-[10px] tracking-[0.5em] uppercase group-hover:scale-110 transition-transform duration-500">Internal Billing Infrastructure</span>
             </div>
             <h3 className="text-5xl font-bold uppercase tracking-tighter">HC & Billing Portal</h3>
             <p className="text-xl text-gray-500 font-serif italic mt-3 max-w-2xl">
               Automated manual workflows and integrated Chart.js for data-driven analytics.
             </p>
             <div className="flex gap-6 mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
                <span>Flask</span> <span>RESTful API</span> <span>JavaScript</span>
             </div>
          </div>

          {/* Slide 3: Tech Olympics */}
          <div className="w-[85vw] h-screen flex flex-col justify-center px-20 flex-shrink-0">
             <div className="w-full aspect-video bg-gray-50 border border-gray-100 rounded-sm mb-8 flex items-center justify-center group overflow-hidden">
                <span className="text-gray-300 text-[10px] tracking-[0.5em] uppercase group-hover:scale-110 transition-transform duration-500">1st Prize Achievement</span>
             </div>
             <h3 className="text-5xl font-bold uppercase tracking-tighter">Tech Olympics</h3>
             <p className="text-xl text-gray-500 font-serif italic mt-3 max-w-2xl">
               State Level Winner at the 20th ISTE Karnataka Convention. Focused on algorithmic problem solving.
             </p>
             <div className="flex gap-6 mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
                <span>Competitive Programming</span> <span>Problem Solving</span>
             </div>
          </div>

          {/* Slide 4: Zomato Clone */}
          <div className="w-[85vw] h-screen flex flex-col justify-center px-20 flex-shrink-0">
             <div className="w-full aspect-video bg-gray-50 border border-gray-100 rounded-sm mb-8 flex items-center justify-center group overflow-hidden">
                <span className="text-gray-300 text-[10px] tracking-[0.5em] uppercase group-hover:scale-110 transition-transform duration-500">Responsive UI Design</span>
             </div>
             <h3 className="text-5xl font-bold uppercase tracking-tighter">Zomato Clone</h3>
             <p className="text-xl text-gray-500 font-serif italic mt-3 max-w-2xl">
               A pixel-perfect landing page clone focusing on frontend precision and responsive layouts.
             </p>
             <div className="flex gap-6 mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
                <span>HTML5</span> <span>CSS3</span> <span>UI Engineering</span>
             </div>
          </div>

        </div>
      </div>

      {/* SECTION 4: CONTACT */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="about-animate text-[10px] tracking-[0.5em] uppercase text-gray-400 mb-8">Available for Internships</p>
        <h2 className="about-animate text-[12vw] font-bold tracking-tighter uppercase leading-none mb-12">
          Let's <br /> <span className="italic font-serif font-light text-gray-300 lowercase">Connect</span>
        </h2>
        <div className="about-animate flex flex-col items-center gap-8">
          <a href="mailto:sandeshmahajan422@gmail.com" className="text-xl md:text-2xl tracking-tighter border-b border-black pb-2 hover:text-gray-400 transition-all">
            sandeshmahajan422@gmail.com
          </a>
          <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
            <a href="https://linkedin.com/in/sandesh-mahajan" target="_blank" className="hover:text-black transition-colors">LinkedIn</a>
            <a href="https://github.com/SandeshMahajan07" target="_blank" className="hover:text-black transition-colors">GitHub</a>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-[9px] tracking-[0.8em] uppercase text-gray-300">
        &copy; 2025 Sandesh Mahajan &bull; Handcrafted with Intent
      </footer>

    </main>
  );
}