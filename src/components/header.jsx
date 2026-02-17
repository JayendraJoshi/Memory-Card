import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faVolume, faVolumeOff  } from '@fortawesome/free-solid-svg-icons' 

export function Header({gameProgress, setPopups, playVolume, setPlayVolume}){
    return(
        <header>
            <div className="header-wrapper">
                <h1>Frieren Memory Game</h1>
                <div className="gamecontrols-container">
                   <button onClick={()=>{setPlayVolume(prev=>!prev), playSoundIfRequested(!playVolume)}}> {playVolume ?<FontAwesomeIcon icon={faVolume}/>:<FontAwesomeIcon icon={faVolumeOff} />}</button>
                    <button onClick={()=>setPopups({showStartPopup:false,showInfoPopup:true,showWinPopup:false,showLosePopup:false})}><FontAwesomeIcon icon={faInfo} /></button>
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

function playSoundIfRequested(newPlayVolumeValue){
    if(newPlayVolumeValue){

    }else{

    }
}