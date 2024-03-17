import { SocketContext } from "@/context/socket-context";
import React, { LegacyRef, useContext } from "react";

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  return (
    <div className="flex gap-2">
      {/* <div className="flex flex-col bg-slate-800 p-3 rounded text-center w-96">
        <video
          ref={userVideo as LegacyRef<HTMLVideoElement>}
          playsInline
          autoPlay
        />
        <p className="text-slate-400 text-sm">{call?.name || "Name"}</p>
      </div>
      <div className="flex flex-col bg-slate-800 p-3 rounded text-center w-96">
        <video
          ref={userVideo as LegacyRef<HTMLVideoElement>}
          playsInline
          autoPlay
        />
        <p className="text-slate-400 text-sm">{call?.name || "Name"}</p>
      </div> */}
      {stream && (
        <div className="flex flex-col bg-slate-800 p-3 rounded text-center w-96">
          <video
            ref={myVideo as LegacyRef<HTMLVideoElement>}
            playsInline
            autoPlay
          />
          <p className="text-slate-400 text-sm">{name || "Name"}</p>
        </div>
      )}
      {callAccepted && !callEnded && (
        <div className="flex flex-col bg-slate-800 p-3 rounded text-center w-96">
          <video
            ref={userVideo as LegacyRef<HTMLVideoElement>}
            playsInline
            autoPlay
          />
          <p className="text-slate-400 text-sm">{call?.name || "Name"}</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
