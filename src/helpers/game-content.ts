import { Stats } from "../type-helpers/game-content";

export const STATS_KEYS = [
    "playerOneWins",
    "playerTwoWins",
    "ties"
] as const;

function hasOwnAndIsNum(obj: object, propertyName: string) {
    return Object.prototype.hasOwnProperty.call(obj, propertyName) && typeof obj[propertyName as keyof typeof obj] === "number";
}

export function isStats(possibleStats: unknown): possibleStats is Stats {
    return (
        typeof possibleStats === "object" &&
        possibleStats !== null &&
        STATS_KEYS
            .map(statsKey => hasOwnAndIsNum(possibleStats, statsKey))
            .every(isStatesKeyResult => isStatesKeyResult)
    );
}
