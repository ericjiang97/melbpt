import { GET_ALL_ROUTES_FULFILLED } from "../actions/getRoutes";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ROUTES_FULFILLED:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};
