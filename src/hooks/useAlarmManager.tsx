// // hooks/useAlarmManager.ts
// import { useContext, useEffect } from "react";
// import { useSetRecoilState } from "recoil";
// import { userAlarmContent } from "@/recoil/atoms";
// import { SocketContext } from "@/pages/LayoutPage";
// import { IAlarmProps } from "@/components/Alarm";

// export const useAlarmManager = () => {
//   const socket = useContext(SocketContext);
//   const setAlarms = useSetRecoilState<IAlarmProps[]>(userAlarmContent);

//   useEffect(() => {
//     if (socket && socket.connected) {
//       console.log("Requesting alarms");
//       socket.emit("getAlarms");

//       const handleGetAlarms = (data: IAlarmProps[]) => {
//         console.log("Received alarms:", data);
//         setAlarms(data);
//       };

//       socket.on("getAlarms", handleGetAlarms);

//       return () => {
//         socket.off("getAlarms", handleGetAlarms);
//       };
//     }
//   }, [socket, setAlarms]);

//   return { requestAlarms: () => socket?.emit("getAlarms") };
// };
