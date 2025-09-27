import { Clock, AlertTriangle } from 'lucide-react';

const ProblemSection = () => {
  return (
    <section className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Why DAO Treasuries Are Broken</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Small-to-medium DAOs face critical challenges that traditional solutions ignore
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-arcade-terminal border border-gray-800 rounded-xl p-8 opacity-0 animate-slide-up delay-100">
            <div className="w-12 h-12 flex items-center justify-center text-red-400 mb-6">
              <Clock size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Fatal Decision Delays</h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              ENS DAO took 9 days to respond to USDC depeg while professional services weren't available. 
              Time-sensitive treasury decisions require both speed and decentralization.
            </p>
            
          </div>
          
          <div className="bg-arcade-terminal border border-gray-800 rounded-xl p-8 opacity-0 animate-slide-up delay-300">
            <div className="w-12 h-12 flex items-center justify-center text-orange-400 mb-6">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Extreme Volatility Exposure</h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Some DAOs hold treasuries in single crypto assets, creating catastrophic risk during market downturns. 
              Manual rebalancing is complex and error-prone.
            </p>
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;