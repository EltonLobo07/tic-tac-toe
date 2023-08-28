import { Mark } from "../type-helpers/app";
import { AppLogo } from "./AppLogo";
import { Button } from "./Button";
import { VisuallyHidden } from "./VisuallyHidden";
import { X } from "./X";
import { Zero } from "./Zero";

type Props = {
    currentTurnMark: Mark,
    isPlayerOneTurn: boolean
};

function getPlayerOneMark(currentTurnMark: Mark, isPlayerOneTurn: boolean): Mark {
    if (isPlayerOneTurn) {
        return currentTurnMark;
    }
    if (currentTurnMark === "X") {
        return "0";
    }
    return "X";
}

export function GameContentTop(props: Props) {
    const TurnIcon = props.currentTurnMark === "X" ? X : Zero;

    return (
        <div
            className = "border border-white"
        >
            <AppLogo />
            <div
                className = "relative"
            >
                <span
                    aria-hidden
                >
                    <TurnIcon 
                        className = "w-5 h-5"
                    />
                    <span>
                        turn
                    </span>
                </span>
                <VisuallyHidden>
                    player {props.isPlayerOneTurn ? "one" : "two"}'s turn. 
                    player one's selected mark is {getPlayerOneMark(props.currentTurnMark, props.isPlayerOneTurn)}
                </VisuallyHidden>
            </div>
            <Button
                nativeBtnProps = {{
                    type: "button"
                }}
            >
                reset
            </Button>
        </div>
    );
}
