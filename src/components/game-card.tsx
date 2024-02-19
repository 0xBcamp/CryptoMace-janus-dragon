"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image, { StaticImageData } from "next/image";

import SubmitRating from "./submit-rating";
import GameEnded from "./game-ended";
import CountdownTimer from "./countdown-timer";

export interface GameCardProp {
  id: number;
  status: boolean;
  cost: number;
  prizePool: number;
  players: number;
  expireTimestamp: number;
  nonce: number;
  imageUrl: string | StaticImageData;
}

const GameCard = ({
  id,
  status,
  cost,
  prizePool,
  players,
  expireTimestamp,
  nonce,
  imageUrl,
}: GameCardProp) => {
  const endDay = new Date(expireTimestamp * 1000).toLocaleDateString();
  const date = new Date(expireTimestamp * 1000);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format the time; you might want to pad the minutes and seconds with leading zeros
  const endDate = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  const newCost = (cost / 1e18).toFixed(0);

  return (
    <Card className="flex flex-col bg-card/90 border-primary border-double shadow-custom">
      <CardHeader>
        <div className="flex uppercase font-bold items-center justify-evenly h-2 racking-widest">
          Game ID: #{id}
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Image
            src={imageUrl}
            alt="image"
            width={500}
            height={500}
            className="rounded-lg w-full h-auto"
          />
        </div>
        <div className=" px-3">
          <div className="flex justify-between text-lg my-1 pt-2 font-semibold">
            Status:
            {status === true ? (
              <span className="text-green-500">Active</span>
            ) : (
              <span className="text-red-500">Expired</span>
            )}
          </div>
          <div className="flex justify-between text-lg mb-1">
            <span className="font-semibold">Cost:</span>
            <span className="text-accent">{newCost} FTM</span>
          </div>
          <div className="flex flex-row justify-between text-lg mb-1">
            <span className="font-semibold">Prize Pool:</span>
            <span className="text-accent">{prizePool} FTM</span>
          </div>
          <div className="flex justify-between text-lg mb-1">
            <span className="font-semibold">Players:</span>
            <span className="text-accent"> {players}</span>{" "}
          </div>

          {status === true && (
            <div className="flex justify-between text-lg mb-2 font-semibold">
              Expires: <CountdownTimer expireTimestamp={expireTimestamp} />
            </div>
          )}
        </div>
        <div className="flex items-center justify-center">
          {status === true ? (
            <SubmitRating gameId={id} />
          ) : (
            <GameEnded gameId={id} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCard;
