// Logic to bridge data between the home page and weather information page.

// Grab HTML DOM elements for the city input and invalid text. 
const cityInputEl = document.getElementById(`cityInput`);
const invalidText = document.getElementById(`invalidInput`);

// Function to handle the city input submission
function submitCityHomePage() {

    // Weather API call so we can check the city input below.
    const apiUrlFiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInputEl.value}&units=metric&appid=${`c16b89d5a85d543c78bba4d012495c74`}&cnt=12`;

    // API fetch call
    fetch(apiUrlFiveDays).then(function (response) {
        if (response.ok) {
            // If the API response call is okay, we set the city name to local storage 
            // to be used later  then we move to the weather information page. 
        response.json().then(function (data) {
            localStorage.setItem('cityName', cityInputEl.value);
            window.location.assign('./weatherInformation.html');
        })
    } else {
        // Otherwise, if the response is not okay, we stay on the page  
        // and let the user know their input is invalid. 
        invalidText.textContent = "Please enter a valid city name!";

    }
})
}