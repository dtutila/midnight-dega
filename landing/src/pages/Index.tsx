
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/dao/HeroSection';
import ProblemSection from '@/components/dao/ProblemSection';
import SolutionSection from '@/components/dao/SolutionSection';
import DemoSection from '@/components/dao/DemoSection';
import RoadmapSection from '@/components/dao/RoadmapSection';
import Footer from '@/components/dao/Footer';

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Add small delay before starting animations
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[60vh] bg-arcade-dark">
      <div className="flex-1">
        <Header />
        <HeroSection loaded={loaded} />
        <ProblemSection />
        <SolutionSection />
        <DemoSection />
        <RoadmapSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
