import React from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  ListItem,
  List,
  ListItemText,
  CircularProgress
} from "@material-ui/core";

import PtvApiService from "../Services/PtvApiService";

class HomePage extends React.Component {
  state = {
    searchTerm: "",
    searchResults: null,
    isSearching: false
  };

  searchStations = () => {
    const targetItem = this.state.searchTerm;
    this.setState({ isSearching: true });
    PtvApiService.searchStops(targetItem).then(searchResults => {
      this.setState({ searchResults, isSearching: false });
    });
  };
  render() {
    const { searchTerm, searchResults, isSearching } = this.state;
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
          <div>
            <h2>Search for a station</h2>
            <TextField
              variant="outlined"
              color="secondary"
              label="Search for a station"
              placeholder="Station Name"
              value={searchTerm}
              onChange={e => {
                this.setState({ searchTerm: e.target.value });
              }}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  this.searchStations();
                }
              }}
              fullWidth
            />
          </div>
        </div>
        <div style={{ flex: 3, padding: "10px 24px" }}>
          <h3>Results</h3>
          {isSearching && (
            <>
              <CircularProgress />
              <div>Searching...</div>
            </>
          )}
          {searchResults && (
            <>
              {searchResults.stops.length > 0 ? (
                <List>
                  {searchResults.stops.map((result, i) => {
                    return (
                      <ListItem
                        to={`/station/${result.stop_id}`}
                        component={Link}
                        button
                      >
                        <ListItemText
                          primary={result.stop_name}
                          secondary={result.stop_suburb}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                <div>No Stops found.</div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default HomePage;
