import "./presentation/modules/shared/utils/theme.css";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import "./presentation/styles/index.css";

import App from "./main/app";
import reportWebVitals from "./reportWebVitals";

Sentry.init({
  dsn: "https://2d29af276d0c45f5810642b14a22f53b@o1151494.ingest.sentry.io/6228222",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0,
});

const container = document.getElementById("root");
//@ts-ignore
const root = createRoot(container);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
