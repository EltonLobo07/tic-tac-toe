import { Mark } from "../type-helpers/app";
import { Button } from "./Button";
import { VisuallyHidden } from "./VisuallyHidden";
import { X } from "./X";
import { Zero } from "./Zero";
import { assertNever, joinClasses } from "../helpers/general";
import { GameGridState } from "../type-helpers/game-content";
// import { useLocalStorageState } from "../custom-hooks/useLocalStorageState";
import { FlattenOneLvl } from "../type-helpers/general";

type GameState = GameGridState;
type PossibleMark = FlattenOneLvl<GameState>;

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

type Props = {
    grid: GameGridState
    currentTurnMark: Mark,
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

    const cells: JSX.Element[] = [];
    // cellNum won't change, its safe to assign key to the index
    for (let cellNum = 0; cellNum < props.grid.length; cellNum += 1) {
        const CellIcon = getCellIcon(props.grid[cellNum]);
        cells.push(
            <Button
                key = {cellNum}
                nativeBtnProps = {{
                    disabled: props.grid[cellNum] !== "",
                    type: "button",
                    onClick: () => props.onMovePlayed(cellNum),
                    className: joinClasses(
                        "relative",
                        "justify-self-stretch",
                        "min-w-24 h-24 tabAndUp:min-w-[8.75rem] tabAndUp:h-[8.75rem]",
                        "flex justify-center items-center",
                        "box-shadow black-box-shadow",
                        "border-none",
                        "bg-almost-black-green",
                        props.grid[cellNum] === "X" ? "text-blue-more-green" : "text-dark-yellow",
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
