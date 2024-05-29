import React, { useContext } from "react";
import { getInitials } from "../utils/helper";
import { AppContext } from "../context/AppContext";

const ProfileInfo = ({onLogout}) => {
const {user} = useContext(AppContext)
  
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 flex items-center justify-center rounded-full text-white font-medium bg-green-600 ml-1">{getInitials(user.name)}</div>
      <div>
        <button className="text-sm  text-white bg-red-700 rounded p-2 font-semibold" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
