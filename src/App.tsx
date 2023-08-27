import { GameContent } from "./components/GameContent";
import { MaxWidthWrapper } from "./components/MaxWidthWrapper";
import { NewGameMenuContent } from "./components/NewGameMenuContent";
import { VisuallyHidden } from "./components/VisuallyHidden";
import { useState } from "react";

type PlayerOneMark = "X" | "0" | null;

export function App() {
  const [playerOneMark, setPlayerOneMark] = useState<PlayerOneMark>(null);

  let sectionTitleAndContent = {
    title: "new game menu",
    content: <NewGameMenuContent />
  }; 
  if (playerOneMark !== null) {
    sectionTitleAndContent = {
      title: "game",
      content: <GameContent />
    };
  }

  return (
    <div
      className = "h-full bg-almost-black relative"
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
