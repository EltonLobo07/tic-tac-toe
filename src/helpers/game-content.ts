import { Mark } from "../type-helpers/app";
import { GameGridState, PossibleMark, Stats } from "../type-helpers/game-content";

export const STATS_KEYS = [
    "playerOneWins",
    "playerTwoWins",
    "ties"
] as const;

export const NUM_CELLS = 9;

export const INITIAL_GRID_STATE = new Array(NUM_CELLS).fill("");

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

function convertMarkToNum(mark: PossibleMark): number {
    const isMarkXNum = Number(mark === "X");
    return isMarkXNum + Number(mark === "0") * (1 - isMarkXNum) * (-1);
}

export function getWinner(gameState: GameGridState): PossibleMark {
    const rows = [0, 0, 0];
    const cols = [0, 0, 0];
    const diagonals = [0, 0];
    for (let i = 0; i < 3; i += 1) {
        rows[0] += convertMarkToNum(gameState[i]);
        rows[1] += convertMarkToNum(gameState[3 + i]);
        rows[2] += convertMarkToNum(gameState[6 + i]);
        cols[0] += convertMarkToNum(gameState[3 * i]);
        cols[1] += convertMarkToNum(gameState[3 * i + 1]);
        cols[2] += convertMarkToNum(gameState[3 * i + 2]);
        diagonals[0] += convertMarkToNum(gameState[4 * i]);
        diagonals[1] += convertMarkToNum(gameState[2 + 2 * i]);
    }
    const tmp: [Mark, (arg: number) => boolean][] = [
        ["X", v => v === 3],
        ["0", v => v === -3]
    ];
    for (let i = 0; i < tmp.length; i += 1) {
        const test = tmp[i][1];
        if (rows.some(test) || cols.some(test) || diagonals.some(test)) {
            return tmp[i][0];
        }
    } 
    return "";
}

function tieCheck(gameGridState: GameGridState): boolean {
    return gameGridState.reduce((acc, curMark) => acc + Number(curMark !== ""), 0) === gameGridState.length;
}

export function toggleMark(mark: Mark) {
    return mark === "X" ? "0" : "X";
}

function getMoveScore(
    gameGridState: GameGridState, 
    markToUse: Mark,
    assignedMark: Mark
): number {
    const result = getWinner(gameGridState);
    if (result !== "") {
        return assignedMark === result ? 1 : -1;
    }
    if (tieCheck(gameGridState)) {
        return 0;
    }
    let [res, aggrFn] = [-Infinity, Math.max];
    if (markToUse !== assignedMark) {
        [res, aggrFn] = [Infinity, Math.min];
    }
    for (let i = 0; i < gameGridState.length; i += 1) {
        if (gameGridState[i] === "") {
            const prevMark = gameGridState[i];
            gameGridState[i] = markToUse;
            res = aggrFn(res, getMoveScore(gameGridState, toggleMark(markToUse), assignedMark));
            gameGridState[i] = prevMark; 
        }
    }
    return res;
}

export function getNxtMove(gameGridState: GameGridState, assignedMark: Mark) {
    if (getWinner(gameGridState) !== "") {
        return -1;
    }
    const newGameGridState = [...gameGridState];
    let [mxPoint, mxCell] = [-Infinity, -1];
    for (let i = 0; i < newGameGridState.length; i += 1) {
        if (newGameGridState[i] === "") {
            const prevMark = newGameGridState[i];
            newGameGridState[i] = assignedMark;
            const curResult = getMoveScore(newGameGridState, toggleMark(assignedMark), assignedMark);
            if (curResult > mxPoint) {
                [mxPoint, mxCell] = [curResult, i];
            }
            newGameGridState[i] = prevMark;
        }
    }
    return mxCell;
}
