# Night Agent: AI-Powered Treasury Management for DAOs

[![Demo Video](https://img.shields.io/badge/Demo-YouTube-red)](https://youtu.be/bFETefieg5w)
[![Landing Page](https://img.shields.io/badge/Landing-Live-green)](https://dega-midnight-dao-treasury.vercel.app/)

## Executive Summary

Night Agent is the first intelligent, privacy-preserving treasury advisor that helps DAOs make faster, safer financial decisions. Built with automated risk assessment, multi-agent orchestration, and a Telegram-native interface, it democratizes sophisticated treasury management through AI-powered agents and privacy-preserving execution on the Midnight blockchain.

### The Problem We Solve

Small-to-medium DAOs face critical treasury management challenges:

- **Fatal Decision Delays**: ENS DAO took 9 days to respond to USDC depeg while professional services weren't available. Time-sensitive treasury decisions require both speed and decentralization.
- **Extreme Volatility Exposure**: Many DAOs hold treasuries in single crypto assets, creating catastrophic risk during market downturns. Manual rebalancing is complex and error-prone.

### Our Solution

Night Agent provides:

- **6-Agent MCP Architecture**: Orchestrator, Risk Analysis, Strategy, Execution, Reporting, and Price Monitoring agents work in concert using Model Context Protocol
- **Selective Transparency**: Execute sensitive strategies privately on Midnight blockchain, reveal outcomes publicly when needed
- **Conversational Treasury Management**: Manage your DAO treasury through natural language - "What's our runway?" "Rebalance portfolio" "Send payment to dev team"
- **Real-Time Risk Analysis**: AI-powered VaR calculations, stress testing, concentration alerts, and portfolio optimization
- **Tiered Approval System**: Configurable approval tiers (AI automates under $10K, human approval $10K-$100K, committee review $100K-$1M, full governance $1M+)
- **Unified Treasury Dashboard**: Real-time visibility across all chains, wallets, and assets with 95% accurate AI transaction categorization

## 🎥 Demo

Watch our demo video showcasing the complete treasury management workflow:
[**Night Agent Demo Video**](https://youtu.be/bFETefieg5w)

## 🌐 Live Demo

Experience the landing page and learn more about the project:
[**Night Agent Landing Page**](https://dega-midnight-dao-treasury.vercel.app/)

## Project Structure

This monorepo contains four main components:

```
midnight/
├── dao-contract/          # Midnight blockchain smart contracts
├── eliza-agent/          # ElizaOS-based AI agent system
├── landing/              # React landing page
└── midnight-mcp/         # Model Context Protocol server
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd midnight
   ```

2. **Install dependencies for all projects**
   ```bash
   # Install root dependencies
   npm install
   
   # Install DAO contract dependencies
   cd dao-contract && npm install && cd ..
   
   # Install Eliza agent dependencies
   cd eliza-agent && npm install && cd ..
   
   # Install landing page dependencies
   cd landing && npm install && cd ..
   
   # Install MCP server dependencies
   cd midnight-mcp && yarn install && cd ..
   ```

## 📦 Building and Running Components

### 1. Landing Page (`/landing`)

The React-based landing page built with Vite, TypeScript, and Tailwind CSS.

```bash
cd landing

# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

**Technologies**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router

### 2. DAO Contract (`/dao-contract`)

Midnight blockchain smart contracts with CLI tools.

```bash
cd dao-contract

# Install dependencies (if not done already)
npm install

# Build contracts
npm run build

# Run tests
npm test

# CLI operations
cd cli
npm run build
npm start
```

**Technologies**: Midnight Network SDK, TypeScript, Vitest

### 3. Eliza Agent (`/eliza-agent`)

ElizaOS-based AI agent system with multi-agent orchestration.

```bash
cd eliza-agent

# Development
npm run dev

# Build
npm run build

# Start agent (safe mode)
npm run start:safe

# Run tests
npm test

# Type checking
npm run type-check
```

**Technologies**: ElizaOS, TypeScript, React, Tailwind CSS, Bun

### 4. Midnight MCP Server (`/midnight-mcp`)

Model Context Protocol server for agent communication and blockchain integration.

```bash
cd midnight-mcp

# Development
yarn dev

# Build
yarn build

# Run stdio server
yarn dist:stdio

# Run tests
yarn test:unit
yarn test:integration
yarn test:e2e:main

# Setup scripts
yarn setup-agent
yarn setup-docker
```

**Technologies**: TypeScript, Express, MCP SDK, Midnight Network SDK, SQLite, Jest

## 🛠️ Development Workflow

### Environment Setup

1. **Copy environment files**
   ```bash
   cp midnight-mcp/env.example midnight-mcp/.env
   # Edit .env with your configuration
   ```

2. **Generate seed data**
   ```bash
   cd midnight-mcp
   yarn generate-seed
   ```

3. **Setup agent configuration**
   ```bash
   cd midnight-mcp
   yarn setup-agent
   ```

### Running the Full Stack

1. **Start the MCP server**
   ```bash
   cd midnight-mcp
   yarn dev
   ```

2. **Start the Eliza agent**
   ```bash
   cd eliza-agent
   npm run start:safe
   ```

3. **Start the landing page**
   ```bash
   cd landing
   npm run dev
   ```

4. **Deploy contracts (if needed)**
   ```bash
   cd dao-contract/cli
   npm start
   ```

## 🧪 Testing

### Unit Tests
```bash
# MCP Server
cd midnight-mcp && yarn test:unit

# DAO Contract
cd dao-contract && npm test

# Eliza Agent
cd eliza-agent && npm test
```

### Integration Tests
```bash
cd midnight-mcp && yarn test:integration
```

### End-to-End Tests
```bash
cd midnight-mcp && yarn test:e2e:main
```

## 📋 Roadmap

### Phase 1: DEGA Hackathon (Current)
- ✅ Telegram bot interface with core treasury dashboard
- ✅ Midnight blockchain privacy integration

### Phase 2: AI Intelligence Layer (Upcoming)
- 🔄 Predictive treasury modeling with cash flow forecasting
- 🔄 Advanced risk assessment engine
- 🔄 DeFi yield strategy recommendations
- 🔄 Risk analysis agent deployment
- 🔄 Strategy agent deployment
- 🔄 DEGA Agent Communication MCP Server

### Phase 3: Enterprise Scale (Future)
- 📋 MCP server marketplace for community agents
- 📋 Full 6-agent system operational
- 📋 DEGA Agents Integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Demo Video**: [https://youtu.be/bFETefieg5w](https://youtu.be/bFETefieg5w)
- **Landing Page**: [https://dega-midnight-dao-treasury.vercel.app/](https://dega-midnight-dao-treasury.vercel.app/)
- **Documentation**: See individual project README files in each directory

## 📞 Support

For support, questions, or contributions, please open an issue in this repository or reach out through our community channels.

---

**Night Agent** - Democratizing sophisticated treasury management for DAOs through AI-powered agents and privacy-preserving blockchain technology.
