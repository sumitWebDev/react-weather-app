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
    if (weatherCount < 7 && (moment(new Date()).format("DD/MM/YYYY") !== moment(new Date(weather.dt * 1000)).format('DD/MM/YYYY'))) {
      weatherCount++;
      return (
        <Link to={`/${weather.dt}`} key={weather.dt} target='blank' className="group">
          <div className="w-full text-center date">
            <h3 className="mt-4 text-sm">
            {moment(new Date(weather.dt * 1000)).format('ddd, DD MMMM')}
            </h3>
            <i className={`wi ${dict[weather.weather[0].icon]}`}></i>
            <p className="mt-1 text-lg font-medium">
              {weather.temp[durationOfDay]}{durationOfDay}&deg;C
            </p>
            <p className="mt-1 text-lg font-medium">
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
      <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {dailyWeather.length > 0 ? dailyWeather : 'Loading...'}
        </div>
      </main>
    </>
  );
}
