const inputBox = document.getElementById("city-input");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const location_not_found = document.querySelector(".location_not_found");
const weather_body = document.querySelector(".weather-body");
const suggestionsBox = document.getElementById("suggestions");
const city_name_display = document.querySelector(".city-name");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");

const api_key = "6047620397743d56ab23a5eb9b84e057";

let selectedCityCoords = null;

// Geolocation on page load
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        checkWeatherByCoords(lat, lon);
      },
      (error) => {
        console.warn("Geolocation error:", error.message);
      }
    );
  } else {
    console.warn("Geolocation is not supported");
  }
});

// Search button click
searchBtn.addEventListener("click", () => {
  const city = inputBox.value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  if (selectedCityCoords) {
    checkWeatherByCoords(selectedCityCoords.lat, selectedCityCoords.lon);
  } else {
    checkWeather(city);
  }

  suggestionsBox.innerHTML = "";
});

// Autocomplete suggestions
inputBox.addEventListener("input", async () => {
  const city = inputBox.value.trim();
  selectedCityCoords = null;

  if (!city) {
    suggestionsBox.innerHTML = "";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${api_key}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    suggestionsBox.innerHTML = "";

    if (data.count === 0) return;

    data.list.forEach((item) => {
      const suggestion = document.createElement("div");
      suggestion.textContent = `${item.name}, ${item.sys.country}`;
      suggestion.classList.add("suggestion-item");

      suggestion.addEventListener("click", () => {
        inputBox.value = `${item.name}, ${item.sys.country}`;
        selectedCityCoords = {
          lat: item.coord.lat,
          lon: item.coord.lon,
        };
        suggestionsBox.innerHTML = "";
      });

      suggestionsBox.appendChild(suggestion);
    });
  } catch (err) {
    console.error("Autocomplete failed:", err);
  }
});

// Weather by coordinates
async function checkWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;

  try {
    const response = await fetch(url);
    const weather_data = await response.json();

    if (weather_data.cod === "404") {
      location_not_found.style.display = "flex";
      weather_body.style.display = "none";
      return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    //main weather info
    city_name_display.textContent = `${weather_data.name}, ${weather_data.sys.country}`;
    temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;
    description.innerHTML = weather_data.weather[0].description;

    //humidity and wind speed
    humidity.textContent = `${weather_data.main.humidity}%`;
    wind_speed.textContent = `${weather_data.wind.speed} km/h`;

    // Weather image logic
    const condition = weather_data.weather[0].main;
    switch (condition) {
      case "Clouds":
        weather_img.src = "cloud.png";
        break;
      case "Clear":
        weather_img.src = "clear.png";
        break;
      case "Rain":
        weather_img.src = "rain.png";
        break;
      case "Mist":
        weather_img.src = "mist.png";
        break;
      case "Snow":
        weather_img.src = "snow.png";
        break;
      default:
        weather_img.src = "default.png";
    }
  } catch (err) {
    console.error("Failed to fetch weather:", err);
    alert("Something went wrong. Please try again later.");
  }
}




