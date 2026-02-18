import { useState, useRef } from 'react'
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Main } from './components/main';
import backgroundThemeUrl from './assets/sounds/background-theme.mp3?url';

import './App.css';

function App() {
  const [gameProgress,setGameProgress] = useState({score:0,bestScore:0,clickedImages:[]});
  const [popups, setPopups] = useState({showStartPopup:true,showInfoPopup:false,showWinPopup:false,showLosePopup:false})
  const [soundOn,setSoundOn] = useState(false);
  const audioRef = useRef(new Audio(backgroundThemeUrl));

  const playBackgroundThemeIfRequested = function (boolean){
    if(boolean){
        audioRef.current.volume = 0.3;
        audioRef.current.loop = true;
        audioRef.current.play();
    }else{
        audioRef.current.pause();
    }
  }

  const playClickSoundIfRequested = function(boolean, soundRef){
    if(boolean){
      soundRef.current.play();
    }
  }
  
  return (
    <>
      <Header gameProgress={gameProgress} setPopups={setPopups} soundOn={soundOn} setSoundOn={setSoundOn} playBackgroundThemeIfRequested={playBackgroundThemeIfRequested} playClickSoundIfRequested={playClickSoundIfRequested}></Header>
      <Main gameProgress={gameProgress} setGameProgress={setGameProgress} popups={popups} soundOn={soundOn} setPopups={setPopups} setSoundOn={setSoundOn} playBackgroundThemeIfRequested={playBackgroundThemeIfRequested} playClickSoundIfRequested={playClickSoundIfRequested}></Main>
      <Footer></Footer>
    </>
  )
}


export default App