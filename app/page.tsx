'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      // Reveal titles as you scroll
      const titles = gsap.utils.toArray('.reveal-text');
      titles.forEach((title) => {
        const el = title as HTMLElement;
        gsap.fromTo(el, 
          { opacity: 0, y: 80 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.5, 
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-white">
      
      {/* SECTION 1: THE NAME (Massive) */}
      <section className="h-screen">
        <h1 className="reveal-text text-[15vw] font-extralight tracking-tighter leading-[0.8] uppercase text-black">
          Sandesh <br /> Mahajan
        </h1>
      </section>

      {/* SECTION 2: THE ROLE */}
      <section className="h-screen">
        <h2 className="reveal-text text-[10vw] font-light tracking-tighter leading-none uppercase text-black text-center">
          Systems <br /> <span className="text-gray-300 italic font-serif lowercase">builder</span>
        </h2>
      </section>

      {/* SECTION 3: THE EXPERTISE */}
      <section className="h-screen flex flex-col items-start px-[10%]">
        <p className="reveal-text text-xs tracking-[0.5em] text-gray-400 mb-10 uppercase">Expertise</p>
        <h2 className="reveal-text text-[7vw] font-light tracking-tighter uppercase leading-[1.1] text-black">
          Python &bull; Flask <br /> React &bull; Next.js <br /> Rest APIs
        </h2>
      </section>

      {/* SECTION 4: THE BIG WIN */}
      <section className="h-screen">
        <div className="text-center">
          <p className="reveal-text text-xs tracking-[0.5em] text-gray-400 mb-6 uppercase">Recognition</p>
          <h2 className="reveal-text text-[9vw] font-light tracking-tighter leading-none uppercase text-black">
            Tech <br /> Olympics <br /> <span className="text-gray-200">Winner</span>
          </h2>
        </div>
      </section>

      {/* SECTION 5: THE INTERNSHIPS */}
      <section className="h-screen flex flex-col items-center justify-center px-6">
        <div className="reveal-text space-y-20 w-full max-w-6xl">
           <div className="border-t border-black/5 pt-10 flex justify-between items-center">
              <span className="text-[5vw] uppercase font-light tracking-tighter">Cadmaxx</span>
              <span className="text-sm tracking-widest text-gray-400 uppercase">2025</span>
           </div>
           <div className="border-t border-black/5 pt-10 flex justify-between items-center">
              <span className="text-[5vw] uppercase font-light tracking-tighter">Dev Town</span>
              <span className="text-sm tracking-widest text-gray-400 uppercase">2023</span>
           </div>
        </div>
      </section>

      {/* SECTION 6: THE CONTACT (Massive) */}
      <section className="h-screen flex flex-col">
        <h2 className="reveal-text text-[12vw] font-light tracking-tighter uppercase text-black">
          Connect
        </h2>
        <div className="reveal-text flex gap-12 mt-10">
           <a href="mailto:sandeshmahajan422@gmail.com" className="text-lg tracking-[0.3em] uppercase border-b border-black pb-1 hover:text-gray-400 transition-colors">Email</a>
           <a href="https://github.com/SandeshMahajan07" target="_blank" className="text-lg tracking-[0.3em] uppercase border-b border-black pb-1 hover:text-gray-400 transition-colors">GitHub</a>
        </div>
      </section>

    </main>
  );
}