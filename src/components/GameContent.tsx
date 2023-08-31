import { assertNever, joinClasses } from "../helpers/general";
import { GameType, Mark } from "../type-helpers/app";
import { Stats } from "../type-helpers/game-content";
import { Dialog, DialogProps } from "./Dialog";
import { GameContentBottom } from "./GameContentBottom";
import { GameContentMid } from "./GameContentMid";
import { GameContentTop } from "./GameContentTop";
import { useState, useEffect } from "react";
import { YesNoBtns, YesNoBtnsProps } from "./YesNoBtns";
import { X } from "./X";
import { Zero } from "./Zero";

function getPlayerWonKey(wonMark: Mark, playerOneMark: Mark): keyof Stats {
    return wonMark === playerOneMark ? "playerOneWins" : "playerTwoWins";
}

function getWinLoseMsg(isSoloGame: boolean, didPlayerOneWin: boolean): string {
    if (isSoloGame) {
        return didPlayerOneWin ? "you won!" : "oh no, you lost ...";
    }
    return `player ${didPlayerOneWin ? "1" : "2"} wins!`;
}

function didXWin(winnerStr: WinnerStr): boolean {
    return winnerStr[winnerStr.length - 1].toLowerCase() === "x";
}

type WinnerStr = `winner-${Mark}`;

type Modal = 
    | "restart"
    | WinnerStr
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
    // This state will be used to reset the game grid's state
    const [gameGridKey, setGameGridKey] = useState(Date.now());
    const [stats, setStats] = useState<Stats>({
        playerOneWins: 0,
        ties: 0,
        playerTwoWins: 0
    });

    useEffect(() => {
        const stateInLs = window.localStorage.getItem("uewk")
        console.log(stateInLs, typeof stateInLs);
    }, []);

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
                const playerWonKey = getPlayerWonKey("X", props.playerOneMark);
                setStats({...stats, [playerWonKey]: stats[playerWonKey] + 1});
                setOpenModalType("winner-X");
                return;
            } 
            case "0": {
                const playerWonKey = getPlayerWonKey("0", props.playerOneMark);
                setStats({...stats, [playerWonKey]: stats[playerWonKey] + 1}); 
                setOpenModalType("winner-0");
                return;
            }
            case "draw": {
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
    let commonYesNoBtnProps: Pick<YesNoBtnsProps, "yesBtnProps" | "noBtnProps"> = {
        yesBtnProps: {
            content: "next round",
            onClick: handleNextRound
        },
        noBtnProps: {
            content: "quit",
            onClick: props.onQuit
        }
    };
    switch (openModalType) {
        case "none": {
            modal = null;
            break;
        }
        case "winner-X": 
        case "winner-0": {
            const isWinnerX = didXWin(openModalType);
            const Icon = isWinnerX ? X : Zero;
            modal = (
                <Dialog
                    {...commonModalProps}
                    className = "flex flex-col items-center gap-y-4 uppercase py-[40px] tabAndUp:py-[45px]"   
                >
                    <span
                        className = "font-heading-xs text-silver"
                    >
                        {getWinLoseMsg(props.gameType === "solo", isWinnerX ? props.playerOneMark === "X" : props.playerOneMark === "0")}
                    </span>
                    <Dialog.Title
                        className = {joinClasses(
                            "font-heading-m",
                            "flex gap-x-2 tabAndUp:gap-x-6 items-center",
                            isWinnerX ? "text-blue-more-green" : "text-dark-yellow"
                        )}
                    >
                        <Icon 
                            className = "w-[1.875rem] h-[1.875rem] tabAndUp:w-16 tabAndUp:h-16"
                        />
                        <span
                            className = "font-heading-m tabAndUp:font-heading-l"
                        >
                            takes the round
                        </span>
                    </Dialog.Title>
                    <YesNoBtns 
                        {...commonYesNoBtnProps}
                        className = "mt-2"
                    />
                </Dialog>
            );
            break;
        }
        case "restart":
        case "tie": {
            let titleText = "round tied";
            if (openModalType === "restart") {
                titleText = "restart game?";
                commonYesNoBtnProps = {
                    yesBtnProps: {
                        content: "yes, restart",
                        onClick: handleRestart
                    },
                    noBtnProps: {
                        content: "no, cancel",
                        onClick: () => setOpenModalType("none")
                    }
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
                        {...commonYesNoBtnProps}
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
