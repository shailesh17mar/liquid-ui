import { WebrtcProvider } from "y-webrtc";
import { Doc } from "yjs";

export const makeWebrtcProvider = (id: string) => {
  const doc = new Doc({ guid: id });
  const roomName = `liquid-${id}`;
  return new WebrtcProvider(roomName, doc);
};
