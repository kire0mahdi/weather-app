# Coded by Mahdi Hasan.
const apiKey = 'c83c336d79e46362c28d00dad7a635dd'; // Replace with your OpenWeather API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value;
  if (!city) {
    weatherInfo.innerHTML = '<p>Please enter a city name.</p>';
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        weatherInfo.innerHTML = '<p>City not found.</p>';
        return;
      }

      weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
      `;
    })
    .catch(error => {
      weatherInfo.innerHTML = '<p>Something went wrong. Please try again.</p>';
      console.error(error);
    });
});
