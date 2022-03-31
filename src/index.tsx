import "./presentation/modules/shared/utils/theme.css";
import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import "./presentation/fonts/inter.css";
import "./presentation/styles/index.css";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

import App from "./main/app";
import reportWebVitals from "./reportWebVitals";
import { EuiProvider } from "@elastic/eui";

Sentry.init({
  dsn: "https://2d29af276d0c45f5810642b14a22f53b@o1151494.ingest.sentry.io/6228222",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0,
});

ReactDOM.render(
  <React.StrictMode>
    <EuiProvider>
      <App />
    </EuiProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
