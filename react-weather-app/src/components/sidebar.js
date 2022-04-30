import React from 'react'
import { useSelector } from 'react-redux'
import { getCurrentPosition } from "../actions/weather.actions";
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import dict from "../dict";
import '../styles/sidebar.scss'

const Sidebar = (props) => {
    const { weatherToday, presentLocation } = useSelector((store) => store)
    //Fetching current longitude and latitude and getting place name based on that
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentPosition())
    }, [dispatch]);
    let weatherIcon, weatherCondition, weatherTemp = 'Loading...'
    if (weatherToday.length > 0) {
        weatherIcon = weatherToday[0].weather[0].icon;
        weatherCondition = weatherToday[0].weather[0].main;
        weatherTemp = weatherToday[0].temp
    }
    return (
        <aside className="bg-gradient-to-t from-green to-dark-green sidebar w-80 md:shadow transform -translate-x-full md:translate-x-0 sidebar-wrapper">
            <ul className="relative">
                <li className="relative">                                       
                    <div className= "sidebar-image-icon" >
                    <i className={`wi ${dict[weatherIcon]}` }></i>
                    </div>
                    <p className="weather-condition"> {weatherCondition}</p>
                    <p className="weather-temp">{weatherTemp}&deg;C</p>
                    <p className="present-location">{presentLocation ? presentLocation : ''}</p>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar