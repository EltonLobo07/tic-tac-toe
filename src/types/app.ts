import { GAME_TYPE, MARK, NOT_SELECTED } from "../helpers/app";

export type Mark = typeof MARK[number];
export type GameType = typeof GAME_TYPE[number];
export type GameTypeState = GameType | typeof NOT_SELECTED;
