import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faVolume, faVolumeOff  } from '@fortawesome/free-solid-svg-icons' 
import { useRef } from 'react';
import buttonClickSound from '../assets/sounds/button-click.mp3?url';

export function Header({gameProgress, setPopups, soundOn, setSoundOn, playBackgroundThemeIfRequested, playClickSoundIfRequested}){
    
    const buttonClickRef = useRef(new Audio(buttonClickSound));

    return(
        <header>
            <div className="header-wrapper">
                <h1>Frieren <span>Memory Game</span></h1>
                <div className="gamecontrols-container">
                   <button onClick={()=>{setSoundOn(prev=>!prev), playBackgroundThemeIfRequested(!soundOn)}}> {soundOn ?<FontAwesomeIcon icon={faVolume}/>:<FontAwesomeIcon icon={faVolumeOff} />}</button>
                    <button onClick={()=>{setPopups({showStartPopup:false,showInfoPopup:true,showWinPopup:false,showLosePopup:false}),playClickSoundIfRequested(soundOn,buttonClickRef)}}><FontAwesomeIcon icon={faInfo} /></button>
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
    )
}

