const apiKey = "adcc703cc40ac2ea89125a51e00512e4";

/* Input & Button */

const cityInput =
    document.getElementById("cityInput");

const searchBtn =
    document.getElementById("searchBtn");

/* Weather Elements */

const cityName =
    document.getElementById("cityName");

const weatherCondition =
    document.getElementById("weatherCondition");

const temperature =
    document.getElementById("temperature");

const humidity =
    document.getElementById("humidity");

const wind =
    document.getElementById("wind");

const feelsLike =
    document.getElementById("feelsLike");

const country =
    document.getElementById("country");

const weatherEmoji =
    document.getElementById("weatherEmoji");

const errorBox =
    document.getElementById("errorBox");

const dateTime =
    document.getElementById("dateTime");

/* Search Button */

searchBtn.addEventListener(
    "click",
    () => {

        const city =
            cityInput.value.trim();

        if (city === "") {

            showError(
                "Please enter a city name"
            );

            return;
        }

        getWeather(city);
    }
);

/* Fetch Weather */

async function getWeather(city) {

    try {

        errorBox.style.display = "none";

        const response = await fetch(

            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

        );

        if (!response.ok) {

    const errorData = await response.json();

    throw new Error(
        errorData.message            );
        }

        const data =
            await response.json();

        displayWeather(data);

    }

    catch (error) {

        showError(error.message);
    }
}

/* Display Weather */

function displayWeather(data) {

    cityName.textContent =
        data.name;

    weatherCondition.textContent =
        data.weather[0].description;

    temperature.textContent =
        `${Math.round(data.main.temp)}°C`;

    humidity.textContent =
        `${data.main.humidity}%`;

    wind.textContent =
        `${data.wind.speed} km/h`;

    feelsLike.textContent =
        `${Math.round(data.main.feels_like)}°C`;

    country.textContent =
        data.sys.country;

    const condition =
        data.weather[0].main.toLowerCase();

    /* Dynamic Emoji */

    if (condition.includes("cloud")) {

        weatherEmoji.textContent = "☁️";
    }

    else if (
        condition.includes("rain")
    ) {

        weatherEmoji.textContent = "🌧️";
    }

    else if (
        condition.includes("clear")
    ) {

        weatherEmoji.textContent = "☀️";
    }

    else if (
        condition.includes("snow")
    ) {

        weatherEmoji.textContent = "❄️";
    }

    else if (
        condition.includes("storm")
    ) {

        weatherEmoji.textContent = "⛈️";
    }

    else {

        weatherEmoji.textContent = "🌍";
    }
}

/* Error Function */

function showError(message) {

    errorBox.style.display = "block";

    errorBox.textContent = message;
}

/* Live Time */

function updateTime() {

    const now = new Date();

    const options = {

        weekday: "long",

        hour: "numeric",

        minute: "numeric",

        second: "numeric"
    };

    dateTime.textContent =
        now.toLocaleString(
            "en-US",
            options
        );
}

setInterval(updateTime, 1000);

updateTime();

/* Default City */

getWeather("Chennai");