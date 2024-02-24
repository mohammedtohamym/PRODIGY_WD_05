const todaysDate = new Date().toJSON().slice(0, 10);

const apikey = "c3000a5ee592c6fa693f1faa86a5d2bd";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");

const weatherCard = document.querySelector(".weather");
const errorMessage = document.querySelector(".error");

async function getWeather(city) {
  const response = await fetch(apiUrl + city + `&APPID=${apikey}`);

  if (response.status == 404) {
    weatherCard.style.display = "none";
    document.querySelector(".error p").innerHTML = "Invalid input!";
    errorMessage.style.display = "block";
  } else {
    var data = await response.json();

    console.log(data);
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    weatherCard.style.display = "block";
    errorMessage.style.display = "none";
  }
}

searchBox.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    searchBtn.click();
  }
});
searchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);
});
//----------------------------------------automaic locatin handling-----------------------------------------------
const findMyPlace = () => {
  const sucess = (position) => {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    fetch(geoApiUrl)
      .then((res) => res.json())
      .then((data) => getWeather(data.city));
  };
  const error = () => {
    console.log(error);
    weatherCard.style.display = "none";
    document.querySelector(".error p").innerHTML =
      "Can't get location, please search manually!";
    errorMessage.style.display = "block";
  };
  navigator.geolocation.getCurrentPosition(sucess, error);
};

document
  .querySelector(".autoLocationButton")
  .addEventListener("click", findMyPlace);
