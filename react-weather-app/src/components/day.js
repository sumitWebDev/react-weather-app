import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { FetchWeatherDayAsync } from "../actions/weather.actions";
import dict from "../dict";
import Moment from 'react-moment';
import 'moment-timezone';

const Day = (props) => {
    const dispatch = useDispatch();
    const { weatherEachDay } = useSelector((store) => store);;

    let day = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
    useEffect(() => {
        dispatch(FetchWeatherDayAsync());
    }, [dispatch])
    console.log(weatherEachDay)
    let dataEachDay = weatherEachDay.map((day) => {
        return (
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 text-center">
            <h3 className="mt-4 text-sm text-gray-700">
              {/* {day[new Date(day.dt * 1000).getDay()]}
              {new Date(day.dt * 1000).getTime()} */}
              <Moment parse="YYYY-MM-DD HH:mm">{new Date(day.dt*1000)}</Moment>
            </h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {/* {new Date(day.dt * 1000).toLocaleDateString()} */}
            </p>
            <i className={`wi ${dict[day.weather[0].icon]}`}></i>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {day.main.temp}&deg;C
            </p>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {day.weather[0].description}
            </p>
          </div>
        )
    })
    return (
        <>
            Day to Day
            {dataEachDay}
        </>
    );
}

export default Day;