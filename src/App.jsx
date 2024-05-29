import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OpeningUI from "./pages/OpeningUI";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const { setUser, isAuthenticated, setIsAuthenticated, setNotes } =
    useContext(AppContext);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://notes-app-server-rlud.onrender.com/api/v1/get-user",
          {
            method: "GET",
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          setUser({});
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log("Error in app.jsx fetchUser", error);
      }
    };

    fetchUser();
  }, [isAuthenticated]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<OpeningUI />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
