import React from 'react';
import Geolocation from './geolocations'

const Weather = () => {
    return (
        <>  
            <div className="weather-wrapper"> 
                <div className="heading items-center justify-center grid grid-rows-1 grid-flow-col gap-4 py-5">
                    <h2 className='text-lg'> 5 Day Forecast </h2>
                </div> 
                {/* Component to calculate present location and render weather details component */}
                <Geolocation />          
            </div>
        </>
    );
};

export default Weather;