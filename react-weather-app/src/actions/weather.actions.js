import axios from "axios";

//Action to fetch weather details across the application
export function FetchWeatherDetails(weatherData) {
    return { type: "FETCH_WEATHER_DETAILS", payload: weatherData };
}


//Action to fetch weather datas using Redux Thunk
export function FetchWeatherDetailsAsync(latitude = '22.6086619', longitude = '-88.3311889') {
    return (dispatch) => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=7fa8ec92190927efb89d316589df0a71&units=metric`)
            .then((response) => dispatch(FetchWeatherDetails(response.data.daily)));
    };
}
