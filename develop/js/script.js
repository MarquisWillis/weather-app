//step 1 :define all your html static selectors

//form selectors
let cityEl = document.querySelector("#city-input");
let cityFormEl = document.querySelector("#city-form");
let formBtn = document.querySelector("#search-btn");

// card selectors
let cityNameEl = document.querySelector("#city-name");
let currentDateEl = document.querySelector("#current-date");
let weatherIconEl = document.querySelector("#weather-icon");
let cityTempEl = document.querySelector("#city-temp");
let cityWindEl = document.querySelector("#city-wind");
let cityHumidityEl = document.querySelector("#city-humidity");
let cityIndexEl = document.querySelector("#city-index");

// forcast selectors
let forcastDatesEl = document.querySelectorAll("#date");
let forcastTempsEl = document.querySelectorAll("#temp");
let forcastWindEl = document.querySelectorAll("#wind");
let forcastHumidityEl = document.querySelectorAll("#humidity");

// list selectors
let lookupListEl = document.querySelector(".list-group");
let lookupListItemEl = document.querySelectorAll(".list-group-item");



// step 2: add functions for event listeners


function handleFormSubmit(event) {
    event.preventDefault();
}

function displayCurrentCity() {

}



// step 3: add Event listeners for proper selectors

formBtn.addEventListener("submit", handleFormSubmit);
lookupListItemEl.addEventListener("click", displayCurrentCity);