import {
  getDefaultConfig
} from "connectkit";
import { createConfig } from "wagmi";
import { sepolia } from 'wagmi/chains';

const chains = [sepolia]

export const wagmiConfig = createConfig(
  getDefaultConfig({
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID!,
    // @ts-ignore
    chains,
    appName: 'Vite Tokenbound SDK Example',
    appDescription: 'Tokenbound SDK Example',
    appUrl: 'https://tokenbound.org',
  })
)