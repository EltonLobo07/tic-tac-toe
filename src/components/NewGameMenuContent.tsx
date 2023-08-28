import { joinClasses } from "../helpers/general";
import { GameType, PlayerOneMark } from "../type-helpers/app";
import { AppLogo } from "./AppLogo";
import { Button } from "./Button";
import { RadioBtn } from "./RadioBtn";
import { VisuallyHidden } from "./VisuallyHidden";
import { X } from "./X";
import { Zero } from "./Zero";

type Props = {
    playerOneMark: PlayerOneMark,
    onPlayerOneMarkChange: (newPlayerOneMark: PlayerOneMark) => void,
    setGameType: (gameType: GameType) => void
};

export function NewGameMenuContent(props: Props) {
    const getMarkRadioBtnClassNames = (markSelected: boolean) => joinClasses(
        "flex-grow border border-black",
        markSelected && "bg-dark-yellow"
    );

    const commonProps = {
        iconComponentClassNames: "w-8 h-8 mx-auto",
        customRadioBtnName: "playerOneMark" 
    };

    const markSelectFieldsetLegendTxt = "pick player 1's mark"; 
    const is0MarkSelected = props.playerOneMark === "0";
    const isXMarkSelected = !is0MarkSelected;

    return (
        <div
            className = "border border-white my-auto flex flex-col gap-y-8 items-center"
        >
            <AppLogo />
            <fieldset
                className = "flex flex-col w-[25.75rem] capitalize p-24px bg-light-yellow relative"
            >
                <VisuallyHidden>
                    <legend>
                        {markSelectFieldsetLegendTxt}
                    </legend>
                </VisuallyHidden>
                <span>
                    {markSelectFieldsetLegendTxt}
                </span>
                <div
                    className = "flex"
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
                <p>
                    remember: x goes first
                </p>
            </fieldset>
            <div
                className = "flex flex-col gap-y-4 tabAndUp:gap-y-5 w-full text-white"
            >
                <Button
                    nativeBtnProps = {{
                        type: "button",
                        onClick: () => props.setGameType("solo")
                    }}
                >
                    new game (vs cpu)
                </Button>
                <Button
                    nativeBtnProps = {{
                        type: "button",
                        onClick: () => props.setGameType("multi")
                    }}
                >
                    new game (vs player)
                </Button>
            </div>
        </div>
    );
}
