import { assertNever } from "../helpers/general";
import { GameType, Mark } from "../type-helpers/app";
import { Stats } from "../type-helpers/game-content";
import { Dialog, DialogProps } from "./Dialog";
import { GameContentBottom } from "./GameContentBottom";
import { GameContentMid } from "./GameContentMid";
import { GameContentTop } from "./GameContentTop";
import { useState } from "react";
import { YesNoBtns, YesNoBtnsProps } from "./YesNoBtns";

function getPlayerWonKey(wonMark: Mark, playerOneMark: Mark): keyof Stats {
    return wonMark === playerOneMark ? "playerOneWins" : "playerTwoWins";
}

type Modal = 
    | "restart"
    | "clear-winner"
    | "tie"
    | "none";

type Props = {
    playerOneMark: Mark,
    gameType: GameType,
    onQuit: () => void
};

export function GameContent(props: Props) {
    const [openModalType, setOpenModalType] = useState<Modal>("none");
    const [initialTurnMark, setInitialTurnMark] = useState<Mark>("X");
    const [currentTurnMark, setCurrentTurnMark] = useState<Mark>(initialTurnMark);
    // This state will be used to resset the game grid's state
    const [gameGridKey, setGameGridKey] = useState(Date.now());
    const [stats, setStats] = useState<Stats>({
        playerOneWins: 0,
        ties: 0,
        playerTwoWins: 0
    });

    const handleRestart = () => {
        setGameGridKey(Date.now());
        setCurrentTurnMark(initialTurnMark);
        closeModal();
    };

    const handleNextRound = () => {
        setGameGridKey(Date.now());
        const newInitialTurnMark = initialTurnMark === "X" ? "0" : "X";
        setInitialTurnMark(newInitialTurnMark);
        setCurrentTurnMark(newInitialTurnMark);
        closeModal();
    };

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
                setOpenModalType("tie");
                return;
            }
            default: {
                assertNever(moveResult, `Not handled - moveResult type: ${moveResult}`);
            }
       }
    };

    const closeModal = () => setOpenModalType("none");

    let modal: JSX.Element | null = null;
    const commonModalProps: Pick<DialogProps, "open" | "onClose">  = {
        open: openModalType !== "none",
        onClose: closeModal
    };
    switch (openModalType) {
        case "none": {
            modal = null;
            break;
        }
        case "clear-winner": {
            modal = (
                <Dialog
                    {...commonModalProps}
        
                >
                    <div>
                        Todo
                    </div>
                </Dialog>
            );
            break;
        }
        case "restart":
        case "tie": {
            let titleText = "restart game?";
            let yesBtnProps: YesNoBtnsProps["yesBtnProps"] = {
                content: "yes, restart",
                onClick: handleRestart
            };
            let noBtnProps: YesNoBtnsProps["noBtnProps"] = {
                content: "no, cancel",
                onClick: closeModal
            };
            if (openModalType === "tie") {
                titleText = "round tied";
                yesBtnProps = {
                    content: "next round",
                    onClick: handleNextRound
                };
                noBtnProps = {
                    content: "quit",
                    onClick: props.onQuit
                };
            }
            modal = (
                <Dialog
                    {...commonModalProps}
                    className = "flex flex-col items-center gap-y-6 tabAndUp:gap-y-8 py-[60px] tabAndUp:py-[66px]"
                >
                    <Dialog.Title
                        className = "uppercase font-heading-m text-silver"
                    >
                        {titleText}
                    </Dialog.Title>
                    <YesNoBtns 
                        yesBtnProps = {yesBtnProps}
                        noBtnProps = {noBtnProps}
                    />
                </Dialog>
            );
            break;
        }
        default: {
            assertNever(openModalType, `Not handled type, openModalType - ${openModalType}`);
        }
    }

    return (
        <div
            className = "my-0 tabAndUp:my-auto px-4px"
        >
            {modal}
            <GameContentTop
                currentTurnMark = {currentTurnMark}
                isPlayerOneTurn = {currentTurnMark === props.playerOneMark}
                onRestart = {() => setOpenModalType("restart")}
            />
            <GameContentMid
                key = {gameGridKey}
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
