import { VisuallyHidden } from "./VisuallyHidden";

type Props = {
    displayTxt: string,
    actualTxt: string,
    num: number
};

export function TxtAndNum(props: Props) {
    return (
        <div
            className = "relative flex flex-col"
        >
            <VisuallyHidden>
                {props.actualTxt}
            </VisuallyHidden>
            <span>
                {props.displayTxt}
            </span>
            <span>
                {props.num}
            </span>
        </div>
    );
}
