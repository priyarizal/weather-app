localStorage.cities = "[]"
var forecast = document.querySelector('#forecast')
// var latitude = document.getElementById('latitude')
// var longitude = document.getElementById('longitude')
var cityButtons = document.getElementById('cityButtons')
var buttons = document.getElementById('buttons')


let weather = {
    "apiKey": "53affe54eecd2fabe74b83062f1b1669"
}
// console.log(weather.apiKey)

var form = document.getElementById("form")

form.addEventListener("submit", getWeather)

function getWeather(event) {
    event.preventDefault()

    const inputValue = event.target[0].value

    getWeatherForCity(inputValue)
};


function getWeatherForCity(cityName) {

    // console.log(event.target[0].value)


    const userAction = async (inputValue) => {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputValue},,US&appid=${weather.apiKey}`)
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        console.log(myJson)

        // debugger

        var storedCities = JSON.parse(localStorage.cities);
        console.log(storedCities)

        if (storedCities.indexOf(inputValue) === -1) {

            //add new item to the front of the array
            storedCities.unshift(inputValue);

            // put it back into local storage
            localStorage.cities = JSON.stringify(storedCities);

            //create a new button for the new item
            var button = document.createElement('button');

            //display the new button under buttons which is in html
            buttons.insertAdjacentElement("afterend", button).innerText = storedCities.at(0)

            button.onclick = function () {
                userAction(storedCities.at(0))
                document.getElementById('searchbar').value = storedCities.at(0)
            }

        }

        // debugger
        if (storedCities.length > 5) {
            // the 6th item gotta go 
            storedCities.pop()

        }


        // latitude.innerHTML = myJson[0].lat
        // longitude.innerHTML = myJson[0].lon

        var lat = myJson[0].lat
        var lon = myJson[0].lon
        var cityname = myJson[0].name


        // debugger

        const weatherDataresponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${weather.apiKey}`)
        const weatherDataJson = await weatherDataresponse.json();

        var citynames = document.getElementById("citynames")
        citynames.innerText = cityname + "(" + moment.unix(weatherDataJson.current.dt).format('MMMM Do') + ")"

        // document.getElementById("date").innerText = moment.unix(weatherDataJson.current.dt).format('MMMM Do')

        var sunrise = document.getElementById('sunrise')
        var sunset = document.getElementById('sunset')
        var UVI = document.getElementById('uvi')
        var uvi_color = document.getElementById('uvi-color')
        var wind_speed = document.getElementById('wind-speed')
        var temp = document.getElementById('temp22')
        var humidity = document.getElementById('humidity22')

        debugger

        temp.innerHTML = weatherDataJson.current.temp
        humidity.innerHTML = weatherDataJson.current.humidity
        sunrise.innerHTML = moment.unix(weatherDataJson.current.sunrise).format('h:mm:ss a')
        sunset.innerHTML = moment.unix(weatherDataJson.current.sunset).format('h:mm:ss a')
        UVI.innerHTML = weatherDataJson.current.uvi
        uvi_color.style.color = "white"
        if (weatherDataJson.current.uvi <= 2) {
            uvi_color.style.backgroundColor = "green"

        } else if (weatherDataJson.current.uvi <= 7) {
            uvi_color.style.backgroundColor = "yellow"
        } else {
            uvi_color.style.backgroundColor = "red"
        }
        wind_speed.innerHTML = weatherDataJson.current.wind_speed


        for (i = 2; i < 7; i++) {
            // debugger

            var current = weatherDataJson.daily[i]

            // var newTag = document.createElement('div');

            console.log(weatherDataJson.daily[i])
            console.log(current.dt)
            console.log(current.humidity)
            console.log(current.temp.day)
            console.log(current.weather[0].icon)
            // debugger
            var date = document.getElementById('date' + (i - 2))
            date.innerText = moment.unix(current.dt).format('MMMM Do YYYY')

            var icon = current.weather[0].icon

            // debugger

            var iconDiv = document.getElementById('icon' + (i - 2))

            if (iconDiv) {
                iconDiv.src = `http://openweathermap.org/img/w/${icon}.png`
            } else {
                iconDiv = document.createElement('img')
                iconDiv.id = "icon" + (i - 2)
                iconDiv.src = `http://openweathermap.org/img/w/${icon}.png`
                date.insertAdjacentElement("afterend", iconDiv)
            }




            var temp = document.getElementById('temp' + (i - 2))
            temp.textContent = current.temp.day
            var humidity = document.getElementById('humidity' + (i - 2))
            humidity.textContent = current.humidity
            // newTag.appendChild(date)
            // newTag.appendChild(temp)
            // newTag.appendChild(humidity)
            // newTag.appendChild(icon)

            // sunset.insertAdjacentElement("afterbegin", newTag).innerHTML = moment.unix(weatherDataJson.daily[i].dt).format('MMMM Do YYYY')
            // forecast.appendChild(newTag)

        }
    }
    userAction(cityName)
}






// var key = "cities"
// var value = ["New York", "", ""]

//cleaner way to do the setitem/getitem
// localStorage.cities = JSON.stringify(value);
// var storedCities = JSON.parse(localStorage.cities);






