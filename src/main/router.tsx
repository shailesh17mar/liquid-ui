import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "presentation/modules/shared/components/layouts";
import { StoriesPage } from "./pages/make-stories-page";
import { HighlightsPage } from "./pages/make-highlights-page";
import { ProjectDetailsPage } from "./pages/make-project-details";
import { StoryDetailsPage } from "./pages/make-storydetails-page";
import { HomePage } from "./pages/make-home-page";

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="drafts" element={<>Drafts</>} />
        <Route path="find" element={<>Find</>} />
      </Route>
      <Route path="/projects/:id" element={<Layout isProjectLayout />}>
        <Route index element={<ProjectDetailsPage />} />
        <Route path="stories" element={<StoriesPage />} />
        <Route path="highlights" element={<HighlightsPage />} />
        <Route path="tags" element={<>Tags</>} />
        <Route path="insights" element={<>Insights</>} />
      </Route>
      <Route path="/stories/:id" element={<Layout isProjectLayout />}>
        <Route index element={<StoryDetailsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
