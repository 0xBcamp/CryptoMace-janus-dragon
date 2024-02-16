import { useQuery, gql } from "@apollo/client";
import { LOAD_GAMES } from "../GraphQL/queries";
import { useEffect, useState } from "react";

const GetGames = () => {
  const { data, loading, error } = useQuery(LOAD_GAMES);
  const [games, setGames] = useState([]);

  useEffect(() => {
    if (data) {
      // setGames(data.getAllGames)
    }
  }, [data]);

  return <div>GetGames</div>;
};

export default GetGames;
