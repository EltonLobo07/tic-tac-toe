import { GameContent } from "./components/GameContent";
import { MaxWidthWrapper } from "./components/MaxWidthWrapper";
import { NewGameMenuContent } from "./components/NewGameMenuContent";
import { VisuallyHidden } from "./components/VisuallyHidden";
import { GameTypeState, Mark } from "./types/app";
import { useLocalStorageState } from "./custom-hooks/useLocalStorageState";
import { NOT_SELECTED, isGameTypeState, isMark } from "./helpers/app";

export function App() {
  const [playerOneMark, setPlayerOneMark] = useLocalStorageState<Mark>({
    initialState: "X",
    lsKey: "playerOneMark",
    isState: isMark
  });
  const [gameType, setGameType] = useLocalStorageState<GameTypeState>({
    initialState: NOT_SELECTED,
    lsKey: "gameType",
    isState: isGameTypeState
  });

  let sectionTitleAndContent = {
    title: "new game menu",
    content: <NewGameMenuContent
      playerOneMark = {playerOneMark}
      onPlayerOneMarkChange = {setPlayerOneMark}
      setGameType = {setGameType}
    />
  };
  if (gameType !== "not-selected") {
    sectionTitleAndContent = {
      title: "game content",
      content: <GameContent
        playerOneMark = {playerOneMark}
        gameType = {gameType}
        onQuit = {() => setGameType("not-selected")}
      />
    };
  }

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
