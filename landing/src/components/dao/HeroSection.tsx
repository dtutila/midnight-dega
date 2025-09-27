
interface HeroSectionProps {
  loaded: boolean;
}

const HeroSection = ({ loaded }: HeroSectionProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <div className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
            <span className="gradient-text">AI-Powered Treasury Management for DAOs</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            The first intelligent, privacy-preserving treasury copilot that helps DAOs make faster, safer financial decisions. 
            Automated risk assessment, multi-agent orchestration, and Telegram-native interface.
          </p>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;