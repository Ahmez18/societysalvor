// src/components/public/useHideOnScroll.ts
"use client";

import { useEffect, useRef, useState } from "react";

export default function useHideOnScroll(threshold = 10) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      if (diff > threshold && currentY > 80) {
        // scrolling down
        setVisible(false);
      } else if (diff < -threshold) {
        // scrolling up slightly
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return visible;
}
