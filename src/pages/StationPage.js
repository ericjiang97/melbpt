import React from "react";
import { Redirect } from "react-router-dom";
import PtvApiService from "../Services/PtvApiService";

class StationPage extends React.Component {
  state = { stationInfo: null };
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    PtvApiService.getStationInfo(params.stopId).then(stationInfo => {
      this.setState({ stationInfo });
    });

    PtvApiService.getStationDepartures(params.stopId, 5).then(departures => {
      console.log(departures);
    });
  }
  render() {
    const { stationInfo } = this.state;
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
              <h2>{`${stationInfo.stop.stop_name}Station`}</h2>
              <h3>{stationInfo.stop.station_type}</h3>
            </div>
          )}
        </div>
        <div style={{ flex: 3 }}></div>
      </div>
    );
  }
}

export default StationPage;
