"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import GameCard from "./game-card";

import { useQuery, gql } from "@apollo/client";
import { LOAD_GAMES } from "../GraphQL/queries";
import { useEffect, useState } from "react";

export function GameCarousal() {
  const { data, error, loading } = useQuery(LOAD_GAMES);
  const [games, setGames] = useState([]);
  const imgUrl = "https://my-r8r-bucket.s3.amazonaws.com";

  useEffect(() => {
    if (data) {
      setGames(data.games.items);
      console.log(games);
    }
  }, [data, games]);

  if (loading) return <div>Loading</div>;

  return (
    <Carousel className="w-1/4 lg:w-1/3 mx-auto">
      <CarouselContent className="-ml-1">
        {Array.from({ length: games.length }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 lg:basis-1/3">
            <div className="p-1">
              <GameCard
                key={games[index].id}
                id={games[index].id}
                status={games[index].status}
                cost={games[index].cost}
                prizePool={games[index].prizePool}
                players={games[index].gamePlayer.items.length}
                expireTimestamp={games[index].expireTimestamp}
                nonce={games[index].nonce}
                imageUrl={`${imgUrl}/${games[index].id}.png`}
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
