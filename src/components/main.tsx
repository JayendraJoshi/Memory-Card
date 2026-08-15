import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import shuffle from "lodash.shuffle";
import cardFlipSoundUrl from "../assets/sounds/card-flip.ogg?url";
import { GameProgress, Popups } from "../App";

interface MainProps {
  gameProgress: GameProgress;
  setGameProgress: Dispatch<SetStateAction<GameProgress>>;
  popups: Popups;
  setPopups: Dispatch<SetStateAction<Popups>>;
  soundOn: boolean;
  setSoundOn: Dispatch<SetStateAction<boolean>>;
  playBackgroundTheme: () => void;
  playClickSoundIfRequested: (
    shouldPlay: boolean,
    soundRef: React.RefObject<HTMLAudioElement>,
  ) => void;
}

interface Card {
  id: number;
  name: {
    userPreferred: string;
    full: string;
    native: string;
    alternative: string[];
  };
  image: { large: string };
}

export function Main({
  gameProgress,
  setGameProgress,
  popups,
  setPopups,
  soundOn,
  setSoundOn,
  playBackgroundTheme,
  playClickSoundIfRequested,
}: Readonly<MainProps>) {
  //Hooks
  const [cards, setCards] = useState<Card[]>([]);
  const [fetchError, setFetchError] = useState(false);
  useEffect(() => {
    async function getJsonFromAPI() {
      const endpoint = "https://graphql.anilist.co";
      const query = `
            query ($id: Int!, $page: Int!, $perPage: Int!) {
            Media(id: $id, type: ANIME) {
                characters(page: $page, perPage: $perPage, sort: [FAVOURITES_DESC, RELEVANCE]) {
                edges {
                    node {
                    id
                    name {
                        userPreferred
                        full
                        native
                        alternative
                    }
                    image { large }
                    }
                }
                }
            }
            }
                `;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          variables: {
            id: 154587,
            perPage: 12,
            page: 1,
          },
        }),
      });
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
      const json = await res.json();
      return json;
    }
    async function getArrayFromJson() {
      const jsonData = await getJsonFromAPI();
      const objectsArray: Card[] = [];
      for (let i = 0; i < 12; i++) {
        objectsArray.push(jsonData.data.Media.characters.edges[i].node);
      }
      return objectsArray;
    }
    async function getRandomizedArray() {
      const array = await getArrayFromJson();
      return shuffle(array);
    }
    async function setInitialCards() {
      try {
        const randomizedArray: Card[] = await getRandomizedArray();
        console.log(randomizedArray);
        setCards(randomizedArray);
      } catch (e) {
        console.error("failed:", e);
        setFetchError(true);
      }
    }
    setInitialCards();
  }, []);
  useEffect(() => {
    if (willAPopupBeRendered(popups)) addDarkTintClassOnRoot();
    return () => {
      removeDarkTintClassFromRoot();
    };
  }, [popups]);
  const cardFlipAudioRef = useRef(new Audio(cardFlipSoundUrl));

  //Create components
  function getCardDivs() {
    const cardDivsArray = [];
    for (const element of cards) {
      cardDivsArray.push(
        <button
          type="button"
          className="card"
          key={element.id}
          id={String(element.id)}
          onClick={(e) => {
            clickEventOnCard(
              e,
              gameProgress,
              setGameProgress,
              cards,
              setCards,
              setPopups,
            );
            playClickSoundIfRequested(soundOn, cardFlipAudioRef);
          }}
        >
          <img src={element.image.large} alt={element.name.full}></img>
          <p>{element.name.full}</p>
        </button>,
      );
    }
    return cardDivsArray;
  }
  function getStartPopup() {
    return (
      <div className="start-popup popup">
        <h2>Welcome!</h2>
        <p>
          Beat this game to help Frieren and her friends defeat the Demon Lord
          and save humanity!
        </p>
        <p>Are you up for the task..?</p>
        <p>Do you want to read the rules?</p>
        <div>
          <button
            type="button"
            onClick={() => {
              setPopups({
                showStartPopup: false,
                showInfoPopup: true,
                showWinPopup: false,
                showLosePopup: false,
              });
              setSoundOn(true);
              playBackgroundTheme();
            }}
          >
            Yes!
          </button>
          <button
            type="button"
            onClick={() => {
              setPopups({
                showStartPopup: false,
                showInfoPopup: false,
                showWinPopup: false,
                showLosePopup: false,
              });
              setSoundOn(true);
              playBackgroundTheme();
            }}
          >
            No, thank you!
          </button>
        </div>
      </div>
    );
  }
  function getInfoPopup() {
    return (
      <div className="info-popup popup">
        <h2>Instructions</h2>
        <ol>
          <li>Get points by clicking an image once.</li>
          <li>After every click, images change their position.</li>
          <li>If you click an image more than once, you lose!</li>
        </ol>
        <p>Good luck!</p>
        <button
          type="button"
          onClick={() =>
            setPopups({
              showStartPopup: false,
              showInfoPopup: false,
              showWinPopup: false,
              showLosePopup: false,
            })
          }
        >
          I'm ready!
        </button>
      </div>
    );
  }
  function getWinPopup() {
    return (
      <div className="win-popup popup">
        <h2>You won!</h2>
        <p>You defeated the Demon King and brought peace to the world!</p>
        <button
          type="button"
          onClick={() => {
            setPopups({
              showStartPopup: false,
              showInfoPopup: false,
              showWinPopup: false,
              showLosePopup: false,
            });
            setCards((prev) => {
              const shuffledCards = shuffle(prev);
              return shuffledCards;
            });
          }}
        >
          New Game
        </button>
      </div>
    );
  }
  function getLosePopup() {
    return (
      <div className="lose-popup popup">
        <h2>You lost!</h2>
        <p>The Demon King has won and the world is doomed...</p>
        <button
          type="button"
          onClick={() => {
            setPopups({
              showStartPopup: false,
              showInfoPopup: false,
              showWinPopup: false,
              showLosePopup: false,
            });
            setCards((prev) => {
              const shuffledCards = shuffle(prev);
              return shuffledCards;
            });
          }}
        >
          New Game
        </button>
      </div>
    );
  }
  function returnPopupToBeRendered() {
    if (popups.showStartPopup) return getStartPopup();
    else if (popups.showInfoPopup) return getInfoPopup();
    else if (popups.showWinPopup) return getWinPopup();
    else if (popups.showLosePopup) return getLosePopup();
  }

  const cardDivs = getCardDivs();

  return (
    <main>
      <div className="main-wrapper">
        {fetchError ? (
          <div className="error-div">
            <p>
              We couldn't fetch the necessary data from AniList to render cards
              right now, please try again later.
            </p>
          </div>
        ) : (
          cardDivs
        )}
        {willAPopupBeRendered(popups) ? returnPopupToBeRendered() : null}
      </div>
    </main>
  );
}

