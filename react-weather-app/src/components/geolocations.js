import React from 'react';
import { useEffect, useState } from "react";
import Geocode from "react-geocode";

const GeoLocations = props => {

const[presentLocation,setPresentLocation] = useState();

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

        },
        (error) => {
          console.error(error);
        }
      );
    });

  }, []);
    return (
        <div>
            <p>{presentLocation ? presentLocation : ''}</p>
        </div>
    );
};


export default GeoLocations;