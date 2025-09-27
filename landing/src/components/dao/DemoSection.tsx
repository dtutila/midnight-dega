import { Button } from '@/components/ui/button';
import { PlayCircle, AlertCircle, TrendingDown, CheckCircle } from 'lucide-react';

const DemoSection = () => {
  const demoSteps = [
    {
      step: "Risk Detection",
      icon: <AlertCircle size={24} />,
      title: "🔴 CRITICAL: Portfolio concentration risk detected",
      description: "75% treasury in DFUND token, down 15% in 24h.",
      color: "border-red-500"
    },
    {
      step: "AI Analysis",
      icon: <TrendingDown size={24} />,
      title: "Risk Agent Analysis Complete",
      description: "VaR calculations, stress tests portfolio against historical volatility patterns, generating rebalance recommendations",
      color: "border-yellow-500"
    },
    {
      step: "Strategy Recommendation",
      icon: <TrendingDown size={24} />,
      title: "Strategy Agent Recommendation",
      description: "Reduce DFUND token to 40%, increase stablecoin to 45%, allocate 15% to yield-generating DeFi positions. Projected risk reduction: 45%, yield improvement: 8% APY",
      color: "border-blue-500"
    },
    {
      step: "Human Approval",
      icon: <CheckCircle size={24} />,
      title: "$127K transaction requires 2/3 multi-sig approval",
      description: "Treasury committee reviews AI analysis, approves execution via Telegram buttons",
      color: "border-purple-500"
    },
    {
      step: "Private Execution",
      icon: <CheckCircle size={24} />,
      title: "Execution on Midnight Blockchain",
      description: "Strategy details hidden from competitors, outcome published after completion.",
      color: "border-green-500"
    }
  ];

  return (
    <section className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">How It Works</span>
          </h2>
         
        </div>
        
        <div className="space-y-6 mb-12">
          {demoSteps.map((step, index) => (
            <div 
              key={index} 
              className={`bg-arcade-terminal border-l-4 ${step.color} border-r border-t border-b border-gray-800 rounded-r-xl p-6 opacity-0 animate-slide-up`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-arcade-purple">
                    {step.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-400 mb-1">{step.step}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemoSection;