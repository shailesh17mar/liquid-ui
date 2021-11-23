import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  MainLayout,
  ProjectLayout,
} from "presentation/modules/shared/components/layouts";

/*
Side Menu will change
/projects/123
*/
export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<>Home</>} />
        <Route path="drafts" element={<>Drafts</>} />
        <Route path="find" element={<>Find</>} />
      </Route>
      <Route path="/projects/:id" element={<ProjectLayout />}>
        <Route index element={<>Project Readme</>} />
        <Route path="stories" element={<>Stories</>} />
        <Route path="highlights" element={<>Highlights</>} />
        <Route path="tags" element={<>Tags</>} />
        <Route path="insights" element={<>Insights</>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
