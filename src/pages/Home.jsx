import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Notecard from "../components/Notecard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { AppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";
import moment from "moment";
import toast from "react-hot-toast";

const Home = () => {
  const { isAuthenticated, notes, setNotes } = useContext(AppContext);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  const fetchNotes = async () => {
    try {
      const response = await fetch("https://notes-app-server-rlud.onrender.com/api/v1/my-notes", {
        method: "GET",
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setNotes(data.notes);
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.log("Error in home.jsx fetchNotes", error);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);
  const [openAddEditmodal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({
      isShown: true,
      type: "edit",
      data: noteDetails,
    });
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://notes-app-server-rlud.onrender.com/api/v1/delete-note/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        fetchNotes();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in home.jsx handleDetelte", error);
    }
  };
  const handleIsPinnedvalue = async (note) => {
    try {
      const isPinned = !note.isPinned;
      const response = await fetch(
        `https://notes-app-server-rlud.onrender.com/api/v1/update-isPinned-value/${note._id}`,
        {
          method: "PUT",
          body: JSON.stringify({ isPinned }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        if (data.updatedNote.isPinned) {
          toast.success("Note Pinned");
        } else {
          toast.success("Note unpinned");
        }
        fetchNotes();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in home.jsx handleDetelte", error);
    }
  };

  return (
    <>
      <Navbar fetchNotes={fetchNotes} />
      <div className="container mx-auto">
        {notes.length <= 0 ? (
          <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center">
          <img src="/nothingToSeeHere.webp" alt="No notes found" />
          <h1 className="text-slate-700 font-semibold">Nothing to show ☹</h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {notes.map((note, i) => {
              return (
                <Notecard
                  key={i}
                  title={note.title}
                  date={moment(note.createdOn).format("Do MMM YYYY")}
                  content={note.content}
                  tags={note.tags}
                  isPinned={note.isPinned}
                  onEdit={() => {
                    handleEdit(note);
                  }}
                  onDelete={() => {
                    handleDelete(note._id);
                  }}
                  onPinNote={() => {
                    handleIsPinnedvalue(note);
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: null,
          });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditmodal.isShown}
        ariaHideApp={false}
        onRequestClose={() => {}}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
        contentLabel=""
        className=" w-[90%] md:w-[70%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditmodal.type}
          noteData={openAddEditmodal.data}
          onClose={() => {
            setOpenAddEditModal({
              isShown: false,
              type: "add",
              data: null,
            });
          }}
          fetchNotes={fetchNotes}
        />
      </Modal>
    </>
  );
};

export default Home;
