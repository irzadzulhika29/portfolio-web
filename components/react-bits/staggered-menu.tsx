'use client';

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed?: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#6f7f75', '#2f4539'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  menuButtonColor = '#fff',
  openMenuButtonColor = '#111',
  changeMenuColorOnOpen = true,
  accentColor = '#2f4539',
  isFixed = false,
  closeOnClickAway = true,
  logoUrl,
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const lineTopRef = useRef<HTMLSpanElement | null>(null);
  const lineMidRef = useRef<HTMLSpanElement | null>(null);
  const lineBotRef = useRef<HTMLSpanElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const lineTop = lineTopRef.current;
      const lineMid = lineMidRef.current;
      const lineBot = lineBotRef.current;
      if (!panel || !lineTop || !lineMid || !lineBot) return;

      const preLayers = preContainer
        ? (Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[])
        : [];
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      gsap.set(lineTop, { y: -5, rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(lineMid, { y: 0, rotate: 0, opacity: 1, transformOrigin: '50% 50%' });
      gsap.set(lineBot, { y: 5, rotate: 0, transformOrigin: '50% 50%' });

      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
    ) as HTMLElement[];
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];

    const offscreen = position === 'left' ? -100 : 100;
    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as never]: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    layers.forEach((layer, i) => {
      tl.fromTo(layer, { xPercent: offscreen }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    const panelInsertTime = (layers.length - 1) * 0.07 + (layers.length ? 0.08 : 0);
    const panelDuration = 0.65;
    tl.fromTo(
      panel,
      { xPercent: offscreen },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    const itemsStart = panelInsertTime + panelDuration * 0.15;
    if (itemEls.length) {
      tl.to(itemEls, {
        yPercent: 0,
        rotate: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: { each: 0.1, from: 'start' },
      }, itemsStart);
    }

    if (numberEls.length) {
      tl.to(numberEls, {
        duration: 0.6,
        ease: 'power2.out',
        ['--sm-num-opacity' as never]: 1,
        stagger: { each: 0.08, from: 'start' },
      }, itemsStart + 0.1);
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      if (socialLinks.length) {
        tl.to(socialLinks, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.08 }, socialsStart + 0.04);
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (!tl) {
      busyRef.current = false;
      return;
    }
    tl.eventCallback('onComplete', () => {
      busyRef.current = false;
    });
    tl.play(0);
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;
    const offscreen = position === 'left' ? -100 : 100;
    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to([...layers, panel], {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      onComplete: () => {
        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const lineTop = lineTopRef.current;
    const lineMid = lineMidRef.current;
    const lineBot = lineBotRef.current;
    if (!lineTop || !lineMid || !lineBot) return;
    spinTweenRef.current?.kill();

    if (opening) {
      spinTweenRef.current = gsap.timeline({ defaults: { ease: 'power4.out' } })
        .to(lineTop, { y: 0, rotate: 45, duration: 0.35 }, 0)
        .to(lineMid, { opacity: 0, duration: 0.2 }, 0)
        .to(lineBot, { y: 0, rotate: -45, duration: 0.35 }, 0);
      return;
    }

    spinTweenRef.current = gsap.timeline({ defaults: { ease: 'power3.inOut' } })
      .to(lineTop, { y: -5, rotate: 0, duration: 0.3 }, 0)
      .to(lineMid, { opacity: 1, duration: 0.2 }, 0)
      .to(lineBot, { y: 5, rotate: 0, duration: 0.3 }, 0);
  }, []);

  const animateColor = useCallback((opening: boolean) => {
    const btn = toggleBtnRef.current;
    if (!btn) return;
    colorTweenRef.current?.kill();
    if (!changeMenuColorOnOpen) {
      gsap.set(btn, { color: menuButtonColor });
      return;
    }
    colorTweenRef.current = gsap.to(btn, {
      color: opening ? openMenuButtonColor : menuButtonColor,
      delay: 0.18,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    onMenuClose?.();
    playClose();
    animateIcon(false);
    animateColor(false);
  }, [animateColor, animateIcon, onMenuClose, playClose]);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }
    animateIcon(target);
    animateColor(target);
  }, [animateColor, animateIcon, onMenuClose, onMenuOpen, playClose, playOpen]);

  useLayoutEffect(() => {
    if (!closeOnClickAway || !open) return;
    const onMouseDown = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [closeOnClickAway, closeMenu, open]);

  return (
    <div className={`sm-scope z-40 ${isFixed ? 'fixed inset-0 overflow-hidden' : 'h-full w-full'}`}>
      <div
        className={`${className ? `${className} ` : ''}staggered-menu-wrapper pointer-events-none relative z-40 h-full w-full`}
        style={accentColor ? ({ ['--sm-accent' as never]: accentColor } as React.CSSProperties) : undefined}
        data-position={position}
        data-open={open || undefined}
      >
        <div ref={preLayersRef} className="sm-prelayers absolute bottom-0 right-0 top-0 pointer-events-none z-[5]" aria-hidden="true">
          {(colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c']).map((c, i) => (
            <div key={i} className="sm-prelayer absolute right-0 top-0 h-full w-full" style={{ background: c }} />
          ))}
        </div>

        <header className="staggered-menu-header pointer-events-none absolute left-0 top-0 z-20 flex w-full items-center justify-between bg-transparent p-6" aria-label="Main navigation header">
          <a href="#top" className="pointer-events-auto inline-flex items-center select-none transition-colors duration-200" aria-label="Go to top">
            {logoUrl ? (
              <Image src={logoUrl} alt="Irza" width={36} height={36} />
            ) : (
              <span className="font-bold text-2xl text-white">idz</span>
            )}
          </a>

          <button
            ref={toggleBtnRef}
            className="sm-toggle pointer-events-auto relative inline-flex h-10 w-10 cursor-pointer items-center justify-center border-0 bg-transparent"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            <span className="sm-icon relative inline-flex h-5 w-5 items-center justify-center">
              <span ref={lineTopRef} className="sm-icon-line absolute left-1/2 top-1/2 h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 rounded bg-current" />
              <span ref={lineMidRef} className="sm-icon-line absolute left-1/2 top-1/2 h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 rounded bg-current" />
              <span ref={lineBotRef} className="sm-icon-line absolute left-1/2 top-1/2 h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 rounded bg-current" />
            </span>
          </button>
        </header>

        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel pointer-events-auto absolute right-0 top-0 z-10 flex h-full flex-col overflow-y-auto bg-black p-[6em_1.5em_2em_1.5em]"
          aria-hidden={!open}
        >
          <div className="sm-panel-inner flex flex-1 flex-col gap-5">
            <ul className="sm-panel-list m-0 flex list-none flex-col gap-2 p-0" role="list" data-numbering={displayItemNumbering || undefined}>
              {items.map((item, idx) => (
                <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={item.label + idx}>
                  <a
                    className="sm-panel-item relative inline-block cursor-pointer pr-[1.9em] text-[clamp(2.5rem,10vw,4rem)] font-semibold uppercase leading-none tracking-[-2px] text-white no-underline transition-colors duration-200"
                    href={item.link}
                    aria-label={item.ariaLabel}
                    onClick={closeMenu}
                  >
                    <span className="sm-panel-itemLabel inline-block">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            {displaySocials && socialItems.length > 0 && (
              <div className="sm-socials mt-auto flex flex-col gap-3 pt-8">
                <h3 className="sm-socials-title m-0 text-base font-medium">Socials</h3>
                <ul className="sm-socials-list m-0 flex list-none flex-wrap items-center gap-4 p-0" role="list">
                  {socialItems.map((social, i) => (
                    <li key={social.label + i}>
                      <a href={social.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link inline-block py-[2px] text-[1.05rem] font-medium text-white no-underline">
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
        .sm-scope .sm-toggle { color: #e9e9ef; }
        .sm-scope .sm-toggle:focus-visible { outline: 2px solid #ffffffaa; outline-offset: 4px; border-radius: 4px; }
        .sm-scope .staggered-menu-panel { width: min(100vw, 420px); opacity: 0; }
        .sm-scope [data-position='left'] .staggered-menu-panel { left: 0; right: auto; }
        .sm-scope .sm-prelayers { width: min(100vw, 420px); opacity: 0; }
        .sm-scope [data-position='left'] .sm-prelayers { left: 0; right: auto; }
        .sm-scope .sm-panel-item:hover { color: var(--sm-accent, #2f4539); }
        .sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
        .sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after {
          counter-increment: smItem;
          content: counter(smItem, decimal-leading-zero);
          position: absolute;
          top: 0.1em;
          right: 3.2em;
          font-size: 18px;
          font-weight: 400;
          color: var(--sm-accent, #2f4539);
          opacity: var(--sm-num-opacity, 0);
        }
        .sm-scope .sm-socials-title { color: var(--sm-accent, #2f4539); }
        .sm-scope .sm-socials-link:hover { color: var(--sm-accent, #2f4539); }
        @media (max-width: 1024px) { .sm-scope .staggered-menu-panel, .sm-scope .sm-prelayers { width: 100%; left: 0; right: 0; } }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
