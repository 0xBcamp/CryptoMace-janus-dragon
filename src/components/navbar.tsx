"use client";

import Link from "next/link";

import "../../node_modules/@rainbow-me/rainbowkit/dist/index.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import logo from "../../public/circleLogo.png";
import Image from "next/image";
import RulesDialog from "./rules-dialog";
import { Button } from "./ui/button";

export const Navbar = () => {
  async function callDialog() {
    return <RulesDialog />;
  }

  return (
    <div className="fixed z-50 flex h-20 w-full items-center justify-between bg-primary border-b-2 px-4">
      <div className="flex items-center">
        <Link href="/">
          <div className="pl-4">
            <Image src={logo} alt="" width={80} height={80} />
          </div>
        </Link>
      </div>
      <div className="flex ml-12">
        <RulesDialog />
      </div>

      <div className="flex items-center gap-x-3">
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
      </div>
    </div>
  );
};
