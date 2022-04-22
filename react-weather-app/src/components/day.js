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
        if(moment(new Date(params.id*1000)).format('DD/MM/YYYY')=== moment(new Date(day.dt*1000)).format('DD/MM/YYYY')){
        return (
            <div key={day.dt} className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 text-center">
                    <h3 className="mt-4 text-sm text-gray-700">
                    {moment(new Date(day.dt*1000)).format("hh:mm A")}
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
          </div>
        )
    }
    })
    return (
        <>
            Day to Day
            {dataEachDay.length>0 ? dataEachDay : '...Loading weather data'}
        </>
    );
}

export default Day;