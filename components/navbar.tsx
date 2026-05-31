'use client';

import React, { useEffect, useState } from 'react';
import StaggeredMenu from '@/components/react-bits/staggered-menu';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isAboutSection, setIsAboutSection] = useState(false);
  const [activeSection, setActiveSection] = useState("#top");
  const [showMobileGreeting, setShowMobileGreeting] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [greetingPopKey, setGreetingPopKey] = useState(0);
  const [isClosingGreeting, setIsClosingGreeting] = useState(false);

  const greetings = [
    'Halo',
    'Sampurasun',
    'Hello',
    '\u041f\u0440\u0438\u0432\u0435\u0442',
    '\u0645\u0631\u062d\u0628\u0627',
    '\u4f60\u597d',
    '\u3053\u3093\u306b\u3061\u306f',
    '\uc548\ub155\ud558\uc138\uc694',
    '\u05e9\u05dc\u05d5\u05dd',
    'Hola',
    'Ciao',
  ];

  const navItems = [
    { label: 'Home', href: '#top' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
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
    const sectionIds = ["top", "about", "projects", "contact"];

    const updateActiveSection = () => {
      const triggerLine = Math.min(window.innerHeight * 0.35, 220);
      let current = "#top";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerLine && rect.bottom > triggerLine) {
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

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (!isMobile) return;

    setShowMobileGreeting(true);
    setIsClosingGreeting(false);
    setGreetingIndex(0);
    setGreetingPopKey(1);

    let currentIndex = 0;
    const switchInterval = window.setInterval(() => {
      currentIndex += 1;
      if (currentIndex >= greetings.length) {
        window.clearInterval(switchInterval);
        setIsClosingGreeting(true);
        window.setTimeout(() => {
          setShowMobileGreeting(false);
          setIsClosingGreeting(false);
        }, 420);
        return;
      }
      setGreetingIndex(currentIndex);
      setGreetingPopKey((prev) => prev + 1);
    }, 430);

    return () => {
      window.clearInterval(switchInterval);
    };
  }, [greetings.length]);

  const navContent = (
    <div className="w-full flex items-center justify-between">
      {/* Logo */}
      <a
        href="#top"
        className={cn(
          'inline-flex items-center text-5xl font-black tracking-[-0.04em] leading-none [text-shadow:0_0_0.01px_currentColor] transition-colors duration-200',
          activeSection === "#about" || activeSection === "#projects"
            ? "text-black"
            : "text-white"
        )}
      >
        idz
      </a>

      <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-zinc-900/90 backdrop-blur-md rounded-md px-2 py-3 shadow-lg">
        {navItems.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              'relative inline-flex items-center gap-2 overflow-hidden  px-5 py-3 text-[14px] font-medium transition-colors duration-200 before:absolute before:inset-0 before:origin-left before:scale-x-0 before:rounded-sm before:bg-zinc-400/25 before:transition-transform before:duration-300 before:ease-out hover:before:scale-x-100 focus-visible:before:scale-x-100',
              activeSection === item.href && 'before:scale-x-100',
              index === 0
                ? 'text-white'
                : 'text-white/70 hover:text-white'
            )}
          >
            <span className="relative z-10">{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Right side: CTA button (pre-scroll) or empty spacer (scrolled) */}
      <a
        href="#contact"
        className="hidden md:inline-flex items-center px-5 py-2 rounded-full bg-white text-zinc-900 text-[14px] font-semibold hover:bg-white/90 transition-colors duration-200 shadow-sm"
      >
        Contact
      </a>
    </div>
  );

  return (
    <>
      {showMobileGreeting ? (
        <div
          className={cn(
            'pointer-events-none fixed inset-0 z-[70] flex items-center justify-center bg-[linear-gradient(145deg,rgba(6,10,20,0.72),rgba(20,6,30,0.58))] backdrop-blur-xl md:hidden',
            isClosingGreeting
              ? '[animation:greeting-overlay-close_420ms_cubic-bezier(.4,0,.2,1)_forwards]'
              : '[animation:greeting-overlay-open_220ms_ease-out_both]'
          )}
        >
          <span
            key={greetingPopKey}
            className={cn(
              'text-5xl font-black tracking-[-0.04em] text-white',
              isClosingGreeting
                ? '[animation:greeting-text-close_420ms_cubic-bezier(.4,0,.2,1)_forwards]'
                : '[animation:greeting-pop_420ms_cubic-bezier(.2,.9,.2,1)_both]'
            )}
          >
            {greetings[greetingIndex]}
          </span>
        </div>
      ) : null}

      <header
        className={cn(
          'pointer-events-none fixed z-50',
          'inset-x-0 top-4'
        )}
      >
      <div className={cn('md:hidden', showMobileGreeting && 'invisible')} data-about={isAboutSection || undefined}>
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
          openMenuButtonColor="#111111"
          changeMenuColorOnOpen
          accentColor="#2f4539"
          logoUrl="/ir-mark.svg"
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
        [data-about] .staggered-menu-wrapper a[aria-label="Go to top"] { color: #111 !important; }
        @keyframes greeting-overlay-open {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes greeting-overlay-close {
          0% { opacity: 1; backdrop-filter: blur(16px); }
          100% { opacity: 0; backdrop-filter: blur(0px); }
        }
        @keyframes greeting-pop {
          0% { opacity: 0; transform: translateY(42px) scale(0.92); }
          65% { opacity: 1; transform: translateY(-3px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes greeting-text-close {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(18px) scale(0.98); }
        }
      `}</style>
    </>
  );
};

export default Navbar;
