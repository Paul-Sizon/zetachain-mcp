/**
 * Resources file for useful references about EVM blockchains
 * Optional, but can be used to enhance LLM agent performance
 */

// Register resources with the MCP server
export const registerResources = (server: any) => {
  // Register gas reference resource
  server.resource(
    "gas-reference",
    "evm://docs/gas-reference",
    async (uri: URL) => {
      return {
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify(gasReferencePoints, null, 2),
          },
        ],
      };
    }
  );

  // Register block explorers resource
  server.resource(
    "block-explorers",
    "evm://docs/block-explorers",
    async (uri: URL) => {
      return {
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify(blockExplorers, null, 2),
          },
        ],
      };
    }
  );

  // Register supported chains resource
  server.resource(
    "supported-chains",
    "evm://docs/supported-chains",
    async (uri: URL) => {
      return {
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify(supportedChains, null, 2),
          },
        ],
      };
    }
  );

  return server;
};

// Gas price reference points (in Gwei)
const gasReferencePoints = {
  ethereum: {
    low: 20,
    average: 40,
    high: 100,
    veryHigh: 200,
  },
  base: {
    low: 0.05,
    average: 0.1,
    high: 0.3,
    veryHigh: 0.5,
  },
  zetachain: {
    low: 0.01,
    average: 0.05,
    high: 0.1,
    veryHigh: 0.2,
  },
};

// Block explorer URLs by chain
const blockExplorers = {
  ethereum: 'https://etherscan.io',
  base: 'https://basescan.org',
  zetachain: 'https://explorer.zetachain.com',
};

const supportedChains = {
  ethereum: {
    network: "mainnet",
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  base: {
    network: "base-mainnet",
    name: "Base",
    symbol: "ETH",
    decimals: 18,
  },
  zetachain: {
    network: "zetachain-mainnet",
    name: "ZetaChain",
    symbol: "ZETA",
    decimals: 18,
  },
};