# ZetaChain MCP Server

A Model Context Protocol (MCP) server built in TypeScript that enables LLM agents to access ZetaChain blockchain data using a public RPC endpoint. This server exposes core EVM-compatible methods and analysis prompts for ZetaChain, making it easy for LLMs to interact with ZetaChain wallets and contracts.

![ZetaChain MCP Server](tools-merged.png)

## Tech Stack

- [MCP TypeScript SDK](https://www.npmjs.com/package/@modelcontextprotocol/sdk)
- [TypeScript](https://www.typescriptlang.org/)
- [Viem](https://viem.sh/)
- [Zod](https://zod.dev/)

## Features

- **MCP-Compatible**: Built using the Model Context Protocol SDK for LLM agent integration
- **ZetaChain Support**: Works exclusively with ZetaChain Mainnet
- **Core EVM Methods**: Includes `eth_getBalance`, `eth_getCode`, and `eth_gasPrice` for ZetaChain
- **LLM Prompts**: Pre-built prompts for wallet analysis, contract inspection, and gas price evaluation
- **No API Key Required**: Uses ZetaChain's public RPC endpoint—no .env or API key setup needed

## Prerequisites

- [Node.js](https://nodejs.org/en) >= 18
- TypeScript
- Claude Desktop or any other MCP-compatible agent runner

## Project Instructions

1. Clone the repository

```bash
git clone <your-repo-url>
cd zetachain-mcp
```

2. Install dependencies

```bash
pnpm install
```

3. Build the project

```bash
pnpm run build
```

## Project Structure

```bash
├── chains.ts           # ZetaChain configuration and public RPC endpoint
├── clients.ts          # Viem public client creator for RPC connections
├── index.ts            # Main entry point that sets up the MCP server
├── package.json        # Package configuration
├── prompts.ts          # Defines LLM prompts for blockchain analysis tasks
├── resources.ts        # External references and helpers
├── tools.ts            # Implements the EVM RPC methods as MCP tools
└── tsconfig.json       # TypeScript configuration
```

## Configure Claude Desktop

No environment variables or API keys are required. The server uses ZetaChain's public RPC endpoint by default.

To configure, open the **Claude Desktop** app, go to **Claude** > **Settings** > **Developer**. Then, modify the `claude_desktop_config.json` file with the following content (adjust the path as needed):

```json
{
    "mcpServers": {
        "zetachain-mcp": {
            "command": "node",
            "args": [
                "/absolute-path-to/zetachain-mcp/build/index.js"
            ],
            "env": {
                "ZETA_CHAIN_RPC": "https://zetachain-evm.blockpi.network:443/v1/rpc/public"
            }
        }
    }
}
```

- Replace `/absolute-path-to` with the absolute path to the `zetachain-mcp` directory.
- The public ZetaChain RPC URL is already set; no API key is needed.

## Test the MCP Server

Restart **Claude Desktop** and test the server by asking Claude Desktop to perform a task that requires the ZetaChain MCP Server. For example, ask Claude Desktop to get the balance of an address on ZetaChain.

### Example Agent Interactions

1. Check a wallet balance:
```
Give the balance of the 0x1234...abcd address on ZetaChain
```

2. Analyze a contract:
```
Analyze 0x5678...efgh on ZetaChain
```

3. Get current gas prices:
```
Analyze the current gas prices on ZetaChain, is it a good time to use the chain?
```


### MCP Tools

1. **eth_getBalance**
   - **Description**: Get the ZETA token balance of an address
   - **Parameters**:
     - `address`: ZetaChain address to check
     - `chain`: Chain to query (must be `zetachain`)
   - **Returns**: 
     - Address, chain name, balance in wei, formatted balance with symbol

2. **eth_getCode**
   - **Description**: Detect whether an address is a contract or wallet
   - **Parameters**:
     - `address`: ZetaChain address to check
     - `chain`: Chain to query (must be `zetachain`)
   - **Returns**: 
     - Address information, contract status, bytecode size

3. **eth_gasPrice**
   - **Description**: Get the current gas price on ZetaChain
   - **Parameters**:
     - `chain`: Chain to query (must be `zetachain`)
   - **Returns**: 
     - Chain name, gas price in wei and Gwei, timestamp

### MCP Prompts

The server provides the following MCP prompts:

1. **check-wallet**
   - **Description**: Guide for analyzing a wallet's balance and context
   - **Parameters**:
     - `address`: ZetaChain address to check
     - `chain`: Chain to query (must be `zetachain`)
   - **Functionality**: Guides the LLM to get the balance and check if it's a contract, then provide analysis

2. **check-contract**
   - **Description**: Prompt contract code introspection and analysis
   - **Parameters**:
     - `address`: ZetaChain address to check
     - `chain`: Chain to query (must be `zetachain`)
   - **Functionality**: Guides the LLM to verify code presence, analyze contract size and balance

3. **gas-analysis**
   - **Description**: Analyze gas price trends and evaluate timing
   - **Parameters**:
     - `chain`: Chain to query (must be `zetachain`)
   - **Functionality**: Guides the LLM to analyze current gas prices and provide recommendations

### MCP Resources

The server provides access to these resources:
- `evm://docs/gas-reference` - Gas price reference data for ZetaChain
- `evm://docs/block-explorers` - Block explorer URL for ZetaChain
- `evm://docs/supported-chains` - Supported chains (ZetaChain)
