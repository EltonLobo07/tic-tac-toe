import { twMerge } from "tailwind-merge";
import { Button } from "./Button";
import { ValidChild } from "../type-helpers/general";
import { joinClasses } from "../helpers/general";

type BtnProps = {
    content: ValidChild,
    onClick: () => void,
    className?: string 
};

type Props = {
    yesBtnProps: BtnProps,
    noBtnProps: BtnProps,
    className?: string
};

export type YesNoBtnsProps = Props;

export function YesNoBtns(props: Props) {
    const { 
        yesBtnProps,
        noBtnProps
    } = props;

    const commonBtnClassNames = joinClasses(
        "uppercase",
        "rounded-12px p-16px",
        "font-heading-xs text-almost-black",
        "box-shadow box-shadow-small-y-offset",
        "border-none"
    );

    return (
        <div
            className = {twMerge(
                "w-full flex gap-x-4 justify-center",
                props.className
            )}
        >
            <Button
                nativeBtnProps = {{
                    type: "button",
                    onClick: noBtnProps.onClick,
                    className: twMerge(
                        commonBtnClassNames,
                        "silver-box-shadow bg-silver hover:bg-light-gray",
                        noBtnProps.className
                    )
                }}
            >
                {noBtnProps.content}
            </Button>
            <Button
                nativeBtnProps = {{
                    type: "button",
                    onClick: yesBtnProps.onClick,
                    className: twMerge(
                        commonBtnClassNames,
                        "yellow-box-shadow bg-dark-yellow hover:bg-light-yellow",
                        yesBtnProps.className
                    )
                }}
            >
                {yesBtnProps.content}
            </Button>
        </div>
    );
}
