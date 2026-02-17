import { useEffect, useState } from 'react';
import shuffle from "lodash.shuffle"

export function Main({gameProgress, setGameProgress, popups, setPopups, setPlayVolume}){
    const [cards, setCards] = useState([]);

    useEffect(()=>{
            async function getJsonFromAPI(){
                const endpoint = 'https://graphql.anilist.co';
                const query = `
                query GetFrierenCharacters($id: Int!, $perPage: Int!, $page: Int!) {
                    Media(id: $id, type: ANIME) {
                    id
                    title { romaji }
                    characters(perPage: $perPage, page: $page, sort: ROLE) {
                        pageInfo { total currentPage hasNextPage }
                        edges {
                        node { name { full } image { large } }
                        }
                    }
                    }
                }
                `;
                try{
                    const res = await fetch(endpoint,{
                        method:"POST",
                        headers:{"Content-Type":
                            "application/json"},
                            body:JSON.stringify({   
                                query,
                                    variables: {
                                    id: 154587,
                                    perPage: 12,
                                    page: 1
                            }
                        })
                    })
                    const json = await res.json();  
                    console.log(json); 
                    return json;
                    }
                    catch(e){
                        console.error('failed:', e);
                    }
            }
            async function getArrayFromJson(){
                const jsonData = await getJsonFromAPI();
                const objectsArray = [];
                for(let i = 0;i<12;i++){
                    objectsArray.push(jsonData.data.Media.characters.edges[i].node);
                }
                return objectsArray;
            }
            async function getRandomizedArray(){
                const array = await getArrayFromJson();
                return shuffle(array);
            }
            async function setInitialCards(){
                const randomizedArray = await getRandomizedArray();
                console.log(randomizedArray);
                setCards(randomizedArray);
            }
            setInitialCards();
    },[]);

    useEffect(()=>{
        if(willAPopupBeRendered(popups))addDarkTintClassOnRoot();
        return()=>{
            removeDarkTintClassFromRoot();
        }
    },[popups])

    const cardDivs = getCardDivs(gameProgress, setGameProgress,cards, setCards, setPopups);

    return (
        <main>
            <div className="main-wrapper">
                {cardDivs}
                {willAPopupBeRendered(popups) ? returnPopupToBeRendered(popups,setPopups, setCards, setPlayVolume):null}
            </div>
        </main>   
    )
}

function getCardDivs(gameProgress, setGameProgress,cards, setCards, setPopups){
        const cardDivsArray = [];
        for(const element of cards){
            cardDivsArray.push(<div className="card" key={element.name.full} id={element.name.full} onClick={(e)=>clickEventOnCard(e, gameProgress, setGameProgress,cards, setCards,setPopups)}>
                <img src={element.image.large}></img>
                <p>{element.name.full}</p>
                </div>)
        }
        return cardDivsArray;
}
function clickEventOnCard(event, gameProgress, setGameProgress,cards, setCards, setPopups){
    const card = event.target.closest(".card");
    if(isIDPresentInGameProgress(gameProgress, card.id)){
        setGameProgress(prev=>({...prev,score:0,clickedImages:[]}));
        setPopups({showStartPopup:false,showInfoPopup:false,showWinPopup:false,showLosePopup:true})
    }else{
        setGameProgress(prev => {
        const nextScore = prev.score + 1;
        const nextClickedImages = [...(prev.clickedImages), card.id];
        const nextBestScore = Math.max(prev.bestScore, nextScore);
        return {
            ...prev,
            score: nextScore,
            bestScore: nextBestScore,
            clickedImages: nextClickedImages,
        };
        })
        const newClickedImages = [...(gameProgress.clickedImages),card.id];
        if(hasPlayerWon(cards,newClickedImages)){
            setGameProgress(prev=>({...prev,score:0,clickedImages:[]}));
            setPopups({showStartPopup:false,showInfoPopup:false,showWinPopup:true,showLosePopup:false});
            console.log("You won!");
        }
        else{
            /*
            setCards(prev=>{
                const shuffledCards = shuffle(prev);
                return shuffledCards;
            })*/
        }
    }
}
function hasPlayerWon(cards, newClickedImages){
    for(let i = 0;i< cards.length;i++){
        if(!newClickedImages.some(savedID=>savedID===cards[i].name.full)) return false;
    }
    return true;
}
function isIDPresentInGameProgress(gameProgress, newId){
    if(gameProgress.clickedImages.length==0)  return false;
    return gameProgress.clickedImages.find(savedId=> savedId === newId)
}
function getStartPopup(setPopups, setPlayVolume){
    return(
        <div className="start-popup popup">
            <h2>Welcome!</h2>
            <p>Beat this game to help Frieren and her friends<br></br> defeat the Demon Lord and save humanity!</p>
            <p>Are you up for the task..?</p>
            <p>Do you want to read the rules?</p>
            <div>
                <button onClick={()=>{setPopups({showStartPopup:false,showInfoPopup:true,showWinPopup:false,showLosePopup:false}),setPlayVolume(true)}}>Yes!</button>
                <button onClick={()=>{setPopups({showStartPopup:false,showInfoPopup:false,showWinPopup:false,showLosePopup:false}),setPlayVolume(true)}}>No, thank you!</button>
            </div>
        </div>
    )
}
function getInfoPopup(setPopups){
    return(
        <div className="info-popup popup">
            <h2>Instructions</h2>
            <ol>
                <li>Get points by clicking an image once.</li>
                <li>After every click, images change their position.</li>
                <li>If you click an image more than once, you lose!</li>
            </ol>
            <p>Good luck!</p>
            <button onClick={()=>setPopups({showStartPopup:false,showInfoPopup:false,showWinPopup:false,showLosePopup:false})}>I'm ready!</button>
        </div>
    )
}
function getWinPopup(setPopups, setCards){
    return(
        <div className="win-popup popup">
            <h2>You won!</h2>
            <p>You defeated the Demon King and brought peace to the world!</p>
            <button onClick={()=>{setPopups({showStartPopup:false,showInfoPopup:false,showWinPopup:false,showLosePopup:false}),setCards(prev=>{const shuffledCards = shuffle(prev); return shuffledCards;})}}>
                New Game</button>
        </div>
    )
}
function getLosePopup(setPopups, setCards){
    return(
        <div className="lose-popup popup">
            <h2>You lost!</h2>
            <p>The Demon King has won and the world is doomed...</p>
            <button onClick={()=>{setPopups({showStartPopup:false,showInfoPopup:false,showWinPopup:false,showLosePopup:false}),setCards(prev=>{const shuffledCards = shuffle(prev); return shuffledCards;})}}>New Game</button>
        </div>
    )
}
function addDarkTintClassOnRoot(){
    const root = document.querySelector("#root");
    root.classList.add("dark-tint");
}
function removeDarkTintClassFromRoot(){
     const root = document.querySelector("#root");
      root.classList.remove("dark-tint");
}
function willAPopupBeRendered(popups){
    for(const key in popups){
        if(popups[key])return true;
    }
    return false;
}
function returnPopupToBeRendered(popups,setPopups, setCards, setPlayVolume){
   if(popups.showStartPopup) return getStartPopup(setPopups, setPlayVolume);
   else if(popups.showInfoPopup) return getInfoPopup(setPopups);
   else if(popups.showWinPopup) return getWinPopup(setPopups, setCards);
   else if(popups.showLosePopup) return getLosePopup(setPopups, setCards);
}
