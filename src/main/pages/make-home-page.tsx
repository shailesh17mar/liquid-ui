import Home from "presentation/modules/home";
import React from "react";
import { makeProjectQueryController } from "main/factories/project-factory";

export const HomePage: React.FC = () => {
  return <Home controller={makeProjectQueryController()} />;
};
export default HomePage;
