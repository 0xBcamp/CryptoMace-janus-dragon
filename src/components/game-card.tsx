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
import pic from "../../public/profile.png";
import { Button } from "./ui/button";
import { GameDialog } from "./game-dialog";
import { Half2Icon } from "@radix-ui/react-icons";

export interface GameCardProp {
  id: number;
  status: boolean;
  cost: number;
  prizePool: number;
  createTimestamp: number;
  expireTimestamp: number;
  nonce: number;
  imageUrl: string | StaticImageData;
  width: number;
  height: number;
}

const GameCard = ({
  id,
  status,
  cost,
  prizePool,
  createTimestamp,
  expireTimestamp,
  nonce,
  imageUrl,
  width,
  height,
}: GameCardProp) => {
  return (
    <Card className="flex flex-col items-center justify-between bg-card/90 border-accent">
      <CardHeader className="flex flex-col items-center justify-center bg-primary text-white w-full rounded-t-xl">
        <CardTitle>Game #{id}</CardTitle>
        <CardDescription className="grid grid-cols-2 items-center justify-center mt-4 space-x-4">
          <h3 className="flex flex-col items-center justify-center">
            Status{" "}
            {status === true ? (
              <p className="text-green-500">ACTIVE</p>
            ) : (
              <p className="text-red-500">EXPIRED</p>
            )}
          </h3>
          <h3 className="flex flex-col items-center justify-center">
            Entry Fee <br /> <span className="font-bold">{cost} FTM</span>
          </h3>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <Image
          src={imageUrl}
          alt="image"
          width={width}
          height={height}
          className="rounded-lg mt-4"
        />
        <div className="flex items-center">
          <GameDialog
            id={id}
            status={status}
            cost={cost}
            prizePool={prizePool}
            createTimestamp={createTimestamp}
            expireTimestamp={expireTimestamp}
            nonce={nonce}
            imageUrl={imageUrl}
          />
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 p-6 bg-primary text-white rounded-b-xl w-full">
        <div className="flex flex-col items-center justify-center border-r-1">
          <h3 className="text-md font-bold">Total Pool </h3>
          <h2 className="text-xl font-semibold">{prizePool} FTM</h2>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-md font-bold">Game Ends</h3>
          <h2 className="text-xl font-semibold">
            {createTimestamp}hr{expireTimestamp}mins
          </h2>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
