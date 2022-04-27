import { Amplify, Hub } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import ReactGA from "react-ga";
import { QueryClient, QueryClientProvider } from "react-query";
import "@aws-amplify/ui-react/styles.css";

import awsConfig from "aws-exports";
import { Router } from "./router";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "presentation/context/auth-context";
import { EuiProvider, EuiThemeProvider } from "@elastic/eui";

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);
const [productionRedirectSignIn, localRedirectSignIn] =
  awsConfig.oauth.redirectSignIn.split(",");

const [productionRedirectSignOut, localRedirectSignOut] =
  awsConfig.oauth.redirectSignOut.split(",");

const updatedAwsConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: isLocalhost
      ? localRedirectSignIn
      : productionRedirectSignIn,
    redirectSignOut: isLocalhost
      ? localRedirectSignOut
      : productionRedirectSignOut,
  },
};
Hub.listen("auth", ({ payload: { event, data } }) => {
  switch (event) {
    case "signIn_failure":
      setTimeout(() => {
        const existingToast = document.querySelector(".auth-error");
        if (!existingToast) {
          const toast = document.createElement("div");
          toast.classList.add("auth-error");
          toast.innerText = "Please use your business email";
          const socialButton = document.querySelector(
            ".federated-sign-in-button"
          );
          if (socialButton && socialButton.parentNode) {
            socialButton.parentNode.insertBefore(toast, socialButton);
          }
        }
      }, 500);
      break;
  }
});
Amplify.configure(updatedAwsConfig);

ReactGA.initialize("UA-221274822-1", {
  testMode: isLocalhost,
});
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <EuiProvider>
      <EuiThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RecoilRoot>
              <Router />
            </RecoilRoot>
          </AuthProvider>
        </QueryClientProvider>
      </EuiThemeProvider>
    </EuiProvider>
  );
};

export default withAuthenticator(App);
