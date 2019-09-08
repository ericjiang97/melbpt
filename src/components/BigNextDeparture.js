import React, { Component } from "react";
import Moment from "moment";
import LineTheme from "../config/styles/LineTheme";
import PtvApiService from "../Services/PtvApiService";

import { Link } from "react-router-dom";

export default class BigNextDeparture extends Component {
  state = {
    runInfo: null
  };

  componentDidMount() {
    this.fetchRunInfo(this.props.runId);
  }

  fetchRunInfo = runId => {
    PtvApiService.getPatternInfo(runId).then(runInfo => {
      this.setState({ runInfo });
    });
  };

  renderQuickInfo = () => {
    const {
      lineGroup,
      platform,
      estimatedDeparture,
      scheduledDeparture
    } = this.props;
    let timeRemaining;
    let isTrainLate;
    const currentTime = Moment(Moment().tz("Etc/UTC"));
    const scheduledDepMoment = Moment(scheduledDeparture).tz("Etc/UTC");
    if (estimatedDeparture) {
      const estimatedDepMoment = Moment(estimatedDeparture).tz("Etc/UTC");

      timeRemaining = Moment(scheduledDepMoment).diff(currentTime);
      isTrainLate = Moment(scheduledDepMoment).isAfter(
        Moment(estimatedDepMoment)
      );
    } else {
      timeRemaining = Moment(scheduledDepMoment).diff(currentTime);
      isTrainLate = null;
    }
    const momentTimeRemain = Moment.duration(timeRemaining);
    const hoursRemain = momentTimeRemain.hours();
    const minutesRemain = momentTimeRemain.minutes();
    const timeRemainingString =
      `${hoursRemain ? `${hoursRemain} hrs ` : ""}` +
      `${minutesRemain ? `${minutesRemain} mins` : ""}`;

    return (
      <div style={{ width: "12%", minWidth: 100 }}>
        <div
          style={{
            background: LineTheme[lineGroup].primaryColor,
            color: LineTheme[lineGroup].secondaryColor,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 5,
            paddingBottom: 5,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginBottom: 2
          }}
        >
          <h3 style={{ margin: 0, marginTop: 10 }}>Platform</h3>
          <h2 style={{ marginTop: 5, textAlign: "center" }}>{platform}</h2>
        </div>
        <div
          style={{
            backgroundColor: "#2E2E2E",
            color: "#FFFFFF",
            display: "flex",
            justifyContent: "center",
            paddingTop: 5,
            paddingBottom: 5,
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          <div>
            <h3
              style={{
                marginTop: 0,
                marginBottom: 0,
                wordWrap: "break-word",
                textAlign: "center",
                paddingLeft: 5,
                paddingRight: 5
              }}
            >
              {momentTimeRemain.asMilliseconds() > 0
                ? timeRemainingString
                : "NOW"}
            </h3>
          </div>
        </div>
      </div>
    );
  };
  render() {
    const { scheduledDeparture, runId, currenStation } = this.props;
    const { runInfo } = this.state;

    let currentRun;
    if (runInfo) {
      currentRun = runInfo.runs[runId];
    }

    let expressServiceMssage;
    if (currentRun) {
      if (currentRun.express_stop_count > 0) {
        expressServiceMssage = "Limited Express/Express Service";
      } else {
        expressServiceMssage = "Stopping all stations";
      }
    }

    return (
      <div style={{ display: "flex", marginBottom: 10 }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0 }}>
            {Moment(scheduledDeparture)
              .tz("Australia/Melbourne")
              .format("h:mma")}
          </h2>
          {runInfo && currentRun && (
            <div>
              <h2 style={{ margin: 0 }}>{currentRun.destination_name}</h2>
              <h3 style={{ margin: 0 }}>{expressServiceMssage}</h3>
              <Link to={`/run/${currentRun.run_id}/station/${currenStation}`}>
                More Info
              </Link>
            </div>
          )}
        </div>
        {this.renderQuickInfo()}
      </div>
    );
  }
}
