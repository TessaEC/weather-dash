var APIkey = "e0f4bb2289553f2e9e1f6cd083b37328"
// DOM elements
var cityInput = document.querySelector('#city-input');

var submitBtn = document.querySelector('#submit');
var searchHistory = document.querySelector('#search-hist');
var enterBtn = document.querySelector('#enter');

//get current date and top in header
var now = new Date();
$("#currentDay").text(now);
//search history/local storage
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);
//clear search history

// ajax call
function getCityWeather(cityName) {
    var urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}&units=imperial`;
    $.ajax({
        url: urlCurrent,
        type: 'GET',
    }).then(function (res) {
        console.log('AJAX Response \n-------------');
        console.log(res);

        var currentWeather = res;
        

        showCurrent(currentWeather);
        
    })

function showCurrent(data) {
    var cardCurrent =`
    <div class="row">
    <div class="card">
        <div class="card-body">
            <h2>Current Weather for: ${cityName}</h2>
          <p>Temp: ${data.main.temp} °F</p>
          <p>Humidity: ${data.main.humidity} %</p>
          <p>Wind: ${data.wind.speed} MPH</p>
        </div>
      </div>
    </div>`
    $("#showCurrent").html(cardCurrent)
}
   
    var urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}&units=imperial`;
    $.ajax({
        url: urlForecast,
        type: 'GET',
    }).then(function (res) {
        console.log('AJAX Response \n-------------');
        console.log(res);
  
    var futureWeather = res.list[0];

    showFiveDay(futureWeather);
    });

// display 5 day forecast for searched city
function showFiveDay(data) {
    var cardFive = `
    <div class="row">
    <div class="card">
            <div class="card-body">
                <h3 class="card-title">${data.dt_txt}</h3>
                    <div class="card-text">
                      <p>Temp: ${data.main.temp} °F</p>
                      <p>Humidity: ${data.main.humidity} %</p>
                      <p>Wind: ${data.wind.speed} MPH</p>
                    </div>
            </div>
    </div>
    </div>`

    $('#fiveDay').html(cardFive)
    }
}

submitBtn.addEventListener('click', function() {
    var cityName = cityInput.value

    if(cityName === "") {
        return
    } else {
        getCityWeather(cityName);
    }
});

// function forecastLoop(dailyForecast) {

// }

// function fiveDayLoop {
//     for (let i = 0; i < data.list.length; i += 8) {
//         const fiveForecast = data.list[i];
//         console.log(fiveForecast)
//     }
// }

// function weatherEvent() {
//     var enterBtn = document.querySelector('#enter');
    
//     enterBtn.addEventListener('keypress', function(event) {
//         if (event.key === "Enter") {
//             event.preventDefault();

//             document.getElementById('submitBtn').click();
//         }
//     });
// }







//click handlers


// just incase ...

// var urlWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}`;
// fetch(urlWeather)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         showCurrent;
//     })

// function getCityWeather(citySearch) {
    //  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + citySearch + '&appid=' + APIkey)
    // .then(function(resp) {return resp.json() })
    // .then(function(data) {
    //     console.log(data);
    // })
    // .catch(function() {
    
    // })
    // }
    
    // window.onload = function() {
    //     getCityWeather(showCurrent);

 
    // function getCityWeather(cityName) {
    //     var currentWeather = response.list;
    //     var url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}&units=imperial`
    //     fetch(url)
    //     .then(function (res) {
    //         return res.json()
    //     })
    //     .then(function (data) {
    //         showCurrent(currentWeather)
    //     })
        
    // }