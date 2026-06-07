'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import StaggeredMenu from '@/components/react-bits/staggered-menu';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isAboutSection, setIsAboutSection] = useState(false);
  const [activeSection, setActiveSection] = useState("#top");

  const navItems = [
    { label: 'Home', href: '#top' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
  ];

  useEffect(() => {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const detectAboutSection = () => {
      const rect = aboutSection.getBoundingClientRect();
      const navTriggerLine = 112;
      const hasEnteredAbout = rect.top <= navTriggerLine;
      const stillInsideAbout = rect.bottom > navTriggerLine;
      setIsAboutSection(hasEnteredAbout && stillInsideAbout);
    };

    detectAboutSection();
    window.addEventListener('scroll', detectAboutSection, { passive: true });
    window.addEventListener('resize', detectAboutSection);

    return () => {
      window.removeEventListener('scroll', detectAboutSection);
      window.removeEventListener('resize', detectAboutSection);
    };
  }, []);

  useEffect(() => {
    const sectionIds = ["top", "about", "experience", "projects", "contact"];

    const updateActiveSection = () => {
      const triggerLine = Math.min(window.innerHeight * 0.35, 220);
      let current = "#top";

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerLine) {
          current = `#${id}`;
          break;
        }
      }

      if (current === "#top") {
        const topEl = document.getElementById("top");
        if (topEl) {
          const topRect = topEl.getBoundingClientRect();
          if (topRect.top > triggerLine) current = "#top";
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const navContent = (
    <div className="w-full flex items-center justify-between">
      {/* Logo */}
      <a
        href="#top"
        className="inline-flex items-center"
      >
        <Image
          src={isAboutSection ? "/ir-mark-black.png" : "/ir-mark.png"}
          alt="Irza"
          width={64}
          height={64}
          className="transition-opacity duration-200"
        />
      </a>

      <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-zinc-900/90 backdrop-blur-md rounded-md px-2 py-3 shadow-lg">
        {navItems.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              'relative inline-flex items-center gap-2 overflow-hidden  px-5 py-3 text-[14px] font-medium transition-colors duration-200 before:absolute before:inset-0 before:origin-left before:scale-x-0 before:rounded-sm before:bg-zinc-400/25 before:transition-transform before:duration-300 before:ease-out hover:before:scale-x-100 focus-visible:before:scale-x-100',
              activeSection === item.href 
                ? 'before:scale-x-100 text-white' 
                : 'text-white/70 hover:text-white'
            )}
          >
            <span className="relative z-10">{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Right side: CTA button (pre-scroll) or empty spacer (scrolled) */}
      <a
        href="https://www.linkedin.com/in/irza-dzulhika/"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:inline-flex items-center px-5 py-2 rounded-full bg-white text-zinc-900 text-[14px] font-semibold hover:bg-white/90 transition-colors duration-200 shadow-sm"
      >
        Connect
      </a>
    </div>
  );

  return (
    <>
      <header
        className={cn(
          'pointer-events-none fixed z-50',
          'inset-x-0 top-4'
        )}
      >
      <div className="md:hidden" data-about={isAboutSection || undefined}>
        <StaggeredMenu
          isFixed
          position="right"
          items={navItems.map((item) => ({
            label: item.label,
            ariaLabel: `Go to ${item.label.toLowerCase()} section`,
            link: item.href,
          }))}
          socialItems={[
            { label: 'GitHub', link: 'https://github.com' },
            { label: 'LinkedIn', link: 'https://linkedin.com' },
          ]}
          displaySocials
          displayItemNumbering
          menuButtonColor={isAboutSection ? '#111111' : '#f4f4f5'}
          openMenuButtonColor="#ffffff"
          changeMenuColorOnOpen
          accentColor="#2f4539"
          logoUrl={isAboutSection ? "/ir-mark-black.png" : "/ir-mark.png"}
          colors={['#7a887f', '#44574d']}
        />
      </div>

      <div 
        className={cn(
          'hidden w-full transition-[max-width,padding,margin] duration-500 ease-out md:block',
          'mx-auto max-w-[90rem] px-6 sm:px-8'
        )}
      >
        <div
          className={cn(
            'pointer-events-auto relative',
            'mx-auto rounded-full bg-transparent px-8 py-6 shadow-none'
          )}
        >
          {navContent}
        </div>
      </div>
      </header>
      <style>{`
        [data-about] .staggered-menu-wrapper:not([data-open="true"]) a[aria-label="Go to top"] { color: #111 !important; }
      `}</style>
    </>
  );
};

export default Navbar;
