function reloj(){
    let now = new Date();
    
    let hours   = now.getHours()   < 10 ? "0"+now.getHours()   : now.getHours();
    let minutes = now.getMinutes() < 10 ? "0"+now.getMinutes() : now.getMinutes();
    let seconds = now.getSeconds() < 10 ? "0"+now.getSeconds() : now.getSeconds();
  
    let hms = document.getElementById("hora");
    hms.innerHTML = hours + " : " + minutes + " : " + seconds;
}
setInterval(reloj, 1000);