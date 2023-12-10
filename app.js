const request = require('postman-request');

const weatherURL = 'http://api.weatherstack.com/current?access_key=5b2f085647c6a350b6d643510acc9048&query=-0.897065486272199,100.35082945356308&units=m';
request({ url: weatherURL, json: true }, (weatherError, weatherResponse) => {
  if (weatherError) {
    console.error('Unable to connect to weather service!');
  } else if (weatherResponse.body.error) {
    console.error('Unable to find location. Try another search.');
  } else {
    const currentWeather = weatherResponse.body.current;
    const temperature = currentWeather.temperature;
    const precipitation = currentWeather.precip;

    // Menangani deskripsi cuaca sebagai array
    const weatherDescriptions = currentWeather.weather_descriptions;
    const weatherDescription = weatherDescriptions && weatherDescriptions.length > 0 ? weatherDescriptions[0] : 'unknown';

    console.log(`Saat ini suhu di luar mencapai ${temperature} derajat Celsius.`);
    console.log(`Kemungkinan terjadinya hujan adalah ${precipitation}%.`);
    console.log(`Deskripsi cuaca: ${weatherDescription}`);
  }
})

const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Padang.json?access_token=pk.eyJ1IjoiaW5kaGNoaCIsImEiOiJjbG9mOXdzbGQwamYwMmltcGN4eWQzaWd4In0.5ZkY64DD533Ce_v5_WIDuw&limit=1';
request({ url: geocodeURL, json: true }, (geocodeError, geocodeResponse) => {
  if (geocodeError) {
    console.error('Unable to connect to geocoding service!');
  } else if (geocodeResponse.body.features.length === 0) {
    console.error('Unable to find location. Try another search.');
  } else {
    const latitude = geocodeResponse.body.features[0].center[1];
    const longitude = geocodeResponse.body.features[0].center[0];
    const placeName = geocodeResponse.body.features[0].place_name;
    const placeType = geocodeResponse.body.features[0].place_type;

    console.log(`Koordinat lokasi: ${latitude}, ${longitude}`);
    console.log(`Nama tempat: ${placeName}`);
    console.log(`Tipe tempat: ${placeType}`);
  }
})