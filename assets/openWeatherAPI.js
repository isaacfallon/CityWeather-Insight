// Weather API logic here

// Connecting DOM elements.
let tomorrowDate = document.getElementById('tomorrowDate');
const cityNameTitle = document.getElementById(`cityName-title`);
const cityFormEl = document.getElementById(`myForm`);
const cityInputEl2 = document.getElementById(`cityInput`);
const weatherInfoDiv = document.getElementById(`weatherInfo`);
const weatherIcon = document.getElementById('wiconTomorrow');

// OpenWeather API key.
const apiKey = `c16b89d5a85d543c78bba4d012495c74`;

// DayJS used to set up date for tomorrow.
const now = dayjs();
let tomorrow = now.add(1, 'day').format('DD/MM/YYYY');

// Empty arrays are set so we can add the weather data later on.
let tomorrowWeather = [];
let tomorrowWind = [];
let tomorrowHumidity = [];
let tomorrowIcons = [];
let tomorrowWeatherDescription = [];

const highestWeather = [];
const highestWind = [];
const highestHumidity = [];

// We get the city name stored in local storage.
const cityNameInStorage = localStorage.getItem('cityName');

// Set the page title to the city name obtained from local storage. 
cityNameTitle.textContent = cityNameInStorage;

// Set the text for tomorrow's date
tomorrowDate.textContent = `Tomorrow's date: ${tomorrow}`;

//OpenWeather API call using the city name from storage and API key provided.
const apiUrlFiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=${cityNameInStorage}&units=metric&appid=${apiKey}&cnt=12`;

    // API fetch call
    fetch(apiUrlFiveDays).then(function (response) {
        if (response.ok) {
        response.json().then(function (data) {
            // console.log(data.list);

            // Narrow the selection of data to only tomorrow's weather data.
            for (let i=4; i < data.list.length; i++) {

                // console.log(data.list[i].dt_txt + ' ' + data.list[i].main.temp + ' ' + data.list[i].weather[0].icon);

                // Push the specific data points needed to their respective arrays.
                tomorrowWeather.push(data.list[i].main.temp); 
                tomorrowWind.push(data.list[i].wind.speed); 
                tomorrowHumidity.push(data.list[i].main.humidity); 
                tomorrowIcons.push(data.list[i].weather[0].icon);
                tomorrowWeatherDescription.push(data.list[i].weather[0].description)
            }

            // This function checks to see what the most common item in an array is. 
            // It's used to get the most common weather icon and description. 
            const mode = a => 
                Object.values(
                    a.reduce((count, e) => {
                        if (!(e in count)) {
                         count[e] = [0, e];
                        }
                        count[e][0]++;
                        return count;
                        }, {})
                    ).reduce((a, v) => v[0] < a[0] ? a : v, [0, null])[1];
            ;
            //This filter method removes any weather icons that are 'night' icons. 
            const removeNightIcons = tomorrowIcons.filter(a => !a.includes("n"));

            // console.log(removeNightIcons);
            // console.log(mode(removeNightIcons));
            console.log(tomorrowWeatherDescription)
            console.log(mode(tomorrowWeatherDescription))

            let mostCommonWeather = mode(tomorrowWeatherDescription);

            localStorage.setItem('weatherDesc', mostCommonWeather);

            // The highest weather, wind and humidity are pulled from each array and stored in a separate variable. 
            const highestWeather = Math.max(...tomorrowWeather);
            const highestWeatherRound = Math.round(highestWeather * 10) / 10;
            const highestWind = Math.max(...tomorrowWind);
            const highestHumidity = Math.max(...tomorrowHumidity);

            // The text content for the corresponding weather data is then updated based on the max data pulled.
            let tomorrowDate = document.getElementById('tomorrowDate');
            tomorrowDate.textContent = `Tomorrow's date: ${tomorrow}`;

            let cityWeather = document.getElementById('cityWeather');
            cityWeather.textContent = `Tomorrow's weather: ${highestWeatherRound} °C`;

            let cityWind = document.getElementById('cityWind');
            cityWind.textContent = `Tomorrow's max wind speed: ${highestWind} m/s`;

            let cityHumidity = document.getElementById('cityHumidity');
            cityHumidity.textContent = `Tomorrow's max humidity: ${highestHumidity}%`;

            // The weather icon is selected by altering the 'src' attribute to the most commonly occuring icon 
            // that is only a daytime icon. 
            let tomorrowWeatherURL= "http://openweathermap.org/img/w/" + mode(removeNightIcons) + ".png";
            weatherIcon.setAttribute('src', tomorrowWeatherURL);

            // console.log(`Tomorrow's date: ${tomorrow}`)
            // console.log(`Tomorrow's weather: ${highestWeather} °C`);
            // console.log(`Tomorrow's max wind speed: ${highestWind} m/s`);
            // console.log(`Tomorrow's max humidity: ${highestHumidity}%`);

        })
        }
    });

