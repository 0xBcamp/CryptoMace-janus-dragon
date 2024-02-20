"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const RulesDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default2">Rules</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Welcome to R8R - The Ultimate AI Picture Rating Challenge!
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <strong>How to Play:</strong>
        </DialogDescription>
        <ul>
          <li>
            Use tokens to enter any active game; each image has a prize pot.
          </li>
          <li>
            Submit a rating guess (1 to 100) predicting the AI&apos;s (R8R)
            score.
          </li>
          <li>
            After submissions close, R8R&apos;s official score is unveiled.
          </li>
          <li>
            Match R8R&apos;s rating to win the pot; it&apos;s split if there are
            multiple winners.
          </li>
        </ul>
        <DialogDescription>
          <strong>Rules and Guidelines:</strong>
        </DialogDescription>
        <ul>
          <li>Entry to each game requires a specific number of tokens.</li>
          <li>Only one guess allowed per image.</li>
          <li>
            Submissions must be within the game&apos;s time frame; late entries
            are excluded.
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default RulesDialog;
