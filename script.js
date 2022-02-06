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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forcastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row gx-2">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
                 <div class="col-2">
                  
                  <div class="p-3 border bg-light border-white shadow-sm rounded">
                    <div class="d-flex justify-content-center" >
                      <div class="day-heading">${formatDay(
                        forecastDay.dt
                      )}</div>
                      </div> 
                      <div><p class="temp">${Math.round(
                        forecastDay.temp.max
                      )}°</p></div>
                       <img src="http://openweathermap.org/img/wn/${
                         forecastDay.weather[0].icon
                       }@2x.png" alt="weather-icon" 
                       width="36"
                       class="small-weather-icon"> 
                       
                    <div><p class="low-temp">${Math.round(
                      forecastDay.temp.min
                    )}°</p></div>
                    </div> 
                    </div> 
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forcastElement.innerHTML = forecastHTML;
}

function getForcast(coordinates) {
  console.log(coordinates);
  let apiKey = `2bf7017310b5c51608cafa98eba66487`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  console.log(response.data.weather[0].main);

  let iconElement = document.querySelector("#weather-icon");

  document.querySelector("#large-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForcast(response.data.coord);
}

function search(city) {
  let apiKey = `2bf7017310b5c51608cafa98eba66487`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");
  search(cityElement.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

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

search("london");

function displayFahrenheitTemp(event) {
  event.preventDefault();

  let fahrenheitTemperature = (14 * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
