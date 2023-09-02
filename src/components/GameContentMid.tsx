import { GameType, Mark } from "../types/app";
import { VisuallyHidden } from "./VisuallyHidden";
import { joinClasses } from "../helpers/general";
import { GameGridState, Line } from "../types/game-content";
import { GameGridBtn } from "./GameGridBtn";
import { TillNumInclusive } from "../types/general";
import { winingLineToValidSet } from "../helpers/game-content";

type Props = {
    grid: GameGridState
    currentTurnMark: Mark,
    gameType: GameType,
    winingLine: Line,
    onMovePlayed: (gridCellNum: number) => void,
    isPlayerOneTurn: boolean
};

export function GameContentMid(props: Props) {
    const sectionTitle = "game grid";
    const machineTurn = props.gameType === "solo" && !props.isPlayerOneTurn;
    const winingCellNums = winingLineToValidSet(props.winingLine);

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
