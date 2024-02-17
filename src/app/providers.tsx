"use client";


import { rainbowkitUseMoonConnector } from "@moonup/moon-rainbowkit";
// import { MoonSDK } from "@moonup/moon-sdk";
import { AUTH, MOON_SESSION_KEY, Storage } from "@moonup/moon-types";
import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";

import { useEffect, useState } from "react";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { fantom, fantomSonicTestnet, fantomTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

function Providers({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [wagmiConfig, setWagmiConfig] = useState<any | null>(null);
  const [chains, setChains] = useState<any | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [
        fantom,
        fantomTestnet,
        fantomSonicTestnet,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
          ? [fantomTestnet]
          : []),
      ],
      [publicProvider()]
    );
    setChains(chains);

    const { wallets } = getDefaultWallets({
      appName: "RainbowKit App",
      projectId: "YOUR_PROJECT_ID",
      chains,
    });

    const connectors = connectorsForWallets([
      ...wallets,
      {
        groupName: "Other",
        wallets: [
          rainbowkitUseMoonConnector({
            chains: chains,
            options: {
              chainId: 4001,
              MoonSDKConfig: {
                Storage: {
                  key: MOON_SESSION_KEY,
                  type: Storage.SESSION,
                },
                Auth: {
                  AuthType: AUTH.JWT,
                },
              },
            },
          }),
        ],
      },
    ]);
    const config = createConfig({
      autoConnect: true,
      connectors,
      publicClient,
      webSocketPublicClient,
    });

    setWagmiConfig(config);

    // setWagmiConfig(wagmiConfig);
  }, []);

  if (!isMounted) {
    return null; // or return a placeholder if you want to show something during loading
  }

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}

export default Providers;


