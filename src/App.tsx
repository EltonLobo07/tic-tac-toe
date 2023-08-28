import { GameContent } from "./components/GameContent";
import { MaxWidthWrapper } from "./components/MaxWidthWrapper";
import { NewGameMenuContent } from "./components/NewGameMenuContent";
import { VisuallyHidden } from "./components/VisuallyHidden";
import { useState } from "react";
import { GameType, PlayerOneMark } from "./type-helpers/app";

type GameTypeState = GameType | "not selected";

export function App() {
  const [playerOneMark, setPlayerOneMark] = useState<PlayerOneMark>("X");
  const [gameType, setGameType] = useState<GameTypeState>("not selected");

  let sectionTitleAndContent = {
    title: "new game menu",
    content: <NewGameMenuContent
      playerOneMark = {playerOneMark}
      onPlayerOneMarkChange = {setPlayerOneMark}
      setGameType = {setGameType}
    />
  };
  if (gameType !== "not selected") {
    sectionTitleAndContent = {
      title: "game",
      content: <GameContent />
    };
  }

  console.log(JSON.stringify({
    playerOneMark,
    gameType
  }));

  return (
    <div
      className = "h-full bg-almost-black relative overflow-y-auto"
    >
      <VisuallyHidden>
        <header>
          <h1>
            tic tac toe game
          </h1>
        </header>
      </VisuallyHidden>
      <MaxWidthWrapper
        className = "h-full"
      >
        <section
          aria-label = {sectionTitleAndContent.title}
          className = "h-full flex py-24px relative"
        >
          <VisuallyHidden>
            <h2>
              {sectionTitleAndContent.title}
            </h2>
          </VisuallyHidden>
          {sectionTitleAndContent.content}
        </section>
      </MaxWidthWrapper>
    </div>
  );
}
