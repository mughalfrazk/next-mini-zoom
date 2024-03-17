"use client";

import Notifications from "@/components/Notifications";
import Options from "@/components/Options";
import VideoPlayer from "@/components/VideoPlayer";

const Meeting = () => {
  return (
    <div className="flex flex-col items-center p-3 gap-5">
      <div className="w-full bg-slate-800 py-3 rounded">
        <div className="text-3xl text-center">Mini Zoom</div>
      </div>

      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  );
};

export default Meeting;
