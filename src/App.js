import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";

// Pages
import HomePage from "./pages/HomePage";
import StationPage from "./pages/StationPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <AppBar color="primary" position="sticky">
        <Toolbar>PTV Signage</Toolbar>
      </AppBar>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Router>
          <Route exact path="/" component={HomePage} />
          <Route path="/station/:stopId" component={StationPage} />
        </Router>
      </div>
      <div>Footer</div>
    </div>
  );
}

export default App;
