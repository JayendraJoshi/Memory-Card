import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faVolume,
  faVolumeOff,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, Dispatch, SetStateAction } from "react";
import buttonClickSound from "../assets/sounds/button-click.mp3?url";
import { GameProgress, Popups } from "../App";

interface HeaderProps {
  gameProgress: GameProgress;
  setPopups: Dispatch<SetStateAction<Popups>>;
  soundOn: boolean;
  setSoundOn: Dispatch<SetStateAction<boolean>>;
  playBackgroundTheme: () => void;
  pauseBackgroundTheme: () => void;
  playClickSoundIfRequested: (
    shouldPlay: boolean,
    audioRef: React.RefObject<HTMLAudioElement>,
  ) => void;
}

export function Header({
  gameProgress,
  setPopups,
  soundOn,
  setSoundOn,
  playBackgroundTheme,
  pauseBackgroundTheme,
  playClickSoundIfRequested,
}: Readonly<HeaderProps>) {
  const buttonClickRef = useRef(new Audio(buttonClickSound));

  return (
    <header>
      <div className="header-wrapper">
        <h1>
          Frieren <span>Memory Game</span>
        </h1>
        <div className="gamecontrols-container">
          <button
            type="button"
            onClick={() => {
              setSoundOn((prev) => !prev);
              soundOn ? pauseBackgroundTheme() : playBackgroundTheme();
            }}
          >
            {" "}
            {soundOn ? (
              <FontAwesomeIcon icon={faVolume} />
            ) : (
              <FontAwesomeIcon icon={faVolumeOff} />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setPopups({
                showStartPopup: false,
                showInfoPopup: true,
                showWinPopup: false,
                showLosePopup: false,
              });
              playClickSoundIfRequested(soundOn, buttonClickRef);
            }}
          >
            <FontAwesomeIcon icon={faInfo} />
          </button>
          <div className="score-board">
            <div className="score-count-container">
              <p>Score :</p>
              <p className="score-count">{gameProgress.score}</p>
            </div>
            <div className="best-score-container">
              <p>Best Score :</p>
              <p className="best-score-count">{gameProgress.bestScore}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
