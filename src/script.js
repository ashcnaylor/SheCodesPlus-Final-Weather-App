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
let time = now.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
});

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}, ${month} ${date}, ${year}, ${time}`;

function displayTemperature(response) {
  let tempDisplay = document.querySelector("#current-temp");
  fahrenheitTemp = response.data.main.temp;
  tempDisplay.innerHTML = `${Math.round(fahrenheitTemp)}`;
}

function displayConditions(response) {
  let conditionsDisplay = document.querySelector("#current-conditions");
  let humidityDisplay = document.querySelector("#humidity");
  let windDisplay = document.querySelector("#wind");
  let iconDisplay = document.querySelector("#icon");
  conditionsDisplay.innerHTML = `${response.data.weather[0].description}`;
  humidityDisplay.innerHTML = `${response.data.main.humidity}`;
  windDisplay.innerHTML = `${response.data.wind.speed}`;
  iconDisplay.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
  axios.get(apiURL).then(displayTemperature);
  axios.get(apiURL).then(displayConditions);
}

function showPositionWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let localApiKey = "e6c192fc2d52935f2ed5cbbf44309268";
  let localApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${localApiKey}&units=imperial`;
  axios.get(localApiUrl).then(displayTemperature);
  axios.get(localApiUrl).then(displayLocalCityName);
  axios.get(localApiUrl).then(displayConditions);
}

function convertCelcius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temp");
  let celciusTemp = Math.round((fahrenheitTemp - 32) * (5 / 9));
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  currentTemperature.innerHTML = celciusTemp;
}

function convertFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temp");
  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
  currentTemperature.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitTemp = null;

let button = document.querySelector("#geo-locate");
button.addEventListener("click", showPositionWeather);

navigator.geolocation.getCurrentPosition(showPositionWeather);

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", newCityWeather);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertCelcius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheit);
