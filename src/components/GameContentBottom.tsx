import { getPlayerDisplayInfo } from "../helpers/game-content";
import { joinClasses } from "../helpers/general";
import { GameType, Mark } from "../types/app";
import { Stats } from "../types/game-content";
import { TxtAndNum } from "./TxtAndNum";
import { VisuallyHidden } from "./VisuallyHidden";

type Props = {
    playerOneMark: Mark,
    gameType: GameType,
    stats: Stats
};

export function GameContentBottom(props: Props) {
    const sectionTitle = "game statistics";
    const isPlayerOneX = props.playerOneMark === "X";
    const isPlayerOne0 = !isPlayerOneX;

    const commonTxtAndNumClassNames = joinClasses(
        "rounded-16px py-12px",
        "font-body"
    );
    const commonNumClassNames = "font-heading-m";

    return (
        <section
            aria-label = {sectionTitle}
            className = "relative"
        >
            <VisuallyHidden>
                <h3>
                    {sectionTitle}
                </h3>
            </VisuallyHidden>
            <ul
                className = "grid grid-cols-3 gap-x-5 text-center uppercase"
            >
                <li>
                    <TxtAndNum 
                        actualTxt = ""
                        displayTxt = {`X (${getPlayerDisplayInfo(isPlayerOneX, props.gameType)})`}
                        num = {isPlayerOneX ? props.stats.playerOneWins : props.stats.playerTwoWins}
                        className = {joinClasses(
                            commonTxtAndNumClassNames,
                            "bg-blue-more-green"
                        )}
                        numContainerClassName = {commonNumClassNames}
                    />
                </li>
                <li>
                    <TxtAndNum 
                        actualTxt = ""
                        displayTxt = "Ties"
                        num = {props.stats.ties}
                        className = {joinClasses(
                            commonTxtAndNumClassNames,
                            "bg-silver"
                        )}
                        numContainerClassName = {commonNumClassNames}
                    />
                </li>
                <li>
                    <TxtAndNum 
                        actualTxt = ""
                        displayTxt = {`0 (${getPlayerDisplayInfo(isPlayerOne0, props.gameType)})`}
                        num = {isPlayerOne0 ? props.stats.playerOneWins : props.stats.playerTwoWins}
                        className = {joinClasses(
                            commonTxtAndNumClassNames,
                            "bg-dark-yellow"
                        )}
                        numContainerClassName = {commonNumClassNames}
                    />
                </li>
            </ul>
        </section>
    );
}
