Completely forgot to write my progression and explain my code from the beginning, but ill go through it now (currently just completed step 6).

Step 1:
Made my folders and files and made it a git repo.
Added the html5 scaffold.
<link rel="stylesheet" href="style.css"> will load the CSS styles.
<script src="app.mjs" type="module"></script> added so my code in app.mjs can load onto the live server web.

Step 2:
    * Looked at the example.json file.
    * Created the game.mjs file in the models folder.
    * Made a class that i can reuse throughout my code.

Step 3:
In step three i added a few functions:
    * gameSave(gameObj) - Takes a key from the games title and saves the game to local storage.
    * getGames() - Takes all saved games from the local storage and returns them.
    * getGamesJSON() - Takes the saved games and turns them into a JSON string.
    * importGames(jsonData) - Decodes JSON data and saves each game in localStorage using the gameSave function.

Step 4:
    * Users can add JSON file.
    * Added file reader to read the files content.
    * The data then get sent to the importGames function and gets saved in localStorage.
    * Ui updates and shows the correct updated records.

Step 5:
Made a code that will make a "card" for each game that showed the details like the title and the year for example.
This is shown on the Ui.

Step 6:
Added code so that the buttons would work. The user can change the rating of the game and the play count. When the rating or play count is updated it will save in local storage.
Upon writing this i realised i had written "Player counter" and "Update player count" instead of "Play count". Fixed now.

Step 7:
Added a fill out form to the Ui, so that users can add more games. Only front end done, backend will be done in step 8.

Step 8:
Added back-end code so that the fill out form actually works.
Users can now add games with (title, designer, artist, publisher, year, players, time, difficulty, url, playcount and personal rating.)
The users will also get feedback if there is something they are missing, or if the game(s) were added successfully.

Step 9:
Added a delete button behind all games, so now users can delete games from the Ui.
Im using the same logic as i did with saving, using keys. Once the delete button is clicked, the Ui will refresh and the game will be deleted from localStorage.

Step 10:
Added backend and frontend code that allows the user to sort the games based on (playercount, play count, rating and difficulty).
Once you select your sort by option and hit the sort games button, the most relevant games will go to the top.
Realised now that im not actually showing some of the info in the example gameRecordUi.png, which i can see in the f12 console.
Shouldn't be hard to add, but i need a break.