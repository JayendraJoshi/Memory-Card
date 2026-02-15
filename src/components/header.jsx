import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faMusic  } from '@fortawesome/free-solid-svg-icons' 

export function Header({scores}){
    return(
        <header>
            <div className="header-wrapper">
                <h1>Frieren Memory Game</h1>
                <div className="gamecontrols-container">
                   <button> <FontAwesomeIcon icon={faMusic} /></button>
                    <button><FontAwesomeIcon icon={faInfo} /></button>
                    <div className="score-board">
                        <div className="score-count-container">
                            <p>Score :</p>
                            <p className="score-count">{scores.score}</p>
                        </div>
                        <div className="best-score-container">
                            <p>Best Score :</p>
                            <p className="best-score-count">{scores.bestScore}</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}