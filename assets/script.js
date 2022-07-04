
let weather = {
    "apiKey": "53affe54eecd2fabe74b83062f1b1669"
}
// console.log(weather.apiKey)

var form = document.getElementById("form")

form.addEventListener("submit", getGeoLocation)

function getGeoLocation(event) {
    event.preventDefault()

    console.log(event.target[0].value)

    const inputValue = event.target[0].value
    const userAction = async () => {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inputValue},,US&appid=${weather.apiKey}`)
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        console.log(myJson)

        debugger

        var storedCities = JSON.parse(localStorage.cities);
        storedCities.push(inputValue)
        localStorage.cities = JSON.stringify(storedCities);

        displayStoredCities()

        var latitude = document.getElementById('latitude')
        var longitude = document.getElementById('longitude')

        latitude.innerHTML = myJson[0].lat
        longitude.innerHTML = myJson[0].lon

        var lat = myJson[0].lat
        var lon = myJson[0].lon
        // debugger

        const weatherDataresponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weather.apiKey}`)
        const weatherDataJson = await weatherDataresponse.json();

        var sunrise = document.getElementById('sunrise')
        var sunset = document.getElementById('sunset')
        var UVI = document.getElementById('uvi')
        console.log

        sunrise.innerHTML = weatherDataJson.current.sunrise
        for (i = 0; i < 5; i++) {
            // debugger

            var newTag = document.createElement('p');
            console.log(weatherDataJson.daily[i])

            sunset.insertAdjacentElement("afterbegin", newTag).innerHTML = moment.unix(weatherDataJson.daily[i].dt).format('MMMM Do YYYY')

        }

    }
    userAction()
};

var cityButtons = document.getElementById('cityButtons')
var buttons = document.getElementById('buttons')

function displayStoredCities() {
    var storedCities = JSON.parse(localStorage.cities);

    for (i = 0; i < storedCities.length; i++) {
        var button = document.createElement('button');
        buttons.insertAdjacentElement("afterend", button).innerText = storedCities[i]

    }
};

var key = "cities"
var value = ["New York", "Harrisburg", "Philadelphia"]

//cleaner way to do the setitem/getitem
localStorage.cities = JSON.stringify(value);
var storedCities = JSON.parse(localStorage.cities);

displayStoredCities()



// function 


// $.ajax({
//     url: requestUrl,
//     method: 'GET',
//   }).then(function (response) {
//     console.log('Ajax Reponse \n-------------');
//     console.log(response);
//   });
