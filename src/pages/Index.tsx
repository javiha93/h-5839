
import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  
  // Smooth scroll fix for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href?.startsWith('#')) return;
      
      const id = href.substring(1);
      const element = document.getElementById(id);
      
      if (element) {
        e.preventDefault();
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };
    
    const main = mainRef.current;
    if (main) {
      main.addEventListener('click', handleAnchorClick);
      return () => main.removeEventListener('click', handleAnchorClick);
    }
  }, []);

  // Animate the page in on load
  useEffect(() => {
    document.body.classList.add('animate-fade-in');
    document.body.style.opacity = '0';
    
    // Small delay to ensure animation works
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 50);
    
    return () => {
      document.body.classList.remove('animate-fade-in');
      document.body.style.opacity = '';
    };
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        {/* About section would go here */}
        <section id="about" className="py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Left side - image */}
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-4/5 h-4/5 border border-primary/30 rounded-2xl"></div>
                  <div className="glass-card overflow-hidden rounded-2xl aspect-video bg-secondary/50">
                    <div className="h-full w-full bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center">
                      <span className="font-display text-xl text-foreground/40">About Us</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right side - content */}
              <div className="lg:w-1/2">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary mb-4">
                  Our Story
                </span>
                
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                  We Believe in the Power of Simplicity
                </h2>
                
                <p className="text-foreground/70 mb-6">
                  Founded on the principle that great design simplifies complexity, we create products that 
                  are both beautiful and functional. Our philosophy draws inspiration from the belief that 
                  less is more, and that attention to detail makes all the difference.
                </p>
                
                <p className="text-foreground/70 mb-8">
                  Every project is an opportunity to craft experiences that are intuitive, elegant, 
                  and focused on what truly matters. We believe that when design disappears, the user's 
                  experience becomes the focus.
                </p>
                
                <a 
                  href="#contact" 
                  className="neo-btn inline-flex items-center justify-center text-foreground font-medium"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
