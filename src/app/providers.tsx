"use client";

// import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import {
  arbitrum,
  base,
  fantomTestnet,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zora,
} from "wagmi/chains";
import { useEffect, useState } from "react";

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  from,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";

// APOLLO
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(`Graphql error ${message}`);
      if (locations) {
        locations.forEach((location) => {
          console.log(
            `Location: Line ${location.line}, Column: ${location.column}`
          );
        });
      }
      if (path) {
        console.log(`Path: ${path.join(" -> ")}`);
      }
    });
  }

  if (networkError) {
    console.log(`Network error: ${networkError.message}`);
  }
});
const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:42069/" }),
]);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

// RAINBOWKIT / WAGMI
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    fantomTestnet,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  [publicProvider()]
);

const projectId = "55b2c816bb3b5664940f20724cdde304";

const { wallets } = getDefaultWallets({
  appName: "R8R Picture Rating Game",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "R8R Picture Rating Game",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={demoAppInfo}
        modalSize="compact"
      >
        <ApolloProvider client={apolloClient}>
          {mounted && children}
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
