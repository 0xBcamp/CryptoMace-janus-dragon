import { gql } from "@apollo/client";

export const LOAD_GAMES = gql`
  query {
    getGames {
      id
      cost
    }
  }
`;
