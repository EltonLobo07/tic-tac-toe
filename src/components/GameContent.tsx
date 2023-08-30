import { assertNever } from "../helpers/general";
import { GameType, Mark } from "../type-helpers/app";
import { Stats } from "../type-helpers/game-content";
import { GameContentBottom } from "./GameContentBottom";
import { GameContentMid } from "./GameContentMid";
import { GameContentTop } from "./GameContentTop";
import { useState } from "react";

function getPlayerWonKey(wonMark: Mark, playerOneMark: Mark): keyof Stats {
    return wonMark === playerOneMark ? "playerOneWins" : "playerTwoWins";
}

type Props = {
    playerOneMark: Mark,
    gameType: GameType
};

export function GameContent(props: Props) {
    const [currentTurnMark, setCurrentTurnMark] = useState<Mark>("X");
    const [stats, setStats] = useState<Stats>({
        playerOneWins: 0,
        ties: 0,
        playerTwoWins: 0
    });

    const handleMovePlayed = (moveResult: Mark | "" | "draw") => {
        /*
            If moveResult is,
                "X"    - X is the winner
                "0"    - 0 is the winner
                ""     - game continues
                "draw" - game draw
        */
       switch (moveResult) {
            case "": {
                return setCurrentTurnMark(currentTurnMark === "X" ? "0" : "X");
            }
            case "X": {
                console.log("X is the winner");
                const playerWonKey = getPlayerWonKey("X", props.playerOneMark);
                setStats({...stats, [playerWonKey]: stats[playerWonKey] + 1});
                return;
            } 
            case "0": {
                console.log("0 is the winner");
                const playerWonKey = getPlayerWonKey("0", props.playerOneMark);
                setStats({...stats, [playerWonKey]: stats[playerWonKey] + 1}); 
                return;
            }
            case "draw": {
                console.log("draw");
                setStats({...stats, ties: stats.ties + 1});
                return;
            }
            default: {
                assertNever(moveResult, `Not handled - moveResult type: ${moveResult}`);
            }
       }
    };

    return (
        <div
            className = "my-0 tabAndUp:my-auto"
        >
            <GameContentTop
                currentTurnMark = {currentTurnMark}
                isPlayerOneTurn = {currentTurnMark === props.playerOneMark}
            />
            <GameContentMid
                currentTurnMark = {currentTurnMark}
                onMovePlayed = {handleMovePlayed}
            />
            <GameContentBottom
                playerOneMark = {props.playerOneMark}
                gameType = {props.gameType}
                stats = {stats}
            />
        </div>
    );
}
