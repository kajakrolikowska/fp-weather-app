function displayCurrentConditions(response) {
  console.log(response.data);
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.name;
  let currentConditions = document.querySelector("#description");
  currentConditions.innerHTML = response.data.weather[0].description;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = response.data.main.humidity;
}

let apiKey = "8ade40df9cf169461fc7f8acab2e9ac0";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayCurrentConditions);

function time() {
  console.log(Date);
}
