let city = document.querySelector('input');

// DOM
const displayCity = document.querySelector('.weather-info > .city-name');
const displayTemp = document.querySelector('.weather-info > .temp');
const displayFeelsLike = document.querySelector('.weather-info > .feels-like');
const displayCloud = document.querySelector('.weather-info > .cloud');
const displayHumidity = document.querySelector('.weather-info > .humidity');
const displayVisibility = document.querySelector('.weather-info > .visibility');

city.addEventListener('keyup', (event) => {
	if (event.key === 'Enter') getWeather(city.value);
});
function getWeather(city) {
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cd6097fa38be54677f2d2cfeee13a869`;
	fetch(apiUrl, { mode: 'cors' })
		.then((response) => {
			return response.json();
		})
		.then((response) => {
			console.log(response);
			let currentTime;
			let city = response['name'];
			let country = response['sys']['country'];
			let kelvin = response['main']['temp']; // temperature in kelvin
			let feelsLike = response['main']['feels_like'];
			let humidity = response['main']['humidity'];
			let cloud = response['clouds']['all'];
			let visibility = response['visibility'];

			// convert temperature to celcius(and fehrenheit)
			let celcius = kelvin - 273.15;
			let fahrenheit = ((kelvin - 273.15) * 9) / 5 + 32;
			fahrenheit = Math.trunc(fahrenheit) + '॰F';

			// visibility Meter to KM
			visibility = visibility / 1000;

			displayCity.textContent = city + ', ' + country;

			displayTemp.textContent = Math.trunc(celcius) + '॰C';

			displayFeelsLike.textContent = 'Feels Like ' + feelsLike; // convert to celcius
			displayCloud.textContent = 'Cloudiness: ' + cloud + '%';
			displayHumidity.textContent = 'Humidity: ' + humidity + '%';
			displayVisibility.textContent = 'Visibility: ' + visibility + 'KM';
		})
		.catch((error) => {
			console.log(error);
			let errorMsg = document.querySelector('.error-msg');
			errorMsg.textContent = "sorry, we can't find " + city;
		});
}
