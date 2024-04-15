// Weather API logic here

const apiKey = `c16b89d5a85d543c78bba4d012495c74`;

// TODO: Plug in the city name input from the user from the HTML form input
const apiUrlFiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=Adelaide&units=metric&appid=${apiKey}&cnt=15`;

const now = dayjs();
let tomorrow = now.add(1, 'day').format('DD/MM/YYYY');

let tomorrowWeather = [];
let tomorrowWind = [];
let tomorrowHumidity = [];
let tomorrowIcons = [];

const highestWeather = [];
const highestWind = [];
const highestHumidity = [];

function showTomorrowWeather() {
    fetch(apiUrlFiveDays).then(function (response) {
        if (response.ok) {
        response.json().then(function (data) {
            console.log(data.list);
            for (let i=8; i < data.list.length; i++) {
                // console.log(data.list[i].dt_txt + ' ' + data.list[i].main.temp);
                tomorrowWeather.push(data.list[i].main.temp); 
                tomorrowWind.push(data.list[i].wind.speed); 
                tomorrowHumidity.push(data.list[i].main.humidity); 
                tomorrowIcons.push(data.list[i].weather[0].icon)
            }
            console.log(tomorrowIcons);

            const highestWeather = Math.max(...tomorrowWeather);
            const highestWind = Math.max(...tomorrowWind);
            const highestHumidity = Math.max(...tomorrowHumidity);

            //TODO: Sort through the weather icons and pull out the most relevant or common one for the weather
            // (For now, I'm just using tomorrowIcons[3] as it should represent midday/3PM weather tomorrow)
            let tomorrowWeatherIcon = "http://openweathermap.org/img/w/" + tomorrowIcons[3] + ".png";
            
            //TODO: Grab the HTML img element and set it's attribute of 'src' to the variable 'tomorrowWeatherIcon'.
            //Example code: document.getElementById('iconImg').setAttribute('src', tomorrowWeatherIcon);

            console.log(`Tomorrow's date: ${tomorrow}`)
            console.log(`Tomorrow's weather: ${highestWeather} °C`);
            console.log(`Tomorrow's max wind speed: ${highestWind} m/s`);
            console.log(`Tomorrow's max humidity: ${highestHumidity}%`);

            // TODO: Connect these data points to the text value of HTML elements
            //Example code:
            // document.getElementByID('tomorrowDate').textContent = ${tomorrow};
            // document.getElementByID('tomorrowDate').textContent = ${highestWeather};
            // document.getElementByID('tomorrowDate').textContent = ${highestWind};
            // document.getElementByID('tomorrowDate').textContent = ${highestHumidity};
        })
        }
    });
}

showTomorrowWeather();