let city = document.querySelector('input');
let errorMsg = document.querySelector('.error-msg');

let loader = document.querySelector('.loader');

// display dom
const displayCity = document.querySelector('.weather-info > .city-name');
const displayTime = document.querySelector('.weather-info > .time');
const displayIcon = document.querySelector('.weather-info > .temp > img');
const displayTemp = document.querySelector('.weather-info > .temp > span');

const displayFeelsLike = document.querySelector('.weather-info > .feels-like');
const displayCloud = document.querySelector('.weather-info > .cloud');
const displayHumidity = document.querySelector('.weather-info > .humidity');
const displayVisibility = document.querySelector('.weather-info > .visibility');

city.addEventListener('keyup', (event) => {
	if (event.key === 'Enter') {
		if (city.value == '') errorMsg.textContent = 'please fill this field';
		else getWeather(city.value);
	}
});
function getWeather(city) {
	loader.classList.remove('hide');
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cd6097fa38be54677f2d2cfeee13a869`;
	fetch(apiUrl, { mode: 'cors' })
		.then((response) => {
			return response.json();
		})
		.then((response) => {
			errorMsg.textContent = '';
			console.log(response);

			let city = response['name'];
			let timeZone = response['timezone'];
			let country = response['sys']['country'];
			let kelvin = response['main']['temp']; // temperature in kelvin
			let feelsLike = response['main']['feels_like'];
			let description = response['weather'][0]['description'];
			let icon = response['weather'][0]['icon'];
			let humidity = response['main']['humidity'];
			let cloud = response['clouds']['all'];
			let visibility = response['visibility'];

			let lon = response['coord']['lon'];
			let lat = response['coord']['lat'];

			// convert kelvin to celcius
			let celcius = kelvin - 273.15;
			feelsLike = feelsLike - 273.15;

			// visibility Meter to KM
			visibility = visibility / 1000;

			let place = { city, country };
			let temp = { celcius, feelsLike, description, icon };

			// display weather info
			getTime(timeZone);
			displayDom(place, temp, cloud, humidity, visibility);

			// dispay map
			getMap(lon, lat);
			loader.classList.add('hide');
		})
		.catch((error) => {
			console.log(error.message);

			if (error.message.includes('NetworkError'))
				errorMsg.textContent = 'please, connect to the network';
			else errorMsg.textContent = "sorry, we can't find " + city;

			loader.classList.add('hide');
		});
}

/* display function  */

function displayDom(place, temp, cloud, humidity, visibility) {
	displayCity.textContent = place.city + ', ' + place.country;

	displayTemp.textContent = Math.trunc(temp.celcius) + '॰C';

	displayIcon.setAttribute(
		'src',
		`http://openweathermap.org/img/wn/${temp.icon}.png`
	);

	displayFeelsLike.textContent =
		'Feels Like ' + Math.trunc(temp.feelsLike) + '॰C' + ', ' + temp.description;
	displayCloud.textContent = 'Cloudiness: ' + cloud + '%';
	displayHumidity.textContent = 'Humidity: ' + humidity + '%';
	displayVisibility.textContent = 'Visibility: ' + visibility + 'KM';
}

getWeather('erigavo');

/* get city time */

let daysInWords = {
	0: 'Sun',
	1: 'Mon',
	2: 'Tue',
	3: 'Wed',
	4: 'Thu',
	5: 'Fri',
	6: 'Sat',
};

let monthsInWords = {
	0: 'Jan',
	1: 'Fab',
	2: 'Mar',
	3: 'Apr',
	4: 'May',
	5: 'Jun',
	6: 'Jul',
	7: 'Aug',
	8: 'Sep',
	9: 'Oct',
	10: 'Nov',
	11: 'Dec',
};

function getTime(timeZone) {
	let time = new Date();
	time.setSeconds(time.getSeconds() + timeZone);
	let day = time.getUTCDay();
	let date = time.getUTCDate();
	let month = time.getUTCMonth();
	let hours = time.getUTCHours();
	let minutes = time.getUTCMinutes();

	time = `${daysInWords[day]} ${date}-${monthsInWords[month]} ${hours}:${minutes}`;
	displayTime.textContent = time;
}

/* get city map */

function getMap(lon, lat) {
	mapboxgl.accessToken =
		'pk.eyJ1IjoieGJkaXJpc3hrIiwiYSI6ImNrd2JsaGh6MjBia28zMW4yMnFzMXA4YmQifQ.-XkNybP6MygNea6Db-yqqg';
	const map = new mapboxgl.Map({
		container: 'map', // container ID
		style: 'mapbox://styles/mapbox/streets-v11', // style URL
		center: [lon, lat], // starting position [lng, lat]
		zoom: 11, // starting zoom
	});
}
