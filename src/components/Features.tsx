
import { useRef } from 'react';
import { useInView } from '@/lib/animations';
import { 
  Layers, 
  Sparkles, 
  Lightbulb, 
  LayoutGrid, 
  Palette, 
  Zap 
} from 'lucide-react';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
};

const features = [
  {
    title: "Thoughtful Design",
    description: "Every element carefully considered for both form and function.",
    icon: <Layers className="h-6 w-6" />
  },
  {
    title: "Attention to Detail",
    description: "Meticulous craftsmanship down to the smallest detail.",
    icon: <Sparkles className="h-6 w-6" />
  },
  {
    title: "Innovative Solutions",
    description: "Creative approaches to complex design challenges.",
    icon: <Lightbulb className="h-6 w-6" />
  },
  {
    title: "Clean Architecture",
    description: "Organized structure that enhances clarity and usability.",
    icon: <LayoutGrid className="h-6 w-6" />
  },
  {
    title: "Aesthetic Harmony",
    description: "Balanced visual elements creating a cohesive experience.",
    icon: <Palette className="h-6 w-6" />
  },
  {
    title: "Optimized Performance",
    description: "Efficient functionality without sacrificing beauty.",
    icon: <Zap className="h-6 w-6" />
  }
];

const FeatureCard = ({ title, description, icon, index }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { threshold: 0.1 });
  
  return (
    <div 
      ref={cardRef}
      className="glass-card p-6 transition-all duration-500"
      style={{ 
        opacity: isInView ? 1 : 0, 
        transform: isInView ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${index * 100}ms` 
      }}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mb-2 font-display text-xl font-semibold">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  const isSectionInView = useInView(sectionRef);
  const isTitleInView = useInView(titleRef);
  const isSubtitleInView = useInView(subtitleRef);

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary mb-4">
            Features
          </span>
          
          <h2 
            ref={titleRef}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 transition-all duration-700"
            style={{ 
              opacity: isTitleInView ? 1 : 0,
              transform: isTitleInView ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            Exceptional Quality in Every Detail
          </h2>
          
          <p 
            ref={subtitleRef}
            className="max-w-2xl mx-auto text-foreground/70 text-lg transition-all duration-700"
            style={{ 
              opacity: isSubtitleInView ? 1 : 0,
              transform: isSubtitleInView ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '100ms'
            }}
          >
            Discover the thoughtful features that make our approach special
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
