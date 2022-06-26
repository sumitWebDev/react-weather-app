import { combineReducers } from "redux";
import { weatherDetailsList,weatherEachDay, weatherToday, presentLocation, presentCoords } from "./weather.reducer";
var rootReducer = combineReducers({
  weatherDetailsList,
  weatherEachDay,
  weatherToday,
  presentLocation,
  presentCoords
});
export default rootReducer;
