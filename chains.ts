// Chain configuration with Alchemy RPC endpoints
export type ChainConfig = {
  network: string;
  rpc: string;
  name: string;
  symbol: string;
  decimals: number;
};

export type ChainId = keyof typeof CHAINS;

// public RPC endpoints https://www.zetachain.com/docs/reference/network/api/

export const CHAINS = {
  zetachain: {
    network: "zetachain-mainnet",
    rpc: "https://zetachain-evm.blockpi.network:443/v1/rpc/public",
    name: "ZetaChain",
    symbol: "ZETA",
    decimals: 18,
  }
  // You can add more chains here, but you need to add the RPC URL to the .env file

};

// Helper to get a chain by ID
export const getChain = (chainId: ChainId): ChainConfig => {
  const chain = CHAINS[chainId];
  if (!chain) {
    throw new Error(
      `Chain ${chainId} not supported. Supported chains: ${Object.keys(
        CHAINS
      ).join(", ")}`
    );
  }
  return chain;
};

// Get a list of all supported chains
export const getSupportedChains = (): string[] => {
  return Object.keys(CHAINS);
};
