import { useState, useRef } from "react";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Main } from "./components/main";
import backgroundThemeUrl from "./assets/sounds/background-theme.mp3?url";

export interface GameProgress {
  score: number;
  bestScore: number;
  clickedImages: number[];
}

export interface Popups {
  showStartPopup: boolean;
  showInfoPopup: boolean;
  showWinPopup: boolean;
  showLosePopup: boolean;
}

function App() {
  const [gameProgress, setGameProgress] = useState<GameProgress>({
    score: 0,
    bestScore: 0,
    clickedImages: [],
  });
  const [popups, setPopups] = useState({
    showStartPopup: true,
    showInfoPopup: false,
    showWinPopup: false,
    showLosePopup: false,
  });
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef(new Audio(backgroundThemeUrl));

  const playBackgroundTheme = () => {
    audioRef.current.volume = 0.3;
    audioRef.current.loop = true;
    audioRef.current.play();
  };

  const pauseBackgroundTheme = () => {
    audioRef.current.pause();
  };

  return (
    <>
      <Header
        gameProgress={gameProgress}
        setPopups={setPopups}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
        playBackgroundTheme={playBackgroundTheme}
        pauseBackgroundTheme={pauseBackgroundTheme}
        playClickSoundIfRequested={playClickSoundIfRequested}
      ></Header>
      <Main
        gameProgress={gameProgress}
        setGameProgress={setGameProgress}
        popups={popups}
        soundOn={soundOn}
        setPopups={setPopups}
        setSoundOn={setSoundOn}
        playBackgroundTheme={playBackgroundTheme}
        playClickSoundIfRequested={playClickSoundIfRequested}
      ></Main>
      <Footer></Footer>
    </>
  );
}

const playClickSoundIfRequested = function (
  shouldPlay: boolean,
  soundRef: React.RefObject<HTMLAudioElement>,
) {
  if (shouldPlay) {
    soundRef.current.play();
  }
};

export default App;
