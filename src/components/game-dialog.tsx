"use client";

import { Button } from "@/components/ui/button";
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
import SubmitRating from "./submit-rating";

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
  async function handleSubmit() {
    console.log("Submit to Blockchain");
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
            <SubmitRating gameId={id} />
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
