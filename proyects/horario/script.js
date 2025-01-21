const intervals = [
    { start: '08:30', end: '09:20' },
    { start: '09:25', end: '10:15' },
    { start: '10:20', end: '11:10' },
    { start: '11:15', end: '11:40' },
    { start: '11:40', end: '12:30' },
    { start: '12:35', end: '13:25' },
    { start: '13:30', end: '14:20' }
];

function outTime() {
    const now = new Date();
}

function day_highlight(){
    const now = new Date();
    const fecha = now.getDay();
    
    let dias = document.querySelectorAll(".dia");
    dias.forEach((dia, index) => {
        if (index === fecha - 1) dia.classList.add("highlight"); 
        else dia.classList.remove("highlight");
    });
}

function hour_highlight(){
    let hora = whatHour();
    // if(hora === "OUT") document.querySelector("table").style.display = "none";
    let tds = document.querySelectorAll(".hora");
    console.log(hora)
    let celda = tds[hora];
    console.log(celda);
    celda.classList.add("highlight");
}

function whatHour(){
    const now = new Date();
    let hours = now.getHours() < 10 ? "0"+now.getHours() : now.getHours();
    let minutes = now.getMinutes() < 10 ? "0"+now.getMinutes() : now.getMinutes();

    // const primera = (`${hours}:${minutes}` >= "08:30" && `${hours}:${minutes}` <= "09:20");
    // const segunda = (`${hours}:${minutes}` >= "09:25" && `${hours}:${minutes}` <= "10:15");
    // const tercera = (`${hours}:${minutes}` >= "10:20" && `${hours}:${minutes}` <= "11:10");
    // const recreo = (`${hours}:${minutes}` >= "11:15" && `${hours}:${minutes}` < "11:40");
    // const cuarta = (`${hours}:${minutes}` >= "11:40" && `${hours}:${minutes}` < "12:30");
    // const quinta = (`${hours}:${minutes}` >= "12:35" && `${hours}:${minutes}` < "13:25");
    // const sexta = (`${hours}:${minutes}` >= "13:30" && `${hours}:${minutes}` < "14:20");
    
         if (`${hours}:${minutes}` >= "08:30" && `${hours}:${minutes}` <= "09:20") return 0;
    else if (`${hours}:${minutes}` >= "09:25" && `${hours}:${minutes}` <= "10:15") return 1;
    else if (`${hours}:${minutes}` >= "10:20" && `${hours}:${minutes}` <= "11:10") return 2;
    else if (`${hours}:${minutes}` >= "11:15" && `${hours}:${minutes}` <= "11:40") return 3;
    else if (`${hours}:${minutes}` >= "11:40" && `${hours}:${minutes}` <= "12:30") return 4;
    else if (`${hours}:${minutes}` >= "12:35" && `${hours}:${minutes}` <= "13:25") return 5;
    else if (`${hours}:${minutes}` >= "13:30" && `${hours}:${minutes}` <= "14:20") return 6;
    else {return "ERROR"};
}

document.addEventListener('DOMContentLoaded', () => {
    day_highlight();
    hour_highlight();
    // Cada minuto actualizan
    setInterval(day_highlight, 60000);
    setInterval(hour_highlight, 60000);
});

