function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#current-date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function displayWeather(response) {
  console.log(response);
  document.querySelector("#large-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function search(event) {
  event.preventDefault();
  let apiKey = `2bf7017310b5c51608cafa98eba66487`;
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeather);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function showWeather(response) {
  let temperature = document.querySelector("searchForm");
  let temp = Math.round(response.data.main.temp);
  let cityInput = document.querySelector("#city-input");
  let cityElement = document.querySelector("#large-city");

  cityElement.innerHTML = cityInput.value;
  let city = cityInput.value;
  console.log(response);
}
function searchCurrentLocation(position) {
  let apiKey = "2bf7017310b5c51608cafa98eba66487";
  let units = "metric";
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeather);
}
function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}
let currentLocationTemp = document.querySelector("#currentTempButton");
currentLocationTemp.addEventListener("click", showCurrentLocation);