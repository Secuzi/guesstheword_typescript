import { getFarewellText } from "../utils/getFarewellText";
import { type StatusInfoProps } from "../Types";

export default function StatusInfo({
  isGameWon,
  isGameLost,
  isRecentGuessMistake,
  language,
}: StatusInfoProps) {
  let statusInfoElement: React.JSX.Element | null = null;
  if (isGameWon) {
    statusInfoElement = (
      <>
        <h1>You win!</h1>
        <p>Well done! 🎉</p>
      </>
    );
  } else if (isGameLost) {
    statusInfoElement = (
      <>
        <h1>Game Over!</h1>
        <p>You lose! Better start learning Assembly 😭</p>
      </>
    );
  } else if (isRecentGuessMistake) {
    statusInfoElement = statusInfoElement = (
      <>
        <h1>{getFarewellText(language.name)}</h1>
      </>
    );
  } else {
    statusInfoElement = null;
  }

  return statusInfoElement;
}
