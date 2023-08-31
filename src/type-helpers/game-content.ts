import { Mark } from "./app";
import { STATS_KEYS } from "../helpers/game-content";

export type MoveResult = Mark | "" | "draw"; 
export type Stats = Record<typeof STATS_KEYS[number], number>;

