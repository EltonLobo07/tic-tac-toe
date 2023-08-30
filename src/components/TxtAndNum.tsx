import { twMerge } from "tailwind-merge";
import { VisuallyHidden } from "./VisuallyHidden";

type Props = {
    displayTxt: string,
    actualTxt: string,
    num: number,
    className?: string,
    displayTxtContainerClassName?: string,
    numContainerClassName?: string
};

export function TxtAndNum(props: Props) {
    return (
        <div
            className = {twMerge(
                "relative flex flex-col",
                props.className
            )}
        >
            <VisuallyHidden>
                {props.actualTxt}
            </VisuallyHidden>
            <span
                className = {props.displayTxtContainerClassName}
            >
                {props.displayTxt}
            </span>
            <span
                className = {props.numContainerClassName}
            >
                {props.num}
            </span>
        </div>
    );
}
