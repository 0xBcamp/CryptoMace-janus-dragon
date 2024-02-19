"use client";

import "../../node_modules/@rainbow-me/rainbowkit/dist/index.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import RulesDialog from "./rules-dialog";

import ConnectMoon from "./moon/connect-moon";
import Sidebar from "./sidebar";
import { useMoonSDK } from "@/app/usemoonsdk";
import MoonWalletIcon from "./moon/moon-wallet-icon";
import { useAccount } from "wagmi";
import logo from "../../public/R8RLogo.png";
import Image from "next/image";

export const Navbar = () => {
  const { moon } = useMoonSDK();
  const { address } = useAccount();

  return (
    <div className="flex h-20 w-full items-center justify-between bg-transparent px-20">
      {address ? <MoonWalletIcon /> : <ConnectMoon />}
      {/* <ConnectButton /> */}
      <Image src={logo} alt="logo" width={140} height={50} className="mr-16" />
      <div className="flex flex-row items-center justify-end space-x-3">
        <RulesDialog />
        <Sidebar />
      </div>
    </div>
  );
};
