function update_Time() {
  let LAElement = document.querySelector("#LA");
  if (LAElement) {
    let LADateElement = LAElement.querySelector(".date");
    let LATimeElement = LAElement.querySelector(".time");
    let LATime = moment().tz("America/Los_Angeles");

    LADateElement.innerHTML = LATime.format("MMMM Do YYYY");
    LATimeElement.innerHTML = LATime.format("h:mm:ss [<small>]A[</small>]");
  }

  let SYDElement = document.querySelector("#SYD");
  if (SYDElement) {
    let SYDDateElement = SYDElement.querySelector(".date");
    let SYDTimeElement = SYDElement.querySelector(".time");
    let SYDTime = moment().tz("Australia/Sydney");

    SYDDateElement.innerHTML = SYDTime.format("MMMM Do YYYY");
    SYDTimeElement.innerHTML = SYDTime.format("h:mm:ss [<small>]A[</small>]");
  }
}

function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }
  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");
  citiesElement.innerHTML = `
  <div class="city">
    <div>
      <h2>${cityName}</h2>
      <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
    </div>
    <div class="time">${cityTime.format("h:mm:ss")} <small>${cityTime.format(
    "A"
  )}</small></div>
  </div>
  <a href="#" id="all-cities">All cities</a>
  `;

  let allCitiesLink = document.querySelector("#all-cities");
  allCitiesLink.addEventListener("click", function (e) {
    e.preventDefault();
    resetCities();
  });
}

function resetCities() {
  let citiesElement = document.querySelector("#cities");
  citiesElement.innerHTML = `
    <div class="city" id="LA">
      <div>
        <h2>Los Angeles</h2>
        <div class="date"></div>
      </div>
      <div class="time"></div>
    </div>
    <div class="city" id="SYD">
      <div>
        <h2>Sydney</h2>
        <div class="date"></div>
      </div>
      <div class="time"></div>
    </div>
  `;
  update_Time();
}

update_Time();
setInterval(update_Time, 1000);

let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);
