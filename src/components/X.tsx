import { getSvgAriaProps, getSvgPathStyleProps } from "../helpers/svg-icon-components";
import { IconComponentProps } from "../type-helpers/svg-icon-components";

export function X(props: IconComponentProps) {
    return (
        <svg 
            {...getSvgAriaProps("one", props.ariaHidden)}
            xmlns = "http://www.w3.org/2000/svg" 
            className = {props.className}
            viewBox = "0 0 64 64"
        >
            <path
                {...getSvgPathStyleProps("currentColor", props.type)}
                fillRule = "evenodd"
                d = "M15.002 1.147L32 18.145 48.998 1.147a3 3 0 014.243 0l9.612 9.612a3 3 0 010 4.243L45.855 32l16.998 16.998a3 3 0 010 4.243l-9.612 9.612a3 3 0 01-4.243 0L32 45.855 15.002 62.853a3 3 0 01-4.243 0L1.147 53.24a3 3 0 010-4.243L18.145 32 1.147 15.002a3 3 0 010-4.243l9.612-9.612a3 3 0 014.243 0z"
            ></path>
        </svg>
    );
}