//Helper functions

function clickEventOnCard(
  event: React.MouseEvent<HTMLButtonElement>,
  gameProgress: GameProgress,
  setGameProgress: Dispatch<SetStateAction<GameProgress>>,
  cards: Card[],
  setCards: Dispatch<SetStateAction<Card[]>>,
  setPopups: Dispatch<SetStateAction<Popups>>,
) {
  const card = event.currentTarget.closest(".card");
  if (!card) throw new Error("card not found");
  const cardId = Number(card.id);
  if (isIDPresentInGameProgress(gameProgress, cardId)) {
    setGameProgress((prev) => ({ ...prev, score: 0, clickedImages: [] }));
    setPopups({
      showStartPopup: false,
      showInfoPopup: false,
      showWinPopup: false,
      showLosePopup: true,
    });
  } else {
    setGameProgress((prev) => {
      const nextScore = prev.score + 1;
      const nextClickedImages = [...prev.clickedImages, cardId];
      const nextBestScore = Math.max(prev.bestScore, nextScore);
      return {
        ...prev,
        score: nextScore,
        bestScore: nextBestScore,
        clickedImages: nextClickedImages,
      };
    });
    const newClickedImages = [...gameProgress.clickedImages, cardId];
    if (hasPlayerWon(cards, newClickedImages)) {
      setGameProgress((prev) => ({ ...prev, score: 0, clickedImages: [] }));
      setPopups({
        showStartPopup: false,
        showInfoPopup: false,
        showWinPopup: true,
        showLosePopup: false,
      });
      console.log("You won!");
    } else {
      setCards((prev) => {
        const shuffledCards = shuffle(prev);
        return shuffledCards;
      });
    }
  }
}
function hasPlayerWon(cards: Card[], newClickedImages: number[]) {
  for (const card of cards) {
    if (!newClickedImages.includes(card.id)) return false;
  }
  return true;
}
function isIDPresentInGameProgress(gameProgress: GameProgress, newId: number) {
  if (gameProgress.clickedImages.length == 0) return false;
  return gameProgress.clickedImages.find((savedId) => savedId === newId);
}
function addDarkTintClassOnRoot() {
  const root = document.querySelector("#root");
  root!.classList.add("dark-tint");
}
function removeDarkTintClassFromRoot() {
  const root = document.querySelector("#root");
  root!.classList.remove("dark-tint");
}
function willAPopupBeRendered(popups: Popups) {
  return Object.values(popups).some(Boolean);
}
