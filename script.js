// Function to fetch and display the current image of the day
function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    const apiKey = 'yUgZJSXpBq7iUrDGZWNU4dXvcdJT3caHum3o1dTV';

    fetch(`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${apiKey} `)
        .then(response => response.json())
        .then(data => {
            const currentImageContainer = document.getElementById('current-image-container');
            currentImageContainer.innerHTML = `
                <img src="${data.url}" alt="${data.title}">
                <h2>${data.title}</h2>
                <p>${data.explanation}</p>
            `;
        })
        .catch(error => console.error(error));
}

// Function to fetch and display the image for a selected date
function getImageOfTheDay(date) {
    const apiKey = 'yUgZJSXpBq7iUrDGZWNU4dXvcdJT3caHum3o1dTV';

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`)
        .then(response => response.json())
        .then(data => {
            const currentImageContainer = document.getElementById('current-image-container');
            currentImageContainer.innerHTML = `
                <img src="${data.url}" alt="${data.title}">
                <h2>${data.title}</h2>
                <p>${data.explanation}</p>
            `;
            saveSearch(date);
        })
        .catch(error => console.error(error));
}

// Function to save a search date to local storage
function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
    addSearchToHistory(date);
}

// Function to add a search date to the search history
function addSearchToHistory(date) {
    const searchHistory = document.getElementById('search-history');
    const searchItem = document.createElement('li');
    searchItem.textContent = date;
    searchItem.addEventListener('click', () => {
        getImageOfTheDay(date);
    });

    searchHistory.appendChild(searchItem);
}

// Event listener for the search form submission
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
    const selectedDate = searchInput.value;

    if (selectedDate) {
        getImageOfTheDay(selectedDate);
    }
});
getCurrentImageOfTheDay();