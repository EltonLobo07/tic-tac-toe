import { KeyValueMap } from "./general";

export type IconComponentProps = {
    type?: "fill" | "outline",
    ariaHidden?: boolean,
    className?: string
}
export type SVGPathAttrs = React.SVGAttributes<SVGPathElement>;
export type SVGPathStrokeConfig = Partial<KeyValueMap<"stroke" | "strokeWidth", SVGPathAttrs>>;
export type SvgAriaAttrs = React.AriaAttributes["aria-label"];
