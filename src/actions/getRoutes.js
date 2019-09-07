import PtvApiService from "../Services/PtvApiService";

export const GET_ALL_ROUTES_FULFILLED = "GET_ALL_ROUTES_FULFILLED";

export const getRoutes = () => dispatch => {
  console.log("Getting Routes!!!");
  PtvApiService.getAllRoutes().then(routes => {
    console.log(`Routes: ${JSON.stringify(routes)}`);
    dispatch({
      type: GET_ALL_ROUTES_FULFILLED,
      payload: routes
    });
  });
};
