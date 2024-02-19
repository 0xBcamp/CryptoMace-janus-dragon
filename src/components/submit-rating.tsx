import React, { FormEvent, useState } from "react";
import { useAccount, useContractWrite } from "wagmi";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { R8RAbi } from "@/abi/r8rabi";
import { parseEther } from "viem";
import { useQuery } from "@apollo/client";
import { LOAD_GAMES } from "@/GraphQL/queries";

const SubmitRating = ({ gameId }: { gameId: number }) => {
  const { address } = useAccount();
  const { data } = useQuery(LOAD_GAMES);

  const game = data?.games?.items?.find((game: any) => game.id === gameId);
  const hasEntered = game?.gamePlayer?.items?.some(
    (player: any) => player.playerId === address
  );

  console.log(address);
  const [userRating, setUserRating] = useState("");

  const cost = 1;

  const {
    data: hash,
    error,
    isLoading,
    isSuccess,
    write,
  } = useContractWrite({
    address: "0x4e2dd804E4f7CCEbaDa82531d52D8F998541c997", // Replace with your contract's address
    abi: R8RAbi,
    functionName: "joinGame", // Replace 'mint' with your contract's relevant function
    account: address,
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setUserRating(e.target.value);
    // Validate userRating before submission if necessary
    write({
      args: [
        "0xad29abb318791d579433d831ed122afeaf29dcfe", // This assumes your form has an input for the token address
        BigInt(cost), // Convert to BigInt for token amount
        BigInt(gameId),
        BigInt(50),
      ],
      // from: address,
      value: parseEther("1"),
    });
  };
  if (hasEntered) {
    return <div>You have already entered this game</div>;
  } else {
    return (
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <div className="text-xl mt-1 p-2 flex items-center justify-between">
          SUBMIT RATING:
          <Input
            type="number"
            name="userRating"
            onChange={(e) => setUserRating(e.target.value)}
            // onSubmit={(e) => setUserRating(e.target.value)}
            className="border-primary w-20 h-12 pt-2 text-xl"
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
        {error && <div>Error: {error.message}</div>}
      </form>
    );
  }
};

export default SubmitRating;
