import { CheckCircle, Circle, Clock } from 'lucide-react';

const RoadmapSection = () => {
  const phases = [
    {
      phase: "Phase 1: DEGA Hackathon",
      status: "current",
      items: [
        "Telegram bot interface with core treasury dashboard",
        
        "Midnight blockchain privacy integration"
      ]
    },
    {
      phase: "Phase 2: AI Intelligence Layer",
      status: "upcoming",
      items: [
        "Predictive treasury modeling with cash flow forecasting",
        "Advanced risk assessment engine",
        "DeFi yield strategy recommendations",
        "Risk analysis agent deployment", 
        "Strategy agent deployment"
      ]
    },
    {
      phase: "Phase 3: Enterprise Scale",
      status: "future",
      items: [
        "MCP server marketplace for community agents",
        "Full 6-agent system operational"
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'current':
        return <Clock className="text-arcade-purple" size={20} />;
      case 'upcoming':
        return <Circle className="text-gray-400" size={20} />;
      case 'future':
        return <Circle className="text-gray-600" size={20} />;
      default:
        return <Circle className="text-gray-600" size={20} />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'current':
        return <span className="bg-arcade-purple/20 text-arcade-purple px-3 py-1 rounded-full text-sm font-medium">✅ Current Phase</span>;
      case 'upcoming':
        return <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm font-medium">Upcoming</span>;
      case 'future':
        return <span className="bg-gray-900 text-gray-500 px-3 py-1 rounded-full text-sm font-medium">Future</span>;
      default:
        return null;
    }
  };

  return (
    <section className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Product Roadmap</span>
          </h2>
          <p className="text-lg text-gray-300">
            From hackathon to enterprise-grade DAO treasury platform
          </p>
        </div>
        
        <div className="space-y-8">
          {phases.map((phase, index) => (
            <div 
              key={index} 
              className={`bg-arcade-terminal border border-gray-800 rounded-xl p-8 opacity-0 animate-slide-up`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {getStatusIcon(phase.status)}
                  <h3 className="text-xl font-semibold text-white">{phase.phase}</h3>
                </div>
                {getStatusBadge(phase.status)}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phase.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {phase.status === 'current' ? (
                        <CheckCircle className="text-green-400" size={16} />
                      ) : (
                        <Circle className="text-gray-500" size={16} />
                      )}
                    </div>
                    <span className={`text-sm ${phase.status === 'current' ? 'text-gray-300' : 'text-gray-400'}`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-arcade-terminal border border-gray-800 rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-4">Future Vision</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400">
            <div>Cross-chain governance integration</div>
            <div>AI-powered advisory for DAOs</div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;