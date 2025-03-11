
import { useEffect, useState } from 'react';

// Animation hook for elements that should animate when they enter the viewport
export function useInView(ref: React.RefObject<HTMLElement>, options = {}) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, {
      threshold: 0.1,
      ...options
    });
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isInView;
}

// Staggered animation for lists of items
export function useStaggeredAnimation(
  count: number, 
  baseDelay: number = 100
) {
  return Array.from({ length: count }).map((_, i) => ({
    animationDelay: `${i * baseDelay}ms`
  }));
}

// Returns classes for animations with proper delays
export function getFadeInAnimation(index: number, baseDelay: number = 100) {
  return {
    className: "animate-fade-in opacity-0",
    style: { 
      animationDelay: `${index * baseDelay}ms`,
      animationFillMode: "forwards" 
    }
  };
}

export function getSlideUpAnimation(index: number, baseDelay: number = 100) {
  return {
    className: "animate-slide-up opacity-0",
    style: { 
      animationDelay: `${index * baseDelay}ms`,
      animationFillMode: "forwards" 
    }
  };
}
