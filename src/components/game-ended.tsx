import { LOAD_GAMES } from "@/GraphQL/queries";
import { useQuery } from "@apollo/client";

const GameEnded = ({ gameId }: { gameId: number }) => {
  const { data } = useQuery(LOAD_GAMES);
  const game = data?.games?.items?.find((game: any) => game.id === gameId);
  const aiRating = game?.aiRating;

  return (
    <div className="text-2xl mt-1 p-2 flex flex-col items-center justify-between space-y-3">
      <p className="text-red-500">GAME OVER</p>
      <p className="text-2xl font-semibold text-accent">AI Rating</p>
      <p className="text-3xl font-bold text-green-500">{aiRating}</p>
    </div>
  );
};

export default GameEnded;
