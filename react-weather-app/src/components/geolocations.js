import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Geocode from "react-geocode";
import WeatherDetails from "../components/weatherDetails";
import { getCurrentPosition } from "../actions/weather.actions";
import Sidebar from './sidebar';

const GeoLocations = (props) => {

    //Fetching current location
    const { presentLocation } = useSelector((store) => store);

    const dispatch = useDispatch();

    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey("AIzaSyCCHU_IgLDOItszJRVygrzBzLQUWuQyeEs");

    // set response language. Defaults to english.
    Geocode.setLanguage("en");
    Geocode.setLocationType("ROOFTOP");

    //Fetching current longitude and latitude and getting place name based on that
    useEffect(() => {
        dispatch(getCurrentPosition())
    }, [dispatch]);

    return (
        <div className="flex flex-row weather-container">
            <Sidebar />
            <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                <p>{presentLocation ? presentLocation : ''}</p>
                <WeatherDetails />
            </main>
        </div>
    );
};


export default GeoLocations;