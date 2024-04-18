// Wikipedia API logic here

// ?Get HTML DOM references
const resultsContainer = document.querySelector('.results');
const remainderContainer = document.querySelector('.remainder')
// const resultsCounter = document.querySelector('.counter');

// ?Variables
const exampleOpenWeatherDesc = "clear sky";
const weatherDesc = localStorage.getItem("weatherDesc") || exampleOpenWeatherDesc;
const descriptionsArr = ["sky", "clouds", "rain", "thunderstorm", "snow", "mist"];
const remainderArr = [];

// ? Load this content on page load 
document.addEventListener("DOMContentLoaded", function (event) {
    event.preventDefault();

    awaitResults();
    console.log(weatherDesc);
})

async function awaitResults() {
    let result = await searchWiki(findSearchTerm(weatherDesc));
    displayResults(result, resultsContainer);

    let arr = [];
    for await (const term of remainderArr) {
        let remainder = await searchWiki(term);
        arr.push(remainder[0]);
    }    
    displayResults(arr, remainderContainer);
}

function findSearchTerm(searchTerm) {

    descriptionsArr.forEach(desc => {
        if (searchTerm.includes(desc)) {
            searchTerm = desc;
        } else {
            remainderArr.push(desc);
        }
    });

    console.log(remainderArr);
    console.log(searchTerm);
    return searchTerm;
}

// ?Function for search wiki that is asynchronous, meaning it will execute code whilst also waiting for an operation to complete
async function searchWiki(searchTerm) {
    // ?Get Wiki API and set query parameters
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

    // ?Fetch/then method of storing response from API, using arrow functions
    // fetch(url).then(response => response.json()).then
    // (data =>{
    //     displayResults(data.query.search);
    // }).catch(error => alert('Error : ' + error));

    // ?Store fetch URL and await for response
    let response = await fetch(wikiURL).catch(error => alert('Error : ' + error));;
    // ?Store data as JSON when response is received
    let data = await response.json();
    // ?Get search array fron data
    let result = data.query.search;
    // ?Return the result
    return result;
}

// ?Function that displays the results of the wiki search, the parameter is an array and a container to display it in
async function displayResults(results, container) {
    // ?Clear results container
    console.log(results);
    container.innerHTML = '';
    // ?Set the text of the results count
    // resultsCounter.textContent = `Results Count : ${results.length}`;
    // ?Create an element for each result and append them to the container
    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.className = 'result box has-text-left';
        resultElement.innerHTML = `
        
        <h4 class="title is-4">${result.title}</h4>
        <p class="content">${result.snippet}</p>
        <button class="button is-primary" onclick="window.open('https://en.wikipedia.org/?curid=${result.pageid}','_blank')">Read More</button>
        `;
        container.appendChild(resultElement);
    });
}

