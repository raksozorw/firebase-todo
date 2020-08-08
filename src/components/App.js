import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./MUI";

import NewList from "./NewList";

import Header from "./Header";
import Login from "./Login";
import Footer from "./Footer";
import "../styles.css";
import set404 from "./set404";

export default function App() {
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <div
          className='app'
          style={{
            backgroundImage:
              "url(" +
              require("/Users/oskarwroz/Documents/WebDev-Projects/best-todo/best-todo/src/images/IMG_2762.JPG") +
              ")",
          }}
        >
          <div className='darkened'>
            <Header />
            <Switch>
              <Route path='/' exact component={Login} />
              <Route path='/home' exact component={NewList} />
              <Route path='*' exact={true} component={set404} />
            </Switch>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}
