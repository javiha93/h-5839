
import { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { getFadeInAnimation, getSlideUpAnimation } from "@/lib/animations";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!shapesRef.current) return;
      
      const shapes = shapesRef.current.querySelectorAll('.floating-shape');
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      shapes.forEach((shape, index) => {
        const factor = (index + 1) * 0.02;
        const shapeElement = shape as HTMLElement;
        
        shapeElement.style.transform = `translate(${mouseX * 50 * factor}px, ${mouseY * 50 * factor}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      id="home" 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background elements */}
      <div 
        ref={shapesRef}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <div className="floating-shape absolute top-[20%] left-[25%] h-40 w-40 rounded-full bg-primary/5 blur-3xl transition-transform duration-700"></div>
        <div className="floating-shape absolute top-[40%] right-[20%] h-64 w-64 rounded-full bg-accent/5 blur-3xl transition-transform duration-700"></div>
        <div className="floating-shape absolute bottom-[20%] left-[40%] h-48 w-48 rounded-full bg-primary/5 blur-3xl transition-transform duration-700"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col items-center text-center">
          <span 
            {...getFadeInAnimation(0, 200)}
            className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary"
          >
            Introducing
          </span>
          
          <h1 
            {...getSlideUpAnimation(1, 200)}
            className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Beautiful Design,
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Meticulously Crafted
            </span>
          </h1>
          
          <p 
            {...getSlideUpAnimation(2, 200)}
            className="mt-6 max-w-2xl text-lg text-foreground/70 md:text-xl"
          >
            Experience design that merges elegance with functionality. Where every detail is 
            considered and every interaction refined.
          </p>
          
          <div 
            {...getSlideUpAnimation(3, 200)}
            className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
          >
            <a
              href="#features"
              className="neo-btn flex items-center justify-center text-foreground font-medium"
            >
              Discover More
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            
            <a
              href="#about"
              className="rounded-xl border border-border bg-transparent px-6 py-3 text-foreground/80 
              transition-colors hover:bg-secondary hover:text-foreground flex items-center justify-center"
            >
              Learn About Us
            </a>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;
