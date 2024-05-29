import React from "react";
import { NavLink } from "react-router-dom";

const OpeningUI = () => {
  return (
    <>
      <div className="w-full h-[100vh] flex flex-col items-center justify-center gap-2">
        <img src="/NotesAppLogo.png" alt="App Logo" width={250} />
        <br />
        <h1 className="text-slate-700 text-3xl font-extrabold">
          We Welcome You
        </h1>
        <br />
        <NavLink
          className="bg-primary text-white font-bold p-3 rounded hover:bg-blue-700"
          to={"/dashboard"}
        >
          My Notes
        </NavLink>
      </div>
    </>
  );
};

export default OpeningUI;
