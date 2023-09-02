import { IconComponentProps } from "../types/svg-icon-components";
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
            className = "flex gap-x-2 relative"
        >
            <VisuallyHidden>
                application logo
            </VisuallyHidden>
            <div
                className = "text-blue-more-green"
            >
                <X 
                    {...iconProps}
                />
            </div>
            <div
                className = "text-dark-yellow"
            >
                <Zero
                    {...iconProps}
                />
            </div>
        </div>
    );
}
