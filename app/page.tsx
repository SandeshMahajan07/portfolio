'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animation for Hero Text
    gsap.from(".hero-title", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      delay: 0.5
    });

    // Animation for sections on scroll
    const sections = gsap.utils.toArray('.reveal-section');
    sections.forEach((section: any) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });
  }, []);

  return (
    <main ref={containerRef} className="relative">
      
      {/* 1. CINEMATIC HERO */}
      <section className="h-screen flex flex-col items-center justify-center text-center">
        <div className="text-reveal">
          <h1 className="hero-title text-5xl md:text-8xl font-light tracking-tighter uppercase">
            Sandesh Mahajan
          </h1>
        </div>
        <p className="hero-title mt-6 text-gray-400 text-lg md:text-xl font-light tracking-widest uppercase opacity-80">
          Systems Builder • Experience Designer
        </p>
        <div className="absolute bottom-10 animate-bounce text-gray-500 text-sm tracking-widest uppercase">
          Scroll to explore
        </div>
      </section>

      {/* 2. THE STORY (About) */}
      <section className="reveal-section h-screen flex flex-col md:flex-row items-center justify-between gap-20">
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl md:text-6xl font-light mb-8">The Journey</h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light">
            I don't just write code; I engineer systems. From complex backend architectures 
            to hosting immersive tech events, my focus is on the bridge between 
            logic and human experience.
          </p>
        </div>
        {/* Placeholder for your Image */}
        <div className="w-full md:w-1/2 aspect-square bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
           <span className="text-gray-600 uppercase tracking-widest text-sm text-center p-10">
             [ Your Image - Story Moment ]
           </span>
        </div>
      </section>

      {/* 3. SELECTED WORKS (Preview) */}
      <section className="reveal-section min-h-screen py-20">
        <div className="flex justify-between items-end mb-20">
          <h2 className="text-5xl md:text-7xl font-light">Works</h2>
          <span className="text-gray-500 text-sm uppercase tracking-widest mb-4">01 — 04</span>
        </div>
        
        {/* We will map Supabase data here later */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <div className="group cursor-pointer">
              <div className="aspect-video bg-white/5 border border-white/10 rounded-xl mb-4 overflow-hidden relative">
                 <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors duration-500"></div>
                 <div className="flex items-center justify-center h-full text-gray-600 uppercase text-xs tracking-[0.3em]">Project Preview</div>
              </div>
              <h3 className="text-2xl font-light">Project Alpha</h3>
              <p className="text-gray-500 text-sm mt-2 font-light">GitHub • Render • Next.js</p>
           </div>
           {/* Repeat for other placeholders... */}
        </div>
      </section>

      {/* 4. CONTACT PORTAL */}
      <section className="reveal-section h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl md:text-7xl font-light mb-10">Ready to build?</h2>
        <a href="mailto:your-email@example.com" className="px-10 py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest text-sm">
          Get in touch
        </a>
      </section>

    </main>
  );
}