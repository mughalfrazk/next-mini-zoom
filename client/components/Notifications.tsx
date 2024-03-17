import { SocketContext } from "@/context/socket-context";
import React, { useContext } from "react";

const Notifications = () => {
  const { answerCall, callAccepted, call } = useContext(SocketContext);
  return (
    call?.isReceivedCall &&
    !callAccepted && (
      <div>
        {call.name} is calling!
        <button
          className="w-full bg-sky-500 p-2 hover:bg-sky-600"
          onClick={answerCall}
        >
          Answer Call
        </button>
      </div>
    )
  );
};

export default Notifications;
