import { GameType, Mark } from "../type-helpers/app";
import { Stats } from "../type-helpers/game-content";
import { TxtAndNum } from "./TxtAndNum";
import { VisuallyHidden } from "./VisuallyHidden";

function getPlayerDisplayInfo(isPlayerOneMarkEqual: boolean, gameType: GameType): string {
    let res = `p${isPlayerOneMarkEqual ? "1" : "2"}`;
    if (gameType === "solo") {
        res = isPlayerOneMarkEqual ? "you" : "cpu";
    }
    return res.toUpperCase();
}

type Props = {
    playerOneMark: Mark,
    gameType: GameType,
    stats: Stats
};

export function GameContentBottom(props: Props) {
    const sectionTitle = "game statistics";
    const isPlayerOneX = props.playerOneMark === "X";
    const isPlayerOne0 = !isPlayerOneX;

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
                className = "flex justify-between"
            >
                <li>
                    <TxtAndNum 
                        actualTxt = ""
                        displayTxt = {`X (${getPlayerDisplayInfo(isPlayerOneX, props.gameType)})`}
                        num = {isPlayerOneX ? props.stats.playerOneWins : props.stats.playerTwoWins}
                    />
                </li>
                <li>
                    <TxtAndNum 
                        actualTxt = ""
                        displayTxt = "Ties"
                        num = {props.stats.ties}
                    />
                </li>
                <li>
                    <TxtAndNum 
                        actualTxt = ""
                        displayTxt = {`0 (${getPlayerDisplayInfo(isPlayerOne0, props.gameType)})`}
                        num = {isPlayerOne0 ? props.stats.playerOneWins : props.stats.playerTwoWins}
                    />
                </li>
            </ul>
        </section>
    );
}
