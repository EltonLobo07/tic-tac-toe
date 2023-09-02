import { GameType, Mark } from "../type-helpers/app";
import { VisuallyHidden } from "./VisuallyHidden";
import { assertNever, joinClasses } from "../helpers/general";
import { GameGridState, Line } from "../type-helpers/game-content";
// import { useLocalStorageState } from "../custom-hooks/useLocalStorageState";
import { GameGridBtn } from "./GameGridBtn";
import { TillNumInclusive } from "../type-helpers/general";

function winingLineToValidSet(winingLine: Line): Set<TillNumInclusive<9>> {
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

type Props = {
    grid: GameGridState
    currentTurnMark: Mark,
    gameType: GameType,
    winingLine: Line,
    onMovePlayed: (gridCellNum: number) => void,
    isPlayerOneTurn: boolean
};

export function GameContentMid(props: Props) {
    /*
    const [gameState, setGameState] = useLocalStorageState<GameState>({
        initialState: new Array(NUM_CELLS).fill(""),
        lsKey: "gameState",
        isState: (possibleState): possibleState is GameState => (
            Array.isArray(possibleState) &&
            possibleState.find(cellState => cellState !== "X" || cellState !== "0" || cellState !== "") !== undefined
        ) 
    });
    */

    const sectionTitle = "game grid";
    const machineTurn = props.gameType === "solo" && !props.isPlayerOneTurn;
    const winingCellNums = winingLineToValidSet(props.winingLine);
    console.log("Todo:", winingCellNums); 

    const cells: JSX.Element[] = [];
    // cellNum won't change, its safe to assign key to the index
    for (let cellNum = 0; cellNum < props.grid.length; cellNum += 1) {
        cells.push(
            <GameGridBtn 
                key = {cellNum}
                hideIconOutline = {machineTurn}
                markAssigned = {props.grid[cellNum]}
                swapBgAndTxtColor = {winingCellNums.has(cellNum as TillNumInclusive<9>)}
                currentTurnMark = {props.currentTurnMark}
                nativeBtnProps = {{
                    disabled: props.grid[cellNum] !== "" || machineTurn,
                    type: "button",
                    onClick: () => props.onMovePlayed(cellNum),
                    className: joinClasses(
                        "justify-self-stretch",
                        "min-w-24 h-24 tabAndUp:min-w-[8.75rem] tabAndUp:h-[8.75rem]",
                        "flex justify-center items-center",
                        "box-shadow black-box-shadow",
                        "border-none",
                        "rounded-16px"
                    ) 
                }}
            />
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
