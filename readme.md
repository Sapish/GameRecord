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