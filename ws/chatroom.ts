import {
  WebSocket,
  isWebSocketCloseEvent,
} from "https://deno.land/std/ws/mod.ts";

const uuidToWS = new Map<string, WebSocket>();

interface BroadcastObj {
  name: string;
  msg: string;
}

// to broadcast events to all clients
const broadcastEvent = (obj: BroadcastObj) => {
  uuidToWS.forEach((ws: WebSocket) => {
    ws.send(JSON.stringify(obj));
  });
};

const chatConnection = async (ws: WebSocket) => {
  // to add new websocket connection to the map
  const uuid = crypto.randomUUID();
  uuidToWS.set(uuid, ws);

  for await (const ev of ws) {
    console.log(ev);

    // to delete the websocket if the connection is closed
    if (isWebSocketCloseEvent(ev)) {
      uuidToWS.delete(uuid);
    }

    // to create the event object if the event is of type string
    if (typeof ev === "string") {
      let evObj = JSON.parse(ev);
      broadcastEvent(evObj);
    }
  }
};

export { chatConnection };