// Below, we run a similar function but for when we enter a city name using the modal input.
    cityFormEl.addEventListener('submit', function(event) {
        event.preventDefault();

        localStorage.setItem('cityName', cityInputEl2.value);
        let newCityInput = localStorage.getItem('cityName');

        cityNameTitle.textContent = newCityInput;

        const apiUrlFiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=${newCityInput}&units=metric&appid=${apiKey}&cnt=12`;

        fetch(apiUrlFiveDays).then(function (response) {
            if (response.ok) {
            response.json().then(function (data) {
                console.log(data.list);
                for (let i=4; i < data.list.length; i++) {
    
                    console.log(data.list[i].dt_txt + ' ' + data.list[i].main.temp + ' ' + data.list[i].weather[0].icon);
    
                    tomorrowWeather.push(data.list[i].main.temp); 
                    tomorrowWind.push(data.list[i].wind.speed); 
                    tomorrowHumidity.push(data.list[i].main.humidity); 
                    tomorrowIcons.push(data.list[i].weather[0].icon)
                }
    
                const mode = a => 
                    Object.values(
                        a.reduce((count, e) => {
                            if (!(e in count)) {
                             count[e] = [0, e];
                            }
                            count[e][0]++;
                            return count;
                            }, {})
                        ).reduce((a, v) => v[0] < a[0] ? a : v, [0, null])[1];
                ;
                const removeNightIcons = tomorrowIcons.filter(a => !a.includes("n"));
                console.log(removeNightIcons);
    
                console.log(mode(removeNightIcons));
    
                const highestWeather = Math.max(...tomorrowWeather);
                const highestWeatherRound = Math.round(highestWeather * 10) / 10;
                const highestWind = Math.max(...tomorrowWind);
                const highestHumidity = Math.max(...tomorrowHumidity);
    
                let tomorrowDate = document.getElementById('tomorrowDate');
                tomorrowDate.textContent = `Tomorrow's date: ${tomorrow}`;
    
                let cityWeather = document.getElementById('cityWeather');
                cityWeather.textContent = `Tomorrow's weather: ${highestWeatherRound} °C`;
    
                let cityWind = document.getElementById('cityWind');
                cityWind.textContent = `Tomorrow's max wind speed: ${highestWind} m/s`;
    
                let cityHumidity = document.getElementById('cityHumidity');
                cityHumidity.textContent = `Tomorrow's max humidity: ${highestHumidity}%`;
    
                let tomorrowWeatherURL= "http://openweathermap.org/img/w/" + mode(removeNightIcons) + ".png";
                weatherIcon.setAttribute('src', tomorrowWeatherURL);
    
                console.log(`Tomorrow's date: ${tomorrow}`)
                console.log(`Tomorrow's weather: ${highestWeather} °C`);
                console.log(`Tomorrow's max wind speed: ${highestWind} m/s`);
                console.log(`Tomorrow's max humidity: ${highestHumidity}%`);
    
            })
            }
        });

    })