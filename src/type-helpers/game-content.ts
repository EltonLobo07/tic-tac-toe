import { Mark } from "./app";
import { STATS_KEYS } from "../helpers/game-content";
import { FlattenOneLvl } from "./general";

export type MoveResult = Mark | "" | "draw"; 
export type Stats = Record<typeof STATS_KEYS[number], number>;
export type GameGridState = (Mark | "")[];
export type PossibleMark = FlattenOneLvl<GameGridState>;
