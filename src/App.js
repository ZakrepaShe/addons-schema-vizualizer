import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import {Provider} from 'react-redux';
import {Notifs} from 'redux-notifications';
import store from './store';
import SchemaUploader from "./components/SchemaUploader";
import EnableIfLayers from "./pages/EnableIfLayers";
import EnableIfTree from "./pages/EnableIfTree";
import 'redux-notifications/lib/styles.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename="/addons-schema-vizualizer">
          <div style={{padding: 20}}>
            <Grid container spacing={3} justify="center">
              <SchemaUploader/>
              <Grid item>
                <Link to="/layers">
                  <Button
                    variant="contained"
                  >
                    Layers
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/tree">
                  <Button
                    variant="contained"
                  >
                    Tree
                  </Button>
                </Link>
              </Grid>

              <Switch>
                <Route path="/layers" component={EnableIfLayers}/>
                <Route path="/tree" component={EnableIfTree}/>
                <Redirect to="/layers"/>
              </Switch>
            </Grid>
          </div>
          <Notifs/>
        </Router>
      </Provider>
    );
  }
}

export default App;
