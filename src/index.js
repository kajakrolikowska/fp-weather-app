function formatDate(timestamp) {
  let date = new Date(timestamp);
  let num = date.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let year = date.getFullYear();
  return `${day}, ${num} ${month} ${year}`;
}
function formatTime() {
  let now = new Date();
  let hours = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  console.log(response.data);
  forecastElement = document.querySelector("#forecasts");
  let forecastHTML = `<div class="row">`;
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col forecast">
          <div class="forecast-day">${day}</div>
          <img src="http://openweathermap.org/img/wn/10d@2x.png" class="weather-icon" width=40>
          <div class="forecast-temp-max-min"><span class="temperature-max">18&#176C</span> | <span class="temperature-min">12&#176C</span></div>
        </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "0a521eaf234a3a56f45252fac3c737ad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayCurrentConditions(response) {
  console.log(response.data);
  let currentTemperature = document.querySelector("#temperature");
  let currentCity = document.querySelector("#city");
  let currentConditions = document.querySelector("#description");
  let currentWind = document.querySelector("#wind");
  let currentHumidity = document.querySelector("#humidity");
  let locationDate = document.querySelector("#local-date");
  let weatherIcon = document.querySelector("#icon");
  let locationTime = document.querySelector("#local-time");

  celciusTemperature = response.data.main.temp;

  currentTemperature.innerHTML = Math.round(celciusTemperature);
  currentCity.innerHTML = response.data.name;
  currentConditions.innerHTML = response.data.weather[0].description;
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  currentHumidity.innerHTML = response.data.main.humidity;
  locationDate.innerHTML = formatDate(response.data.dt * 1000);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  locationTime.innerHTML = formatTime();

  getForecast(response.data.coord);
}

//(1) current location:
function currentPosition(position) {
  let apiKey = "8ade40df9cf169461fc7f8acab2e9ac0";
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayCurrentConditions);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentButton = document.querySelector(".location");
currentButton.addEventListener("click", getCurrentPosition);

//(2) search for a specific city-location:
function getName(city) {
  let apiKey = "8ade40df9cf169461fc7f8acab2e9ac0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  getName(city);
}

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", handleSubmit);

//dispaly temperature

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celciusTemperatureLink.classList.remove("active");
  fahrenheitTemperatureLink.classList.add("active");
  let currentTemperature = document.querySelector("#temperature");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  celciusTemperatureLink.classList.add("active");
  fahrenheitTemperatureLink.classList.remove("active");
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(celciusTemperature);
}

let fahrenheitTemperatureLink = document.querySelector("#fahrenheit");
fahrenheitTemperatureLink.addEventListener(
  "click",
  displayFahrenheitTemperature
);

let celciusTemperatureLink = document.querySelector("#celcius");
celciusTemperatureLink.addEventListener("click", displayCelciusTemperature);

let celciusTemperature = null;

getName("Berlin");
