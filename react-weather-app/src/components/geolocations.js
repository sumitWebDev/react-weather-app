import React from 'react';
import { useEffect, useState } from "react";
import Geocode from "react-geocode";
import WeatherDetails from "../components/weatherDetails";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

const GeoLocations = (props) => {

    const [presentLocation, setPresentLocation] = useState();
    const [coords, setCoords] = useState();
    const [address, setAddress] = useState("");
    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey("AIzaSyCCHU_IgLDOItszJRVygrzBzLQUWuQyeEs");

    // set response language. Defaults to english.
    Geocode.setLanguage("en");
    Geocode.setLocationType("ROOFTOP");

    //Fetching current longitude and latitude and getting place name based on that
    useEffect(() => {
        //Getting present location co-ordinates
        navigator.geolocation.getCurrentPosition(async function (position) {
            //Sending present co-ordinates to get location details

            // if(coords !== undefined){
            getPlaceDetails(position.coords)
            // }
        });
    }, []);
    let handleChange = address => {
        setAddress(address);
    };

    let handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };
    let getPlaceDetails = (coords) => {
        console.log(coords)
        setCoords(coords);
        Geocode.fromLatLng(coords.latitude, coords.longitude).then(
            (response) => {
                const address = response.results[0].formatted_address;
                let value = address.split(",");
                let count = value.length;
                let country = value[count - 1];
                let city = value[count - 3];
                setPresentLocation(`${city},${country}`)

            },
            (error) => {
                console.error(error);
            }
        );
    }
    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Weather Conditions</h2>

                <div className="flex justify-center">
                    <div className="container mx-4 px-2">
                        <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                            <PlacesAutocomplete
                                value={address}
                                onChange={handleChange}
                                onSelect={handleSelect}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <input type="search" value={address} className="form-control relative flex-auto min-w-0 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2"
                                            {...getInputProps({
                                                placeholder: 'Search Places ...',
                                                className: 'location-search-input',
                                            })} />
                                        <button className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                            </svg>
                                        </button>
                                        <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style,
                                                        })}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                        </div>
                    </div>
                </div>
                <p>{presentLocation ? presentLocation : ''}</p>
                {coords ? <WeatherDetails coords={coords} /> : ''}

            </div>
        </div>
    );
};


export default GeoLocations;