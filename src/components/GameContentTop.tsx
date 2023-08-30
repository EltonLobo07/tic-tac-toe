import { joinClasses } from "../helpers/general";
import { Mark } from "../type-helpers/app";
import { AppLogo } from "./AppLogo";
import { Button } from "./Button";
import { Restart } from "./Restart";
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
            className = "flex justify-between items-center mb-16 tabAndUp:mb-5"
        >
            <AppLogo />
            <div
                className = "relative"
            >
                <span
                    aria-hidden
                    className = {`
                        bg-almost-black-green
                        flex gap-x-3 items-center
                        text-silver
                        px-[30px] pt-12px pb-18px
                        box-shadow black-box-shadow box-shadow-small-y-offset
                        rounded-8px
                    `}
                >
                    <TurnIcon 
                        className = "w-5 h-5"
                    />
                    <span
                        className = "uppercase font-heading-xs"
                    >
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
                    type: "button",
                    className: joinClasses(
                        "relative",
                        "p-16px rounded-8px",
                        "bg-silver text-almost-black-green",
                        "border-none",
                        "box-shadow silver-box-shadow box-shadow-small-y-offset"
                    )
                }}
            >
                <Restart 
                    ariaHidden
                    className = "w-5 h-5"
                />
                <VisuallyHidden>
                    restart game
                </VisuallyHidden>
            </Button>
        </div>
    );
}
