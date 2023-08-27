import { ValidChild } from "../type-helpers/general";

type Props = {
    children: ValidChild
};

export function VisuallyHidden(props: Props) {
    // This is the only component where I'll apply inline styling in this application
    return (
        <div
            style = {{
                position: "absolute",
                overflow: "hidden",
                clip: "rect(0 0 0 0)",
                height: 1,
                width: 1,
                margin: 0,
                padding: 0,
                border: 0
            }}
        >
            {props.children}
        </div>
    );
}
