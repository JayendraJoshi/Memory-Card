export function Main(){
    const cardDivs = getCardDivs(12);
    return (
        <main>
            <div className="main-wrapper">
                {cardDivs}
            </div>
        </main>   
    )
}

function getCardDivs(numberOfCards){
    const cards = [];
    for(let i = 0;i<numberOfCards;i++){
        cards.push(<div className="card" key={i}></div>)
    }
    return cards;
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

   
    