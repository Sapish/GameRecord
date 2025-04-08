
import game from "./models/game.mjs";

export function gameSave(gameObj) {
    if (!gameObj || !gameObj.title) {
        console.error("Provide a valid title before saving.");
        return;
    }
    const key = `game_${gameObj.title.replace(/\s/g, '_')}`;
    localStorage.setItem(key, JSON.stringify(gameObj));
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

export function getGamesJSON() {
    const games = getGames();
    return JSON.stringify(games);
}

export function importGames(jsonData) {
    let gamesArray;

    if (typeof jsonData === "string") {
        try {
            gamesArray = JSON.parse(jsonData);
        } catch (error) {
            console.error("Invalid JSON string: ", error);
            return;
        }
    } else if (Array.isArray(jsonData)) {
        gamesArray = jsonData;
    } else {
        console.error("Provide a valid JSON string.");
        return;
    }

    gamesArray.forEach(gameData => {
        const newGame = new game(gameData);
        gameSave(newGame);
    });
    console.log(`${gamesArray.length} imported and saved the games to localStorage`);

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

const gamesJSON = `[
    {
        "title": "Concordia",
        "designer": "Mac Gerdts",
        "artist": "Marina Fahrenbach",
        "publisher": "PD-Verlag",
        "year": 2013,
        "players": "2-5",
        "time": "90 mins",
        "difficulty": "Medium",
        "url": "https://boardgamegeek.com/boardgame/124361/concordia",
        "playCount": 44,
        "personalRating": 9
    },
    {
        "title": "Catan",
        "designer": "Klaus Teuber",
        "artist": "Franz Vohwinkel",
        "publisher": "Kosmos",
        "year": 1995,
        "players": "3-4",
        "time": "60-120 mins",
        "difficulty": "Easy",
        "url": "https://boardgamegeek.com/boardgame/13/catan",
        "playCount": 80,
        "personalRating": 8
    }
]`;

importGames(gamesJSON);

console.log("Saved games: ", getGames());
console.log("JSON format: ", getGamesJSON());