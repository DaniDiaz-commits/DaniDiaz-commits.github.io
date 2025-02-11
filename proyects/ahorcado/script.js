const $ = selector => document.querySelector(selector);

const wordContainer = $("#wordContainer");
const startBtn = $("#startBtn");
const usedLettersElement = $("#usedLetters");
const noti = $("#notificacion");
let url = "https://random-word-api.herokuapp.com/word";

let canvas = $("#canvas")
let ctx = canvas.getContext('2d');
ctx.canvas.width = 0;
ctx.canvas.height = 0;

const bodyParts = [
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
];

let selectedWord;
let usedLetters;
let mistakes;
let hits;

const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
}
const addBodyPart = bodyPart => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...bodyPart);
}

const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if(mistakes === bodyParts.length) {
        noti.style.display = "block";
        startBtn.removeEventListener("click", startGame);
        if(noti.classList.contains("notification--success")) {
            noti.classList.remove("notification--success");
            noti.classList.add("notification--warning");
        } else {
            noti.classList.add("notification--warning");
        }
        noti.children[0].childNodes[2].textContent = ` Has perdido la palabra era: ${selectedWord.join("")} \n`;
        noti.children[0].children[0].src = "./assets/cross-circle.png";
        setTimeout(() => {
            noti.style.display = "none";
            startBtn.addEventListener('click', startGame);
        }, 3000);
        endGame()
    };
}

const endGame = () => {
    console.clear();
    document.removeEventListener('keydown', letterEvent);
    startBtn.style.display = 'block';
}

const correctLetter = letter => {
    const { children } = wordContainer;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
            console.log("Aciertos: "+hits);
        }
    }
    if(hits === selectedWord.length) { 
        noti.style.display = "block";
        startBtn.removeEventListener("click", startGame);
        if(noti.classList.contains("notification--warning")) {
            noti.classList.remove("notification--warning");
            noti.classList.add("notification--success");
        } else {
            noti.classList.add("notification--success");
        }
        noti.children[0].childNodes[2].textContent = " WINNER\n";
        noti.children[0].children[0].src = "./assets/check-circle.png";
        setTimeout(() => {
            noti.style.display = "none";
            startBtn.addEventListener('click', startGame);
        }, 3000);
        endGame();
    };
}

const letterInput = letter => {
    if(selectedWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);

}

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    } else {
        console.log("Letra ya añadida: " +newLetter);
        window.addEventListener('keydown', playSound(newLetter));
    }
}

const drawWord = () => {
    // if(selectedWord.length == 0) {
    //     setTimeout(drawWord, 1000);
    // };
    for(let letter of selectedWord) {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    };
}

const selectRandomWord = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const palabra = data[0];
        console.log("Palabra: " +palabra);

        // translateText(palabra);
        
        selectedWord = palabra.toUpperCase().split('');
    } catch (error) {
        console.error("Error obteniendo palabra:", error);
    }
};

const drawHangMan = () => {
    ctx.canvas.width  = 120;
    ctx.canvas.height = 160;
    ctx.scale(20,20);
    ctx.clearRect(0 , 0, canvas.width, canvas.height);
    ctx.fillStyle = '#d95d39';
    ctx.fillRect(0,7,4,1);
    ctx.fillRect(1,0,1,8);
    ctx.fillRect(2,0,3,1);
    ctx.fillRect(4,1,1,1);
}

const startGame = async () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    startBtn.style.display = 'none';
    drawHangMan();
    await selectRandomWord();
    drawWord();
    // setTimeout(drawWord, 1000); // Muy forzado para que es el fetch?
    document.addEventListener('keydown', letterEvent);
}
startBtn.addEventListener('click', startGame);


function playSound (letter) {
    if(usedLetters.includes(letter)){
        const audio = $("#audio");
        if(!audio) return;
        audio.currentTime = 0;
        audio.play();
    }
}



// async function translateText(text) {
//     const authKey = "TU_API_KEY";
//     const targetLang = "ES";
  
//     const response = await fetch("https://api-free.deepl.com/v2/translate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: new URLSearchParams({
//         auth_key: authKey,
//         text: text,
//         target_lang: targetLang,
//       }),
//     });
  
//     const data = await response.json();
//     console.log(`${text} en inglés es ${data.translations[0].text}`);
//     // return data.translations[0].text;
//   }
  