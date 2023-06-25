window.addEventListener('load', () => {
   navigator.geolocation.getCurrentPosition(currentLocation => {
      const API_Key = 'YOUR_API_KEY';
      const { latitude, longitude } = currentLocation.coords;
      fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${API_Key}&units=metric`).then(res => {
         return res.json();
      }).then(data => {
         return showWeather(data)
      })
   });
alert("Please use your own API from openweathermap.com");
});

const showWeather = data => {
   console.log(data)
   const {
      current: { temp, dew_point, dt, visibility, wind_speed, uvi, feels_like, humidity, sunrise, sunset, pressure }
   } = data;
   const desc = data.current.weather[0].main;
   const icon = data.current.weather[0].icon;
   document.getElementById('icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png"
   width='65' class="mx-auto my-1 d-block">`;
   document.getElementById('desc').textContent = desc;
   console.log(data);
   let humidityEls = document.querySelectorAll('#humidity')
   for (let i = 0; i < humidityEls.length; i++) {
      humidityEls[i].textContent += humidity + '%';
   }
   let windSpeedEls = document.querySelectorAll('#windSpeed')
   document.getElementById("currentTime").textContent += window.moment(dt * 1000).format("HH:mm a");
   document.getElementById("sunrise").textContent += window.moment(sunrise * 1000).format("HH:mm a");
   document.getElementById("sunset").textContent += window.moment(sunset * 1000).format("HH:mm a");
   for (let i = 0; i < windSpeedEls.length; i++) {
      windSpeedEls[i].textContent += wind_speed + ' Km/H';
   }
   document.getElementById('currentTemp').textContent = Math.round(temp) + '°C';
   document.getElementById('dewPoint').textContent += Math.round(dew_point) + '°C';
   document.getElementById('pressure').textContent += Math.round(pressure) + ' mb';
   document.getElementById('visibility').textContent += visibility;
   // document.getElementById('uvi').textContent += Math.round(uvi);
   const dailyForecast = data.daily;

   document.getElementById("currentDay").innerHTML = window.moment(dailyForecast[0].dt * 1000).format("ddd");
   document.getElementById("currentDayImg").innerHTML = `<img src="https://openweathermap.org/img/wn/${dailyForecast[0].weather[0].icon}@2x.png" width='65' class="mx-auto my-1 d-block">`
   document.getElementById("currentDayTimeTemp").innerHTML = Math.round(dailyForecast[0].temp.day) + '°C';
   document.getElementById("currentNightTimeTemp").innerHTML = Math.round(dailyForecast[0].temp.night) + '°C';
   document.getElementById("currentDayDesc").innerHTML = dailyForecast[0].weather[0].main;
   document.getElementById("currentDayHumidity").textContent = dailyForecast[0].humidity + "%";
   document.getElementById("currentDayWindSpeed").textContent = dailyForecast[0].wind_speed + "Km/H";
   document.getElementById("currentDayUvi").textContent = dailyForecast[0].uvi;
   let newDailyForecast = dailyForecast.slice(1, 8).map(d => {
      return `<div class="daily-data-box">
         <h4>${window.moment(d.dt * 1000).format("ddd")}</h4>
         <img src="https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png" width="70" alt="">
            <p class="fw-lighter fs-3" style="color: #fc5f1b">${Math.round(d.temp.day)}°C</p>
            <p class="fw-lighter fs-3">${Math.round(d.temp.night)}°C</p>
            <div>
               <h5>${d.weather[0].main}</h5>
               <ul class="wind-percip-container">
                  <li><i class="fa fa-umbrella"></i> <span id="humidity"> ${Math.round(d.humidity)}%</span></li>
                  <li><i class="fa fa-wind"></i> <span id="windSpeed"> ${Math.round(d.wind_speed)}Km/H</span></li>
               </ul>
            </div>

            <div>
               <h4>UVI</h4>
               <ul class="p-0 z">
                  <li>
                     <h4 id="uvi"> ${Math.round(d.uvi)}</h4>
                  </li>
               </ul>
            </div>
      </div>`;

   });
   const hourlyForecast = data.hourly;
   console.log(hourlyForecast)
   let newHourlyForecast = hourlyForecast.splice(1, 23).map(t => {
      return `<tr class="text-center">
      <td> ${window.moment(t.dt * 1000).format("hh:mm a")} </td>
      <td> ${Math.round(t.temp)}°C</td>
      <td> ${Math.round(t.feels_like)}°C</td>
      <td> ${Math.round(t.humidity)}%</td>
      <td> ${Math.round(t.dew_point)}°C</td>
      <td> ${t.weather[0].main}</td>
      <td> ${t.wind_speed} Km/H</td>
      <td> ${t.visibility}</td>
      </tr>
      `;
   });
   document.getElementById('dailyWeather').innerHTML += newDailyForecast;
   document.getElementById("hourlyDetails").innerHTML = newHourlyForecast;

}


window.addEventListener('load', () => {
   navigator.geolocation.getCurrentPosition(currentLocation => {
      const { latitude, longitude } = currentLocation.coords;
      fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`).then(
         res => { return res.json() }).then(
            data => { return showUserLocation(data) }
         )
   })
});

const showUserLocation = data => {
   let locationEl = document.getElementById("currentLocation");
   if (data.city === '') {
      locationEl.textContent += data.locality + ", " + data.countryName;
   } else {
      locationEl.textContent += data.city + ", " + data.countryName;
   }

}
