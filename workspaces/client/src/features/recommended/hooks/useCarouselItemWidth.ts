import { useEffect, useRef, useState } from 'react';

const MIN_WIDTH = 276;
const GAP = 12;

// repeat(auto-fill, minmax(276px, 1fr)) を計算で求める
export function useCarouselItemWidth() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(MIN_WIDTH);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const calculateItemWidth = () => {
      const styles = window.getComputedStyle(container);
      const innerWidth = container.clientWidth - parseInt(styles.paddingLeft) - parseInt(styles.paddingRight);
      const itemCount = Math.max(1, Math.floor((innerWidth + GAP) / (MIN_WIDTH + GAP)));
      const calculatedWidth = Math.floor((innerWidth + GAP) / itemCount - GAP);
      setItemWidth(calculatedWidth);
    };

    const observer = new ResizeObserver(() => {
      calculateItemWidth();
    });

    observer.observe(container);

    calculateItemWidth();

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref: containerRef, width: itemWidth };
}
