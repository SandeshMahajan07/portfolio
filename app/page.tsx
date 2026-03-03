'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      
      // 1. HERO ANIMATION
      gsap.from(".hero-text", {
        y: 150,
        skewY: 7,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out"
      });

      // 2. HORIZONTAL SCROLL FOR PROJECTS
      const totalWidth = horizontalRef.current.scrollWidth;
      gsap.to(horizontalRef.current, {
        x: () => -(totalWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: ".projects-trigger",
          pin: true,
          scrub: 1,
          end: () => "+=" + totalWidth,
          invalidateOnRefresh: true,
        }
      });

      // 3. FADE IN ABOUT TEXT
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

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-white text-black">
      
      {/* SECTION 1: HERO (Siddhartha Style) */}
      <section className="h-screen flex flex-col items-center justify-center text-center">
        <div className="overflow-hidden">
          <h1 className="hero-text text-[12vw] font-bold tracking-tighter leading-[0.8] uppercase">
            Sandesh <br /> <span className="italic font-serif font-light text-gray-400">Mahajan</span>
          </h1>
        </div>
        <p className="hero-text mt-10 text-xs tracking-[0.5em] uppercase text-gray-400">
          Systems Builder &bull; Engineering with Intent
        </p>
      </section>

      {/* SECTION 2: THE PHILOSOPHY (Clean White Space) */}
      <section className="h-screen flex items-center justify-center px-[10%]">
        <h2 className="about-text text-[5vw] font-light leading-tight tracking-tight max-w-6xl text-center">
          Building <span className="italic font-serif">robust</span> backends and <br /> 
          <span className="italic font-serif">seamless</span> digital experiences <br /> 
          for the next generation of web.
        </h2>
      </section>

      {/* SECTION 3: PROJECTS (The Horizontal Scroll) */}
      <div className="projects-trigger relative">
        <div ref={horizontalRef} className="horizontal-container bg-white">
          
          {/* Project Title Slide */}
          <div className="min-w-[100vw] h-screen flex items-center justify-center">
             <h2 className="text-[15vw] font-bold tracking-tighter uppercase">Works</h2>
          </div>

          {/* Project 1: HC & Billing */}
          <div className="min-w-[80vw] h-screen flex flex-col justify-center px-20">
             <div className="w-full aspect-video bg-gray-100 rounded-sm mb-8"></div>
             <h3 className="text-5xl font-bold uppercase tracking-tighter">HC & Billing Portal</h3>
             <p className="text-xl text-gray-500 font-serif italic mt-2">Automation & Analytics</p>
          </div>

          {/* Project 2: Tech Olympics */}
          <div className="min-w-[80vw] h-screen flex flex-col justify-center px-20">
             <div className="w-full aspect-video bg-gray-100 rounded-sm mb-8"></div>
             <h3 className="text-5xl font-bold uppercase tracking-tighter">Tech Olympics</h3>
             <p className="text-xl text-gray-500 font-serif italic mt-2">State Level Achievement</p>
          </div>

          {/* Project 3: Next Venture */}
          <div className="min-w-[80vw] h-screen flex flex-col justify-center px-20">
             <div className="w-full aspect-video bg-gray-100 rounded-sm mb-8"></div>
             <h3 className="text-5xl font-bold uppercase tracking-tighter">Zomato Clone</h3>
             <p className="text-xl text-gray-500 font-serif italic mt-2">UI Engineering</p>
          </div>

        </div>
      </div>

      {/* SECTION 4: CONTACT (Minimal & Large) */}
      <section className="h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-[10vw] font-bold tracking-tighter uppercase leading-none mb-10">
          Let's <br /> <span className="italic font-serif font-light text-gray-400 lowercase">Talk</span>
        </h2>
        <a href="mailto:sandeshmahajan422@gmail.com" className="text-xl tracking-widest uppercase border-b border-black pb-2 hover:opacity-50 transition-all">
          Email Me
        </a>
      </section>

    </main>
  );
}