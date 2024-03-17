"use client";

import React, { useState } from "react";
import Image from "next/image";

import meetingArt from "@/assets/meeting-art.png";

const Home = () => {
  const [joinMeeting, setJoinMeeting] = useState<boolean>(false);
  const [meetingId, setMeetingId] = useState<string>("");
  const [error, setError] = useState<string>("");

  const joinMeetingHanlder = () => {
    if (!meetingId) setError("Please type a meeting ID");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-slate-800 w-1/3 p-6 text-center rounded">
        {joinMeeting ? (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <button
                className="h-full px-3 py-1.5 bg-slate-700 text-sm rounded hover:bg-slate-800"
                onClick={() => setJoinMeeting(false)}
              >
                Back
              </button>
              <h1 className="text-xl m-0">Join Meeting</h1>
            </div>
            <hr className="border-slate-700" />
            <input
              type="text"
              className={`bg-transparent p-3 border-b-2 border-solid ${
                error
                  ? "border-red-600 focus:border-red-600"
                  : "border-slate-400 focus:border-sky-600"
              } focus:outline-none`}
              value={meetingId}
              onChange={(e) => {
                setError("");
                setMeetingId(e.target.value);
              }}
              placeholder="Type meeting code"
            />
            {error && <p className="text-red-600">{error}</p>}
            <button
              className="bg-sky-600 rounded p-2 hover:bg-sky-700"
              onClick={joinMeetingHanlder}
            >
              Join Meeting
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl">Welcome to Mini Zoom</h1>
            <hr className="border-slate-700" />
            <Image
              src={meetingArt}
              width={250}
              alt="Picture of the author"
              className="mx-auto"
            />
            <button className="bg-sky-600 rounded p-2 hover:bg-sky-700">
              Create a New Meeting
            </button>
            <button
              className="bg-sky-600 rounded p-2 hover:bg-sky-700"
              onClick={() => setJoinMeeting(true)}
            >
              Join Meeting
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
