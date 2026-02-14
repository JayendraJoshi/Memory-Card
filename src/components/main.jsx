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