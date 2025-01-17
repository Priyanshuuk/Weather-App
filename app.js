document.addEventListener('DOMContentLoaded', function () {
    const apiurl = "https://api.openweathermap.org/data/2.5/weather?q=";
    const apikey = "ea8f26adf13487efebcbb30a425c11c4";

    
    function updateWeather(data) {
        const weatherIcon = data.weather[0].icon; 
        const temp = data.main.temp;
        const city = data.name;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        
        document.querySelector(".city-name").textContent = city;
        document.querySelector(".temperature").textContent = `${temp}°C`;
        document.querySelector(".humidity span").textContent = `${humidity}%`;
        document.querySelector(".wind span").textContent = `${windSpeed} kph`;
        document.querySelector(".card img").src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
    }

    
    async function checkweather(city) {
        const response = await fetch(apiurl + city + `&units=metric&appid=${apikey}`);
        const data = await response.json();

        if (data.cod === 200) {
            updateWeather(data); 
        } else {
            alert("City not found!");
        }
    }

    
    document.getElementById("search").addEventListener("click", function () {
        const city = document.getElementById("city").value; // Get the city input
        if (city) {
            checkweather(city);
        } else {
            alert("Please enter a city name!");
        }
    });

    
    checkweather("Dehradun");
});
