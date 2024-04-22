// Wikipedia API logic here

// ? Get HTML DOM references
const resultsContainer = document.querySelector('.results');
const remainderContainer = document.querySelector('.remainder')

// ? Variables
const exampleOpenWeatherDesc = "clear sky";
const weatherDesc = localStorage.getItem("weatherDesc") || exampleOpenWeatherDesc;
const descriptionsArr = ["sky", "clouds", "rain", "thunderstorm", "snow", "mist"];
const relatedTermsArr = ["weather", "weather forecasting","meterology"]
const remainderArr = [];

// ? Load this content on page load 
document.addEventListener("DOMContentLoaded", function (event) {
    event.preventDefault();

    awaitResults();

})

async function awaitResults() {
    let result = await searchWiki(findSearchTerm(weatherDesc));
    displayResults(result, resultsContainer);

    let displayArr = [];
    for await (const term of remainderArr) {
        let remainder = await searchWiki(term);
        displayArr.push(remainder[0]);
    }    
    displayResults(displayArr, remainderContainer);
}

function findSearchTerm(searchTerm) {

    descriptionsArr.forEach(desc => {
        if (searchTerm.includes(desc)) {
            searchTerm = desc;
        } else {
            remainderArr.push(desc);
        }
    });

    return searchTerm;
}

// ? Function for search wiki that is asynchronous, meaning it will execute code whilst also waiting for an operation to complete
async function searchWiki(searchTerm) {
    // ? Get Wiki API and set query parameters
    //const urlPrevious = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${encodeURIComponent(searchTerm)}`;
    const endpoint = "https://en.wikipedia.org/w/api.php";
    const parameters = "?action=query"
        + "&list=search" // which list to get, in this case a full text search 
        + "&prop=info" // which properties to get from queried pages, in this case, basic page information
        + "&inprop=url" // which additional properties to get - meta info, in this case also the URL
        + "&utf8="
        + "&format=json"
        + "&origin=*" // omitting this causes a CQRS error
        + "&srlimit=1" // search limit on list equal to a number
        + "&srsearch="; // 
    const search = `${encodeURIComponent(searchTerm)}`;

    const wikiURL = endpoint + parameters + search;

    // ? Store fetch URL and await for response
    let response = await fetch(wikiURL).catch(error => alert('Error : ' + error));;
    // ? Store data as JSON when response is received
    let data = await response.json();
    console.log(wikiURL);
    // ? Get search array fron data
    let result = data.query.search;
    // ? Return the result
    return result;
}

// ? Function that displays the results of the wiki search, the parameter is an array and a container to display it in
async function displayResults(results, container) {
    // ? Clear old results so new results may be displayed by themselves
    container.innerHTML = '';
    // ? Create an element for each result and append them to the container
    results.forEach(result => {
        const resultElement = document.createElement('div');
        // ? Append
        resultElement.className = 'result box has-text-left';
        resultElement.innerHTML = `
        
        <h4 class="title is-4">${result.title}</h4>
        <p class="content">${result.snippet}</p>
        <button class="button is-primary" onclick="window.open('https://en.wikipedia.org/?curid=${result.pageid}','_blank')">Read More</button>
        `;
        container.appendChild(resultElement);
    });
}

