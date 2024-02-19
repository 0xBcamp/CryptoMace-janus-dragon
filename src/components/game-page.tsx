"use client";

import React from "react";
import { GameCarousal } from "./game-carousal";
import TitleText from "./title-text";
import { motion } from "framer-motion";

const GamePage = () => {
  {
    return (
      <div className="flex flex-col items-center justify-start">
        <h1 className="text-3xl text-primary tracking-widest font-bold uppercase">
          Featured Games
        </h1>
        <GameCarousal />
      </div>
    );
  }
};

export default GamePage;
