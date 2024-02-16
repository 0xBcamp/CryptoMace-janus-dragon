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
import { Button } from "@/components/ui/button"; // Ensure you have a Text component or similar for formatting

const RulesDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Rules</Button>
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
        <ol>
          <li>
            Join a Game: To participate, use your tokens to enter any active
            game. Each image has its own pot of prize money.
          </li>
          <li>
            Rate the Image: View the featured image and submit your rating
            guess, anywhere from 1 to 100. This rating is your prediction of
            what our advanced AI, R8R, will assign to the image.
          </li>
          <li>
            AI Rating Reveal: After the submission period closes, R8R will
            analyze and rate the image based on a range of factors. Its rating
            will be revealed as the official score.
          </li>
          <li>
            Winning the Pot: If your guess matches R8R’s rating,
            congratulations! You win the entire pot of money for that game. In
            case of multiple winners, the pot is evenly split.
          </li>
        </ol>
        <p>
          <strong>Rules and Guidelines:</strong>
        </p>
        <ul>
          <li>
            Token Entry: Each game requires a specific number of tokens to
            enter. Tokens can be purchased or earned through various activities
            on our platform.
          </li>
          <li>
            One Guess Per Player: Each player is allowed one guess per image.
            Choose wisely!
          </li>
          <li>
            Timely Submission: All guesses must be submitted within the
            allocated time frame for each game. Late entries will not be
            considered.
          </li>
          {/* <li>
            Fair Play: We employ stringent measures to ensure fair play. Any
            attempt to manipulate scores or misuse the platform will result in
            immediate disqualification and potential banning from future games.
          </li>
          <li>
            Prize Distribution: Winners will receive their prize money through
            the registered payment method on their account. Please ensure your
            payment details are up to date.
          </li>
          <li>
            Age Restriction: Players must be 18 years or older to participate.
            Please play responsibly.
          </li> */}
        </ul>
        {/* <p>
          <strong>Disclaimer:</strong>
        </p>
        <p>
          The AI’s rating is final and based on complex algorithms. It might not
          always align with human judgment or preference. The nature of AI
          rating means that there can be an element of unpredictability, making
          each game uniquely exciting.
        </p>
        <p>
          <strong>Support:</strong>
        </p>
        <p>
          For any questions or assistance, please contact our support team
          through [insert support contact details].
        </p>
        <p>
          <strong>Join the Excitement:</strong>
        </p>
        <p>
          Ready to test your rating skills against R8R? Sign up, enter a game,
          and you could be our next big winner! Let the guessing begin!
        </p> */}
      </DialogContent>
    </Dialog>
  );
};

export default RulesDialog;
