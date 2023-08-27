import { Game } from "./components/Game";
import { MaxWidthWrapper } from "./components/MaxWidthWrapper";
import { NewGameMenu } from "./components/NewGameMenu";
import { VisuallyHidden } from "./components/VisuallyHidden";
import { useState } from "react";

type PlayerOneMark = "X" | "0" | null;

export function App() {
  const [playerOneMark, setPlayerOneMark] = useState<PlayerOneMark>(null);

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
        className = "h-full flex py-24px"
      >
        {
          playerOneMark === null 
          ? <NewGameMenu />
          : <Game />
        }
      </MaxWidthWrapper>
    </div>
  );
}
