import React, { FormEvent, useEffect, useState } from "react";
import { useAccount, useContractWrite } from "wagmi";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { R8RAbi } from "@/abi/r8rabi";
import { parseEther } from "viem";
import { useQuery } from "@apollo/client";
import { LOAD_GAMES } from "@/GraphQL/queries";
import { useMoonSDK } from "@/app/usemoonsdk";

const SubmitRating = ({ gameId }: { gameId: number }) => {
  const { address } = useAccount();

  const { data } = useQuery(LOAD_GAMES);
  const [userRating, setUserRating] = useState<number>(0);

  const playerRating = data?.games?.items
    .map((game: { gamePlayer: { items: any[] } }) =>
      game.gamePlayer.items.find(
        (player: { playerId: string | undefined }) =>
          player.playerId === address
      )
    )
    .find((gamePlayer: any) => gamePlayer !== undefined)?.playerRating;
  const game = data?.games?.items?.find((game: any) => game.id === gameId);
  const hasEntered = game?.gamePlayer?.items?.some(
    (player: any) => player.playerId === address
  );
  const cost = 1;

  const {
    data: hash,
    error,
    isLoading,
    isSuccess,
    write,
  } = useContractWrite({
    address: "0xa3F00Bc558A0Ef68a5Ee5Ffda924e7Ed95613328",
    abi: R8RAbi,
    functionName: "joinGame",
    account: address,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setUserRating(e.target.value);
    // Validate userRating before submission if necessary
    write({
      args: [
        "0x0000000000000000000000000000000000000000",
        BigInt(cost), // Convert to BigInt for token amount
        BigInt(gameId),
        BigInt(userRating),
      ],
      value: parseEther("1"),
    });
  };
  if (hasEntered) {
    return (
      <div className="text-2xl mt-1 p-2 flex flex-col items-center justify-between space-y-3">
        <p className="text-green-500">GAME ENTERED</p>
        <p className="text-2xl font-semibold text-accent">
          Your Rating:{" "}
          <span className="text-3xl font-bold text-green-500">
            {playerRating}
          </span>
        </p>
      </div>
    );
  } else {
    return (
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <div className="text-xl mt-1 p-2 flex items-center justify-between">
          SUBMIT RATING:
          <input
            type="number"
            name="userRating"
            onChange={(e) => setUserRating(+e.target.value)}
            // onSubmit={(e) => setUserRating(e.target.value)}
            className="w-20 h-12 pt-2 text-xl bg-black border-primary border-2 rounded-xl"
          />
        </div>
        <Button
          variant="default"
          className="w-full"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Confirming..." : "Submit Rating"}
        </Button>
        {hash && <div>Transaction Hash</div>}
        {isLoading && <div>Waiting for confirmation...</div>}
        {isSuccess && <div>Transaction confirmed.</div>}
        {error && <div>Error</div>}
      </form>
    );
  }
};

export default SubmitRating;
