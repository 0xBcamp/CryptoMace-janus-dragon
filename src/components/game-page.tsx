"use client";

import GameCard from "./game-card";
import { GameCarousal } from "./game-carousal";
import bg from "../../public/newR8RBG.png";

const GamePage = () => {
  {
    return (
      <div className="flex flex-col items-center justify-start">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bg.src})`,
            backgroundSize: "cover",
            opacity: 0.2, // Control the opacity of the image here
          }}
        ></div>
        <h1 className="text-2xl text-primary-foreground uppercase">
          List of Games (TOTAL)
        </h1>
        <GameCarousal />
      </div>
    );
  }
};

export default GamePage;
