import { joinClasses } from "../helpers/general";
import { GameType, Mark } from "../type-helpers/app";
import { AppLogo } from "./AppLogo";
import { Button } from "./Button";
import { RadioBtn } from "./RadioBtn";
import { VisuallyHidden } from "./VisuallyHidden";
import { X } from "./X";
import { Zero } from "./Zero";

type Props = {
    playerOneMark: Mark,
    onPlayerOneMarkChange: (newMark: Mark) => void,
    setGameType: (gameType: GameType) => void
};

export function NewGameMenuContent(props: Props) {
    const getMarkRadioBtnClassNames = (markSelected: boolean) => joinClasses(
        "flex-grow rounded-8px p-12px",
        markSelected ? "bg-silver text-almost-black" : "bg-almost-black text-silver"
    );

    const commonProps = {
        iconComponentClassNames: "w-8 h-8 mx-auto",
        customRadioBtnName: "Mark",
        buttonClassNames: joinClasses(
            "uppercase font-heading-xs text-almost-black",
            "rounded-16px pt-[14px] pb-[calc(14px-var(--box-shadow-y-neg-offset))]",
            "bg-white border-none",
            "box-shadow"
        ) 
    };

    const markSelectFieldsetLegendTxt = "pick player 1's mark"; 
    const is0MarkSelected = props.playerOneMark === "0";
    const isXMarkSelected = !is0MarkSelected;

    return (
        <div
            className = "my-auto flex flex-col gap-y-8 tabAndUp:gap-y-10 items-center"
        >
            <AppLogo />
            <fieldset
                className = {
                    `
                    relative
                    rounded-16px
                    flex flex-col items-center
                    p-24px
                    bg-almost-black-green 
                    uppercase text-silver
                    box-shadow black-box-shadow
                    `
                }
            >
                <VisuallyHidden>
                    <legend>
                        {markSelectFieldsetLegendTxt}
                    </legend>
                </VisuallyHidden>
                <span
                    className = "inline-block mb-6 font-heading-xs"
                >
                    {markSelectFieldsetLegendTxt}
                </span>
                <div
                    className = "flex border-8 border-almost-black rounded-12px w-[17.375rem] tabAndUp:w-[25.75rem] mb-[1.0625rem] bg-almost-black gap-x-1"
                >
                    <RadioBtn 
                        label = "x"
                        checked = {isXMarkSelected}
                        onChange = {() => props.onPlayerOneMarkChange("X")}
                        name = {commonProps.customRadioBtnName}
                        className = {getMarkRadioBtnClassNames(isXMarkSelected)}
                    >
                        <X 
                            className = {commonProps.iconComponentClassNames}
                        />
                    </RadioBtn>
                    <RadioBtn
                        label = "zero"
                        checked = {is0MarkSelected}
                        onChange = {() => props.onPlayerOneMarkChange("0")}
                        name = {commonProps.customRadioBtnName}
                        className = {getMarkRadioBtnClassNames(is0MarkSelected)}
                    >
                        <Zero 
                            className = {commonProps.iconComponentClassNames}
                        />
                    </RadioBtn>
                </div>
                <p
                    className = "font-body opacity-50 pb-6px"
                >
                    remember: x goes first
                </p>
            </fieldset>
            <div
                className = "flex flex-col gap-y-4 tabAndUp:gap-y-5 w-full"
            >
                <Button
                    nativeBtnProps = {{
                        type: "button",
                        onClick: () => props.setGameType("solo"),
                        className: joinClasses(
                            commonProps.buttonClassNames,
                            "bg-dark-yellow yellow-box-shadow"
                        )
                    }}
                >
                    new game (vs cpu)
                </Button>
                <Button
                    nativeBtnProps = {{
                        type: "button",
                        onClick: () => props.setGameType("multi"),
                        className: joinClasses(
                            commonProps.buttonClassNames,
                            "bg-blue-more-green blue-box-shadow"
                        )
                    }}
                >
                    new game (vs player)
                </Button>
            </div>
        </div>
    );
}
