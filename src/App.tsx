import { MaxWidthWrapper } from "./components/MaxWidthWrapper";
import { VisuallyHidden } from "./components/VisuallyHidden";

export function App() {
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
      <MaxWidthWrapper>
        Todo
      </MaxWidthWrapper>
    </div>
  );
}
