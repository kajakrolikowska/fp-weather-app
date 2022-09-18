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

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperature");
  let farenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(farenheitTemperature);
  console.log(farenheitTemperature);
}

let farenheitTemperatureLink = document.querySelector("#farenheit");
farenheitTemperatureLink.addEventListener("click", displayFarenheitTemperature);

let celciusTemperature = null;
getName("Berlin");
