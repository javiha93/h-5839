
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/30 p-4">
      <div className="text-center max-w-md fade-in-bottom">
        <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <span className="font-display text-6xl font-bold text-primary">404</span>
        </div>
        
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
        
        <p className="text-foreground/70 text-lg mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <a 
          href="/" 
          className="neo-btn inline-flex items-center justify-center text-foreground font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
