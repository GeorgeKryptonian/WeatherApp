export const domReferences = {
    //? Contains references to elements related to current weather.
    current: {
        //? Contains references to main weather elements.
        main: {
            weatherImage: document.querySelector('.currentWeather img'),
            weatherValue: document.querySelector('.currentWeatherVal'),
            temp: document.querySelector('.currentTemp .tempVal'),
            tempMax: document.querySelector('.panelGrid .tempMax span'),
            tempMin: document.querySelector('.panelGrid .tempMin span')
        },
        //? Contains references to detailed weather elements.
        details: {
            humidity: document.querySelector('.humidityVal'),
            pressure: document.querySelector('.pressureVal'),
            wind: document.querySelector('.windVal'),
            sunrise: document.querySelector('.sunriseVal'),
            sunset: document.querySelector('.sunsetVal'),
            daytime: document.querySelector('.daytimeVal')
        }
    },
    //? Contains references to elements related to forecast weather.
    forecast: {
        firstDay: {
            weatherImage: document.querySelector('.firstDay > img'),
            date: document.querySelector('.firstDay > span'),
            tempMax: document.querySelector('.firstDay .tempMax span'),
            tempMin: document.querySelector('.firstDay .tempMin span')
        },
        secondDay: {
            weatherImage: document.querySelector('.secondDay > img'),
            date: document.querySelector('.secondDay > span'),
            tempMax: document.querySelector('.secondDay .tempMax span'),
            tempMin: document.querySelector('.secondDay .tempMin span')
        },
        thirdDay: {
            weatherImage: document.querySelector('.thirdDay > img'),
            date: document.querySelector('.thirdDay > span'),
            tempMax: document.querySelector('.thirdDay .tempMax span'),
            tempMin: document.querySelector('.thirdDay .tempMin span')
        },
        fourthDay: {
            weatherImage: document.querySelector('.fourthDay > img'),
            date: document.querySelector('.fourthDay > span'),
            tempMax: document.querySelector('.fourthDay .tempMax span'),
            tempMin: document.querySelector('.fourthDay .tempMin span')
        }
    },
    //? Contains references to elements that are not related to weather.
    other: {
        timeOfDayImage: document.querySelector('.timeOfDayGraphicBlock img'),
        locationInput: document.querySelector('.locationInput'),
        dateAndTime: document.querySelector('.currentDateAndTime')
    }
};