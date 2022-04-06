

const initialState = {
    weatherDetailsList: [],
};


// Reducer for weather details list
export function weatherDetailsList(
    state = initialState.weatherDetailsList,
    action
) {
    switch (action.type) {
        case "FETCH_WEATHER_DETAILS": {
            return [...state, ...action.payload];;
        }
        default:
            return state
    }
}
