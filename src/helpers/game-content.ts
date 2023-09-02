import { GameType, Mark } from "../types/app";
import { GameGridState, GameState, Line, Modal, PossibleMark, Stats } from "../types/game-content";
import { TillNumInclusive } from "../types/general";
import { isMark } from "./app";
import { assertNever } from "./general";

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

function assertNumZeroOne(num: number): asserts num is TillNumInclusive<1> {
    if (num < 0 || num > 1) {
        throw new Error("The number is not 0 or 1");
    }
}

function assertNumZeroOneTwo(num: number): asserts num is TillNumInclusive<2> {
    if (num < 0 || num > 2) {
        throw new Error("The number is not 0, 1 or 2");
    }
}

export function getWinner(gameState: GameGridState): [PossibleMark, Line] {
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
        const [mark, test] = tmp[i];
        if (rows.findIndex(test) > -1) {
            const rowIdx = rows.findIndex(test);
            assertNumZeroOneTwo(rowIdx)
            return [mark, `row-${rowIdx}`];
        }
        if (cols.findIndex(test) > -1) {
            const colIdx = cols.findIndex(test);
            assertNumZeroOneTwo(colIdx);
            return [mark, `col-${colIdx}`];
        }
        if (diagonals.findIndex(test) > -1) {
            const diagIdx = diagonals.findIndex(test);
            assertNumZeroOne(diagIdx);
            return [mark, `diag-${diagIdx}`];
        }
    } 
    return ["", "none"];
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
    const result = getWinner(gameGridState)[0];
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
    if (getWinner(gameGridState)[0] !== "") {
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

export function isGrid(possibleGrid: unknown): possibleGrid is GameGridState {
    return (
        Array.isArray(possibleGrid) &&
        possibleGrid.length === 9 &&
        possibleGrid.every(value => value === "X" || value === "0" || value == "")
    );
}

export function isGameState(possibleGameState: unknown): possibleGameState is GameState {
    return (
        typeof possibleGameState === "object" &&
        possibleGameState !== null &&
        "grid" in possibleGameState &&
        isGrid(possibleGameState["grid"]) &&
        "initialTurnMark" in possibleGameState &&
        isMark(possibleGameState["initialTurnMark"]) &&
        "currentTurnMark" in possibleGameState &&
        isMark(possibleGameState["currentTurnMark"])
    );
}

export const MODAL = [
    "restart",
    "winner-X",
    "winner-0",
    "tie",
    "none"
] as const;

export function isModal(possibleModal: unknown): possibleModal is Modal {
    return MODAL.find(modalStr => modalStr === possibleModal) !== undefined;
}

export function getPlayerWonKey(wonMark: Mark, playerOneMark: Mark): keyof Stats {
    return wonMark === playerOneMark ? "playerOneWins" : "playerTwoWins";
}

export function getWinLoseMsg(isSoloGame: boolean, didPlayerOneWin: boolean): string {
    if (isSoloGame) {
        return didPlayerOneWin ? "you won!" : "oh no, you lost ...";
    }
    return `player ${didPlayerOneWin ? "1" : "2"} wins!`;
}

export function didXWin(winnerStr: `winner-${Mark}`): boolean {
    return winnerStr[winnerStr.length - 1].toLowerCase() === "x";
}

export const LINE = [
    "row-0",
    "row-1",
    "row-2",
    "col-0",
    "col-1",
    "col-2",
    "diag-0",
    "diag-1",
    "none"
] as const;

export function isLine(possibleLine: unknown): possibleLine is Line {
    return LINE.find(line => line === possibleLine) !== undefined;
}

export function winingLineToValidSet(winingLine: Line): Set<TillNumInclusive<9>> {
    let lst: TillNumInclusive<9>[] = [];
    switch (winingLine) {
        case "row-0": {
            lst = [0, 1, 2];
            break;
        }
        case "row-1": {
            lst = [3, 4, 5];
            break;
        }
        case "row-2": {
            lst = [6, 7, 8];
            break;
        }
        case "col-0": {
            lst = [0, 3, 6];
            break;
        }
        case "col-1": {
            lst = [1, 4, 7];
            break;
        }
        case "col-2": {
            lst = [2, 5, 8];
            break;
        }
        case "diag-0": {
            lst = [0, 4, 8];
            break;
        }
        case "diag-1": {
            lst = [2, 4, 6];
            break;
        }
        case "none": {
            break;
        }
        default: {
            assertNever(winingLine, `Not handled type - winingLine: ${winingLine}`);
        }
    }
    return new Set(lst);
}

export function getPlayerDisplayInfo(isPlayerOneMarkEqual: boolean, gameType: GameType): string {
    let res = `p${isPlayerOneMarkEqual ? "1" : "2"}`;
    if (gameType === "solo") {
        res = isPlayerOneMarkEqual ? "you" : "cpu";
    }
    return res.toUpperCase();
}

export function getPlayerOneMark(currentTurnMark: Mark, isPlayerOneTurn: boolean): Mark {
    if (isPlayerOneTurn) {
        return currentTurnMark;
    }
    if (currentTurnMark === "X") {
        return "0";
    }
    return "X";
}
