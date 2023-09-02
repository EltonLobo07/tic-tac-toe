import { X } from "../components/X";
import { Zero } from "../components/Zero";
import { PossibleMark } from "../types/game-content";
import { assertNever } from "./general";

export function getCellIcon(mark: PossibleMark) {
    switch (mark) {
        case "X": {
            return X;
        } 
        case "0": {
            return Zero;
        }
        case "": {
            return;
        }
        default: {
            assertNever(mark, `Not handled type - mark: ${mark}`);
        }
    }
}
