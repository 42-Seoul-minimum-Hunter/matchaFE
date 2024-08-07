import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { getCookie } from "@/api/cookie";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const token = getCookie("jwt");

    const createSocket = () => {
      if (token && !socket) {
        const newSocket = io("http://localhost:3001", {
          auth: {
            authorization: token,
          },
        });
        setSocket(newSocket);
        return newSocket;
      }
      return null;
    };

    const newSocket = createSocket();

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const token = getCookie("jwt");

    if (!token && socket) {
      socket.disconnect();
      setSocket(null);
    } else if (token && !socket) {
      const newSocket = io("http://localhost:3001", {
        auth: {
          authorization: token,
        },
      });
      setSocket(newSocket);
    }
  }, [socket]);

  return socket;
};

export default useSocket;
