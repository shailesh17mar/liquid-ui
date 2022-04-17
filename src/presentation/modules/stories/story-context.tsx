import React, { useEffect, useState } from "react";

export interface Story {
  id: string;
  projectId: string;
  transcriptionId?: string;
}
const StoryContext = React.createContext<Story | undefined>(undefined);

interface AuthProviderProps {
  value: any;
  children: React.ReactNode;
}
const StoryMetadataProvider: React.FC<AuthProviderProps> = ({
  children,
  value,
}) => {
  return (
    <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
  );
};

const useStoryMetadata = () => {
  const context = React.useContext(StoryContext);
  if (context === undefined) {
    throw new Error(
      "useStoryMetadata must be used within a StoryMetadataProvider"
    );
  }
  return context;
};

export { StoryMetadataProvider, useStoryMetadata };
