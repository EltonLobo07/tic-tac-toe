import { Mark } from "../type-helpers/app";
import { Button } from "./Button";
import { VisuallyHidden } from "./VisuallyHidden";
import { useState } from "react";
import { X } from "./X";
import { Zero } from "./Zero";
import { assertNever, joinClasses } from "../helpers/general";
import { MoveResult } from "../type-helpers/game-content";

type PossibleMark = Mark | "";
type GameState = PossibleMark[];
type MarkAndMarkTest = [Mark, (arg: number) => boolean];

const NUM_CELLS = 9;

function getCellIcon(mark: PossibleMark) {
    switch (mark) {
        case "X": {
            return X;
        } 
        case "0": {
            return Zero;
        }
        case "": {
            return;
        }
        default: {
            assertNever(mark, `Not handled type - mark: ${mark}`);
        }
    }
}

function convertMarkToNum(mark: PossibleMark): number {
    const isMarkXNum = Number(mark === "X");
    return isMarkXNum + Number(mark === "0") * (1 - isMarkXNum) * (-1);
}

function getWinner(gameState: GameState): PossibleMark {
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
    const tmp: MarkAndMarkTest[] = [
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

type Props = {
    currentTurnMark: Mark,
    onMovePlayed: (moveResult: MoveResult) => void
};

export function GameContentMid(props: Props) {
    const [gameState, setGameState] = useState<GameState>(() => new Array(NUM_CELLS).fill(""));

    const sectionTitle = "game grid";

    const onBtnClick = (cellNum: number) => {
        let totalMarks = 0;
        const newGameState: GameState = [];
        for (let i = 0; i < gameState.length; i += 1) {
            const mark = gameState[i];
            newGameState.push(mark);
            totalMarks += Number(mark !== "");
        }
        newGameState[cellNum] = props.currentTurnMark;
        totalMarks += 1;
        setGameState(newGameState);
        props.onMovePlayed(totalMarks === gameState.length ? "draw" : getWinner(newGameState));
    };

    const cells: JSX.Element[] = [];
    // cellNum won't change, its safe to assign key to the index
    for (let cellNum = 0; cellNum < NUM_CELLS; cellNum += 1) {
        const CellIcon = getCellIcon(gameState[cellNum]);
        cells.push(
            <Button
                key = {cellNum}
                nativeBtnProps = {{
                    disabled: gameState[cellNum] !== "",
                    type: "button",
                    onClick: () => onBtnClick(cellNum),
                    className: joinClasses(
                        "relative",
                        "justify-self-stretch",
                        "min-w-24 h-24 tabAndUp:min-w-[8.75rem] tabAndUp:h-[8.75rem]",
                        "flex justify-center items-center",
                        "box-shadow black-box-shadow",
                        "border-none",
                        "bg-almost-black-green",
                        gameState[cellNum] === "X" ? "text-blue-more-green" : "text-dark-yellow",
                        "rounded-16px"
                    )
                }}
            >
                {
                    CellIcon
                    ? <CellIcon 
                        className = "translate-y-[calc(var(--box-shadow-y-neg-offset)/2)] w-10 h-10 tabAndUp:w-16 tabAndUp:h-16" 
                      />
                    : (
                        <VisuallyHidden>
                            change grid button's state to {props.currentTurnMark}
                        </VisuallyHidden>
                    )  
                }
            </Button>
        );
    }

    return (
        <section
            aria-label = {sectionTitle}
            className = "relative grid grid-cols-3 gap-x-3 mobileAndUp:gap-x-5 gap-y-5 mb-5"
        >
            <VisuallyHidden>
                <h3>
                    {sectionTitle}
                </h3>
            </VisuallyHidden>
            {cells}
        </section>
    );
}
