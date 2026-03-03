'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image'; // For optimized images
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      
      // 1. HERO ANIMATION
      gsap.from(".hero-line", {
        y: 200,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out"
      });

      // 2. IMAGE PARALLAX (The "Me" photo)
      gsap.to(".me-image", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: ".me-container",
          start: "top bottom",
          scrub: true
        }
      });

      // 3. HORIZONTAL SCROLL
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
            end: () => "+=" + totalWidth,
            invalidateOnRefresh: true,
          }
        });
      }

      // 4. REVEAL ELEMENTS
      gsap.utils.toArray('.reveal-up').forEach((el: any) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="!bg-white !text-black overflow-x-hidden">
      
      {/* SECTION 1: HERO */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-4 relative">
        <div className="absolute top-20 right-[10%] text-[10px] tracking-[0.8em] uppercase text-gray-200 rotate-90 origin-right">
          Portfolio — 2025
        </div>
        
        <div className="overflow-hidden">
          <h1 className="hero-line text-[14vw] font-bold tracking-tighter leading-[0.8] uppercase">
            Sandesh
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="hero-line text-[14vw] font-bold tracking-tighter leading-[0.8] uppercase italic font-serif font-light text-gray-300">
            Mahajan
          </h1>
        </div>
        <p className="hero-line mt-10 text-[10px] tracking-[0.5em] uppercase text-gray-400 font-bold">
          Systems Builder &bull; Engineering with Intent
        </p>
      </section>

      {/* SECTION 2: THE PHILOSOPHY (Visual + Personal) */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-[10%] py-32 gap-20">
        <div className="w-full md:w-1/2 space-y-12">
          <span className="reveal-up text-[10px] tracking-[0.4em] uppercase text-gray-400 font-bold">Introduction</span>
          <h2 className="reveal-up text-[5vw] font-light leading-tight tracking-tight !text-black">
            I build <span className="italic font-serif">intelligent</span> systems <br /> 
            and <span className="italic font-serif text-gray-400">scalable</span> architectures.
          </h2>
          <p className="reveal-up text-xl text-gray-500 font-serif italic max-w-lg">
            "My focus is on the bridge between raw logic and human interaction, ensuring performance never sacrifices elegance."
          </p>
          
          <div className="reveal-up grid grid-cols-2 gap-10 pt-10 border-t border-gray-100">
             <div>
                <p className="text-[9px] tracking-widest text-gray-300 uppercase font-bold mb-2">Core Stack</p>
                <p className="text-xs font-bold uppercase tracking-widest">Python / Next.js / SQL</p>
             </div>
             <div>
                <p className="text-[9px] tracking-widest text-gray-300 uppercase font-bold mb-2">Education</p>
                <p className="text-xs font-bold uppercase tracking-widest">CSE @ PDA College</p>
             </div>
          </div>
        </div>

        {/* YOUR IMAGE CONTAINER */}
        <div className="me-container w-full md:w-2/5 aspect-[3/4] relative overflow-hidden bg-gray-50 rounded-sm shadow-2xl">
          <div className="me-image absolute inset-0 w-full h-[120%] top-0">
             {/* If you have public/me.jpg, use this. Otherwise it shows a clean gray box. */}
             <Image 
                src="/me.png" 
                alt="Sandesh Mahajan" 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                priority
             />
          </div>
        </div>
      </section>

      {/* SECTION 3: PROJECTS (The Horizontal Journey) */}
      <div className="projects-trigger relative !bg-white">
        <div ref={horizontalRef} className="flex h-screen w-max !bg-white">
          
          <div className="w-[100vw] h-screen flex items-center justify-center flex-shrink-0">
             <h2 className="text-[18vw] font-bold tracking-tighter uppercase !text-black">Works</h2>
          </div>

          {/* Project 1 */}
          <div className="w-[90vw] h-screen flex flex-col justify-center px-24 flex-shrink-0 group">
             <div className="w-full aspect-video bg-gray-50 border border-gray-100 rounded-sm mb-12 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-transparent opacity-50"></div>
                <span className="text-gray-200 text-[10px] tracking-[0.8em] uppercase group-hover:tracking-[1.2em] transition-all duration-1000 z-10">Infrastructure</span>
             </div>
             <div className="flex justify-between items-end">
                <div className="space-y-4">
                  <h3 className="text-7xl font-bold uppercase tracking-tighter">HC & Billing Portal</h3>
                  <p className="text-2xl text-gray-400 font-serif italic">Data-driven Automation</p>
                </div>
                <span className="text-6xl font-serif italic text-gray-50">01</span>
             </div>
          </div>

          {/* Project 2 */}
          <div className="w-[90vw] h-screen flex flex-col justify-center px-24 flex-shrink-0 group">
             <div className="w-full aspect-video bg-gray-50 border border-gray-100 rounded-sm mb-12 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-bl from-gray-100 to-transparent opacity-50"></div>
                <span className="text-gray-200 text-[10px] tracking-[0.8em] uppercase group-hover:tracking-[1.2em] transition-all duration-1000 z-10">Competition</span>
             </div>
             <div className="flex justify-between items-end">
                <div className="space-y-4">
                  <h3 className="text-7xl font-bold uppercase tracking-tighter">Tech Olympics</h3>
                  <p className="text-2xl text-gray-400 font-serif italic">State Level Achievement</p>
                </div>
                <span className="text-6xl font-serif italic text-gray-50">02</span>
             </div>
          </div>

        </div>
      </div>

      {/* SECTION 4: THE CONNECT SECTION */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative">
        <div className="absolute left-10 bottom-20 text-[9px] tracking-[0.5em] uppercase text-gray-200 -rotate-90 origin-left">
          Available for Internships
        </div>
        
        <div className="overflow-hidden">
          <h2 className="reveal-up text-[15vw] font-bold tracking-tighter uppercase leading-[0.8] !text-black">
            Let's
          </h2>
        </div>
        <div className="overflow-hidden mb-16">
          <h2 className="reveal-up text-[15vw] font-bold tracking-tighter uppercase leading-[0.8] !text-black italic font-serif font-light text-gray-300 lowercase">
            Connect
          </h2>
        </div>

        <div className="reveal-up flex flex-col items-center gap-12 mt-10">
          <a href="mailto:sandeshmahajan422@gmail.com" className="text-3xl md:text-5xl font-light tracking-tighter border-b-2 border-black pb-2 hover:text-gray-400 transition-all duration-500">
            sandeshmahajan422@gmail.com
          </a>
          
          <div className="flex gap-16 text-[11px] font-bold uppercase tracking-[0.4em] text-gray-400">
            <a href="https://linkedin.com/in/sandesh-mahajan" target="_blank" className="hover:text-black transition-colors duration-300">LinkedIn</a>
            <a href="https://github.com/SandeshMahajan07" target="_blank" className="hover:text-black transition-colors duration-300">GitHub</a>
          </div>
        </div>
      </section>

      <footer className="py-20 text-center text-[10px] tracking-[1em] uppercase text-gray-200 border-t border-gray-50">
        &copy; 2025 Sandesh Mahajan &bull; Intentionally Crafted
      </footer>

    </main>
  );
}