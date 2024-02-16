"use client";

import GameCard from "./game-card";
import { GameCarousal } from "./game-carousal";
import six from "../../public/ai generated/6.png";

const GamePage = () => {
  {
    return (
      <div className="flex flex-col items-center justify-start">
        <div className="flex flex-col items-center p-4">
          <h1 className="text-2xl text-primary-foreground uppercase">
            Featured Game
          </h1>
          <GameCard
            id={8}
            status={true}
            cost={5}
            prizePool={235}
            createTimestamp={5}
            expireTimestamp={23}
            nonce={0}
            imageUrl={six}
            width={380}
            height={380}
          />
        </div>
        <h1 className="text-2xl text-primary-foreground uppercase">
          Active Games
        </h1>
        <GameCarousal />
      </div>
    );
  }
};

export default GamePage;
