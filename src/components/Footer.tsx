
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer 
      id="contact" 
      className="bg-gradient-to-b from-background to-secondary/30 pt-16 pb-8"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-display text-2xl font-bold mb-4">Essence</h2>
            <p className="text-foreground/70 max-w-md mb-6">
              Creating thoughtful experiences through elegant design and meticulous attention to detail.
            </p>
            <div className="flex space-x-4">
              {/* Social media links would go here */}
              {["Twitter", "Instagram", "LinkedIn", "Dribbble"].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              {["Home", "Features", "About", "Contact"].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`} 
                    className="text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <address className="not-italic text-foreground/70">
              <p>123 Design Avenue</p>
              <p>San Francisco, CA 94103</p>
              <p className="mt-4">hello@essence.example</p>
              <p>+1 (555) 123-4567</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-sm">
            © {currentYear} Essence. All rights reserved.
          </p>
          
          <p className="text-foreground/60 text-sm flex items-center mt-4 md:mt-0">
            Crafted with 
            <Heart className="h-4 w-4 text-destructive mx-1 animate-pulse-gentle" /> 
            and attention to detail
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
