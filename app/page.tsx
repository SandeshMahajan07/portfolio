'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate every section's title when it enters the view
    const sections = gsap.utils.toArray('section');
    sections.forEach((section: any) => {
      const title = section.querySelector('h1, h2');
      if (title) {
        gsap.fromTo(title, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      }
    });
  }, []);

  return (
    <main>
      <section className="h-screen flex items-center justify-center border-b border-white/5">
        <h1 className="text-7xl font-light tracking-tighter uppercase">Sandesh Mahajan</h1>
      </section>

      <section className="h-screen flex items-center justify-center border-b border-white/5">
        <h2 className="text-6xl font-light tracking-tighter uppercase">Building Systems</h2>
      </section>

      <section className="h-screen flex items-center justify-center border-b border-white/5">
        <h2 className="text-6xl font-light tracking-tighter uppercase">The Projects</h2>
      </section>

      <section className="h-screen flex items-center justify-center">
        <h2 className="text-6xl font-light tracking-tighter uppercase">Connect</h2>
      </section>
    </main>
  );
}