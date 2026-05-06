'use client';

import React, { useEffect, useState } from 'react';
import { MoonStar } from 'lucide-react';
import GlassSurface from '@/components/ui/glass-surface';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: 'Home', href: '#top' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Content yang sama untuk kedua kondisi
  const navContent = (
    <div className="w-full flex items-center justify-between">
      {/* Logo */}
      <a
        href="#top"
        className="inline-flex items-center text-2xl font-semibold tracking-[-0.06em] text-white"
      >
        IR
      </a>

      {/* Navigation Links */}
      <nav className="hidden items-center gap-8 md:flex">
        {navItems.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              'inline-flex items-center gap-3 text-[15px] text-zinc-400 transition-colors duration-200 hover:text-white focus-visible:text-white',
              index === 0 && 'text-white'
            )}
          >
            {index === 0 ? (
              <span className="size-2.5 rounded-full bg-lime-300 shadow-[0_0_14px_rgba(163,230,53,0.75)]" />
            ) : null}
            {item.label}
          </a>
        ))}
      </nav>

      {/* Theme Toggle */}
      <button
        type="button"
        aria-label="Theme switch preview"
        className={cn(
          'inline-flex items-center justify-center rounded-full text-white transition-all duration-300 hover:text-zinc-300',
          isScrolled ? 'size-11 border border-white/10 bg-white/4' : 'size-10'
        )}
      >
        <MoonStar className="size-5" />
      </button>
    </div>
  );

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div 
        className={cn(
          "mx-auto px-4 pt-4 sm:px-6 transition-all duration-500 ease-out",
          isScrolled ? "max-w-2xl" : "max-w-7xl"
        )}
      >
        {!isScrolled ? (
          // Saat belum scroll: render tanpa GlassSurface, hanya div biasa
          <div className="pointer-events-auto mx-auto px-6 py-4 transition-all duration-500 ease-out">
            {navContent}
          </div>
        ) : (
          // Setelah scroll: render dengan GlassSurface
          <GlassSurface
            width="100%"
            height={64}
            borderRadius={32}
            backgroundOpacity={0.3}
            saturation={1.2}
            brightness={50}
            blur={11}
            displace={0}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            className="pointer-events-auto mx-auto px-6 transition-all duration-500 ease-out"
            style={{
              transition: 'all 0.5s ease-out',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
            }}
          >
            {navContent}
          </GlassSurface>
        )}
      </div>
    </header>
  );
};

export default Navbar;
