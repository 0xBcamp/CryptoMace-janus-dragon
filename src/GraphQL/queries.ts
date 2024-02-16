"use client";
import { gql } from "@apollo/client";

export const LOAD_GAMES = gql`
  query {
    games {
      items {
        id
        status
        prizePool
        expireTimestamp
        cost
        gamePlayer {
          items {
            playerId
            playerRating
          }
        }
      }
    }
  }
`;
