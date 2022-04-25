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
  console.log(weatherDetailsList);
  const dispatch = useDispatch();

  //Fetching weather details
  useEffect(() => {
    dispatch(FetchWeatherDetailsAsync());
  }, [dispatch]);
  // getting duration of the day (night, day, evening, morning)
  const getDurationOfTheDay = (hour) => {
    if (hour > 6 && hour <= 11)
      return 'morn'
    if (hour > 11 && hour <= 17)
      return 'day'
    if (hour > 17 && hour <= 21)
      return 'eve'
    if (hour >= 22 || hour <= 5)
      return 'night'
  }
  let durationOfDay = getDurationOfTheDay(parseInt(moment().format('H')));
  //Iterating daily weather objects
  dailyWeather = weatherDetailsList.map((weather) => {
    if (weatherCount < 5) {
      weatherCount++;
      return (
        <Link to={`/${weather.dt}`} key={weather.dt} target='blank' className="group">
          <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 text-center">
            <h3 className="mt-4 text-sm text-gray-700">
              {moment(new Date(weather.dt * 1000)).format("dddd ")}
            </h3>
            <p className="mt-1 text-lg font-medium text-gray-900 date">
              {moment(new Date(weather.dt * 1000)).format('DD/MM/YYYY')}
            </p>
            <i className={`wi ${dict[weather.weather[0].icon]}`}></i>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {weather.temp[durationOfDay]}{durationOfDay}&deg;C
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
