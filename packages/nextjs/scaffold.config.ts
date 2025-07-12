import * as chains from "viem/chains";

export type ScaffoldConfig = {
  targetNetworks: readonly chains.Chain[];
  pollingInterval: number;
  alchemyApiKey: string;
  rpcOverrides?: Record<number, string>;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
  externalContracts?: any;
};

export const DEFAULT_ALCHEMY_API_KEY = "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

const SEPOLIA_CHAIN_ID = 11155111;

const scaffoldConfig = {
  // SimpleSwap Contract
  externalContracts: {
    SimpleSwap: {
      [SEPOLIA_CHAIN_ID]: {
        address: "0xED79BbAFED4fb2D0cfF8E26A442faDC75471FC09",
        abi: require("./abis/SimpleSwap.json"),
      },
    },
    // TokenA y TokenB se agregan más adelante
    TokenA: {
      [SEPOLIA_CHAIN_ID]: {
        address: "0x617E43FCAadEc63172574F7A51836B2De0927e6d",
        abi: require("./abis/HskA.json"),
      },
    },
    TokenB: {
      [SEPOLIA_CHAIN_ID]: {
        address: "0xa222430736e5c77De41Ce322eA3A63221cb9ee2e",
        abi: require("./abis/HskB.json"),
      },
    },
  },

  // The networks on which your DApp is live
  targetNetworks: [chains.hardhat, chains.sepolia],

  // The interval at which your front-end polls the RPC servers for new data
  // it has no effect if you only target the local network (default is 4000)
  pollingInterval: 30000,

  // This is ours Alchemy's default API key.
  // You can get your own at https://dashboard.alchemyapi.io
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || DEFAULT_ALCHEMY_API_KEY,

  // If you want to use a different RPC for a specific network, you can add it here.
  // The key is the chain ID, and the value is the HTTP RPC URL
  rpcOverrides: {
    // Example:
    // [chains.mainnet.id]: "https://mainnet.buidlguidl.com",
  },

  // This is ours WalletConnect's default project ID.
  // You can get your own at https://cloud.walletconnect.com
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

  // Only show the Burner Wallet when running on hardhat network
  onlyLocalBurnerWallet: true,
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;

