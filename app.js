document.addEventListener("DOMContentLoaded", () => {
  //
  //* Getting all the document elements and store them in variables

  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const errorMsg = document.getElementById("error-message");
  const descriptionDisplay = document.getElementById("description");

  const API_KEY = "146f103958c6c04211860251f774ea08";

  //* Adding eventListener on button to get the input value
  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();

    if (!city) return;
    //! The response to the server may throw an error
    //! server/database is always in another continent
    //* Always try to wrap the request and error in try and catch

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City Not found");
    }
    const data = await response.json();

    return data;
  }

  function displayWeatherData(data) {
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature : ${main.temp}`;
    console.log(main);
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

    weatherInfo.classList.remove("hidden");
    errorMsg.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMsg.classList.remove("hidden");
  }
});
