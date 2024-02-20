"use client";

import React from "react";
import { GameCarousal } from "./game-carousal";
import SignupPage from "./moon/moon-wallet-connect";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const GamePage = () => {
  {
    return (
      <div className="flex flex-col items-center justify-start">
        {/* <SignupPage /> */}
        <div className="flex items-center justify-center gap-x-3 p-8">
          <ConnectButton
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "address",
            }}
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
            chainStatus={{
              smallScreen: "icon",
              largeScreen: "icon",
            }}
          />
        </div>
        <h1 className="text-3xl text-primary tracking-widest font-bold uppercase">
          Featured Games
        </h1>
        <GameCarousal />
      </div>
    );
  }
};

export default GamePage;
