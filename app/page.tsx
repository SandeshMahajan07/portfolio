'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Create the GSAP context for safe React cleanup
    let ctx = gsap.context(() => {
      
      // 1. HERO REVEAL
      gsap.from(".hero-text", {
        y: 150,
        skewY: 7,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out"
      });

      // 2. HORIZONTAL SCROLL LOGIC
      // We check if the ref exists before using it
      if (horizontalRef.current) {
        const totalWidth = horizontalRef.current.scrollWidth;
        
        gsap.to(horizontalRef.current, {
          x: () => -(totalWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: ".projects-trigger",
            pin: true,
            scrub: 1, // Smoothly ties the animation to the scrollbar
            start: "top top",
            end: () => "+=" + totalWidth,
            invalidateOnRefresh: true,
          }
        });
      }

      // 3. PHILOSOPHY TEXT FADE
      gsap.from(".about-text", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 80%",
        }
      });

    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <main ref={containerRef} className="bg-white text-black overflow-x-hidden">
      
      {/* SECTION 1: HERO (Siddhartha Style) */}
      <section className="h-screen flex flex-col items-center justify-center text-center">
        <div className="overflow-hidden">
          <h1 className="hero-text text-[12vw] font-bold tracking-tighter leading-[0.8] uppercase">
            Sandesh <br /> 
            <span className="italic font-serif font-light text-gray-300 lowercase">Mahajan</span>
          </h1>
        </div>
        <p className="hero-text mt-10 text-[10px] tracking-[0.5em] uppercase text-gray-400 font-medium">
          Systems Builder &bull; Engineering with Intent
        </p>
      </section>

      {/* SECTION 2: THE PHILOSOPHY */}
      <section className="h-screen flex items-center justify-center px-[10%] bg-white">
        <h2 className="about-text text-[5vw] font-light leading-tight tracking-tight max-w-6xl text-center">
          Building <span className="italic font-serif">robust</span> backends and <br /> 
          <span className="italic font-serif text-gray-400">seamless</span> digital experiences <br /> 
          for the next generation of web.
        </h2>
      </section>

      {/* SECTION 3: PROJECTS (Horizontal Scroll) */}
      <div className="projects-trigger relative bg-white">
        <div ref={horizontalRef} className="flex h-screen w-fit bg-white">
          
          {/* Work Intro Slide */}
          <div className="w-[100vw] h-screen flex items-center justify-center flex-shrink-0">
             <h2 className="text-[18vw] font-bold tracking-tighter uppercase">Works</h2>
          </div>

          {/* Project 1: HC & Billing */}
          <div className="w-[90vw] h-screen flex flex-col justify-center px-20 flex-shrink-0">
             <div className="w-full aspect-video bg-gray-50 border border-gray-100 rounded-sm mb-12 flex items-center justify-center">
                <span className="text-gray-300 uppercase tracking-widest text-xs">Project Image Placeholder</span>
             </div>
             <div className="flex justify-between items-end">
                <div>
                   <h3 className="text-6xl font-bold uppercase tracking-tighter">HC & Billing Portal</h3>
                   <p className="text-2xl text-gray-400 font-serif italic mt-2">Automation & Analytics</p>
                </div>
                <div className="text-sm tracking-widest text-gray-400 uppercase">01</div>
             </div>
          </div>

          {/* Project 2: Tech Olympics */}
          <div className="w-[90vw] h-screen flex flex-col justify-center px-20 flex-shrink-0">
             <div className="w-full aspect-video bg-gray-50 border border-gray-100 rounded-sm mb-12 flex items-center justify-center">
                <span className="text-gray-300 uppercase tracking-widest text-xs">Project Image Placeholder</span>
             </div>
             <div className="flex justify-between items-end">
                <div>
                   <h3 className="text-6xl font-bold uppercase tracking-tighter">Tech Olympics</h3>
                   <p className="text-2xl text-gray-400 font-serif italic mt-2">Award Winning System</p>
                </div>
                <div className="text-sm tracking-widest text-gray-400 uppercase">02</div>
             </div>
          </div>

        </div>
      </div>

      {/* SECTION 4: CONTACT */}
      <section className="h-screen flex flex-col items-center justify-center text-center bg-white">
        <h2 className="text-[12vw] font-bold tracking-tighter uppercase leading-none mb-16">
          Let's <br /> <span className="italic font-serif font-light text-gray-300 lowercase">Talk</span>
        </h2>
        <div className="flex gap-12">
            <a href="mailto:sandeshmahajan422@gmail.com" className="text-sm tracking-[0.4em] uppercase border-b border-black pb-2 hover:text-gray-400 transition-all">
            Email
            </a>
            <a href="https://github.com/SandeshMahajan07" target="_blank" className="text-sm tracking-[0.4em] uppercase border-b border-black pb-2 hover:text-gray-400 transition-all">
            GitHub
            </a>
        </div>
      </section>

      <footer className="py-10 bg-white text-center text-gray-300 text-[10px] tracking-[0.8em] uppercase">
        &copy; 2025 Sandesh Mahajan
      </footer>

    </main>
  );
}