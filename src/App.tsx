
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Page transition component
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
    
    // Add animation classes to the body
    document.body.style.opacity = "0";
    
    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 50);
    
    return () => {
      document.body.style.opacity = "";
    };
  }, [location]);
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <PageTransition>
            <Index />
          </PageTransition>
        } 
      />
      <Route 
        path="*" 
        element={
          <PageTransition>
            <NotFound />
          </PageTransition>
        } 
      />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
