/* ============================================================ typing animation ============================================================ */ 
var typed = new Typed(".typing", {
    strings: ["","Web Designer", "Web developer", "Youtuber"],
    typeSpeed: 150,
    BackSpeed: 60,
    loop: true
});

const download = document.querySelector("#download");
const noti = document.querySelector("#notificacion");

// Para que no se recarge la página.
download.addEventListener("click", (event) => {
    event.preventDefault();

    // const userChoice = confirm("¿Quieres descargar el CV en inglés? (Aceptar = Español, Cancelar = Inglés)");
    // const userChoice = prompt("¿Quieres descargar el CV en inglés? (es = Español, en = Inglés)");
    
    // if(userChoice === "es") window.location.href = "files/CV-DanielDiaz-Español.pdf";
    // else if (userChoice === "en")  window.location.href = "files/CV-DanielDiaz-English.pdf";
    // else {
    //     // alert("Descarga cancelada.");
    //     noti.style.display = "block";
    //     // download.disabled = true;
    //     download.setAttribute("disabled", "");
    //     setTimeout(() => {
    //         noti.style.display = "none";
    //         download.removeAttribute("disabled");
    //         // download.disabled = false;
    //     }, 3000);
    // }
});

function descarga(event) {
    event.preventDefault();

    // const userChoice = confirm("¿Quieres descargar el CV en inglés? (Aceptar = Español, Cancelar = Inglés)");
    const userChoice = prompt("¿Quieres descargar el CV en inglés? (es = Español, en = Inglés)");
    
    if(userChoice === "es") window.location.href = "files/CV-DanielDiaz-Español.pdf";
    else if (userChoice === "en")  window.location.href = "files/CV-DanielDiaz-English.pdf";
    else {
        // alert("Descarga cancelada.");
        noti.style.display = "block";
        download.removeAttribute("onclick");
        setTimeout(() => {
            noti.style.display = "none";
            download.setAttribute("onclick", "descarga(event)");
        }, 3000);
    }
}

// const proyects = document.querySelector("#proyects");
// proyects.addEventListener("click", (e) => {
//     if(e.target.id == "horario") { window.location.href = "proyects/horario/index.html"; }
//     if(e.target.id == "weed") { window.location.href = "proyects/weed/index.html"; }
//     if(e.target.id == "ip") { window.location.href = "proyects/ip/index.html"; }
//     if(e.target.id == "drum") { window.location.href = "proyects/drum-kit/index.html"; }
// })

