import { Mark } from "./app";

export type MoveResult = Mark | "" | "draw"; 
export type Stats = Record<"playerOneWins" | "ties" | "playerTwoWins", number>;

