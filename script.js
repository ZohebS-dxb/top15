
        let players = [];
        const colors = ["red", "blue", "green", "orange", "purple", "cyan", "pink", "lime", "teal", "magenta"];

        const inputframe = document.getElementById('input-frame');
        
        let scores = {};

        function initializeGame() {
            const playerCount = parseInt(document.getElementById('players').value);
            if (isNaN(playerCount) || playerCount < 1 || playerCount > 10) {
                alert("Please enter a valid number of players between 1 and 10.");
                return;
            }
            inputframe.style.visibility = 'hidden'
            players = [];
            scores = {};
            for (let i = 0; i < playerCount; i++) {
                const color = colors[i];
                players.push(color);
                scores[color] = 0;
            }

            document.querySelector('.matrix').innerHTML = '';
            document.querySelector('.scoreboard').innerHTML = '';

            for (let i = 1; i <= 25; i++) {
                const box = document.createElement('div');
                box.className = 'box';
                box.textContent = i;
                box.dataset.value = i;
                box.dataset.colorIndex = -1;
                box.addEventListener('click', () => {
                    let currentIndex = parseInt(box.dataset.colorIndex);
                    if (currentIndex !== -1) {
                        box.classList.remove(players[currentIndex]);
                        scores[players[currentIndex]] -= parseInt(box.dataset.value);
                    }
                    
                    currentIndex = (currentIndex + 1) % (players.length + 1);
                
                    if (currentIndex < players.length) {
                        box.classList.add(players[currentIndex]);
                        box.classList.add("highlighted");
                        
                        scores[players[currentIndex]] += parseInt(box.dataset.value);
                    } else {
                        //box.style.backgroundColor = 'white'; 
                        box.classList.add(0);
                        box.classList.remove("highlighted");
                    }
                    
                    box.dataset.colorIndex = currentIndex;

                    updateScores();
                  
                });
                document.querySelector('.matrix').appendChild(box);
            }

            updateScores();
        }

        function updateScores() {
            const scoreboard = document.querySelector('.scoreboard');
            scoreboard.innerHTML = '<h3>Scores</h3>';
            for (const color of players) {
                const scoreItem = document.createElement('div');
                scoreItem.textContent = `${color}: ${scores[color]}`;
                 //scoreItem.innerHTML = `<span class="black highlighted">${color}</span>: ${scores[color]}`;

                scoreItem.style.color = color;
                scoreboard.appendChild(scoreItem);
            }
        }
