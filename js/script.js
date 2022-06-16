//step 1 :define all your html static selectors

//form selectors
let cityEl = document.querySelector("#city-input");
let cityFormEl = document.querySelector("#city-form");
let formBtn = document.querySelector("#search-btn");

// dashboard selectors
let cityHeaderEl = document.querySelector("#city-header");
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

let token = "46495279b19633c49705d934177ecf46";

// step 2: add functions for event listeners


// function handleFormSubmit(event) {
//     event.preventDefault();

//     let cityNameVal = cityEl.value;
//     let urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameVal}&appid=${token}&units=imperial`

//     fetch(urlCurrent)
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(currentData) {
//         console.log(currentData);
//     })
// }

function displayWeatherDash(event) {
    event.preventDefault()
    let cityNameVal = cityEl.value
    console.log(cityNameVal)
    let urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameVal}&appid=${token}&units=imperial`


    fetch(urlCurrent)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (currentData) {

            console.log(currentData)
            let fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${token}&units=imperial
            `
            fetch(fiveDayUrl)
                .then(function (response) {
                    return response.json()
                })
                .then(function (fiveData) {
                    console.log(fiveData)
                    // make this to its own call with its own paramters

                    let currentDate = moment.unix(currentData.dt).format("MM/DD/YYYY")
                    let iconImage = document.createElement("img")
                    iconImage.setAttribute("src", `http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`)
                    cityHeaderEl.innerHTML = currentData.name + " " + currentDate
                    cityHeaderEl.appendChild(iconImage)


                    cityTempEl.textContent = currentData.main.temp
                    cityWindEl.textContent = currentData.wind.speed
                    cityHumidityEl.textContent = currentData.main.humidity
                    cityIndexEl.textContent = fiveData.current.uvi         

                })
        })
}

function displayCurrentCity() {

}



// step 3: add Event listeners for proper selectors

cityFormEl.addEventListener("submit", displayWeatherDash);
// lookupListItemEl.addEventListener("click", displayCurrentCity);