import { useState } from 'react'
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Main } from './components/main';

import './App.css';

function App() {
  const [scores,setScores] = useState({score:0,bestScore:0,clickedImages:[]});
  return (
    <>
      <Header scores={scores}></Header>
      <Main scores={scores} setScores={setScores}></Main>
      <Footer></Footer>
    </>
  )
}

export default App