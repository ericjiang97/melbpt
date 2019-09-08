import NetworkService from "./NetworkService";

export default class PtvApiService {
  static getAllRoutes() {
    const path = `/v3/routes?route_types=0`;
    return NetworkService.apiRequest(path);
  }

  static getAllStations(routeId, routeType = 0) {
    const path = `/v3/stops/route/${routeId}/route_type/${routeType}?`;
    return NetworkService.apiRequest(path);
  }

  static getStationDescription(stationId) {
    const path = `/v3/stops/${stationId}/route_type/0?`;
    return NetworkService.apiRequest(path);
  }

  static getStationInfo(stationId) {
    const path = `/v3/stops/${stationId}/route_type/0?`;
    return NetworkService.apiRequest(path);
  }

  static getStationDepartures(stationId, maxResults = 5) {
    const path = `/v3/departures/route_type/0/stop/${stationId}?look_backwards=false&max_results=${maxResults}`;
    return NetworkService.apiRequest(path);
  }

  static getRunInfo(runId) {
    const path = `/v3/runs/${runId}?`;
    return NetworkService.apiRequest(path);
  }

  static getPatternInfo(runId) {
    const path = `/v3/pattern/run/${runId}/route_type/0?expand=all`;
    return NetworkService.apiRequest(path);
  }

  static getDirectionInfo(directionId) {
    const path = `/v3/directions/${directionId}/route_type/0?`;
    return NetworkService.apiRequest(path);
  }

  static searchStops(searchTerm) {
    const path = `/v3/search/${searchTerm}?route_types=0&include_addresses=false&include_outlets=false&match_stop_by_suburb=true&match_route_by_suburb=false&match_stop_by_gtfs_stop_id=false`;

    return NetworkService.apiRequest(encodeURI(path));
  }
}
