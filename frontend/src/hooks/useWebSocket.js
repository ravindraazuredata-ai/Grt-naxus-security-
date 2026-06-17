import { useEffect, useRef } from "react";

export function useWebSocket(url, handlers = {}) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!url) return;

    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected", url);
    };

    socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        const handler = handlers[payload.type];
        if (handler) handler(payload);
      } catch (error) {
        console.error("WebSocket message error", error);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, [url, handlers]);

  return socketRef.current;
}
