'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // 1. CUSTOM CURSOR FOLLOW
      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power3.out"
        });
        
        // Image follows mouse in Hero
        gsap.to(heroImageRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.8,
          ease: "power2.out"
        });
      };
      window.addEventListener('mousemove', moveCursor);

      // 2. HERO HOVER REVEAL
      const heroTitle = document.querySelector('.hero-title-container');
      heroTitle?.addEventListener('mouseenter', () => {
        gsap.to(heroImageRef.current, { opacity: 1, scale: 1, duration: 0.5 });
        gsap.to(cursorRef.current, { scale: 4, duration: 0.3 });
      });
      heroTitle?.addEventListener('mouseleave', () => {
        gsap.to(heroImageRef.current, { opacity: 0, scale: 0.8, duration: 0.5 });
        gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
      });

      // 3. HORIZONTAL PROJECTS
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
          }
        });
      }

      // 4. MARQUEE ANIMATION
      gsap.to(".marquee-inner", {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "none"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="!bg-white !text-black overflow-x-hidden">
      <div ref={cursorRef} className="cursor-ball hidden md:block"></div>
      
      {/* HIDDEN REVEAL IMAGE */}
      <div ref={heroImageRef} className="hero-image-mask hidden md:block">
        <Image src="/me.jpg" alt="Reveal" fill className="object-cover grayscale" />
      </div>

      {/* SECTION 1: HERO */}
      <section className="h-screen flex flex-col items-center justify-center text-center relative z-10 hero-title-container">
        <div className="overflow-hidden">
          <h1 className="text-[14vw] font-bold tracking-tighter leading-[0.8] uppercase cursor-pointer">
            Sandesh
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="text-[14vw] font-bold tracking-tighter leading-[0.8] uppercase italic font-serif font-light text-gray-200 lowercase cursor-pointer">
            Mahajan
          </h1>
        </div>
        <p className="mt-10 text-[10px] tracking-[0.5em] uppercase text-gray-400 font-bold">
          [ Hover my name ] &bull; Systems Engineering
        </p>
      </section>

      {/* SECTION 2: MARQUEE (Moving Visual) */}
      <div className="py-20 border-y border-gray-100 overflow-hidden bg-white relative z-20">
        <div className="marquee-inner flex whitespace-nowrap text-[10vw] font-bold uppercase tracking-tighter leading-none opacity-5">
          <span className="mx-10">Python &bull; Next.js &bull; Flask &bull; SQL &bull; React &bull; Java &bull; </span>
          <span className="mx-10">Python &bull; Next.js &bull; Flask &bull; SQL &bull; React &bull; Java &bull; </span>
        </div>
      </div>

      {/* SECTION 3: PHILOSOPHY */}
      <section className="min-h-screen flex flex-col items-center justify-center px-[10%] py-32">
        <h2 className="text-[5vw] font-light leading-tight tracking-tight text-center !text-black">
          Crafting <span className="italic font-serif">intelligent</span> workflows and <br /> 
          <span className="italic font-serif text-gray-300">architectures</span> with intent.
        </h2>
      </section>

      {/* SECTION 4: HORIZONTAL WORKS */}
      <div className="projects-trigger relative">
        <div ref={horizontalRef} className="flex h-screen w-max !bg-white">
          <div className="w-[100vw] h-screen flex items-center justify-center flex-shrink-0">
             <h2 className="text-[15vw] font-bold tracking-tighter uppercase">Works</h2>
          </div>
          
          {/* Project Cards (Add more here as needed) */}
          {[1, 2, 3].map((num) => (
            <div key={num} className="w-[85vw] h-screen flex flex-col justify-center px-24 flex-shrink-0 group">
               <div className="w-full aspect-video bg-gray-50 border border-gray-100 rounded-sm mb-10 overflow-hidden relative">
                  <div className="absolute inset-0 bg-white translate-y-0 group-hover:-translate-y-full transition-transform duration-700 delay-100"></div>
                  <Image src={`/project${num}.jpg`} alt="Work" fill className="object-cover grayscale" />
               </div>
               <h3 className="text-6xl font-bold uppercase tracking-tighter">Project {num}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: CONTACT */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-[15vw] font-bold tracking-tighter uppercase leading-[0.8] !text-black">
          Let's <span className="italic font-serif font-light text-gray-300 lowercase">Talk</span>
        </h2>
        <a href="mailto:sandeshmahajan422@gmail.com" className="text-3xl md:text-5xl font-light tracking-tighter border-b-2 border-black pb-2 mt-20">
          sandeshmahajan422@gmail.com
        </a>
      </section>

      <footer className="py-10 text-center text-[9px] tracking-[1em] uppercase text-gray-200">
        &copy; 2025 Sandesh Mahajan
      </footer>
    </main>
  );
}