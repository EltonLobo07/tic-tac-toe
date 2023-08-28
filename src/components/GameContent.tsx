import { Mark } from "../type-helpers/app";
import { GameContentGrid } from "./GameContentGrid";
import { GameContentHead } from "./GameContentHead";
import { useState } from "react";

type Props = {
    playerOneMark: Mark
};

export function GameContent(props: Props) {
    const [currentTurnMark, setCurrentTurnMark] = useState<Mark>("X");

    return (
        <div
            className = "border border-white my-0 tabAndUp:my-auto"
        >
            <GameContentHead
                currentTurnMark = {currentTurnMark}
                isPlayerOneTurn = {currentTurnMark === props.playerOneMark}
            />
            <GameContentGrid />
        </div>
    );
}
