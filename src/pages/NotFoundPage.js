import React from "react";
import { Link } from "react-router-dom";

class NotFoundPage extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            backgroundColor: "#ccc",
            flex: 1,
            padding: "10px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div style={{ flex: 1 }} />
          <div>NotFound</div>
        </div>
        <div style={{ flex: 3, padding: "10px 24px" }}>Hello!</div>
      </div>
    );
  }
}

export default NotFoundPage;
