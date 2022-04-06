import { combineReducers } from "redux";
import { weatherDetailsList } from "./weather.reducer";
var rootReducer = combineReducers({
  weatherDetailsList,
});
export default rootReducer;
