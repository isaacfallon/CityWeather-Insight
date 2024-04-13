// Wikipedia API logic here

// ?Get HTML DOM references
const form = document.querySelector('.search-box');
const input = document.querySelector('#search-term');
const resultsContainer = document.querySelector('.results');
const resultsCounter = document.querySelector('#counter');

// ?'Submit' listener for text box - executes search function
form.addEventListener('submit', function (event){
    event.preventDefault();
    // ?Store input value
    const searchTerm = input.value;
    // ?Check if input is empty and then execute function
    if(searchTerm){
        searchWiki(searchTerm);
    }
});

// ?Function for search wiki that is asynchronous, meaning it will execute code whilst also waiting for an operation to complete
async function searchWiki(searchTerm){
    // ?Get Wiki API and set query parameters
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${encodeURIComponent(searchTerm)}`;
    
    // ?Fetch/then method of storing response from API, using arrow functions
    // fetch(url).then(response => response.json()).then
    // (data =>{
    //     displayResults(data.query.search);
    // }).catch(error => alert('Error : ' + error));

    // ?Store fetch URL and await for response
    let response = await fetch(url);
    // ?Store data as JSON when response is received
    let data = await response.json();
    // ?Asynchronous function that waits till data is received, takes it in as a parameter and then executes a function that displays it
    let result = async(d) => {displayResults(d.query.search)};
    // ?Return error if invalid input
    result.catch(error => alert('Error : ' + error));
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
        resultElement.class = 'result';
        resultElement.innerHTML = `
        
        <h3>${result.title}</h3>
        <p>${result.snippet}</p>
        <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank">Read More</a>
        `;
        resultsContainer.appendChild(resultElement);    
    });
}



