// curl --request GET 
const OPTIONS = {
    method: 'GET',
    headers: {
		'x-rapidapi-key': '7a0cc38444msh59cdd4b0c1dcaffp17d290jsn38fdadf8774f',
		'x-rapidapi-host': 'ip-lookup-threat-detection-api.p.rapidapi.com'
	}
}
	// --url https://ip-lookup-threat-detection-api.p.rapidapi.com/45.8.25.69 
	
const fetchIpinfo = ip => {
    return fetch(`https://ip-lookup-threat-detection-api.p.rapidapi.com/${ip}`, OPTIONS)
    .then(res => res.json())
    .catch(err => console.error(err))
}
 
const $ = selector => document.querySelector(selector);

const form =   $("#form");
const input =  $("#input");
const button =  $("#submit");
const result =  $("#results");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); //Para que no se refresque la página
    
    const {value} = input;
    if(!value) return;

    button.setAttribute('disabled', '');
    button.setAttribute('aria-busy', 'true');

    const ipInfo = await fetchIpinfo(value.trim());

    if(ipInfo) {
        result.innerHTML = JSON.stringify(ipInfo, null, 2);
    }
    button.removeAttribute('disabled');
    button.removeAttribute('aria-busy');


})