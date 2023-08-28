import { twMerge } from "tailwind-merge";
import { ValidChild } from "../type-helpers/general";

type Props = {
    children: ValidChild,
    nativeBtnProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
};

export function Button(props: Props) {
    return (
        <button
            {...props.nativeBtnProps}
            className = {twMerge(
                "border border-white",
                props.nativeBtnProps?.className
            )}
        >
            {props.children}
        </button>
    );
}
