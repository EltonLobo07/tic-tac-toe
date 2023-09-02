import { assertNever, joinClasses } from "../helpers/general";
import { GameType, Mark } from "../types/app";
import { GameGridState, GameState, Line, Modal, Stats } from "../types/game-content";
import { Dialog, DialogProps } from "./Dialog";
import { GameContentBottom } from "./GameContentBottom";
import { GameContentMid } from "./GameContentMid";
import { GameContentTop } from "./GameContentTop";
import { YesNoBtns, YesNoBtnsProps } from "./YesNoBtns";
import { X } from "./X";
import { Zero } from "./Zero";
import { useLocalStorageState } from "../custom-hooks/useLocalStorageState";
import { didXWin, getPlayerWonKey, getWinLoseMsg, isGameState, isLine, isModal, isStats } from "../helpers/game-content";
import { useCallback, useEffect } from "react";
import { INITIAL_GRID_STATE, getNxtMove, getWinner, toggleMark } from "../helpers/game-content";

type Props = {
    playerOneMark: Mark,
    gameType: GameType,
    onQuit: () => void
};

export function GameContent(props: Props) {
    const [gameState, setGameState] = useLocalStorageState<GameState>({
        initialState: () => {
            const initialTurnMark = "X";
            return {
                grid: INITIAL_GRID_STATE,
                initialTurnMark,
                currentTurnMark: initialTurnMark
            };    
        },
        lsKey: "gameState",
        isState: isGameState
    }); 
    const [winingLine, setWiningLine] = useLocalStorageState<Line>({
        initialState: "none",
        lsKey: "winingLine",
        isState: isLine
    });
    const [openModalType, setOpenModalType] = useLocalStorageState<Modal>({
        initialState: "none",
        lsKey: "openModalType",
        isState: isModal
    });
    const [stats, setStats] = useLocalStorageState<Stats>({
        initialState: {
            playerOneWins: 0,
            ties: 0,
            playerTwoWins: 0
        },
        lsKey: "stats",
        isState: isStats
    });

    const setGameStateWrapper = useCallback(
        (
            newGameState: Partial<GameState> | ((prevGameState: GameState) => Partial<GameState>)
        ) => {
            return setGameState(prevGameState => ({
                ...prevGameState,
                ...(typeof newGameState === "function" ? newGameState(prevGameState) : newGameState)
            }));
        }, 
    [setGameState]);

    const handleMovePlayed = useCallback((gridCellNum: number) => {
        let totalMarks = 0;
        const newGrid: GameGridState = [];
        for (let i = 0; i < gameState.grid.length; i += 1) {
            const mark = gameState.grid[i];
            newGrid.push(mark);
            totalMarks += Number(mark !== "");
        }
        newGrid[gridCellNum] = gameState.currentTurnMark;
        totalMarks += 1;
        setGameStateWrapper({grid: newGrid});
        const [winnerMark, line] = getWinner(newGrid);
        const gameTied = winnerMark === "" && totalMarks === gameState.grid.length;
        const moveResult = gameTied ? "draw" : winnerMark;
        /*
            If moveResult is,
                "X"    - X is the winner
                "0"    - 0 is the winner
                ""     - game continues
                "draw" - game draw
        */
        switch (moveResult) {
            case "": {
                return setGameStateWrapper({currentTurnMark: toggleMark(gameState.currentTurnMark)});
            }
            case "X": {
                const playerWonKey = getPlayerWonKey("X", props.playerOneMark);
                setStats(stats => ({...stats, [playerWonKey]: stats[playerWonKey] + 1}));
                setOpenModalType("winner-X");
                setWiningLine(line);
                return;
            } 
            case "0": {
                const playerWonKey = getPlayerWonKey("0", props.playerOneMark);
                setStats(stats => ({...stats, [playerWonKey]: stats[playerWonKey] + 1})); 
                setOpenModalType("winner-0");
                setWiningLine(line);
                return;
            }
            case "draw": {
                setStats(stats => ({...stats, ties: stats.ties + 1}));
                setOpenModalType("tie");
                return;
            }
            default: {
                assertNever(moveResult, `Not handled - moveResult type: ${moveResult}`);
            }
        }
    }, [props.playerOneMark, setWiningLine, setGameStateWrapper, gameState.currentTurnMark, gameState.grid, setOpenModalType, setStats]);

    const isPlayerOneTurn = gameState.currentTurnMark === props.playerOneMark;

    useEffect(() => {
        let nxtMoveCellNum: number;
        if (
            props.gameType !== "solo" || 
            isPlayerOneTurn || 
            (nxtMoveCellNum = getNxtMove(gameState.grid, gameState.currentTurnMark)) === -1
        ) {
            return;
        }
        // Some artificial delay so that the move played is not too quick
        setTimeout(() => handleMovePlayed(nxtMoveCellNum), 500);
    }, [props.gameType, isPlayerOneTurn, gameState.grid, gameState.currentTurnMark, handleMovePlayed]);

    const handleRestart = () => {
        setGameStateWrapper(prevGameState => ({
            grid: INITIAL_GRID_STATE, 
            currentTurnMark: prevGameState.initialTurnMark
        }));
        resetWiningLine();
        closeModal();
    };

    const handleNextRound = () => {
        setGameStateWrapper(prevGameState => {
            const newInitialTurnMark = toggleMark(prevGameState.initialTurnMark);
            return {
                grid: INITIAL_GRID_STATE,
                initialTurnMark: newInitialTurnMark,
                currentTurnMark: newInitialTurnMark
            }
        });
        resetWiningLine();
        closeModal();
    };

    const resetWiningLine = () => setWiningLine("none");

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
                currentTurnMark = {gameState.currentTurnMark}
                isPlayerOneTurn = {isPlayerOneTurn}
                onRestart = {() => setOpenModalType("restart")}
            />
            <GameContentMid
                grid = {gameState.grid}
                currentTurnMark = {gameState.currentTurnMark}
                onMovePlayed = {handleMovePlayed}
                isPlayerOneTurn = {isPlayerOneTurn}
                gameType = {props.gameType}
                winingLine = {winingLine}
                
            />
            <GameContentBottom
                playerOneMark = {props.playerOneMark}
                gameType = {props.gameType}
                stats = {stats}
            />
        </div>
    );
}
