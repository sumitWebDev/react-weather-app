import axios from "axios";
import Geocode from "react-geocode";

//Action to fetch weather details across the application
export function FetchWeatherDetails(weatherData) {
    return { type: "FETCH_WEATHER_DETAILS", payload: weatherData };
}

//Action to fetch particular day data
export function FetchWeatherDay(dayData) {
    return { type: "FETCH_WEATHER_DAY", payload: dayData };
}

//Action to fetch present day data
export function FetchWeatherDetailsToday(dayData) {
    return { type: "FETCH_PRESENT_DAY", payload: dayData };
}

//Action to fetch present location name,country
export function getPresentLocationName(locationData) {
    return { type: "FETCH_PRESENT_LOCATION", payload: locationData };
}

//Action to fetch weather datas using Redux Thunk
export function FetchWeatherDetailsAsync() {
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition(function (position) {
            axios
                .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=hourly,minutely&appid=7fa8ec92190927efb89d316589df0a71&units=metric`)
                .then((response) => {
                    dispatch(FetchWeatherDetails(response.data.daily));
                    dispatch(FetchWeatherDetailsToday(response.data.current));
                });
        })
    };
}

//Action to fetch weather for a day
export function FetchWeatherDayAsync() {
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition(function (position) {
            axios
                .get(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=7fa8ec92190927efb89d316589df0a71&units=metric`)
                .then((response) => dispatch(FetchWeatherDay(response.data.list)));
        })
    };
}

//Action to fetch current position coords & location name
export function getCurrentPosition() {
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition(function (position) {
            // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
            Geocode.setApiKey("AIzaSyCCHU_IgLDOItszJRVygrzBzLQUWuQyeEs");

            // set response language. Defaults to english.
            Geocode.setLanguage("en");
            Geocode.setLocationType("ROOFTOP");
            Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                (response) => {
                    const address = response.results[0].formatted_address;
                    let value = address.split(",");
                    let count = value.length;
                    let country = value[count - 1];
                    let city = value[count - 3];
                    dispatch(getPresentLocationName(`${city},${country}`))
                },
                (error) => {
                    console.error(error);
                }
            );
        });
    };
}
