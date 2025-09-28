import { Network, Shield, MessageCircle, TrendingUp, Users, BarChart3 } from 'lucide-react';

const SolutionSection = () => {
  const features = [
    {
      icon: <Network size={28} />,
      title: "6-Agent MCP Architecture",
      description: "Orchestrator, Risk Analysis, Strategy, Execution, Reporting, and Price Monitoring agents work in concert using Model Context Protocol for seamless coordination",
      delay: "delay-100"
    },
    {
      icon: <Shield size={28} />,
      title: "Selective Transparency",
      description: "Execute sensitive strategies privately on Midnight blockchain, reveal outcomes publicly when needed. Protect competitive advantage while maintaining governance trust.",
      delay: "delay-200"
    },
    {
      icon: <MessageCircle size={28} />,
      title: "Conversational Treasury Management",
      description: "Manage your DAO treasury through natural language. 'What's our runway?' 'Rebalance portfolio' 'Send payment to dev team'—just ask.",
      delay: "delay-300"
    },
    {
      icon: <TrendingUp size={28} />,
      title: "Real-Time Risk Analysis",
      description: "AI-powered VaR calculations, stress testing, concentration alerts, and portfolio optimization. Know your risks before making decisions.",
      delay: "delay-400"
    },
    {
      icon: <Users size={28} />,
      title: "Tiered Approval System",
      description: "Configure your own tiers of approval: AI automates under $10K, human approval $10K-$100K, committee review $100K-$1M, full governance $1M+.",
      delay: "delay-500"
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Unified Treasury Dashboard",
      description: "Real-time visibility across all chains, wallets, and assets. AI categorizes transactions with 95% accuracy, eliminating manual CSV management.",
      delay: "delay-600"
    }
  ];

  return (
    <section className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Your AI Treasury Advisor</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-6">
            Intelligent automation meets privacy-first architecture. Manage your DAO treasury through conversational AI agents that orchestrate complex financial operations.
          </p>
          <div className="text-arcade-purple font-semibold">
            We democratize sophisticated treasury management through AI-powered agents, privacy-preserving execution on Midnight blockchain, and Telegram-native interface.
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`bg-arcade-terminal border border-gray-800 rounded-xl p-6 hover:border-arcade-purple/50 transition-colors opacity-0 animate-slide-up ${feature.delay}`}
            >
              <div className="w-12 h-12 flex items-center justify-center text-arcade-purple mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;