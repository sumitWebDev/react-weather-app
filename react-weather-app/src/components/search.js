import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  //import useOnclickOutside from "react-cool-onclickoutside";
  import { useDispatch } from "react-redux";
  import '../styles/search.scss'
  import {getCurrentPosition, FetchWeatherDetailsAsync} from '../actions/weather.actions'
    const Search = () => {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        /* Define search scope here */
      },
      debounce: 300,
    });
    // const ref = useOnclickOutside(() => {
    //   // When user clicks outside of the component, we can dismiss
    //   // the searched suggestions by calling this method
    //   clearSuggestions();
    // });
    const dispatch = useDispatch()
    const handleInput = (e) => {
      // Update the keyword of the input element
      setValue(e.target.value);
    };
  
    const handleSelect =
      ({ description }) =>
      () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        clearSuggestions();
  
        // Get latitude and longitude via utility functions
        getGeocode({ address: description })
          .then((results) => getLatLng(results[0]))
          .then(({ lat, lng }) => {
            dispatch(getCurrentPosition({'coords':{ 'latitude' : lat, 'longitude': lng }}))
            dispatch(FetchWeatherDetailsAsync({'coords':{ 'latitude' : lat, 'longitude': lng }}))
            console.log("📍 Coordinates: ", { lat, lng });
          })
          .catch((error) => {
            console.log("😱 Error: ", error);
          });
      };
  
    const renderSuggestions = () =>
      data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;
  
        return (
          <li key={place_id} onClick={handleSelect(suggestion)}>
            <strong>{main_text}</strong> <br></br> <small>{secondary_text}</small>
          </li>
        );
      });


  
    return (
      <div className="search-wrapper">
        <label for="search" class='sr-only'>Search Bar</label><br></br>
        <input
          id="search"
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search Places"
          type='search'
        />
        {/* We can use the "status" to decide whether we should display the dropdown or not */}
        {status === "OK" && <ul>{renderSuggestions()}</ul>}
      </div>
    );
  };

  export default Search