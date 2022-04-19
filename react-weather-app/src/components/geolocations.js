import React from 'react';
import { useEffect} from "react";
import { useDispatch,useSelector } from 'react-redux';
import Geocode from "react-geocode";
import WeatherDetails from "../components/weatherDetails";
import { getCurrentPosition } from "../actions/weather.actions";

const GeoLocations = (props) => {

    //Fetching current location
    const {presentLocation} = useSelector((store)=>store);

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
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Weather Conditions</h2>
                <p>{presentLocation ? presentLocation : ''}</p>
                <WeatherDetails />
            </div>
        </div>
    );
};


export default GeoLocations;