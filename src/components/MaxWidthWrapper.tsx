import { twMerge } from "tailwind-merge";
import { ValidChild } from "../type-helpers/general";

type Props = {
    children: ValidChild,
    className?: string
};

export function MaxWidthWrapper(props: Props) {
    return (
        <div
            className = {twMerge(
                props.className,
                "px-24px max-w-fit mx-auto"
            )}
        >
            {props.children}
        </div>
    );
}
