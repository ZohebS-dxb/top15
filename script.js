let players = [];  // Array to store the list of players (represented by colors)
let hintcolor= "black";
const colors = ["red", "blue", "green", "orange", "purple", "cyan", "pink", "lime", "teal", "magenta","black"];  // Array of available colors for players


const inputframe = document.getElementById('input-frame');  // Reference to the input frame element

let scores = {};  // Object to store the scores for each player
let hintActive = false;  // Flag to track if the hint has been activated

function initializeGame() {
    const playerCount = parseInt(document.getElementById('players').value);  // Get the number of players from user input
    if (isNaN(playerCount) || playerCount < 1 || playerCount > 10) {  // Validate the number of players
        alert("Please enter a valid number of players between 1 and 10.");  // Show an alert if the number is invalid
        return;  // Exit the function if the input is invalid
    }
    inputframe.style.visibility = 'hidden';  // Hide the input frame after the game starts
    players = [];  // Reset the players array
    scores = {};  // Reset the scores object
    hintActive = false;  // Reset hint activation flag

    // Initialize the players and their scores
    for (let i = 0; i < playerCount; i++) {
        const color = colors[i];  // Assign a color to each player
        players.push(color);  // Add the color to the players array
        scores[color] = 0;  // Initialize the score for this player to 0
    }

    document.querySelector('.matrix').innerHTML = '';  // Clear the grid (matrix) of boxes
    document.querySelector('.scoreboard').innerHTML = '';  // Clear the scoreboard

    // Create the 25 boxes in the grid
    for (let i = 1; i <= 25; i++) {
        const box = document.createElement('div');  // Create a new div element for each box
        box.className = 'box';  // Assign the class 'box' to the div
        box.textContent = i;  // Set the box's text content to its number (1 to 25)
        box.dataset.value = i;  // Store the box's value (its number) in a custom data attribute
        box.dataset.colorIndex = -1;  // Initialize the color index to -1 (no color)

        // Add a click event listener to each box
        box.addEventListener('click', () => {
            let currentIndex = parseInt(box.dataset.colorIndex);  // Get the current color index
            if (currentIndex !== -1) {  // If the box is already colored
                box.classList.remove(players[currentIndex]);  // Remove the current color class
                
				if (hintActive) scores[players[currentIndex]] -= Math.ceil((parseInt(box.dataset.value)/2));
				else scores[players[currentIndex]] -= parseInt(box.dataset.value);  // Subtract the box's value from the player's score
            }

            currentIndex = (currentIndex + 1) % (players.length + 1);  // Cycle to the next player or reset if all players are cycled

            if (currentIndex < players.length) {  // If the new index corresponds to a player
                let valueToAdd = parseInt(box.dataset.value);  // Get the value of the box

                if (hintActive) {  // Check if the hint is active
                    valueToAdd = Math.ceil(valueToAdd / 2);  // Halve the value if the hint is active
                }

                box.classList.add(players[currentIndex]);  // Add the new color class to the box
                box.classList.add("highlighted");  // Add a 'highlighted' class to visually indicate selection
                scores[players[currentIndex]] += valueToAdd;  // Add the box's value to the player's score
            } else {
                box.classList.add(0);  // Add a default class if no player is selected
                box.classList.remove("highlighted");  // Remove the 'highlighted' class
            }

            box.dataset.colorIndex = currentIndex;  // Update the box's color index to the new index

            updateScores();  // Update the scoreboard to reflect the new scores
        });

        document.querySelector('.matrix').appendChild(box);  // Add the box to the grid
    }

    // Add the "Hint" button below the grid
    const hintBox = document.createElement('div');  // Create a new div element for the hint button
    hintBox.className = 'box hint';  // Assign the classes 'box' and 'hint' to the div
    hintBox.textContent = "Hint";  // Set the text content of the hint button
    hintBox.addEventListener('click', () => {  // Add a click event listener to the hint button
        hintActive = true;  // Activate the hint when the button is clicked
       hintBox.classList.add("black");  // Add the new color class to the box
       hintBox.classList.add("highlighted");  // Add a 'highlighted' class to visually indicate selection
	});
	
    document.querySelector('.matrix').appendChild(hintBox);  // Add the hint button to the grid

    updateScores();  // Initial call to update the scoreboard
}

function updateScores() {
    const scoreboard = document.querySelector('.scoreboard');  // Reference to the scoreboard element
    scoreboard.innerHTML = '<h3>Scores</h3>';  // Set the heading of the scoreboard

    // Iterate over each player to update their score
    for (const color of players) {
        const scoreItem = document.createElement('div');  // Create a new div for each player's score
        scoreItem.textContent = `${color}: ${scores[color]}`;  // Set the text content to the player's color and score
        scoreItem.style.color = color;  // Color the text with the player's color
        scoreboard.appendChild(scoreItem);  // Add the score item to the scoreboard
    }
}
