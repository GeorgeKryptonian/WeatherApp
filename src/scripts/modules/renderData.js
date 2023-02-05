import {domReferences} from './domReferences';
import clearDayImg from '@images/icons/weather/day/clear.svg';
import cloudsDayImg from '@images/icons/weather/day/clouds.svg';
import drizzleDayImg from '@images/icons/weather/day/drizzle.svg';
import rainDayImg from '@images/icons/weather/day/rain.svg';
import snowDayImg from '@images/icons/weather/day/snow.svg';
import thunderstormDayImg from '@images/icons/weather/day/thunderstorm.svg';
import clearNightImg from '@images/icons/weather/night/clear.svg';
import cloudsNightImg from '@images/icons/weather/night/clouds.svg';
import drizzleNightImg from '@images/icons/weather/night/drizzle.svg';
import rainNightImg from '@images/icons/weather/night/rain.svg';
import snowNightImg from '@images/icons/weather/night/snow.svg';
import thunderstormNightImg from '@images/icons/weather/night/thunderstorm.svg';
import atmosphereImg from '@images/icons/weather/atmosphere.svg';
import graphicDayImg from '@images/graphic_day.png';
import graphicNightImg from '@images/graphic_night.png';
const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);
const isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);

export function renderData(weatherData, forecastData) {
    let
        currentDate = dayjs(new Date()).add(weatherData.timezone - 3600, 'seconds'),
        sunriseTime = dayjs.unix(weatherData.sys.sunrise).add(weatherData.timezone - 3600, 'seconds'),
        sunsetTime = dayjs.unix(weatherData.sys.sunset).add(weatherData.timezone - 3600, 'seconds'),
        timeDiff = dayjs.duration(sunsetTime.diff(sunriseTime));
    //? Function to determine the weather image based on current time and weather value.
    const getWeatherImage = (weatherValue, checkTime = true) => {
        if (checkTime && !currentDate.isBetween(sunriseTime, sunsetTime)) {
            switch (weatherValue) {
                case 'Clear': return clearNightImg;
                case 'Clouds': return cloudsNightImg;
                case 'Drizzle': return drizzleNightImg;
                case 'Rain': return rainNightImg;
                case 'Thunderstorm': return thunderstormNightImg;
                case 'Snow': return snowNightImg;
                default: return atmosphereImg;
            }
        } else {
            switch (weatherValue) {
                case 'Clear': return clearDayImg;
                case 'Clouds': return cloudsDayImg;
                case 'Drizzle': return drizzleDayImg;
                case 'Rain': return rainDayImg;
                case 'Thunderstorm': return thunderstormDayImg;
                case 'Snow': return snowDayImg;
                default: return atmosphereImg;
            }
        }
    }

    //? Render main weather data.
    (function () {
        this.weatherImage.src = getWeatherImage(weatherData.weather[0].main);
        this.weatherValue.innerText = weatherData.weather[0].main;
        this.temp.innerText = Math.round(weatherData.main.temp);
        this.tempMax.innerText = `${Math.ceil(weatherData.main.temp_max)}°C`;
        this.tempMin.innerText = `${Math.floor(weatherData.main.temp_min)}°C`;
        this.favicon.href = domReferences.current.main.weatherImage.src;
    }).call(domReferences.current.main);

    //? Render detailed weather data.
    (function () {
        this.humidity.innerText = `${weatherData.main.humidity} %`;
        this.pressure.innerText = `${weatherData.main.pressure} mBar`;
        this.wind.innerText = `${Math.round(weatherData.wind.speed)} km/h`;
        this.sunrise.innerText = sunriseTime.format('HH:mm');
        this.sunset.innerText = sunsetTime.format('HH:mm');
        this.daytime.innerText = `${timeDiff.hours()}h ${(timeDiff.minutes() !== 0) ? `${timeDiff.minutes()}m` : ''}`;
    }).call(domReferences.current.details);

    //? Render forecasted weather data.
    (function () {
        for (const nDay in this) {
            this[nDay].weatherImage.src = getWeatherImage(forecastData[nDay].mainWeather, false);
            this[nDay].date.innerText = `${forecastData[nDay].dayOfTheWeek}, ${forecastData[nDay].dayOfTheMonth}`;
            this[nDay].tempMax.innerText = `${forecastData[nDay].tempMax}°C`;
            this[nDay].tempMin.innerText = `${forecastData[nDay].tempMin}°C`;
        }
    }).call(domReferences.forecast);

    //? Render other data.
    (function () {
        (function () {
            this.parentElement.classList.remove(...(currentDate.isBetween(sunriseTime, sunsetTime)) ? ['from-[#33284B_0%]', 'to-[#111520]'] : []);
            this.parentElement.classList.add(...(!currentDate.isBetween(sunriseTime, sunsetTime)) ? ['from-[#33284B_0%]', 'to-[#111520]'] : []);
            this.src = (currentDate.isBetween(sunriseTime, sunsetTime)) ? graphicDayImg : graphicNightImg;
        }).call(this.timeOfDayImage);
        (function () {
            this.parentElement.classList.remove('pt-2', 'px-2');
            this.classList.remove('w-full', 'h-10', 'text-black', 'bg-[#F3F3F3]', 'bg-[url(assets/images/icons/blackMarker.svg)]', 'rounded-t-[18px]', 'rounded-b-[9px]');
            this.classList.add('w-full', 'h-12', 'text-[#0DA0EA]', 'bg-[#0D9FEA14]', 'bg-[url(assets/images/icons/blueMarker.svg)]', 'rounded-tr-3xl', 'rounded-bl-3xl', 'cursor-pointer');
            this.type = 'button';
            this.value = `${weatherData.name}, ${weatherData.sys.country}`;
        }).call(this.locationInput);
        (function () {
            this.innerText = currentDate.format('dddd, D MMMM YYYY | HH:mm');
            this.classList.remove('hidden');
        }).call(this.dateAndTime);
    }).call(domReferences.other);
}