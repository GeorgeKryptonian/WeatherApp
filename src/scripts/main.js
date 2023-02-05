import '../output.css';
import '../index.html';
import {getByCurrentCoordinates} from './modules/getByCurrentCoordinates';
import {getByCityName} from './modules/getByCityName';
import {renderData} from './modules/renderData';

const locationForm = document.querySelector('.locationForm');
const locationInput = document.querySelector('.locationInput');

window.addEventListener('load', () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
        let {latitude, longitude} = position.coords;
        //? Render the current and forecast weather data for the user's location.
        renderData(
            await getByCurrentCoordinates('weather', latitude, longitude),
            await getByCurrentCoordinates('forecast', latitude, longitude)
        );
        locationForm.classList.remove('w-full');
        locationForm.parentElement.classList.remove('pt-2', 'px-2');
    })
    locationForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        try {
            //? Render the current and forecast weather data for the city.
            renderData(
                await getByCityName('weather', locationInput.value),
                await getByCityName('forecast', locationInput.value)
            );
            this.classList.remove('w-full');
            this.parentElement.classList.remove('pt-2', 'px-2');
        } catch (error) {
            locationInput.value = '';
            alert(error.response.data.message[0].toUpperCase() + error.response.data.message.slice(1));
        }
    })
    locationForm.addEventListener('click', function () {
        if (locationInput.type === 'button') {
            this.classList.add('w-full');
            this.previousElementSibling.classList.add('hidden');
            this.parentElement.classList.add('pt-2', 'px-2');
            locationInput.classList.remove('h-12', 'text-[#0DA0EA]', 'bg-[#0D9FEA14]', 'bg-[url(assets/images/icons/blueMarker.svg)]', 'rounded-tr-3xl', 'rounded-bl-3xl', 'cursor-pointer');
            locationInput.classList.add('h-10', 'text-black', 'bg-[#F3F3F3]', 'bg-[url(assets/images/icons/blackMarker.svg)]', 'rounded-t-[18px]', 'rounded-b-[9px]');
            locationInput.type = 'text';
            locationInput.value = '';
        }
    })
})