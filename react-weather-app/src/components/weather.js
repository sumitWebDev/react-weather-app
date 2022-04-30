import React from 'react';
import WeatherDetails from "../components/weatherDetails";
import Sidebar from './sidebar';
const Weather = () => {
    return (
        <>
            <div className="weather-wrapper">
                <div className="heading items-center justify-center grid grid-rows-1 grid-flow-col gap-4 py-5">
                    <h2 className='text-lg'> 5 Day Forecast </h2>
                </div>

                <div className="flex flex-row weather-container">
            <Sidebar />
            <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                <WeatherDetails />
            </main>
        </div>
            </div>
        </>
    );
};

export default Weather;