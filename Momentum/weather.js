const weather = document.querySelector(".js-weather");
const weather_image = document.querySelector(".js-weather-image");
const API_KEY = "a0a2e526870999b20ed3f22164870054";
const COORDS = "coords";
var arr_1 = []


function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
.then(function(response){
    console.log(response);
    return response.json();
}).then(function(json){
    temperature = json.main.temp;
    name = json.name;
    wt = json.weather[0].description;
    wt_id = parseInt(json.weather[0].id);
    console.log(wt_id);
    weather.innerText = `${temperature}c@${name}\n${wt}`;
    var arr_2 = []
    arr[0] = temperature
    arr[1] = name
    arr[3] = wt
    arr[4] = wt_id
    arr_1.push(arr_2);
    console.log(arr_1);
    
    if(wt_id>804)console.log("continue");
    else if(wt_id>800)weather_image.src='images/overcast.jpg';
    else if(wt_id==800)weather_image.src='images/clear.png';
    else if(wt_id>700)weather_image.src='images/fog.png';
    else if(wt_id>=600)weather_image.src='images/snow.png';
    else if(wt_id>=500)weather_image.src='images/rain.png';
    else if(wt_id>=300)weather_image.src='images/drizzle.png';
    else if(wt_id>=200)weather_image.src='images/thunderstorm.png';
   
    
})
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function hadleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude)
}

function hadleGeoError(){
    console.log("Can't access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(hadleGeoSuccess,hadleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        console.log(parsedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    let timerId = setInterval(loadCoords,3600000);
    getWeather();
};

init();
