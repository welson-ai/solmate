# Solmate

**Your Intelligent DeFi Assistant on Solana**

Solmate combines advanced AI with Solana's speed to deliver 24/7 yield optimization. Monitor positions, execute strategies, and maximize returns—all with complete control.

## Project Structure

```
solmate/
├── app/                  # Next.js landing page
├── components/           # React components
├── contracts/            # Solana smart contracts (Anchor/Rust)
├── ai-agent/             # AI agent for yield optimization
│   ├── strategies/       # Trading & yield strategies
│   ├── models/           # ML models for predictions
│   └── monitoring/       # Position monitoring logic
├── scripts/              # Utility scripts
└── public/               # Static assets
```

## Features

- **AI-Powered Yield Optimization** - Automated strategies that adapt to market conditions
- **24/7 Position Monitoring** - Real-time tracking of your DeFi positions
- **Solana Speed** - Sub-second transactions with minimal fees
- **Complete Control** - You maintain custody and approve all actions

## Development

```bash
# Install dependencies
pnpm install

# Run landing page
pnpm dev

# Auto-commit script (for development activity)
./scripts/auto-commits.sh [interval_seconds] [num_commits]
```

## Tech Stack

- **Frontend**: Next.js 16, React 19, TailwindCSS, shadcn/ui
- **Blockchain**: Solana, Anchor Framework
- **AI Agent**: Python, LangChain (planned)

## License

MIT
