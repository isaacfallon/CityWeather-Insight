// For generic button event listeners

const cityInputEl = document.getElementById(`cityInput`);

function submitCityHomePage() {
    console.log(cityInputEl.value);
    localStorage.setItem('cityName', cityInputEl.value);
    window.location.assign('./weatherInformation.html')
}