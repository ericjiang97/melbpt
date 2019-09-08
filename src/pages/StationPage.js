import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import moment from "moment";

import { ListItem, ListItemText, List } from "@material-ui/core";

import PtvApiService from "../Services/PtvApiService";
import GetLineGroup from "../config/styles/GetLineGroup";
import lineTheme from "../config/styles/LineTheme";

class StationPage extends React.Component {
  state = { stationInfo: null, departures: null };

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    PtvApiService.getStationInfo(params.stopId).then(stationInfo => {
      this.setState({ stationInfo });
    });

    PtvApiService.getStationDepartures(params.stopId, 5).then(
      async stationDepartures => {
        const departures = {};
        const directions = {};
        console.log(stationDepartures);
        for (var departure of stationDepartures.departures) {
          if (
            moment(departure.scheduled_departure_utc).isBefore(
              moment().add(30, "minutes")
            )
          ) {
            const lineGroup = GetLineGroup(departure.route_id);
            const runInfo = await PtvApiService.getRunInfo(departure.run_id);
            if (!departures[lineGroup]) {
              departures[lineGroup] = [];
            }
            departures[lineGroup].push({ departure, runInfo: runInfo.runs[0] });
          }
        }
        console.log(departures);
        this.setState({
          departures
        });
      }
    );
  }
  render() {
    console.log(this.props.routes);
    const { stationInfo, departures } = this.state;
    if (!this.props.match.params || !this.props.match) {
      return <Redirect to="/" />;
    }
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            backgroundColor: "#ccc",
            padding: "10px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "left"
          }}
        >
          {stationInfo && (
            <div>
              <div>
                <img
                  src="https://www.ptv.vic.gov.au/themes/ptv-mpw/public/images/icons/train.svg"
                  height="32px"
                  style={{
                    marginRight: 10
                  }}
                />
                <h2>{`${stationInfo.stop.stop_name}Station`}</h2>
              </div>
              <h3>{stationInfo.stop.station_type}</h3>
            </div>
          )}
        </div>
        <div
          style={{
            flex: 3
          }}
        >
          <div
            style={{
              padding: "10px 24px",
              display: "flex",
              flexWrap: "wrap"
            }}
          >
            {departures && (
              <>
                {Object.keys(departures).map(departureGroup => {
                  const groupTheme = lineTheme[departureGroup];
                  return (
                    <div
                      style={{
                        flex: 1,
                        borderTop: `2px solid ${groupTheme.primaryColor}`,
                        margin: 7,
                        minWidth: 260,
                        maxWidth: 700
                      }}
                    >
                      <div style={{ padding: "5px 10px" }}>
                        <h3>{departureGroup}</h3>
                        {departures[departureGroup].map((departure, i) => {
                          let expressServiceMssage;
                          if (departure.runInfo.express_stop_count > 0) {
                            expressServiceMssage =
                              "Limited Express/Express Service";
                          } else {
                            expressServiceMssage = "Stopping all stations";
                          }

                          return (
                            <div style={{ display: "flex", margin: 5 }}>
                              <div style={{ flex: 1 }}>
                                <h3>
                                  {moment(
                                    departure.departure.scheduled_departure_utc
                                  ).format("h:mm a")}
                                </h3>
                                <h3>{departure.runInfo.destination_name}</h3>
                                <h4>{expressServiceMssage}</h4>
                                <Link
                                  to={`/runs/${departure.runInfo.run_id}/stops/${this.props.match.params.stopId}`}
                                >
                                  More Info
                                </Link>
                              </div>
                              <div>
                                <div
                                  style={{
                                    backgroundColor: groupTheme.primaryColor,
                                    color: groupTheme.secondaryColor,
                                    padding: "5px 10px",
                                    display: "flex",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    alignItems: "flex",
                                    textAlign: "center"
                                  }}
                                >
                                  <h3 style={{ margin: 5 }}>Platform</h3>
                                  <h4
                                    style={{
                                      margin: 5,
                                      fontWeight: 300
                                    }}
                                  >
                                    {departure.departure.platform_number}
                                  </h4>
                                </div>
                                <div
                                  style={{
                                    backgroundColor: "#2e2e2e",
                                    color: "#fff",
                                    textAlign: "center",
                                    padding: "5px 10px"
                                  }}
                                >
                                  {moment(
                                    departure.departure.scheduled_departure_utc
                                  ).isBefore(moment()) &&
                                    moment(
                                      moment().diff(
                                        moment(
                                          departure.departure
                                            .scheduled_departure_utc
                                        )
                                      )
                                    ).format("m")}
                                  {`${(departure.departure
                                    .estimated_departure_utc &&
                                    moment(
                                      moment(
                                        departure.departure
                                          .estimated_departure_utc
                                      ).diff(moment())
                                    ).format("m")) ||
                                    (departure.departure
                                      .scheduled_departure_utc &&
                                      moment(
                                        moment(
                                          departure.departure
                                            .scheduled_departure_utc
                                        ).diff(moment())
                                      ).format("m"))} 
                                    
                                  mins`}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  routes: state.Routes
});

export default connect(
  mapStateToProps,
  null
)(StationPage);
