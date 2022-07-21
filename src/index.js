import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/antd.css";
import "./index.scss";

import stores from "./redux/stores/stores";
import { Provider } from "react-redux";
import App from "./layouts/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={stores}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
