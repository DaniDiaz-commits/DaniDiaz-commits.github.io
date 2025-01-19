/* ============================================================ typing animation ============================================================ */ 
var typed = new Typed(".typing", {
    strings: ["","Web Designer", "Web developer", "Youtuber", "Student"],
    typeSpeed: 150,
    BackSpeed: 60,
    loop: true
});

download.addEventListener("click", (event) => {
    event.preventDefault();

    const userChoice = confirm("¿Quieres descargar el CV en inglés? (Aceptar = Español, Cancelar = Inglés)");
    
    if (userChoice) { window.location.href = "files/Curriculum en español.pdf"; } 
    else {
        const confirmCancel = confirm("¿Estás seguro de descargar el CV en inglés?");
        if (confirmCancel) {
            window.location.href = "files/Curriculum en inglés.pdf";
        } else {
            alert("Descarga cancelada.");
        }
    }
});