# ZetaChain MCP Server

A Model Context Protocol (MCP) server built in TypeScript that enables LLM agents to access ZetaChain blockchain data using a public RPC endpoint. This server exposes core EVM-compatible methods and analysis prompts for ZetaChain, making it easy for LLMs to interact with ZetaChain wallets and contracts.

---

## 📦 Installation

Install globally with your favorite package manager:

```bash
# With npm
npm install -g zetachain-mcp-server

# With yarn
yarn global add zetachain-mcp-server

# With pnpm
pnpm add -g zetachain-mcp-server
```

---

## 🚀 Quick Start

After installing globally, you can use the CLI command `zetachain-mcp-server` directly in your Claude Desktop configuration.

1. **Configure Claude Desktop**

   In your `claude_desktop_config.json`:
   ```json
   "mcpServers": {
     "zetachain-mcp": {
       "command": "zetachain-mcp-server"
     }
   }
   ``
   > No need to specify a path—just the command!

2. **Restart Claude Desktop** to load the new MCP server.
3. **Ask Claude Desktop to perform ZetaChain tasks** (see examples below).

**No API keys or environment variables are required.** The server uses ZetaChain's public RPC endpoint by default.

> **Note:** If you install locally (not globally), you'll need to provide the full path to the CLI in your `node_modules/.bin` directory.

---

## 🧑‍💻 Using with Claude Desktop

1. Open the **Claude Desktop** app.
2. Go to **Claude** > **Settings** > **Developer**.
3. Edit the `claude_desktop_config.json` file and add the following configuration (adjust the path as needed):

   ```json
   {
     "mcpServers": {
       "zetachain-mcp": {
         "command": "node",
         "args": [
           "/absolute-path-to/zetachain-mcp/build/index.js"
         ],        
       }
     }
   }
   ```
   - Replace `/absolute-path-to` with the absolute path to your `zetachain-mcp` directory.
   - The public ZetaChain RPC URL is already set; no API key is needed.

4. **Restart Claude Desktop** to load the new MCP server.
5. **Ask Claude Desktop to perform ZetaChain tasks** (see examples below).

---

## 📝 Example Agent Interactions

- **Check a wallet balance:**
  ```
  Give the balance of the 0x1234...abcd address on ZetaChain
  ```
- **Analyze a contract:**
  ```
  Analyze 0x5678...efgh on ZetaChain
  ```
- **Get current gas prices:**
  ```
  Analyze the current gas prices on ZetaChain
  ```

---

## 📦 Project Structure

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

---

## ⚡ Features

- **MCP-Compatible**: Built using the Model Context Protocol SDK for LLM agent integration
- **ZetaChain Support**: Works exclusively with ZetaChain Mainnet
- **Core EVM Methods**: Includes `eth_getBalance`, `eth_getCode`, and `eth_gasPrice` for ZetaChain
- **LLM Prompts**: Pre-built prompts for wallet analysis, contract inspection, and gas price evaluation
- **No API Key Required**: Uses ZetaChain's public RPC endpoint—no .env or API key setup needed

---

## 🛠️ MCP Tools

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

---

## 💡 MCP Prompts

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

---

## 📚 MCP Resources

The server provides access to these resources:
- `evm://docs/gas-reference` - Gas price reference data for ZetaChain
- `evm://docs/block-explorers` - Block explorer URL for ZetaChain
- `evm://docs/supported-chains` - Supported chains (ZetaChain)
