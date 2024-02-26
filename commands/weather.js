const https = require('https');

function fetchWeatherData(callback) {
    const baseUrl = 'https://api.open-meteo.com/v1/forecast';
    const queryParams = new URLSearchParams({
      latitude: '50.8198',
      longitude: '1.0880',
      current: 'temperature_2m,wind_speed_10m',
    });
  
    const url = `${baseUrl}?${queryParams.toString()}`;
  
    https.get(url, (res) => {
      let data = '';
  
      res.on('data', (chunk) => {
        data += chunk;
      });
  
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          callback(null, parsedData);
        } catch (e) {
          callback(e, null);
        }
      });
    }).on('error', (err) => {
      callback(err, null);
    });
  }

module.exports = {
    name: 'weather',
    description: 'Replies with the weather information in Portsmouth',
    async execute(message, args) {
        fetchWeatherData((err, data) => {
            if (err) {
                console.error('Error fetching weather data:', err);
                message.reply("Error fetching weather data")
            } else {
                console.log('Weather data:', data);
                message.reply(`Weather for Portsmouth:
Temperature: ${data.current.temperature_2m}${data.current_units.temperature_2m}
Wind speed: ${data.current.wind_speed_10m}${data.current_units.wind_speed_10m}`)
            }
        });
    },
};