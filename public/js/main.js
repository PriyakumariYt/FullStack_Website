const apikey = "2bb3861ba5284dfe9c0f1c50243f3173";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");

const weather_icon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apikey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.diplay = "block";
    document.querySelector(".weather").style.diplay = "none";
  } else {
    var data = await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML =
      data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    if (data.weather[0].main == "Clouds") {
      weather_icon.src = "image/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weather_icon.src = "image/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weather_icon.src = "image/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weather_icon.src = "image/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weather_icon.src = "image/mist.png";
    } else if (data.weather[0].main == "Snow") {
      weather_icon.src = "image/snow.png";
    }
    document.querySelector(".weather").style.display = "block";
    // document.querySelector(".error").style.display = "none";
  }
}
searchbtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});