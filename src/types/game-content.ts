import { Mark } from "./app";
import { LINE, MODAL, STATS_KEYS } from "../helpers/game-content";
import { FlattenOneLvl } from "./general";

export type MoveResult = Mark | "" | "draw"; 
export type Stats = Record<typeof STATS_KEYS[number], number>;
export type GameGridState = (Mark | "")[];
export type PossibleMark = FlattenOneLvl<GameGridState>;
export type GameState = {
    grid: GameGridState,
    initialTurnMark: Mark,
    currentTurnMark: Mark 
};
export type Modal = typeof MODAL[number];
export type Line = typeof LINE[number];
