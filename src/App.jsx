import { useState } from 'react'
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Main } from './components/main';

import './App.css';

function App() {
  const [gameProgress,setGameProgress] = useState({score:0,bestScore:0,clickedImages:[]});
  const [popups, setPopups] = useState({showStartPopup:true,showInfoPopup:false,showWinPopup:false,showLosePopup:false})

  
  return (
    <>
      <Header gameProgress={gameProgress} setPopups={setPopups}></Header>
      <Main gameProgress={gameProgress} setGameProgress={setGameProgress} popups={popups} setPopups={setPopups}></Main>
      <Footer></Footer>
    </>
  )
}

export default App