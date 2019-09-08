import PtvApiService from "../Services/PtvApiService";

export const GET_ALL_ROUTES_FULFILLED = "GET_ALL_ROUTES_FULFILLED";

export const getRoutes = () => {
  return function(dispatch) {
    console.log("Getting Routes!!!");
    PtvApiService.getAllRoutes().then(routes => {
      console.log("Got Routes!");
      dispatch({
        type: GET_ALL_ROUTES_FULFILLED,
        payload: routes
      });
    });
  };
};
