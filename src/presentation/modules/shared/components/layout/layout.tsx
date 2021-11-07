import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../error-boundary/error-boundary";
import { Outlet } from "react-router-dom";
import { MainContainer, Heading, InnerContainer } from "./layout.styles";

export const Layout: React.FC = () => (
  <MainContainer fluid>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Heading> Lorem Picsum Clone</Heading>
      <InnerContainer>
        <Outlet />
      </InnerContainer>
    </ErrorBoundary>
  </MainContainer>
);
