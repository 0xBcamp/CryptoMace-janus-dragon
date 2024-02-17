"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import GameCard from "./game-card";
import { gameArray } from "@/constants/games";

export function GameCarousal() {
  return (
    <Carousel className="w-1/3 lg:w-5/6">
      <CarouselContent className="-ml-1">
        {Array.from({ length: gameArray.length }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 lg:basis-1/3">
            <div className="p-1">
              <GameCard
                key={gameArray[index].id}
                id={gameArray[index].id}
                status={gameArray[index].status}
                cost={gameArray[index].cost}
                prizePool={gameArray[index].prizePool}
                createTimestamp={gameArray[index].createTimestamp}
                expireTimestamp={gameArray[index].expireTimestamp}
                nonce={gameArray[index].nonce}
                imageUrl={gameArray[index].imageUrl}
                width={1024}
                height={1024}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
