import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "aws-exports";
import { Router } from "./router";
Amplify.configure(awsExports);

const App: React.FC = () => <Router />;

export default withAuthenticator(App);
