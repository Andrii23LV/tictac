document.addEventListener("DOMContentLoaded", function() { 
    let container = document.querySelector('.container');
    let steps = 0;
    let winDisplay = document.querySelector('.announcer');
    //creating tiles inside container
    function createDivs() {
        for(let i = 0; i < 9; i++) {
            let containerDivs = document.createElement('div');
            container.appendChild(containerDivs).classList.add('tile');
        }
        return container;
    }
    createDivs();

    let turnMessage = document.querySelector('.display-player');
    
    //clear tiles by reset button
    function resetTiles () {
        let resetBtn = document.getElementById('reset');
        resetBtn.addEventListener('click', () => {
            location.reload();
    })
    }
    resetTiles();
    //check winner
    const tiles = Array.from(document.querySelectorAll('.tile'));
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentLetter = '';
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    const updateBoard = (index) => {
        board[index] = currentLetter;
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
    
        if (roundWon) {
            winDisplay.classList.remove('hide');
            let winner = '';
            let winSpan = '';
            if(currentLetter === 'X'){
                winner = 'X Won';
                winSpan = 'playerX';
            } else {
                winner = 'O Won';
                winSpan = 'playerO';
            }
            winDisplay.innerHTML = `Player <span class=${winSpan}>${winner}</span>`;
            return;
        }

        if (!board.includes('')) {
            winDisplay.classList.remove('hide');
            winDisplay.innerHTML = 'TIE';
        }
        }
    
    function highlight(tile, index) {
            if (steps % 2 === 1) {
                tile.classList.add('playerX');
                tile.classList.remove('playerO');
                tile.innerText = 'X';
                currentLetter = tile.innerText;
                turnMessage.classList.add('playerO');
                turnMessage.classList.remove('playerX');
                turnMessage.innerText = 'O';
                updateBoard(index);
            } else {
                tile.classList.add('playerO');
                tile.classList.remove('playerX');
                tile.innerText = 'O';
                currentLetter = tile.innerText;
                turnMessage.classList.add('playerX');
                turnMessage.classList.remove('playerO');
                turnMessage.innerText = 'X';
                updateBoard(index);
            }
            handleResultValidation();
        }
    
    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => {
            steps++;
            highlight(tile, index);
        });
    });


    let i = 5
    //keyboard control
    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft') {
            if (i <= 0) {
                tiles[i].classList.remove('active');
                i = 8;
                tiles[i].classList.add('active');
            } else {
                i--
                tiles[i].classList.add('active');
                tiles[i + 1].classList.remove('active');
            }
        } else if (e.key === 'ArrowRight') {
            if (i >= 8) {
                tiles[i].classList.remove('active');
                i = 0;
                tiles[i].classList.add('active');
            } else {
                i++
                tiles[i].classList.add('active');
                tiles[i - 1].classList.remove('active');
            }
        }
    })

    //dragging
    function dragging() {
        const draggables = document.querySelectorAll('.avatar-icon')
        const containers = document.querySelectorAll('.avatar-container')

        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', () => {
                draggable.classList.add('drag')
            })
        })

        containers.forEach(container => {
            container.addEventListener('dragover', e => {
                e.preventDefault()
            })
            container.addEventListener('dragenter', e => {
                e.preventDefault()
            })
            container.addEventListener('drop', () => {
                const draggy = document.querySelector('.drag');
                if(container.children.length){
                    return;
                }
                container.appendChild(draggy);
            })
        })
    }
    dragging()
    
    const tiless = document.querySelectorAll('.tile');
    
    const customEvent = new CustomEvent('myEnter');
    
    const callBack = () => {
        steps++;
    }
    for (const tile of tiless) {
      tile.addEventListener('myEnter', callBack);
    }
    
    for (let tile of tiless) {
      tile.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          tile.dispatchEvent(customEvent);
        }
      });
    }
});