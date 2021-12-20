import { useMemo } from "react";
import { Doc } from "yjs";
import * as awarenessProtocol from "y-protocols/awareness.js";
import { User } from "presentation/context/auth-context";

function useYjsAwareness(user: User, doc: Doc): awarenessProtocol.Awareness {
  return useMemo(() => {
    const awareness = new awarenessProtocol.Awareness(doc);
    awareness.setLocalStateField("user", {
      name: user.name,
      //   color: getRandomColor(user.name),
    });
    return awareness;
  }, [doc, user.name]);
}

export default useYjsAwareness;
