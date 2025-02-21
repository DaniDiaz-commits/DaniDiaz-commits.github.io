// 1. Depositar el dinero
// 2. Determinar el numero de lineas a apostar
// 3. Recolectar la apuesta
// 4. Girar la ruleta
// 5. Checkear si gana o no
// 6. Darle al usuario las ganancias
// 7. Jugar otra vez

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

function deposit() {
  while (true) {
    const depositAmount = prompt("Ingresa el depósito que quieras: ");
    const numerDepositAmount = parseFloat(depositAmount);

    if (isNaN(numerDepositAmount) || numerDepositAmount <= 0) {
      console.log("Depósito no válido, intenta otra vez");
    } else {
      return numerDepositAmount;
    }
  }
}

const getNumberOfLines = () => {
  while (true) {
    const getNumberOfLines = prompt(
      "Ingresa el número de líneas a las que apostar (1-3): "
    );
    const numberOfLines = parseFloat(getNumberOfLines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Número de líneas no válido, intenta otra vez");
    } else {
      return numberOfLines;
    }
  }
};

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Ingresa la apuesta total por línea: ");
    const numberBet = parseFloat(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("La apuesta es inválida, intenta otra vez");
    } else {
      return numberBet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }

  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }

  return winnings;
};

const game = () => {
  let balance = deposit();

  while (true) {
    console.log("Tienes un balance de $" + balance)
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("YOU WON, $" + winnings.toString());

    if(balance <= 0) {
        console.log("Te quedaste sin dinero putero clasista");
        break;
    }

    const playAgain = prompt("¿Quieres jugar otra vez? (y/n): ");
    if(playAgain != "y") break;
  }
};

game();
