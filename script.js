// Global Variables
var APIkey = "e0f4bb2289553f2e9e1f6cd083b37328"
var history = [];
// DOM element Variables
var cityInput = document.querySelector('#city-input');
var submitBtn = document.querySelector('#submit');
// var searchHistory = document.querySelector('#search-hist');
// var containerHist = document.querySelector('#hist-container')
// var enterBtn = document.querySelector('#enter');

//get current date in header using day.ja
var now = new Date();
$("#currentDay").text(now);
// Event listener for search button
submitBtn.addEventListener('click', function() {
    var cityName = cityInput.value

    if(cityName === "") {
        return
    } else {
        getCityWeather(cityName);
    }
    var dropCity = JSON.parse(localStorage.getItem('searched-city')) || [];
    dropCity.push(cityName);
    localStorage.setItem('searched-city', JSON.stringify(dropCity));

    function displayHistory() {
        var history = [];
        history.push(cityName)     

    $.each(history, function(index, value) {
        var button = document.createElement('button');

        button.innerHTML = value;
        
        document.getElementById("history-div").appendChild(button);
        
    });
    console.log(cityName)   
};
displayHistory();
});
// Ajax call for current weather info using Open Weather API
function getCityWeather(cityName) {
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}&units=imperial`;
    $.ajax({
        url: url,
        type: 'GET',
    }).then(function (res) {
        console.log('AJAX Response \n-------------');
        console.log(res);

        var currentWeather = res.list[0];
        var fiveDayWeather = res.list[1];
        

        showCurrent(currentWeather);
        showFiveDay(fiveDayWeather)
        
    });
// Current weather card to display info using template literals
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
};
// 5 day forecast weather card to display info using template literals
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

    $('#fiveDay').html(cardFive);
  };
  
}




// Issues:

// need for loop cardFive and loop weather dates for each
// timezone needs set - weather forecast is pulling weird times
// format cards, use day.js to format time, format buttons











// function fiveDayLoop(data) {
//     for (let i = 1; i < data.list.length; i += 8) {
//         var fiveForecast = data.list[i];
//         console.log(res);

        
//     }
// }
  



// submitBtn.addEventListener('click', function() {
//     var cityName = cityInput.value

//     if(cityName === "") {
//         return
//     } else {
//         getCityWeather(cityName);
//     }
//     var dropCity = JSON.parse(localStorage.getItem('searched-city')) || [];

//     dropCity.push(cityName);
//     localStorage.setItem('searched-city', JSON.stringify(dropCity));

//     console.log(cityName)
// });


// function getCoords(search) {
//     var url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}&units=imperial`;
  
//     fetch(url)
//       .then(function (res) {
//         return res.json();
//       })
//       .then(function (data) {
//         if (!data[0]) {
//           alert('Location not found');
//         } else {
//           appendToHistory(search);
//           fetchWeather(data[0]);
//         }
//       })
//       .catch(function (err) {
//         console.error(err);
//       });
//   }



   
// function weatherEvent() {
//     var enterBtn = document.querySelector('#enter');
    
//     enterBtn.addEventListener('keypress', function(event) {
//         if (event.key === "Enter") {
//             event.preventDefault();

//             document.getElementById('submitBtn').click();
//         }
//     });
// }