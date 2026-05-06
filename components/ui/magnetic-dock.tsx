"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type DockItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
};

type MousePosition = {
  x: number;
  y: number;
};

type MagneticDockProps = {
  items: DockItem[];
  activeIndex?: number;
  defaultActiveIndex?: number;
  onItemClick?: (index: number) => void;
  className?: string;
  dockClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
};

const MouseContext = createContext<MousePosition>({ x: 0, y: 0 });

function DockItemButton({
  item,
  active,
  onClick,
  itemClassName,
  activeItemClassName,
}: {
  item: DockItem;
  active: boolean;
  onClick?: () => void;
  itemClassName?: string;
  activeItemClassName?: string;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const mouse = useContext(MouseContext);
  const distance = useMotionValue(Infinity);

  useEffect(() => {
    const element = ref.current;
    const parent = element?.parentElement;

    if (!element || !parent || mouse.x === 0) {
      distance.set(Infinity);
      return;
    }

    const iconRect = element.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    const iconCenterX = iconRect.left + iconRect.width / 2;
    const mouseXAbsolute = parentRect.left + mouse.x;

    distance.set(Math.abs(mouseXAbsolute - iconCenterX));
  }, [distance, mouse]);

  const width = useTransform(distance, [0, 100], [68, 52]);
  const springWidth = useSpring(width, {
    mass: 0.12,
    stiffness: 180,
    damping: 16,
  });

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={item.label}
      className={`group relative flex aspect-square items-center justify-center rounded-[0.95rem] border border-white/15 bg-zinc-800/90 text-zinc-100 shadow-[0_12px_30px_rgba(0,0,0,0.24)] transition-colors duration-200 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-200/70 ${itemClassName || ""} ${
        active ? activeItemClassName || "ring-2 ring-white/20" : ""
      }`}
      style={{ width: springWidth }}
    >
      <span className="flex items-center justify-center text-zinc-100 transition-transform duration-200 group-hover:scale-105">
        {item.icon}
      </span>
      <span className="pointer-events-none absolute -bottom-8 whitespace-nowrap text-[0.65rem] font-medium tracking-[0.24em] text-zinc-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {item.label}
      </span>
    </motion.button>
  );
}

export function MagneticDock({
  items,
  activeIndex: controlledActiveIndex,
  defaultActiveIndex = 0,
  onItemClick,
  className,
  dockClassName,
  itemClassName,
  activeItemClassName,
}: MagneticDockProps) {
  const isControlled = typeof controlledActiveIndex === "number";
  const [uncontrolledActiveIndex, setUncontrolledActiveIndex] = useState(
    defaultActiveIndex
  );
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  const activeIndex = isControlled
    ? controlledActiveIndex
    : uncontrolledActiveIndex;

  if (items.length === 0) {
    return null;
  }

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    if (!isControlled) {
      setUncontrolledActiveIndex(index);
    }

    onItemClick?.(index);
    itemOnClick?.();
  };

  return (
    <MouseContext.Provider value={position}>
      <div className={`inline-flex ${className || ""}`}>
        <div
          onMouseMove={(event) => {
            const { clientX, currentTarget } = event;
            const { left } = currentTarget.getBoundingClientRect();
            setPosition({ x: clientX - left, y: 0 });
          }}
          onMouseLeave={() => setPosition({ x: 0, y: 0 })}
          className={`flex items-end gap-3 rounded-[1.2rem] border border-white/10 bg-zinc-950/90 px-4 pb-4 pt-3 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl ${dockClassName || ""}`}
        >
          {items.map((item, index) => (
            <DockItemButton
              key={item.id}
              item={item}
              active={index === activeIndex}
              onClick={() => handleItemClick(index, item.onClick)}
              itemClassName={itemClassName}
              activeItemClassName={activeItemClassName}
            />
          ))}
        </div>
      </div>
    </MouseContext.Provider>
  );
}

export default MagneticDock;