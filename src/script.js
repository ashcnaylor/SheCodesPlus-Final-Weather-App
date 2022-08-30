let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getYear() - 100 + 2000;
let time = now.toLocaleTimeString("en-US");

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}, ${month} ${date}, ${year}, ${time}`;

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempDisplay = document.querySelector("#current-temp");
  tempDisplay.innerHTML = `${temperature}°F`;
}

function displayConditions(response) {
  let currentConditions = response.data.weather[0].description;
  let conditionsDisplay = document.querySelector("#current-conditions");
  conditionsDisplay.innerHTML = `${currentConditions}`;
}

function displayLocalCityName(response) {
  let localCityName = response.data.name;
  let localCityDisplay = document.querySelector("#current-city");
  localCityDisplay.innerHTML = `${localCityName}`;
}

function newCityWeather(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let changeCity = document.querySelector("#current-city");
  changeCity.innerHTML = `${searchInput.value}`;
  let apiKey = "9ba0817f7000c09909bed30e28a2734c";
  let units = "imperial";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=${units}&appid=${apiKey}`;
  axios.get(apiURL).then(displayWeather);
  axios.get(apiURL).then(displayConditions);
}

function showPositionWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let localApiKey = "e6c192fc2d52935f2ed5cbbf44309268";
  let localApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${localApiKey}&units=imperial`;
  axios.get(localApiUrl).then(displayWeather);
  axios.get(localApiUrl).then(displayLocalCityName);
}

let button = document.querySelector("#geo-locate");
button.addEventListener("click", showPositionWeather);

navigator.geolocation.getCurrentPosition(showPositionWeather);

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", newCityWeather);
