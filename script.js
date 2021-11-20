let cityName = document.querySelector('input');
let display = document.querySelector('h2');

cityName.addEventListener('keyup', (event) => {
	if (event.keyCode == 13) getWeather(cityName.value);
});
function getWeather(city) {
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cd6097fa38be54677f2d2cfeee13a869`
	)
		.then((response) => {
			return response.json();
		})
		.then((response) => {
			let kelvin = response['main']['temp'];
			let feelsLike = response['main']['feels_like'];

			let celcius = kelvin - 273.15;
			let fahrenheit = ((kelvin - 273.15) * 9) / 5 + 32;

			let rain, humidity, wind;

			display.innerHTML = Math.trunc(celcius) + '॰C <br>';
			display.innerHTML += Math.trunc(fahrenheit) + '॰F <br>';
		});
}
