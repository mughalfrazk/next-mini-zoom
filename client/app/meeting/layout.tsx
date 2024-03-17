import React, { ReactNode } from "react";
import { ContextProvider } from "@/context/socket-context";

interface IProps {
  children: ReactNode;
}

const MeetingLayout = ({ children }: IProps) => {
  return <ContextProvider>{children}</ContextProvider>;
};

export default MeetingLayout;
