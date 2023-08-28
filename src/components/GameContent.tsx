import { assertNever } from "../helpers/general";
import { Mark } from "../type-helpers/app";
import { GameContentGrid } from "./GameContentGrid";
import { GameContentHead } from "./GameContentHead";
import { useState } from "react";

type Props = {
    playerOneMark: Mark
};

export function GameContent(props: Props) {
    const [currentTurnMark, setCurrentTurnMark] = useState<Mark>("X");

    const handleMovePlayed = (moveResult: Mark | "" | "draw") => {
        /*
            If moveResult is,
                "X"    - X is the winner
                "0"    - 0 is the winner
                ""     - "game continues"
                "draw" - game draw
        */
       switch (moveResult) {
            case "": {
                return setCurrentTurnMark(currentTurnMark === "X" ? "0" : "X");
            }
            case "X": {
                console.log("X is the winner");
                return;
            } 
            case "0": {
                console.log("0 is the winner");
                return;
            }
            case "draw": {
                console.log("draw");
                return;
            }
            default: {
                assertNever(moveResult, `Not handled - moveResult type: ${moveResult}`);
            }
       }
    };

    return (
        <div
            className = "border border-white my-0 tabAndUp:my-auto"
        >
            <GameContentHead
                currentTurnMark = {currentTurnMark}
                isPlayerOneTurn = {currentTurnMark === props.playerOneMark}
            />
            <GameContentGrid
                currentTurnMark = {currentTurnMark}
                onMovePlayed = {handleMovePlayed}
            />
        </div>
    );
}
