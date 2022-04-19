import { combineReducers } from "redux";
import { weatherDetailsList,weatherEachDay, presentLocation } from "./weather.reducer";
var rootReducer = combineReducers({
  weatherDetailsList,
  weatherEachDay,
  presentLocation
});
export default rootReducer;
