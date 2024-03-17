"use client";

import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
  MutableRefObject,
  SetStateAction,
  Dispatch,
} from "react";
import { Instance } from "simple-peer";
import { io } from "socket.io-client";
const Peer = require("simple-peer");

const socket = io("http://localhost:5500/");

interface IProps {
  children: ReactNode;
}

interface ICall {
  isReceivedCall?: boolean;
  from: string;
  name: string;
  signal: string;
}

interface ISocketContext {
  call: ICall;
  callAccepted: boolean;
  myVideo: MutableRefObject<HTMLVideoElement | undefined> | undefined;
  userVideo: MutableRefObject<HTMLVideoElement | undefined> | undefined;
  stream: MediaStream | undefined;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  callEnded: boolean;
  me: string;
  callUser: (id: string) => void;
  answerCall: () => void;
  leaveCall: () => void;
}

const defaltCall = {
  isReceivedCall: false,
  from: "",
  name: "",
  signal: "",
};

const SocketContext = createContext<ISocketContext>({
  call: defaltCall,
  callAccepted: false,
  myVideo: undefined,
  userVideo: undefined,
  stream: undefined,
  name: "",
  setName: () => {},
  callEnded: false,
  me: "",
  callUser: (id) => {},
  answerCall: () => {},
  leaveCall: () => {},
});

const ContextProvider = ({ children }: IProps) => {
  const myVideo = useRef<HTMLVideoElement>();
  const userVideo = useRef<HTMLVideoElement>();
  const connectionRef = useRef<Instance>();

  const [stream, setStream] = useState<MediaStream>();
  const [me, setMe] = useState<string>("");
  const [call, setCall] = useState<ICall>(defaltCall);
  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const [callEnded, setCallEnded] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream: MediaStream) => {
        setStream(currentStream);
        myVideo.current!.srcObject = currentStream;
      });

    console.log("useEffect called");
    socket.on("me", (id) => {
      console.log("Id received");
      setMe(id);
    });
    socket.on("call-user", ({ from, name: callerName, signal }: ICall) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, []);

  useEffect(() => {
    console.log("Socket connected with ID: ", me);
  }, [me]);

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data: any) => {
      socket.emit("answer-call", { signal: data, to: call?.from });
    });

    peer.on("stream", (currentStream: MediaStream) => {
      userVideo.current!.srcObject = currentStream;
    });

    peer.signal(call?.signal);
    connectionRef.current = peer;
  };

  const callUser = (id: string) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data: string) => {
      socket.emit("call-user", {
        userToCall: id,
        signal: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream: MediaStream) => {
      userVideo.current!.srcObject = currentStream;
    });

    socket.on("call-accepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current!.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        answerCall,
        leaveCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
