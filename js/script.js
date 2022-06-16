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
let forcastDatesEl = document.querySelectorAll(".date");
let forcastTempsEl = document.querySelectorAll(".temp");
let forcastWindEl = document.querySelectorAll(".wind");
let forcastHumidityEl = document.querySelectorAll(".humidity");

// list selectors
let lookupListEl = document.querySelector(".list-group");
let lookupListItemEl = document.querySelectorAll(".list-group-item");

let token = "46495279b19633c49705d934177ecf46";

let currentInput = localStorage.getItem("city-input");

// function declarations

// 1 of 2 functions used in saveAndDisplay: displays the main dashboard for current user input
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
                    
                    
                    for (let i = 0; i < 5; i++) {

                        let forcastDate = moment.unix(fiveData.daily[i].dt).format("MM/DD/YYYY")
                        let currentImgEl = document.createElement("img")
                        let currentTemp = fiveData.daily[i].temp.day
                        let currentWind = fiveData.daily[i].wind_speed
                        let currentHumiditiy = fiveData.daily[i].humidity

                        forcastDatesEl[i].innerHTML = forcastDate
                        currentImgEl.setAttribute("src", `http://openweathermap.org/img/wn/${fiveData.daily[i].weather[0].icon}@2x.png`)
                        forcastDatesEl[i].appendChild(currentImgEl)
                        
                        forcastTempsEl[i].textContent = currentTemp
                        forcastWindEl[i].textContent = currentWind
                        forcastHumidityEl[i].textContent = currentHumiditiy
                    }
                    
                    
                })
        })
}

// 2 of 2 functions used for saveAndDisplay(): handles the local storage and list addition based on input
function saveAndDisplayInput (event) {
    event.preventDefault()
    localStorage.setItem("city-input", cityEl.value)
    let listItemAdd = document.createElement("li")
    listItemAdd.setAttribute("class", "list-group-item")
    listItemAdd.textContent = localStorage.getItem("city-input")

    lookupListEl.appendChild(listItemAdd)
}

// function used in add event listener for form submit
function saveAndDisplay(event) {
    displayWeatherDash(event);
    saveAndDisplayInput(event);
}



// step 3: add Event listeners for proper selectors

cityFormEl.addEventListener("submit", saveAndDisplay);
