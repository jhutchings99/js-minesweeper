let board = document.querySelector("#board");

let height = 10;
let width = 10;
let amountOfMines = 10;
let amountOfFlags = 10;

let cells = [];
let mines = [];
let flags = [];

function createBoard() {
    for (let i = 0; i < height * width; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        // cell.classList.add("cell-cover");
        cell.id = i;
        board.appendChild(cell);
        cells.push(cell);
    }
}

function createBombs() {
    random_index = Math.floor(Math.random() * cells.length);
        
    for (let i = 0; i < amountOfMines; i++) {
        while (mines.includes(random_index)) {
            random_index = Math.floor(Math.random() * cells.length);
        }
        mines.push(random_index);
    }

    mines.forEach((mine) => {
        cells[mine].classList.add("cell-cover");
        cells[mine].classList.add("mine");
    });
}

function createNumbers() {
    cells.forEach((cell) => {
        if (!cell.classList.contains("mine")) {
            let id = parseInt(cell.id);
            let count = 0;

            // RIGHT SIDE
            if (id % width != 0 && mines.includes(id - 1)) {
                count++;
            }

            // LEFT SIDE
            if (id % width != width - 1 && mines.includes(id + 1)) {
                count++;
            }

            // BOTTOM SIDE
            if (id >= width && mines.includes(id - width)) {
                count ++;
            }

            // TOP SIDE
            if (id < width * (height - 1) && mines.includes(id + width)) {
                count ++;
            }

            // BOTTOM RIGHT
            if (id % width != 0 && id >= width && mines.includes(id - width - 1)) {
                count++;
            }

            // BOTTOM LEFT
            if (id % width != width - 1 && id >= width && mines.includes(id - width + 1)) {
                count++;
            }

            // TOP RIGHT
            if (id % width != 0 && id < width * (height - 1) && mines.includes(id + width - 1)) {
                count++;
            }

            // TOP LEFT
            if (id % width != width - 1 && id < width * (height - 1) && mines.includes(id + width + 1)) {
                count++;
            }

            cell.classList.add("number");
            cell.innerHTML = count;
        }
    });
}

createBoard();
createBombs();
createNumbers();

console.log(cells);

cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
        console.log(e.target.id);
        if (cell.classList.contains("cell-cover") && !cell.classList.contains("flagged")) {
            cell.classList.remove("cell-cover");
        }
    });

    cell.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if (cell.classList.contains("cell-cover")) {
            if (cell.classList.contains("flagged")) {
                cell.classList.remove("flagged");
                amountOfFlags++;
                flags.pop(cell.id);
            } else if (amountOfFlags > 0){
                cell.classList.add("flagged");
                amountOfFlags--;
                flags.push(cell.id);
            }
        }
    });
});
