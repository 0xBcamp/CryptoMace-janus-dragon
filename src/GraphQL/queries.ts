"use client";
import { gql } from "@apollo/client";

export const LOAD_GAMES = gql`
  query {
    game(id: "desc") {
      id
    }
    games {
      items {
        expireTimestamp
        createTimestamp
        cost
        id
        nonce
        prizePool
        status
      }
    }
  }
`;
