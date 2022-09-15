function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
}
function displayCurrentConditions(response) {
  console.log(response.data);
  let currentTemperature = document.querySelector("#temperature");
  let currentCity = document.querySelector("#city");
  let currentConditions = document.querySelector("#description");
  let currentWind = document.querySelector("#wind");
  let currentHumidity = document.querySelector("#humidity");
  let locationDate = document.querySelector("#localDate");
  let locationTime = document.querySelector("#localTime");

  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  currentCity.innerHTML = response.data.name;
  currentConditions.innerHTML = response.data.weather[0].description;
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  currentHumidity.innerHTML = response.data.main.humidity;
  locationDate = formatDate(reponse.data.dt * 1000);
}

let apiKey = "8ade40df9cf169461fc7f8acab2e9ac0";
let city = "Warszawa";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayCurrentConditions);
