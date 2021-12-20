import { useMemo } from "react";
import { Doc } from "yjs";
import { WebrtcProvider } from "y-webrtc";
import useYjsAwareness from "./use-webrtc-awareness";
import { useAuth } from "presentation/context/auth-context";

function useWebRtcProvider(documentId: string) {
  const doc = useMemo(() => new Doc({ guid: documentId }), [documentId]);

  return useMemo(() => {
    const roomName = `liquid-${documentId}`;
    //@ts-ignore
    return new WebrtcProvider(roomName, doc);
  }, [doc, documentId]);
}

export default useWebRtcProvider;
