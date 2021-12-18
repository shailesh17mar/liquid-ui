import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "presentation/modules/shared/components/layouts";
import { EuiLoadingChart } from "@elastic/eui";

const StoriesPage = React.lazy(() => import("./pages/make-stories-page"));
const HighlightsPage = React.lazy(() => import("./pages/make-highlights-page"));
const ProjectDetailsPage = React.lazy(
  () => import("./pages/make-project-details-page")
);
const StoryDetailsPage = React.lazy(
  () => import("./pages/make-story-details-page")
);
const HomePage = React.lazy(() => import("./pages/make-home-page"));

export const Router: React.FC = () => (
  <Suspense fallback={<EuiLoadingChart size="xl" />}>
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
  </Suspense>
);
