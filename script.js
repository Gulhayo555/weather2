const app = document.querySelector(".weather-app");
const nameOutput = document.querySelector(".name");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");


cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    // nameOutput.innerHTML = e.target.innerHTML;
    fetchWeatherData(e.target.innerHTML);
  });
});
form.addEventListener("submit", (e) => {
  if (search.value.length == 0) {
    alert("Please type in a city name");
  } else {
    fetchWeatherData(search.value);
    search.value = "";
 
  }

  e.preventDefault();
});
function dayOfTheWeek(day, month, year) {
  const weekday = [
    "sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[new Date(`${day}/${month}/${year}`).getDay()];
}
function fetchWeatherData(city) {
  const APIKey = "9458bde64e3649e0ea2539cc78cf8bb7";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  ).then((response) => response.json()).then((json) => {
        console.log(json.weather);
      switch (json.weather[0].main)
       {
          case 'Clear':
               app.style.backgroundImage = 'url(./images/weath.sunny.jpg)';
               icon.className ="fas fa-sun"
                break;
          case 'Rain':
          app.style.backgroundImage = 'url(./images/weath.rain.jpg)';
            icon.className = "fal fa-cloud-rain"
              break;
          case 'Snow':
            app.style.backgroundImage = 'url(./images/weath.snow.jpg)';
              icon.className = "far fa-cloud-snow"
              break;
          case 'Clouds':
                app.style.backgroundImage = 'url(./images/wea-cloud.jpg)';
                icon.className = "far fa-clouds"
                break;
          case 'Mist':
               app.style.backgroundImage = 'url(./images/w-mist.jpg)';
               icon.className = "fal fa-fog"
               break;   

          default:
               app.style.backgroundImage = 'url(./images/wea-sunny.jpg)';
               icon.className ="far fa-cloud-sun"
      }
      temp.innerHTML = `${parseInt(json.main.temp)}&#176`;
      cloudOutput.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
      nameOutput.innerHTML = json.name;
  
    });
}

