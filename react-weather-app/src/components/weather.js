import React from 'react';
import WeatherDetails from './weatherDetails'

const Weather = () => {
    return (
        <>  
            <div className="weather-wrapper"> 
                <div className="heading items-center justify-center grid grid-rows-1 grid-flow-col gap-4 py-5">
                    <h2 className='text-lg'> 5 Day Forecast </h2>
                </div> 
                <WeatherDetails />          
            </div>
        </>
    );
};

export default Weather;