"use client";

import RulesDialog from "./rules-dialog";
import Sidebar from "./sidebar";
import logo from "../../public/R8RLogo.png";
import Image from "next/image";
import FaucetDialog from "./faucet-dialog";

export const Navbar = () => {
  return (
    <div className="flex h-20 w-full items-center justify-between bg-transparent px-20">
      <div className="flex justify-start flex-1">
        <FaucetDialog />
      </div>
      <div className="flex items-center justify-center flex-1">
        <Image src={logo} alt="logo" width={140} height={50} />
      </div>
      <div className="flex justify-end items-center flex-1 space-x-3">
        <RulesDialog />
        <Sidebar />
      </div>
    </div>
  );
};
