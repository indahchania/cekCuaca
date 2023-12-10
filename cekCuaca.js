const request = require('postman-request');
const urlCuaca = 'http://api.weatherstack.com/current?access_key=5b2f085647c6a350b6d643510acc9048&query=-0.897065486272199,100.35082945356308&units=m';

request({ url: urlCuaca, json: true }, (error, response) => {
  if (error) {
    console.error('Unable to connect to weather service!');
  } else if (response.body.error) {
    console.error('Unable to find location. Try another search.');
  } else {
    const currentWeather = response.body.current;
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
