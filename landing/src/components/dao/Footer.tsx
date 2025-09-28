const Footer = () => {
  return (
    <footer className="py-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">Night Agent: DAO Treasury Advisor</h3>
            <p className="text-gray-400 max-w-md">
              AI-powered treasury management that democratizes sophisticated financial operations for DAOs through privacy-preserving automation.
            </p>
          </div>
          
         
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 text-sm">
            2025 DEGA Hackathon - AI for DAO Treasury Management Hackathon on Midnight.
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Built with ❤️ for DAOs</span>
            <span>•</span>
            <span>Powered by DEGA & Midnight</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;