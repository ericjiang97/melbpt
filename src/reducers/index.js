import { combineReducers } from "redux";
import getRoutes from "./getRoutesReducer";
export default combineReducers({
  routes: getRoutes
});
