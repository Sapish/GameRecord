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

console.log("Saved games: ", getGames());
console.log("JSON format: ", getGamesJSON());

let games = getGames();
console.log("Loaded games from localStorage: ", games);

const fileInput = document.getElementById("file-input");
const fileDisplay = document.getElementById("file-content");
const messageDisplay = document.getElementById("message");

fileInput.addEventListener("change", fileSelection);

function fileSelection(event) {
    const file = event.target.files[0];

    fileDisplay.textContent = "";
    messageDisplay.textContent = "";

    if (!file) {
        showMessage("Please select a file.", "Error");
        return;
    }

    if (!file.type.match("application/json") && !file.type.match("text.*")) {
        showMessage("Wrong file type. Needs to be JSON file.", "Error");
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        const fileData = reader.result;
        fileDisplay.textContent = fileData;
        try {
            importGames(fileData);
            games = getGames();
            console.log("Games after file import: ", games);
            showMessage("Successfully imported file.", "success");
        } catch (err) {
            showMessage("Error importing games: " + err, "Error");
        }
    };
    reader.readAsText(file);
}

function showMessage(message, type) {
    messageDisplay.textContent = message;
    messageDisplay.style.color = type === "Error" ? "red" : "green";
}

function displayGames(sortedGames) {
    const gamesToDisplay = sortedGames || getGames();

    let gameBox = document.getElementById("game-list");

    if (!gameBox) {
        gameBox = document.createElement("div");
        gameBox.id = "game-list";
        document.body.appendChild(gameBox);
    }

    gameBox.innerHTML = "";

    gamesToDisplay.forEach((game) => {
        const gameDetailsCard = document.createElement("div");
        gameDetailsCard.className = "game-card";

        const displayGameTitle = document.createElement("h3");
        displayGameTitle.textContent = game.title;
        gameDetailsCard.appendChild(displayGameTitle);

        const displayExtraInfo = document.createElement("p");
        displayExtraInfo.textContent = 
        "Designer: " + game.designer + " | " + 
        "Year: " + game.year + " | " +
        "Players: " + game.players + " | " +
        "Time: " + game.time + " | " +
        "Difficulty: " + game.difficulty;
        gameDetailsCard.appendChild(displayExtraInfo);

        const ratingNumber = document.createElement("label");
        ratingNumber.textContent = "Rating";
        gameDetailsCard.appendChild(ratingNumber);

        const ratingInput = document.createElement("input");
        ratingInput.type = "range";
        ratingInput.min = "0";
        ratingInput.max = "10";
        ratingInput.value = game.personalRating || 0;
        gameDetailsCard.appendChild(ratingInput);

        const ratingButton = document.createElement("button");
        ratingButton.textContent = "Update rating";
        gameDetailsCard.appendChild(ratingButton);

        ratingButton.addEventListener("click", function() {
            const newRating = parseInt(ratingInput.value);
            game.personalRating = newRating;
            gameSave(game);
            showMessage(`Current rating for ${game.title} changed to ${newRating}.`, "success");
        });

        const playCountAmount = document.createElement("label");
        playCountAmount.textContent = "Play count: ";
        gameDetailsCard.appendChild(playCountAmount);

        const playCountInput = document.createElement("input");
        playCountInput.type = "number";
        playCountInput.value = game.playCount || 0;
        gameDetailsCard.appendChild(playCountInput);

        const playCountButton = document.createElement("button");
        playCountButton.textContent = "Update play count";
        gameDetailsCard.appendChild(playCountButton);

        playCountButton.addEventListener("click", function() {
            const newPlayCount = parseInt(playCountInput.value);
            game.playCount = newPlayCount;
            gameSave(game);
            showMessage(`Current play count for ${game.title} changed to ${newPlayCount}.`, "success");
                
    });

    const deleteGameButton = document.createElement("button");
    deleteGameButton.textContent = "Delete Game";
    gameDetailsCard.appendChild(deleteGameButton);

    deleteGameButton.addEventListener("click", function() {
        const key = `game_${game.title.replace(/\s/g, '_')}`;
        localStorage.removeItem(key);
        showMessage(`Game ${game.title} deleted!`, "success");
        displayGames();
    });

    gameBox.appendChild(gameDetailsCard);
});
}
displayGames();

const addGameForm = document.getElementById("addGame");

if (addGameForm) {
    addGameForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const newGame = new game({
            title: event.target.title.value,
            designer: event.target.designer.value,
            artist: event.target.artist.value,
            publisher: event.target.publisher.value,
            year: parseInt(event.target.year.value) || new Date().getFullYear(),
            players: event.target.players.value,
            time: event.target.time.value,
            difficulty: event.target.difficulty.value,
            url: event.target.url.value,
            playCount: parseInt(event.target.playCount.value) || 0,
            personalRating: parseInt(event.target.personalRating.value) || 0,
        });

    gameSave(newGame);
    displayGames();
    showMessage(`Game "${newGame.title}" added successfully!`, "success");

    addGameForm.reset();
    });

    const sortButton = document.getElementById("sortButton");

    if (sortButton) {
        sortButton.addEventListener("click", () => {
            const sortBy = document.getElementById("sortBy").value;
            let gamesToSort = getGames();

            if (sortBy === "players") {
                gamesToSort.sort((a, b) => {
                    const aPlayers = parseInt(a.players) || 0;
                    const bPlayers = parseInt(b.players) || 0;
                    return aPlayers - bPlayers;
                });
            } else if (sortBy === "personalRating") {
                gamesToSort.sort((a, b) => b.personalRating - a.personalRating);
            } else if (sortBy === "playCount") {
                gamesToSort.sort((a, b) => b.playCount - a.playCount);
            } else if (sortBy === "difficulty") {
                gamesToSort.sort((a, b) => a.difficulty.localeCompare(b.difficulty));
            }
            displayGames(gamesToSort);
            showMessage(`Games sorted by ${sortBy}.`, "success");
        });
    }

}