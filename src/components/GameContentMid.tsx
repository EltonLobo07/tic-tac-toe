import { GameType, Mark } from "../type-helpers/app";
import { VisuallyHidden } from "./VisuallyHidden";
import { joinClasses } from "../helpers/general";
import { GameGridState } from "../type-helpers/game-content";
// import { useLocalStorageState } from "../custom-hooks/useLocalStorageState";
import { GameGridBtn } from "./GameGridBtn";

type Props = {
    grid: GameGridState
    currentTurnMark: Mark,
    gameType: GameType,
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

    const cells: JSX.Element[] = [];
    // cellNum won't change, its safe to assign key to the index
    for (let cellNum = 0; cellNum < props.grid.length; cellNum += 1) {
        cells.push(
            <GameGridBtn 
                key = {cellNum}
                hideIconOutline = {machineTurn}
                markAssigned = {props.grid[cellNum]}
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
                        "bg-almost-black-green",
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
