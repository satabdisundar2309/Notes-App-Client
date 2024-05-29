import React, { useContext, useEffect, useState } from "react";
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";
import Searchbar from "./searchbar/Searchbar";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = ({fetchNotes }) => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser, setNotes } = useContext(AppContext);

  const [searchValue, setSearchValue] = useState("");

  useEffect(()=>{
      if(searchValue === ""){
        fetchNotes()
      }
  }, [searchValue])

  const onLogout = () => {
    toast.success("Logged Out Successfully");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setNotes([]);
    setUser({});
    navigate("/login");
  };

  const handleSearch = async () => {
    if(!searchValue){
      return ;
    }
    try {
      const response = await fetch(
        `https://notes-app-server-rlud.onrender.com/api/v1/search-notes?query=${searchValue}`,
        {
          method: "GET",
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          }
        }
      );

      const data = await response.json()
      if(response.ok){
        setNotes(data.searchNotes)
      }
      else{
        fetchNotes()
        setSearchValue("")
      }
    } catch (error) {
      console.log("Error in handleSearch function in navbar", error);
    }
  };

  const clearSearch = () => {
    setSearchValue("");
    fetchNotes();
  };
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <img
        src="/NotesAppLogo.png"
        alt="logo"
        width={100}
        className="hidden md:flex w-[100px]"
      />
      <Searchbar
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
      />
      <ProfileInfo onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
