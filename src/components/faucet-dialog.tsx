"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; // Ensure you have a Text component or similar for formatting

const FaucetDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default2">Get Testnet FTM</Button>
      </DialogTrigger>
      <DialogContent className="text-primary flex flex-col items-center justify-center p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4">
            Looking for some Testnet FTM?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center  flex flex-col items-center justify-center space-y-4">
          <a
            href="https://faucet.fantom.network/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            https://faucet.fantom.network/
          </a>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default FaucetDialog;
