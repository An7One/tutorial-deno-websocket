import { WebSocket } from "https://deno.land/std/ws/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

const uuidToWS = new Map<string, WebSocket>();

const chatConnection = (ws: WebSocket) => {
  console.log("new socket connection");

  // to add new websocket connection to the map
  const uuid = v4.generate();
  uuidToWS.set(uuid, ws);

  console.log(uuidToWS);
};

export { chatConnection };
