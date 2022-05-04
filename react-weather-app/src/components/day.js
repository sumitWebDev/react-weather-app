import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { FetchWeatherDayAsync } from "../actions/weather.actions";
import dict from "../dict";
import moment from "moment";
import { useParams } from 'react-router-dom';

const Day = (props) => {
    const dispatch = useDispatch();
    const { weatherEachDay } = useSelector((store) => store);
    const params = useParams();
    useEffect(() => {
        dispatch(FetchWeatherDayAsync());
    }, [dispatch])
    let dataEachDay = weatherEachDay.map((day) => {
        if (moment(new Date(params.id * 1000)).format('DD/MM/YYYY') === moment(new Date(day.dt * 1000)).format('DD/MM/YYYY')) {
            return (

                <div key={day.dt} className="w-full text-center">
                    <h3 className="mt-4 text-sm text-gray-700">
                        {moment(new Date(day.dt * 1000)).format("hh:mm A")}
                    </h3>
                    <i className={`wi ${dict[day.weather[0].icon]}`}></i>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                        {day.main.temp}&deg;C
                    </p>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                        {day.weather[0].description}
                    </p>
                </div>

            )
        }
    })
    return (
        <>
            Day to Day
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8" >
                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {dataEachDay.length > 0 ? dataEachDay : '...Loading weather data'}
                </div>
            </div>
        </>
    );
}

export default Day;