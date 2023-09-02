import { getSvgAriaProps, getSvgPathStyleProps } from "../helpers/svg-icon-components";
import { IconComponentProps } from "../types/svg-icon-components";

export function Zero(props: IconComponentProps) {
    return (
        <svg 
            {...getSvgAriaProps("zero", props.ariaHidden)}
            xmlns = "http://www.w3.org/2000/svg"
            viewBox = "0 0 64 64" 
            className = {props.className}
        >
            <path
                {...getSvgPathStyleProps("currentColor", props.type)}
                d = "M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037z"
            ></path>
        </svg>
    );
}
