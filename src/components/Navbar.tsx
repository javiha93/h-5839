
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

type NavLink = {
  name: string;
  href: string;
};

const navLinks: NavLink[] = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-500",
        isScrolled
          ? "glass-morphism py-4 shadow-sm"
          : "bg-transparent py-6"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="#" className="relative z-10 flex items-center">
          <span className="text-foreground font-display font-bold text-xl md:text-2xl">
            Essence
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-foreground/80 font-medium transition-colors hover:text-foreground"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="relative z-10 md:hidden"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 z-0 flex flex-col items-center justify-center glass-morphism backdrop-blur-md transition-all duration-300 md:hidden",
            mobileMenuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          )}
        >
          <nav className="flex flex-col items-center space-y-8">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="text-2xl font-medium text-foreground/80 transition-colors hover:text-foreground"
                onClick={toggleMobileMenu}
                style={{ 
                  animationDelay: `${index * 100}ms`, 
                  animationFillMode: "both" 
                }}
                className="animate-fade-in opacity-0"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
