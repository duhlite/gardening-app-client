import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_APP_CLIENT_ID
  },
  Storage: {
    region: process.env.REACT_APP_REGION,
    bucket: process.env.REACT_APP_BUCKET,
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "dev-garden-api",
        endpoint: process.env.REACT_APP_URL,
        region: process.env.REACT_APP_REGION
      },
    ]
  }
});

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
