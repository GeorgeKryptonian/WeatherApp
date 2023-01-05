import {getNextFourDays} from "./getNextFourDays";

//? Makes API call to OpenWeatherMap with specified type (forecast or weather) and city name, and returns either next four days' forecast or current weather data.
export function getByCityName(type, value) {
    return require('axios').get(`https://api.openweathermap.org/data/2.5/${type}`, {
        params: {
            q: value,
            cnt: 40,
            units: 'metric',
            appid: '8257a26fa136769d0cee0bd2caa0a891'
        }
    }).then(((response) => (type === 'forecast') ? getNextFourDays(response.data) : response.data));
}