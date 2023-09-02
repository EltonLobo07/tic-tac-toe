import { twMerge } from "tailwind-merge";
import { joinClasses } from "../helpers/general";
import { Mark } from "../types/app";
import { PossibleMark } from "../types/game-content";
import { Button } from "./Button";
import { VisuallyHidden } from "./VisuallyHidden";
import { useState } from "react";
import { getCellIcon } from "../helpers/game-grid-button";

type Props = {
    markAssigned: PossibleMark,
    currentTurnMark: Mark,
    hideIconOutline?: boolean,
    swapBgAndTxtColor?: boolean,
    nativeBtnProps?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onMouseEnter" | "onMouseOut">
};

export function GameGridBtn(props: Props) {
    const [showMarkIconOutline, setShowMarkIconOutline] = useState(false);

    const Icon = getCellIcon(props.markAssigned);
    const TurnIcon = getCellIcon(props.currentTurnMark);
    const commonIconClassNames = "translate-y-[calc(var(--box-shadow-y-neg-offset)/2)] w-10 h-10 tabAndUp:w-16 tabAndUp:h-16";

    const applyXColor = props.markAssigned === "X" || 
    props.markAssigned === "" && props.currentTurnMark === "X"; 

    return (
        <Button
            nativeBtnProps = {{
                ...props.nativeBtnProps,
                className: twMerge(
                    "relative",
                    props.swapBgAndTxtColor 
                    ? applyXColor 
                      ? "bg-blue-more-green" 
                      : "bg-dark-yellow" 
                    : "bg-almost-black-green",
                    props.swapBgAndTxtColor
                    ? "text-almost-black-green"
                    : applyXColor 
                      ? "text-blue-more-green" 
                      : "text-dark-yellow",
                    props.nativeBtnProps?.className
                ),
                onMouseEnter: () => setShowMarkIconOutline(true),
                onMouseLeave: () => setShowMarkIconOutline(false)
            }}
        >
            {
                Icon
                ? (
                    <Icon 
                        className = {commonIconClassNames}
                    />
                )
                : (
                    <>
                        <VisuallyHidden>
                            change grid button's state to {props.currentTurnMark}
                        </VisuallyHidden>
                        {
                            TurnIcon 
                            && !props.hideIconOutline 
                            && (
                                <TurnIcon
                                    ariaHidden
                                    type = "outline" 
                                    className = {joinClasses(
                                        commonIconClassNames,
                                        "overflow-visible",
                                        "relative",
                                        !showMarkIconOutline && "hidden"
                                    )}
                                />
                            )
                        }
                    </>
                )
            }
        </Button>
    );
}
