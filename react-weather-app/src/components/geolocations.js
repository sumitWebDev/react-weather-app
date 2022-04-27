import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Geocode from "react-geocode";
import WeatherDetails from "../components/weatherDetails";
import { getCurrentPosition } from "../actions/weather.actions";

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
        <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
            <aside class="bg-gradient-to-t from-green to-dark-green   sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-indigo-500">
                <ul class="relative">
                    <li class="relative">
                        <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">Sidenav link 1</a>
                    </li>
                    <li class="relative">
                        <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">Sidenav link 2</a>
                    </li>
                    <li class="relative">
                        <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">Sidenav link 2</a>
                    </li>
                </ul>
            </aside>
            <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                <h2 className="sr-only">Weather Conditions</h2>
                <p>{presentLocation ? presentLocation : ''}</p>
                <WeatherDetails />
            </main>
        </div>
    );
};


export default GeoLocations;