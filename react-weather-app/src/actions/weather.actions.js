import axios from "axios";
import Geocode from "react-geocode";

//Action to fetch weather details across the application
export function FetchWeatherDetails(weatherData) {
    return { type: "FETCH_WEATHER_DETAILS", payload: weatherData };
}

export function FetchWeatherDay(dayData) {
    return { type: "FETCH_WEATHER_DAY", payload: dayData };
}


//Action to fetch weather datas using Redux Thunk
export function FetchWeatherDetailsAsync(latitude = '22.6086619', longitude = '-88.3311889') {
    return (dispatch) => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=7fa8ec92190927efb89d316589df0a71&units=metric`)
            .then((response) => dispatch(FetchWeatherDetails(response.data.daily)));
    };
}

export function FetchWeatherDayAsync(latitude = '22.6086619', longitude = '-88.3311889') {
    return (dispatch) => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=7fa8ec92190927efb89d316589df0a71&units=metric`)
            .then((response) => dispatch(FetchWeatherDay(response.data.list)));
    };
}

export function getCurrentPosition() {
    // return (dispatch) => {
    //     navigator.geolocation.getCurrentPosition(function (position) {
    //         Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
    //             (response) => {
    //                 const address = response.results[0].formatted_address;
    //                 let value = address.split(",");
    //                 let count = value.length;
    //                 let country = value[count - 1];
    //                 let city = value[count - 3];            
    //                 return({ type: "FETCH_PRESENT_LOCATION", payload: `${city},${country}`})
    //             },
    //             (error) => {
    //                 console.error(error);
    //             }
    //         );
    //     });
        
    // };
    return { type: "FETCH_PRESENT_LOCATION", payload: {'dayData':'test'} };
}


