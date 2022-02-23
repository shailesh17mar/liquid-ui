import { Amplify } from "aws-amplify";
import { View, Image, withAuthenticator } from "@aws-amplify/ui-react";
import ReactGA from "react-ga";
import { QueryClient, QueryClientProvider } from "react-query";
import "@aws-amplify/ui-react/styles.css";

import awsConfig from "aws-exports";
import { Router } from "./router";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "presentation/context/auth-context";
import { EuiProvider } from "@elastic/eui";

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
Amplify.configure(updatedAwsConfig);

if (!isLocalhost) ReactGA.initialize("UA-221274822-1");
const queryClient = new QueryClient();
const App: React.FC = () => (
  <EuiProvider colorMode="light">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RecoilRoot>
          <Router />
        </RecoilRoot>
      </AuthProvider>
    </QueryClientProvider>
  </EuiProvider>
);

export default withAuthenticator(App);
