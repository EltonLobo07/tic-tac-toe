import { ValidChild } from "../type-helpers/general";

type Props = {
    children: ValidChild
};

export function MaxWidthWrapper(props: Props) {
    return (
        <div
            className = "h-full px-24px max-w-fit mx-auto"
        >
            {props.children}
        </div>
    );
}
