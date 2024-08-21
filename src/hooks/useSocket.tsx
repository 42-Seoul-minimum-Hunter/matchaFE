import { useState, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { getCookie } from "@/api/cookie";
import { userSocketLogin } from "@/recoil/atoms";
import { useRecoilValue } from "recoil";

// const useSocket = () => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   // const getSocketRecoil = useRecoilValue(userSocketLogin);

//   useEffect(() => {
//     const token = getCookie("jwt");

//     const createSocket = () => {
//       if (token && !socket) {
//         const newSocket = io("http://localhost:3001", {
//           auth: {
//             authorization: token,
//           },
//           // transports: ["websocket"], // WebSocket만 사용
//           // upgrade: false, // 다른 전송 방식으로 업그레이드 안 함
//           // reconnection: true, // 재연결 활성화
//           // reconnectionAttempts: 5, // 최대 5번 재연결 시도
//           // reconnectionDelay: 1000, // 1초 간격으로 재연결 시도
//         });
//         setSocket(newSocket);
//         return newSocket;
//       }
//       return null;
//     };

//     const newSocket = createSocket();

//     return () => {
//       if (newSocket) {
//         newSocket.disconnect();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const token = getCookie("jwt");

//     if (!token && socket) {
//       socket.disconnect();
//       setSocket(null);
//     } else if (token && !socket) {
//       const newSocket = io("http://localhost:3001", {
//         auth: {
//           authorization: token,
//         },
//       });
//       setSocket(newSocket);
//     }
//   }, [socket]);

//   return socket;
// };

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const getSocketRecoil = useRecoilValue(userSocketLogin);
  console.log("setSocketRecoil", getSocketRecoil);
  useEffect(() => {
    const token = getCookie("jwt");

    if (getSocketRecoil && token && !socket) {
      const newSocket = io("http://localhost:3001", {
        auth: {
          authorization: token,
        },
      });
      setSocket(newSocket);
    } else if (!getSocketRecoil && socket) {
      socket.disconnect();
      setSocket(null);
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [getSocketRecoil]);

  return socket;
};

export default useSocket;
