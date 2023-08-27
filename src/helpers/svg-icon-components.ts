import { KeyValueMap } from "../type-helpers/general";
import { IconComponentProps, SVGPathAttrs, SVGPathStrokeConfig } from "../type-helpers/svg-icon-components";

export function getSvgPathStyleProps(
    color: string, 
    type: IconComponentProps["type"]
): React.SVGAttributes<SVGPathElement> {
    let fill: SVGPathAttrs["fill"] = color;
    let strokeConfig: SVGPathStrokeConfig = {};
    if (type === "outline") {
        fill = "none";
        strokeConfig = {
            stroke: color,
            strokeWidth: 2
        };
    }
    return {fill, ...strokeConfig};
}

type SvgAriaPropsReturnType = Partial<KeyValueMap<`aria-${"label" | "hidden"}`, React.AriaAttributes>>;
export function getSvgAriaProps(
    ariaLabel: string,
    ariaHidden: IconComponentProps["ariaHidden"]
): SvgAriaPropsReturnType {
    const res: SvgAriaPropsReturnType = {"aria-hidden": ariaHidden};
    if (!ariaHidden) {
        res["aria-label"] = ariaLabel;
    }
    return res;
} 
