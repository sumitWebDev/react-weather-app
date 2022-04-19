import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FetchWeatherDetailsAsync } from "../actions/weather.actions";
import { Link } from 'react-router-dom'
import dict from "../dict";
import moment from "moment";

export default function WeatherDetails(props) {

  //variable declarations
  let dailyWeather = '';
  let weatherCount = 0;


  const { weatherDetailsList } = useSelector((store) => store);
  const dispatch = useDispatch();

  //Fetching weather details
  useEffect(() => {
    dispatch(FetchWeatherDetailsAsync());
  }, [dispatch]);


  //Iterating daily weather objects
  dailyWeather = weatherDetailsList.map((weather) => {
    if (weatherCount < 5) {
      weatherCount++;
      return (
        <Link to={`/day/${weather.dt}`} key={weather.dt} target='blank' className="group">
          <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 text-center">
            <h3 className="mt-4 text-sm text-gray-700">
              {moment(new Date(weather.dt * 1000)).format("dddd ")}
            </h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {moment(new Date(weather.dt * 1000)).format('DD/MM/YYYY')}
            </p>
            <i className={`wi ${dict[weather.weather[0].icon]}`}></i>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {weather.temp.day}&deg;C
            </p>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {weather.weather[0].description}
            </p>
          </div>
        </Link>
      );
    }
    else
      return false
  });
  return (
    <>
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {dailyWeather.length > 0 ? dailyWeather : 'Loading...'}
      </div>
    </>
  );
}
