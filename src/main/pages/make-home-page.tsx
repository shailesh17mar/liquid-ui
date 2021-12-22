import Home from "presentation/modules/home";
import React, { useEffect } from "react";
import { makeProjectQueryController } from "main/factories/project-factory";
import { DataStore } from "aws-amplify";

export const HomePage: React.FC = () => {
  return <Home controller={makeProjectQueryController()} />;
};
export default HomePage;
