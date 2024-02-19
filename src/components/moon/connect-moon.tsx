"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignUpPage from "./moon-wallet-connect";
import { Button } from "../ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const ConnectMoon = () => {
  const { address } = useAccount();

  if (address) {
    return (
      <div className="bg-secondary rounded-lg">
        <text>{address}</text>
      </div>
    );
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>Connect to Moon Wallet</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription className="flex flex-col items-center justify-center">
              <SignUpPage />
              <ConnectButton
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "avatar",
                }}
                showBalance={{
                  smallScreen: false,
                  largeScreen: false,
                }}
                chainStatus={{
                  smallScreen: "icon",
                  largeScreen: "icon",
                }}
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConnectMoon;
