import { GameType, GameTypeState, Mark } from "../types/app";

export const MARK = [
    "X",
    "0"
] as const;

export function isMark(possibleMark: unknown): possibleMark is Mark {
    return MARK.find(mark => mark === possibleMark) !== undefined;
}

export const GAME_TYPE = [
    "solo",
    "multi"
] as const;

export function isGameType(possibleGameType: unknown): possibleGameType is GameType {
    return GAME_TYPE.find(gameType => gameType === possibleGameType) !== undefined;
}

export const NOT_SELECTED = "not-selected";

export function isGameTypeState(possibleGameTypeState: unknown): possibleGameTypeState is GameTypeState {
    return [...GAME_TYPE, NOT_SELECTED].find(gameTypeState => gameTypeState === possibleGameTypeState) !== undefined;
}
