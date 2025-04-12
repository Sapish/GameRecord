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

function displayGames() {
    const games = getGames();

    let gameBox = document.getElementById("game-list");

    if (!gameBox) {
        gameBox = document.createElement("div");
        gameBox.id = "game-list";
        document.body.appendChild(gameBox);
    }

    gameBox.innerHTML = "";

    games.forEach((game) => {
        const gameDetailsCard = document.createElement("div");
        gameDetailsCard.className = "game-card";

        const displayGameTitle = document.createElement("h3");
        displayGameTitle.textContent = game.title;
        gameDetailsCard.appendChild(displayGameTitle);

        const displayExtraInfo = document.createElement("p");
        displayExtraInfo.textContent = "Designer: " + game.designer + " | Year: " + game.year;
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

        const playerCounter = document.createElement("label");
        playerCounter.textContent = "Player counter: ";
        gameDetailsCard.appendChild(playerCounter);

        const playerCounterInput = document.createElement("input");
        playerCounterInput.type = "number";
        playerCounterInput.value = game.playCount || 0;
        gameDetailsCard.appendChild(playerCounterInput);

        const playerCounterButton = document.createElement("button");
        playerCounterButton.textContent = "Update player count";
        gameDetailsCard.appendChild(playerCounterButton);

        playerCounterButton.addEventListener("click", function() {
            const newPlayerCount = parseInt(playerCounterInput.value);
            game.playCount = newPlayerCount;
            gameSave(game);
            showMessage(`Current player count for ${game.title} changed to ${newPlayerCount}.`, "success");
                
    });

    gameBox.appendChild(gameDetailsCard);
});
}
displayGames();