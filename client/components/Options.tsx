import { SocketContext } from "@/context/socket-context";
import React, { ReactNode, useContext, useState } from "react";

interface IProps {
  children: ReactNode;
}

const Options = ({ children }: IProps) => {
  const { me, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");

  return (
    <div className="flex items-center bg-slate-800 p-6 rounded gap-5 w-3/4">
      <div className="flex flex-col gap-3 w-1/2">
        <h5>Account Info</h5>
        <input
          type="text"
          value={me}
          readOnly
          className="bg-transparent border-b border-solid border-slate-400 p-3 focus:outline-none"
        />
        <button className="w-full bg-sky-500 p-2 hover:bg-sky-600" disabled>
          Copy ID
        </button>
      </div>
      <div className="flex flex-col gap-3 w-1/2">
        <h5>Make a call</h5>
        <input
          type="text"
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
          className="bg-transparent border-b border-solid border-slate-400 p-3 focus:outline-none"
        />
        <button className="w-full bg-sky-500 p-2 hover:bg-sky-600" onClick={() => callUser(idToCall)}>Call</button>
      </div>
      {children}
    </div>
  );
};

export default Options;
