import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { FetchWeatherDayAsync } from "../actions/weather.actions";

const Day = (props) => {
    const dispatch = useDispatch();
    const { weatherEachDay } = useSelector((store) => store);;


    useEffect(() => {
        dispatch(FetchWeatherDayAsync());
    }, [dispatch])
    console.log(weatherEachDay)
    let dataEachDay = weatherEachDay.map((day) => {
        return (
            <p key={day.dt}>{day.dt_txt}</p>
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