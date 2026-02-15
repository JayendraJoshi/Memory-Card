import { useEffect, useState } from 'react';
import shuffle from "lodash.shuffle"

export function Main({scores, setScores}){
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

    const cardDivs = getCardDivs(cards);
    return (
        <main>
            <div className="main-wrapper">
                {cardDivs}
            </div>
        </main>   
    )
}

function getCardDivs(cards){
        const cardDivsArray = [];
        for(let i = 0;i<cards.length;i++){
            cardDivsArray.push(<div className="card" key={cards[i].name.full} id={cards[i].name.full}>
                <img src={cards[i].image.large}></img>
                <p>{cards[i].name.full}</p>
                </div>)
        }
        return cardDivsArray;
}



// const [scores,setScores] = UseState({score:0;bestScore:0;clickedImages:[]}) should be defined in parent of main and header

//1. Get objects with images with useEffect[] and put them in an array
//2. Call function 'shuffleImages' to change the position of the objects containing the images
//3. Call function 'getCardDivsWithImages' to get Divs with the images. Use name property of the objects as key and id
//4. User clicks on an image, check if id is present in array 'clickedImages'

    //5. If yes, render loseScreen and show 'New Game' button
    //6. User clicks 'new Game button', set score to 0 and remove all entries from 'clickedImages' array
    //7. This triggers a rerender and cards will be newly shuffled, the only value that persists is 'best score'

    //5. If no, add id to the 'clickedImages' array
    //6. Check if the number of id's inside 'clickedImages' is 12

        //7. If yes, render winScreen and show 'New Game' button
        //8. User clicks 'new Game button', set score to 0 and remove all entries from 'clickedImages' array
        //9. This triggers a rerender and cards will be newly shuffled, the only value that persists is 'best score'

        //7. If no, add id to 'clickedImages' array
        //8. This triggers a rerender and cards will be shuffled, score, bestScore and 'clickedImages' will keep their values

   
    