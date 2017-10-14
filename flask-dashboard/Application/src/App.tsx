import React from "react";
import { render } from "react-dom";
import WebView from "./WebView.Component";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

render((
    <MuiThemeProvider>
        <WebView />
    </ MuiThemeProvider>
), document.getElementById("app"));
