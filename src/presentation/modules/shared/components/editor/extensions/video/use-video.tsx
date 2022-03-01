import { useState } from "react";

export const useVideo = (id?: string) => {
  const [player, setPlayer] = useState();

  return [player, setPlayer];
};
