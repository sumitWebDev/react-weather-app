import { combineReducers } from "redux";
import { weatherDetailsList,weatherEachDay } from "./weather.reducer";
var rootReducer = combineReducers({
  weatherDetailsList,
  weatherEachDay
});
export default rootReducer;
