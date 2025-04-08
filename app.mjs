
import game from "./models/game.mjs";

export function gameSave(gameObj) {
    if (!gameObj || !gameObj.title) {
        console.error("");
        return;
    }
    const key = `game_${gameObj.title.replace(/\s/g, '_')}`;
    console.log(`The game is saved with this key: ${key}`);
}

export function getGames() {
    const games = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("game_")) {
            const gameObj = JSON.parse(localStorage.getItem(key));
            games.push(gameObj);
        }
    }
    return games;
}

const gameDetails = {
    title: "Concordia",
    designer: "Mac Gerdts",
    artist: "Marina Fahrenbach",
    publisher: "PD-Verlag",
    year: 2013,
    players: "2-5",
    time: "90 mins",
    difficulty: "Medium",
    url: "https://boardgamegeek.com/boardgame/124361/concordia",
    playCount: 44,
    personalRating: 9,
};

const myGame = new game(gameDetails);
console.log(myGame);

gameSave(myGame);

console.log("Saved games: ", getGames());