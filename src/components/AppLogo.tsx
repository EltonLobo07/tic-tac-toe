import { IconComponentProps } from "../type-helpers/svg-icon-components";
import { VisuallyHidden } from "./VisuallyHidden";
import { X } from "./X";
import { Zero } from "./Zero";

export function AppLogo() {
    const iconProps: IconComponentProps = {
        ariaHidden: true,
        className: "w-8 h-8"
    };

    return (
        <div
            className = "flex gap-x-8px relative"
        >
            <VisuallyHidden>
                application logo
            </VisuallyHidden>
            <X 
                {...iconProps}
            />
            <Zero
                {...iconProps}
            />
        </div>
    );
}
