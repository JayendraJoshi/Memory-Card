export function Header(){
    return(
        <header>
            <div className="header-wrapper">
                <h1>Frieren Memory Game</h1>
                <div className="gamecontrols-container">
                    <img className="music-icon"></img>
                    <img className="info-icon"></img>
                    <div className="score-board">
                        <p>Score:</p>
                        <p className="score-count"></p>
                        <p>Best Score:</p>
                        <p className="best-score-count"></p>
                    </div>
                </div>
            </div>
        </header>
    )
}