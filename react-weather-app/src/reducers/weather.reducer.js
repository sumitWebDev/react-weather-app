

const initialState = {
    weatherDetailsList: [],
    weatherEachDay: [],
    weatherToday:[],
    presentLocation:''
};


// Reducer for weather details list
export function weatherDetailsList(
    state = initialState.weatherDetailsList,
    action
) {
    switch (action.type) {
        case "FETCH_WEATHER_DETAILS": {
            return [...action.payload];
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
            return [...action.payload];
        }
        default:
            return state
    }
}

//Reducer to fetch present day weather
export function weatherToday(
    state = initialState.weatherToday,
    action
) {
    switch (action.type) {
        case "FETCH_PRESENT_DAY": {
            return [action.payload];
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