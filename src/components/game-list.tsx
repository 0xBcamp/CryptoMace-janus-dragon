import { LOAD_GAMES } from "@/GraphQL/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export interface Game {
  aiRating: number;
  id: number;
  status: boolean;
  prizePool: number;
  expireTimestamp: number;
  cost: number;
  gamePlayer: Player[];
}

export interface Player {
  playerId: string;
  playerRating: number;
}

export interface GamesData {
  games: {
    items: Game[];
  };
}

const GameList = () => {
  const { address } = useAccount();
  const { data, error, loading } = useQuery<GamesData>(LOAD_GAMES);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    if (data) {
      setGames(data.games.items);
    }
  }, [data]);

  // Create a shallow copy of the games array and sort that copy
  const sortedGames = [...games].sort((a, b) => a.id - b.id);

  return (
    <div>
      <table className="text-primary">
        <thead>
          <tr>
            <th>Game ID | </th>
            <th>Prize | </th>
            <th>Players | </th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedGames.map((game) => {
            const playerJoined =
              Array.isArray(game.gamePlayer) &&
              game.gamePlayer.some((player) => player.playerId === address);

            return (
              <tr
                key={game.id}
                style={{ background: playerJoined ? "#90ee90" : "none" }}
              >
                <td>{game.id}</td>
                <td>{(game.prizePool / 1e18).toFixed(0)}</td>
                <td>{game.gamePlayer.length}</td>
                <td>{game.status ? "Active" : "Inactive"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GameList;
