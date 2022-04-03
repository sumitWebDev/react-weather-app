import React from 'react';
import { useEffect, useState } from "react";
import Geocode from "react-geocode";
import WeatherDetails from "../components/weatherDetails"

const GeoLocations = props => {

const[presentLocation,setPresentLocation] = useState();
const [coords,setCoords]=useState();
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyCCHU_IgLDOItszJRVygrzBzLQUWuQyeEs");

// set response language. Defaults to english.
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");

//Fetching current longitude and latitude and getting place name based on that
useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
        (response) => {
          const address = response.results[0].formatted_address;
          let value=address.split(",");
          let count=value.length;
          let country=value[count-1];
          let city=value[count-3];
          setPresentLocation(`${city},${country}`)
          setCoords(position.coords)
        },
        (error) => {
          console.error(error);
        }
      );
    });

  }, []);
    return (
            <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="sr-only">Weather Conditions</h2>
            <p>{presentLocation ? presentLocation : ''}</p>
             {coords ? <WeatherDetails coords={coords}/> :''}
            </div>
          </div>
    );
};


export default GeoLocations;