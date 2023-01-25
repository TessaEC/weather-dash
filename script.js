// Global Variables
var APIkey = "e0f4bb2289553f2e9e1f6cd083b37328"
var history = [];
var cityInput = document.querySelector('#city-input');
var submitBtn = document.querySelector('#submit');

//get current date in header using dayjs
var now = new Date();
$("#currentDay").text(dayjs(now).format('dddd, MMMM DD, YYYY h:mm A'));

// Event listener for search button
submitBtn.addEventListener('click', function() {
    var cityName = cityInput.value
        if(cityName === "") {
            return;
        } else {
            getCityWeather(cityName);
        }
        var dropCity = JSON.parse(localStorage.getItem('searched-city')) || [];
            if (!dropCity.includes(cityName)) {
                dropCity.push(cityName);
            }

localStorage.setItem('searched-city', JSON.stringify(dropCity));

displayHistory();

});

// displays searched city as buttons from local storage
function displayHistory() {
    var history = JSON.parse(localStorage.getItem('searched-city')) || []; 
  
$.each(history, function(index, value) {
    var button = document.createElement('button');
    button.innerHTML = value;        
   
    button.addEventListener('click', function(){
    getCityWeather(value);
});

    document.getElementById("history-div").appendChild(button);
});
}

$('#submit').submit(function(){
    $('#submit', this).attr('disabled', 'disabled');
 })
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

        showCurrent(currentWeather);
        showFiveDay(res)
        
    });
// Current weather card to display info using template literals
function showCurrent(data) {
    var cardCurrent =`
    <div class="column">
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
 var cardFive = ""
    // loop card for each day of 5-day forecast
    for (var i = 0; i < data.list.length; i ++) {
        if (i % 8 === 0) {
            var currentDay  = data.list[i] 
        cardFive += `
        <div class="row">
        <div class="card">
                <div class="card-body">
                    <h3 class="card-title">${dayjs(currentDay.dt_txt).format('ddd. MMM. DD, YYYY')}</h3>
                        <div class="card-text">
                          <p>Temp: ${currentDay.main.temp} °F</p>
                          <p>Humidity: ${currentDay.main.humidity} %</p>
                          <p>Wind: ${currentDay.wind.speed} MPH</p>
                        </div>
                </div>
        </div>
        </div>`
        }
    }    
        $('#fiveDay').html(cardFive);
  };    
};

displayHistory();