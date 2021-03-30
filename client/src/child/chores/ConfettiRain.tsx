import Confetti from "react-confetti";
import { ConfettiProps } from "../types/ConfettiProps";

export function ConfettiRain(props: ConfettiProps): JSX.Element {
  return (
    <div>
      <Confetti
        gravity={0.4}
        run={true}
        numberOfPieces={400}
        recycle={false}
        {...props.size}
      />
    </div>
  );
}
