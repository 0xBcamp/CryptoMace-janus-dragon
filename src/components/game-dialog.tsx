"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GameCardProp } from "./game-card";
import Image, { StaticImageData } from "next/image";
import pic from "../../public/profile.png";
import { Input } from "./ui/input";

export interface GameDialogProp {
  id: number;
  status: boolean;
  cost: number;
  prizePool: number;
  createTimestamp: number;
  expireTimestamp: number;
  nonce: number;
  imageUrl: string | StaticImageData;
}

export function GameDialog({
  id,
  status,
  cost,
  prizePool,
  imageUrl,
}: GameDialogProp) {

  const [input, setInput] = useState('');

  async function handleSubmit(amount: string) {
    console.log(`Submit ${amount} FTM to the Blockchain`);
  }

  return (
    <div className="w-3/4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">View Game</Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center justify-center p-6 rounded-lg shadow-md bg-primary-foreground/95">
          <DialogHeader className="flex flex-col ">
            <DialogTitle className="flex items-center justify-center text-xl font-bold">
              Game #{id}
            </DialogTitle>
            <DialogDescription className="text-sm grid grid-cols-2 items-center justify-center space-x-4">
              <div className="flex flex-col">
                <h2 className="text-lg font-bold">Status</h2>
                <h1 className="text-xl font-semibold">
                  {status === true ? (
                    <p className="text-green-500">ACTIVE</p>
                  ) : (
                    <p className="text-red-500">EXPIRED</p>
                  )}
                </h1>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-lg font-bold">Total Pool </h2>
                <h1 className="text-xl font-semibold">{prizePool} FTM</h1>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center space-x-4">
            <div>
              <Image
                src={imageUrl}
                alt="image"
                width={300}
                height={300}
                className="rounded-md"
              />
            </div>
            <div className="flex flex-col w-full items-center justify-center space-y-2 p-4">
              <h3 className="text-2xl font-bold">RATE THIS PICTURE</h3>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-24 h-12 text-center text-lg"
                placeholder="69"
              />
              <p className="text-md font-bold italic">Type a number 1-100</p>
            </div>
            <div className="flex flex-row  items-center justify-center">
              <h2 className="text-lg font-bold">
                Entry Fee
                <span className="font-bold text-green-900"> {cost}</span> FTM
              </h2>
            </div>
            <Button variant="secondary" className="w-full" onClick={() => handleSubmit(input)}>
              Submit Rating
            </Button>
          </div>

          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="w-full">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
