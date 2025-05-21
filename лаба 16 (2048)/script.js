document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const scoreDisplay = document.getElementById('score');
    const restartBtn = document.getElementById('restart');
    const tryAgainBtn = document.getElementById('try-again');
    const gameOverScreen = document.getElementById('game-over');

    const gifs = {
        2: 'images/2.gif',
        4: 'images/4.gif',
        8: 'images/8.gif',
        16: 'images/16.gif',
        32: 'images/32.gif',
        64: 'images/64.gif',
        128: 'images/128.gif',
        256: 'images/256.gif',
        512: 'images/512.gif',
        1024: 'images/1024.gif',
        2048: 'images/2048.gif'
    };

    let board = [];
    let score = 0;

    function initGame() {
        board = Array(4).fill().map(() => Array(4).fill(0));
        score = 0;
        scoreDisplay.textContent = score;
        grid.innerHTML = '';
        gameOverScreen.style.display = 'none';

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                grid.appendChild(cell);
            }
        }

        addRandomTile();
        addRandomTile();
    }

    function addRandomTile() {
        const emptyCells = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 0) {
                    emptyCells.push({ i, j });
                }
            }
        }

        if (emptyCells.length > 0) {
            const { i, j } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[i][j] = Math.random() < 0.9 ? 2 : 4;
            const tile = createTile(i, j, board[i][j]);
            tile.dataset.row = i;
            tile.dataset.col = j;
        }
    }

    function createTile(row, col, value) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.value = value;
        tile.dataset.row = row;
        tile.dataset.col = col;
        tile.style.top = `${row * 110 + 10}px`;
        tile.style.left = `${col * 110 + 10}px`;

        const img = document.createElement('img');
        img.src = gifs[value];
        img.alt = value;
        tile.appendChild(img);

        grid.appendChild(tile);
        return tile;
    }

    function move(direction) {
        let moved = false;
        const oldBoard = JSON.parse(JSON.stringify(board));
        const newBoard = Array(4).fill().map(() => Array(4).fill(0));

        if (direction === 'left') {
            for (let i = 0; i < 4; i++) {
                let row = board[i].filter(cell => cell !== 0);
                for (let j = 0; j < row.length - 1; j++) {
                    if (row[j] === row[j + 1]) {
                        row[j] *= 2;
                        score += row[j];
                        row[j + 1] = 0;
                    }
                }
                row = row.filter(cell => cell !== 0);
                while (row.length < 4) row.push(0);
                newBoard[i] = row;
            }
        } else if (direction === 'right') {
            for (let i = 0; i < 4; i++) {
                let row = board[i].filter(cell => cell !== 0);
                for (let j = row.length - 1; j > 0; j--) {
                    if (row[j] === row[j - 1]) {
                        row[j] *= 2;
                        score += row[j];
                        row[j - 1] = 0;
                    }
                }
                row = row.filter(cell => cell !== 0);
                while (row.length < 4) row.unshift(0);
                newBoard[i] = row;
            }
        } else if (direction === 'up') {
            for (let j = 0; j < 4; j++) {
                let column = [];
                for (let i = 0; i < 4; i++) {
                    if (board[i][j] !== 0) column.push(board[i][j]);
                }
                for (let i = 0; i < column.length - 1; i++) {
                    if (column[i] === column[i + 1]) {
                        column[i] *= 2;
                        score += column[i];
                        column[i + 1] = 0;
                    }
                }
                column = column.filter(cell => cell !== 0);
                while (column.length < 4) column.push(0);
                for (let i = 0; i < 4; i++) {
                    newBoard[i][j] = column[i];
                }
            }
        } else if (direction === 'down') {
            for (let j = 0; j < 4; j++) {
                let column = [];
                for (let i = 0; i < 4; i++) {
                    if (board[i][j] !== 0) column.push(board[i][j]);
                }
                for (let i = column.length - 1; i > 0; i--) {
                    if (column[i] === column[i - 1]) {
                        column[i] *= 2;
                        score += column[i];
                        column[i - 1] = 0;
                    }
                }
                column = column.filter(cell => cell !== 0);
                while (column.length < 4) column.unshift(0);
                for (let i = 0; i < 4; i++) {
                    newBoard[i][j] = column[i];
                }
            }
        }

        moved = JSON.stringify(oldBoard) !== JSON.stringify(newBoard);
        if (moved) {
            const previousBoard = JSON.parse(JSON.stringify(board));
            board = newBoard;
            scoreDisplay.textContent = score;
            updateBoard(previousBoard);
            setTimeout(() => {
                addRandomTile();
                if (isGameOver()) {
                    gameOverScreen.style.display = 'flex';
                }
            }, 150);
        }
    }

    function updateBoard(oldBoard) {
        const existingTiles = Array.from(document.querySelectorAll('.tile'));

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const value = board[i][j];
                const oldValue = oldBoard[i][j];

                if (value !== 0) {
                    const tile = existingTiles.find(t =>
                        parseInt(t.dataset.row) === i &&
                        parseInt(t.dataset.col) === j &&
                        parseInt(t.dataset.value) === value
                    );

                    if (tile) {
                        tile.style.top = `${i * 110 + 10}px`;
                        tile.style.left = `${j * 110 + 10}px`;
                        tile.dataset.row = i;
                        tile.dataset.col = j;
                    } else {
                        const newTile = createTile(i, j, value);
                        newTile.dataset.row = i;
                        newTile.dataset.col = j;

                        if (oldValue !== value && oldValue !== 0) {
                            newTile.classList.add('merge');
                            newTile.addEventListener('animationend', () => {
                                newTile.classList.remove('merge');
                            }, { once: true });
                        }
                    }
                }
            }
        }

        existingTiles.forEach(tile => {
            const r = parseInt(tile.dataset.row);
            const c = parseInt(tile.dataset.col);
            const val = parseInt(tile.dataset.value);
            if (board[r][c] !== val) {
                tile.remove();
            }
        });
    }

    function isGameOver() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 0) return false;
                if (j < 3 && board[i][j] === board[i][j + 1]) return false;
                if (i < 3 && board[i][j] === board[i + 1][j]) return false;
            }
        }
        return true;
    }

    document.addEventListener('keydown', (e) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
            move(e.key.replace('Arrow', '').toLowerCase());
        }
    });

    restartBtn.addEventListener('click', initGame);
    tryAgainBtn.addEventListener('click', initGame);

    initGame();
});
