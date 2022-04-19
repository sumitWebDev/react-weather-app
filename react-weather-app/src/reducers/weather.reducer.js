

const initialState = {
    weatherDetailsList: [],
    weatherEachDay: [],
    presentLocation:''
};


// Reducer for weather details list
export function weatherDetailsList(
    state = initialState.weatherDetailsList,
    action
) {
    switch (action.type) {
        case "FETCH_WEATHER_DETAILS": {
            return [...state, ...action.payload];
        }
        default:
            return state
    }
}

// Reducer for weather details each day list
export function weatherEachDay(
    state = initialState.weatherEachDay,
    action
) {
    switch (action.type) {
        case "FETCH_WEATHER_DAY": {
            return [...state, ...action.payload];
        }
        default:
            return state
    }
}

//Reducer to fetch present location
export function presentLocation(
    state = initialState.presentLocation,
    action
) {
    switch (action.type) {
        case "FETCH_PRESENT_LOCATION": {
            return action.payload;
        }
        default:
            return state
    }
}