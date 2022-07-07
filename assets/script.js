localStorage.cities = "[]"
var forecast = document.querySelector('#forecast')
var latitude = document.getElementById('latitude')
var longitude = document.getElementById('longitude')
var cityButtons = document.getElementById('cityButtons')
var buttons = document.getElementById('buttons')


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

        // debugger

        var storedCities = JSON.parse(localStorage.cities);
        console.log(storedCities)
        storedCities.unshift(inputValue);
        console.log(storedCities)
        console.log(storedCities)
        localStorage.cities = JSON.stringify(storedCities);
        // debugger
        if (storedCities.length > 5) {
            // the 6th item gotta go 
            storedCities.pop()

        }

        var button = document.createElement('button');
        buttons.insertAdjacentElement("afterend", button).innerText = storedCities.at(0)
        console.log(button)

        document.addEventListener("click", button)



        // displayStoredCities()



        latitude.innerHTML = myJson[0].lat
        longitude.innerHTML = myJson[0].lon

        var lat = myJson[0].lat
        var lon = myJson[0].lon
        var cityname = myJson[0].name
        var citynames = document.getElementById("citynames")
        citynames.innerText = cityname
        // debugger

        const weatherDataresponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${weather.apiKey}`)
        const weatherDataJson = await weatherDataresponse.json();

        var sunrise = document.getElementById('sunrise')
        var sunset = document.getElementById('sunset')
        var UVI = document.getElementById('uvi')
        console.log

        sunrise.innerHTML = weatherDataJson.current.sunrise
        for (i = 0; i < 5; i++) {
            // debugger

            var current = weatherDataJson.daily[i]

            // var newTag = document.createElement('div');

            console.log(weatherDataJson.daily[i])
            console.log(current.dt)
            console.log(current.humidity)
            console.log(current.temp.day)
            console.log(current.weather[0].icon)
            // debugger
            var date = document.getElementById('date' + i)
            date.innerText = moment.unix(current.dt).format('MMMM Do YYYY')

            var icon = current.weather[0].icon

            // debugger

            var iconDiv = document.getElementById('icon' + i)

            if (iconDiv) {
                iconDiv.src = `http://openweathermap.org/img/w/${icon}.png`
            } else {
                iconDiv = document.createElement('img')
                iconDiv.id = "icon" + i
                iconDiv.src = `http://openweathermap.org/img/w/${icon}.png`
                date.insertAdjacentElement("afterend", iconDiv)
            }




            var temp = document.getElementById('temp' + i)
            temp.textContent = current.temp.day
            var humidity = document.getElementById('humidity' + i)
            humidity.textContent = current.humidity
            // newTag.appendChild(date)
            // newTag.appendChild(temp)
            // newTag.appendChild(humidity)
            // newTag.appendChild(icon)

            // sunset.insertAdjacentElement("afterbegin", newTag).innerHTML = moment.unix(weatherDataJson.daily[i].dt).format('MMMM Do YYYY')
            // forecast.appendChild(newTag)

        }
    }
    userAction()
};





// var key = "cities"
// var value = ["New York", "", ""]

//cleaner way to do the setitem/getitem
// localStorage.cities = JSON.stringify(value);
// var storedCities = JSON.parse(localStorage.cities);






