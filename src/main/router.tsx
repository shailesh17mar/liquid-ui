import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "presentation/modules/shared/components/layout";
import { ImagesListPage } from "./pages/make-images-list-page";
import { ImageDetailsPage } from "./pages/make-images-details-page";

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ImagesListPage />} />
        <Route path="/images" element={<ImagesListPage />} />
        <Route path="/images/:id" element={<ImageDetailsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
