import { twMerge } from "tailwind-merge";
import { VisuallyHidden } from "./VisuallyHidden";
import { ValidChild } from "../type-helpers/general";
import { useState } from "react";

type Props = {
    label: string,
    name: string,
    children: ValidChild,
    checked: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    className?: string,
    classNamesOnHover?: string
};

export function RadioBtn(props: Props) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter = {() => setHovered(true)}
            onMouseLeave = {() => setHovered(false)}
            className = {twMerge(
                "w-full relative bg-white",
                props.className,
                hovered && props.classNamesOnHover
            )}
        >
            <label
                className = "w-full h-full absolute top-0 left-0 rounded-inherit"
            >
                <VisuallyHidden>
                    {props.label}
                </VisuallyHidden>
                <input 
                    type = "radio"
                    name = {props.name}
                    checked = {props.checked}
                    onChange = {props.onChange}
                    className = "w-full h-full appearance-none rounded-inherit"
                />
            </label>
            <div
                aria-hidden = {true}
                className = "relative pointer-events-none"
            >
                {props.children}
            </div>
        </div>
    );
}
