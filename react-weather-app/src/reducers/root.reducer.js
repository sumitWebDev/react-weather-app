import { combineReducers } from "redux";
import { weatherDetailsList,weatherEachDay, weatherToday, presentLocation } from "./weather.reducer";
var rootReducer = combineReducers({
  weatherDetailsList,
  weatherEachDay,
  weatherToday,
  presentLocation
});
export default rootReducer;
