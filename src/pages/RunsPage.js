import React, { Component } from "react";

import PtvApiService from "../Services/PtvApiService";

import GetLineGroup from "../config/styles//GetLineGroup";
import LineTheme from "../config/styles/LineTheme";
import BigNextDeparture from "../components/BigNextDeparture";

import Moment from "moment";

class RunsPage extends Component {
  state = {
    result: null,
    stop: null,
    patterns: null,
    routeId: null,
    currentStation: null
  };

  componentDidMount = () => {
    const { match } = this.props;
    const runId = match.params.runId;
    const stationId = match.params.stopId;

    PtvApiService.getPatternInfo(runId).then(result => {
      this.setState({ result });
      const { departures } = result;
      const index = departures.findIndex(e => {
        return e.stop_id === parseInt(stationId);
      });
      console.log(Object.keys(result.routes)[0]);
      this.setState({
        currentStation: [...departures][0],
        patterns: [...departures].splice(index + 1),
        routeId: Object.keys(result.routes)[0]
      });
    });
    this.fetchAboutStation(stationId);
  };

  doesStationExist = element => {
    const { match } = this.props;
    const stationId = match.params.stationId;
    console.log(stationId === parseInt(element.stop_id));
    return element.stop_id === stationId;
  };

  fetchAboutStation = stationCode => {
    PtvApiService.getStationDescription(stationCode).then(data => {
      this.setState({
        stop: data.stop
      });
    });
  };

  render() {
    const { stop, patterns, result, routeId, currentStation } = this.state;
    console.log(
      routeId,
      GetLineGroup(routeId),
      LineTheme[GetLineGroup(routeId)]
    );
    let timeToTrain, hoursRemain, minutesRemain;
    if (currentStation) {
      timeToTrain = Moment.duration(
        Moment(
          currentStation.estimated_departure_utc ||
            currentStation.scheduled_departure_utc
        ).diff(Moment())
      );

      hoursRemain = timeToTrain.hours();
      minutesRemain = timeToTrain.minutes();
    }

    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <div style={{ width: "80%", textAlign: "center" }}>
          {stop && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <img
                src="https://www.ptv.vic.gov.au/themes/ptv-mpw/public/images/icons/train.svg"
                height="32px"
                style={{
                  marginRight: 10
                }}
              />
              <h1>{stop.stop_name} Station</h1>
            </div>
          )}
          {patterns && result && routeId && (
            <div>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                  <h2 style={{ textAlign: "left" }}>
                    {
                      result.stops[patterns[patterns.length - 1].stop_id]
                        .stop_name
                    }
                  </h2>
                </div>
                <div>
                  <h3 style={{ textAlign: "left", margin: 0 }}>Scheduled</h3>
                  <h2 style={{ textAlign: "left", marginTop: 0 }}>
                    {Moment(
                      Moment(
                        currentStation.scheduled_departure_utc ||
                          currentStation.estimated_departure_utc
                      )
                    ).format("h:mma")}
                  </h2>
                </div>
                {timeToTrain && (
                  <div style={{ marginLeft: 20 }}>
                    <h3 style={{ textAlign: "left", margin: 0 }}>Departs In</h3>
                    <h2 style={{ textAlign: "left", marginTop: 0 }}>
                      {`${hoursRemain ? `${hoursRemain} hrs ` : ""}` +
                        `${minutesRemain ? `${minutesRemain} mins` : ""}`}
                    </h2>
                  </div>
                )}
              </div>
              <div
                style={{
                  backgroundColor:
                    LineTheme[GetLineGroup(parseInt(routeId))].primaryColor,
                  height: "10px",
                  width: "100%"
                }}
              />
              <div
                style={{
                  marginTop: 10,
                  textAlign: "left",
                  borderLeftColor:
                    LineTheme[GetLineGroup(parseInt(routeId))].primaryColor,
                  borderLeftWidth: 5,
                  borderLeftStyle: "solid",
                  paddingLeft: 10
                }}
              >
                {patterns.map((value, index) => {
                  // console.log(value, result.stops[value.stop_id])
                  return (
                    <div
                      key={`${value.stop_id}_${index}`}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div
                        style={{
                          borderRadius: "100%",
                          width: 10,
                          height: 10,
                          border: `${LineTheme[GetLineGroup(parseInt(routeId))].primaryColor} 2px solid`,
                          marginRight: 5,
                          marginLeft: -20,
                          backgroundColor: "white"
                        }}
                      />
                      {result.stops[value.stop_id].stop_name}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default RunsPage;
