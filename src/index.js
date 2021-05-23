import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import setipMockServer from "./api/mock.server";

import App from "./App";

setipMockServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
