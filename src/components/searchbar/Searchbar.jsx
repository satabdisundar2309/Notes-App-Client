import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Searchbar = ({ value, onChange, handleSearch, clearSearch }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-sm">
      <input
        type="text"
        placeholder="Search"
        onChange={onChange}
        className="w-full text-xs bg-transparent outline-none py-[11px]"
        value={value}
      />
      {value && (
        <IoMdClose
          className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3 "
          onClick={clearSearch}
        />
      )}
      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black"
        onClick={handleSearch}
      />
    </div>
  );
};

export default Searchbar;
