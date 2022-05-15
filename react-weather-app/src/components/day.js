import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { FetchWeatherDayAsync } from "../actions/weather.actions";
import dict from "../dict";
import moment from "moment";
import { useParams } from 'react-router-dom';
import '../styles/dayDetails.scss'

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
                    <h3 className="text-white-700 time">
                        {moment(new Date(day.dt * 1000)).format("hh:mm A")}
                    </h3>
                    <i className={`wi ${dict[day.weather[0].icon]}`}></i>
                    <p className="font-medium text-white-900">
                        {day.main.temp}&deg;C
                    </p>
                    <p className="font-medium text-white-900">
                        {day.weather[0].description}
                    </p>
                </div>

            )
        }
    })
    return (
        <>
            <div className="day-details-cont">
                <div className="">
                    {dataEachDay.length > 0 ? dataEachDay : '...Loading weather data'}
                </div>
            </div>
        </>
    );
}

export default Day;