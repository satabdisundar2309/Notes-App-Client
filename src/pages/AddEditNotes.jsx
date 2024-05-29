import React, { useState } from "react";
import TagInput from "../components/input/TagInput";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddEditNotes = ({ noteData, type, onClose, fetchNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  // add new note
  const addNewNote = async () => {
    try {
      const response = await fetch("https://notes-app-server-rlud.onrender.com/api/v1/create-note", {
        method: "POST",
        body: JSON.stringify({ title, content, tags }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        fetchNotes();
        onClose()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in addNewNote function in modal", error);
    }
  };
  // aedit note
  const editNote = async (id) => {
    try {
      const response = await fetch(`https://notes-app-server-rlud.onrender.com/api/v1/edit-note/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content, tags }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        fetchNotes();
        onClose()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in editNote function in modal", error);
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the note");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };
  return (
    <div className="p-2 relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="label-input">Title<sup className="text-red-600">*</sup></label>
        <input
          type="text"
          className="text-2xl text-slate-950 border rounded p-2 outline-none"
          placeholder="Add title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="label-input">Note<sup className="text-red-600">*</sup></label>
        <textarea
          type="text"
          className="text-sm text-slate-950 border outline-none bg-slate-50 p-2 rounded "
          placeholder="Add note"
          rows={10}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </div>
      <div className="mt-3">
        <label className="label-input">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
      <button
        className="btn-primary font-medium  mt-5 p-3"
        onClick={type === 'edit' ? ()=>{editNote(noteData._id)} : addNewNote}
      >
        {type === "edit" ? <b>Update</b> : <b>Add</b>}
      </button>
    </div>
  );
};

export default AddEditNotes;
