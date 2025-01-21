/* ============================================================ typing animation ============================================================ */ 
var typed = new Typed(".typing", {
    strings: ["","Web Designer", "Web developer", "Youtuber"],
    typeSpeed: 150,
    BackSpeed: 60,
    loop: true
});

const download = document.querySelector("#download");
download.addEventListener("click", (event) => {
    event.preventDefault();

    // const userChoice = confirm("¿Quieres descargar el CV en inglés? (Aceptar = Español, Cancelar = Inglés)");
    const userChoice = prompt("¿Quieres descargar el CV en inglés? (es = Español, en = Inglés)").trim().toLowerCase();
    
    if(userChoice === "es") window.location.href = "files/Curriculum en español.pdf";
    else if (userChoice === "en")  window.location.href = "files/Curriculum en inglés.pdf";
    else alert("Descarga cancelada.");
});

const proyects = document.querySelector("#proyects");
proyects.addEventListener("click", (e) => {
    if(e.target.id == "horario"){
        window.location.href = "proyects/horario/index.html";
    }
    if(e.target.id == "weed"){
        window.location.href = "proyects/weed/index.html";
    }
})