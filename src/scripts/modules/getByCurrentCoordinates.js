import {getNextFourDays} from "./getNextFourDays";

//? Makes API call to OpenWeatherMap with specified type (forecast or weather) and user's current coordinates, and returns either next four days' forecast or current weather data.
export function getByCurrentCoordinates(type, latitude, longitude) {
    return require('axios').get(`https://api.openweathermap.org/data/2.5/${type}`, {
        params: {
            lat: latitude,
            lon: longitude,
            cnt: 40,
            units: 'metric',
            appid: '8257a26fa136769d0cee0bd2caa0a891'
        }
    }).then(((response) => (type === 'forecast') ? getNextFourDays(response.data) : response.data));
}