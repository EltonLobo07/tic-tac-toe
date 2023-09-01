import { twMerge } from "tailwind-merge";
import { assertNever, joinClasses } from "../helpers/general";
import { Mark } from "../type-helpers/app";
import { PossibleMark } from "../type-helpers/game-content";
import { Button } from "./Button";
import { VisuallyHidden } from "./VisuallyHidden";
import { X } from "./X";
import { Zero } from "./Zero";
import { useState } from "react";

function getCellIcon(mark: PossibleMark) {
    switch (mark) {
        case "X": {
            return X;
        } 
        case "0": {
            return Zero;
        }
        case "": {
            return;
        }
        default: {
            assertNever(mark, `Not handled type - mark: ${mark}`);
        }
    }
}

type Props = {
    markAssigned: PossibleMark,
    currentTurnMark: Mark,
    hideIconOutline?: boolean,
    nativeBtnProps?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onMouseEnter" | "onMouseOut">
};

export function GameGridBtn(props: Props) {
    const [showMarkIconOutline, setShowMarkIconOutline] = useState(false);

    const Icon = getCellIcon(props.markAssigned);
    const TurnIcon = getCellIcon(props.currentTurnMark);
    const commonIconClassNames = "translate-y-[calc(var(--box-shadow-y-neg-offset)/2)] w-10 h-10 tabAndUp:w-16 tabAndUp:h-16";

    return (
        <Button
            nativeBtnProps = {{
                ...props.nativeBtnProps,
                className: twMerge(
                    "relative",
                    props.markAssigned === "X" || 
                    props.markAssigned === "" && props.currentTurnMark === "X" 
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
