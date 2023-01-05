export function getNextFourDays(forecastData) {
    //? Filter forecastData to exclude any data for the current day.
    const filteredData = forecastData.list.filter((element) => new Date().getDate() !== new Date(element.dt * 1000).getDate());
    //? Generates forecast object containing information about weather for a given day.
    const genForecastObject = (arrayOfDays) => {
        //? Initialize empty lists to store weather, temp_max, and temp_min data.
        const forecastDataLists = {
            weatherList: [],
            tempMaxList: [],
            tempMinList: []
        };
        //? Helper function to determine main weather based on distribution of all weather data.
        const mainWeatherDetection = (weatherList) => {
            //? Initialize object to store weather data frequency distribution.
            const weatherDistribution = {};
            //? This function increases the frequency of each type of weather in the 'weatherDistribution' object.
            weatherList.forEach((propertyKey) => (weatherDistribution.hasOwnProperty(propertyKey)) ? weatherDistribution[propertyKey]++ : weatherDistribution[propertyKey] = 1);
            //? Find maximum weather frequency.
            const maxWeatherFrequency = Math.max(...Object.values(weatherDistribution));
            //? Return weather with maximum frequency.
            return Object.keys(weatherDistribution).find((value) => weatherDistribution[value] === maxWeatherFrequency);
        };
        //? Populate forecastDataLists with data from arrayOfDays.
        arrayOfDays.forEach((element) => {
            forecastDataLists.weatherList.push(element.weather[0].main);
            forecastDataLists.tempMaxList.push(element.main.temp_max);
            forecastDataLists.tempMinList.push(element.main.temp_min);
        });
        //? Return forecast object with main data.
        return {
            dayOfTheMonth: `${new Date(arrayOfDays[0].dt * 1000)}`.slice(0, 3),
            dayOfTheWeek: `${new Date(arrayOfDays[0].dt * 1000)}`.slice(8, 10),
            mainWeather: mainWeatherDetection(forecastDataLists.weatherList),
            tempMax: Math.round(Math.max(...forecastDataLists.tempMaxList)),
            tempMin: Math.round(Math.min(...forecastDataLists.tempMinList))
        };
    };
    //? Return object with forecast data for next four days.
    return {
        firstDay: genForecastObject(filteredData.slice(0, 8)),
        secondDay: genForecastObject(filteredData.slice(8, 16)),
        thirdDay: genForecastObject(filteredData.slice(16, 24)),
        fourthDay: genForecastObject(filteredData.slice(24, 32))
    };
}