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

//Action to fetch present location name,country
export function getPresentCoords(latitude,longitude) {
    return { type: "FETCH_PRESENT_COORDS", payload: {'coords':{'latitude': latitude, 'longitude' : longitude} }};
}

//Action to fetch weather datas using Redux Thunk
export function FetchWeatherDetailsAsync(searched_position) {
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition(function (position) {
            let position_final = searched_position !== undefined ? searched_position : position
            axios
                .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${position_final.coords.latitude}&lon=${position_final.coords.longitude}&exclude=hourly,minutely&appid=7fa8ec92190927efb89d316589df0a71&units=metric`)
                .then((response) => {
                    dispatch(FetchWeatherDetails(response.data.daily));
                    dispatch(FetchWeatherDetailsToday(response.data.current));
                });
        })
    };
}

//Action to fetch weather for a day
export function FetchWeatherDayAsync(searched_position) {
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition(function (position) {
            let position_final = searched_position.length > 0 ? searched_position : position
            axios
                .get(`https://api.openweathermap.org/data/2.5/forecast?lat=${position_final.coords.latitude}&lon=${position_final.coords.longitude}&appid=7fa8ec92190927efb89d316589df0a71&units=metric`)
                .then((response) => {
                    dispatch(FetchWeatherDay(response.data.list))
                });
        })
    };
}

//Action to fetch current position coords & location name
export function getCurrentPosition(searched_position) {
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition(function (position) {
            // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
            let position_final = searched_position !== undefined ? searched_position : position
            Geocode.setApiKey("AIzaSyCCHU_IgLDOItszJRVygrzBzLQUWuQyeEs");

            // set response language. Defaults to english.
            Geocode.setLanguage("en");
            Geocode.setLocationType("ROOFTOP");
            Geocode.fromLatLng(position_final.coords.latitude, position_final.coords.longitude).then(
                (response) => {
                    const address = response.results[0].formatted_address;
                    let value = address.split(",");
                    let count = value.length;
                    let country = value[count - 1];
                    let city = value[count - 3];
                    dispatch(getPresentLocationName(`${city},${country}`))
                    dispatch(getPresentCoords(position_final.coords.latitude, position_final.coords.longitude))
                },
                (error) => {
                    console.error(error);
                }
            );
        });
    };
}
