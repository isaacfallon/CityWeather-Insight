// Wikipedia API logic here

// ?Get HTML DOM references
const form = document.querySelector('.search-box');
const input = document.querySelector('#search-term');
const resultsContainer = document.querySelector('.results');
const resultsCounter = document.querySelector('#counter');

// ?Variables
const userSearch = input.value;

const exampleOpenWeatherDesc = "shower rain";

const descriptionsArray = ["sky", "clouds", "rain", "thunderstorm", "snow", "mist"];

// ?'Submit' listener for text box - executes search function
form.addEventListener('submit', function (event){
    event.preventDefault();
    searchWiki(findSearchTerm(exampleOpenWeatherDesc));
    // ?Check if input is empty and then execute function
    // if(userSearch){
    //     searchWiki(findSearchTerm(exampleOpenWeatherDesc));
    // }
});

function findSearchTerm(searchTerm) {

    descriptionsArray.forEach(desc =>{
        if(searchTerm.includes(desc)){
            searchTerm = desc;
        }
    });

    console.log(searchTerm);
    return searchTerm;
}

// ?Function for search wiki that is asynchronous, meaning it will execute code whilst also waiting for an operation to complete
async function searchWiki(searchTerm){
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
    // ?Asynchronous function that waits till data is received, takes it in as a parameter and then executes a function that displays it
    let result = async(d) => {displayResults(d.query.search)};
    // ?Call function and feed in data as the parameter
    result(data);
}

// ?Function that displays the results of the wiki search, the parameter is an array
function displayResults(results){
    // ?Clear results container
    resultsContainer.innerHTML = '';
    // ?Set the text of the results count
    resultsCounter.textContent = `Results Count : ${results.length}`;
    // ?Create an element for each result and append them to the container
    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.className = 'result';
        resultElement.innerHTML = `
        
        <h3>${result.title}</h3>
        <p class="text-left">${result.snippet}</p>
        <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank">Read More</a>
        `;
        resultsContainer.appendChild(resultElement);    
    });
}



