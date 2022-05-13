import React from 'react';
import WeatherDetails from "../components/weatherDetails";
import Sidebar from './sidebar';
const Weather = () => {
    return (
        <>
            <div className="weather-wrapper">
                <div className="heading items-center justify-center grid grid-rows-1 grid-flow-col gap-4 py-5">
                    <h2 className='text-lg'> Weather Forecast </h2>
                </div>

                <div className="flex flex-row weather-container grid grid-cols-2 lg:grid-cols-3 ">
                    <Sidebar />
                    <WeatherDetails />
                </div>
            </div>
        </>
    );
};

export default Weather;