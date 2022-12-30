export function getByCityName(value) {
    return require('axios').get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: value,
            units: 'metric',
            appid: '8257a26fa136769d0cee0bd2caa0a891'
        }
    }).then(((response) => response.data));
}