import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import PasswordInput from "../components/input/PasswordInput";
import { validateEmail } from "../utils/helper";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");
    try {
      const response = await fetch(
        "https://notes-app-server-rlud.onrender.com/api/v1/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password}),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        toast.success(data.message);
        setEmail("");
        setPassword("");
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in login page handle login", error);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="p-2">
        <div className="flex items-center justify-center mt-28">
          <div className="width-96 border rounded bg-white px-7 py-10">
            <form
              onSubmit={(e) => {
                handleLogin(e);
              }}
            >
              <h4 className="text-exl mb-7">Login Here</h4>
              <input
                type="text"
                placeholder="Email"
                className="input-box"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <PasswordInput
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder={"Password"}
              />
              {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

              <button type="submit" className="btn-primary">
                Login
              </button>

              <p className="text-sm text-center mt-4">
                Not registered yet?
                <NavLink
                  to={"/signup"}
                  className="font-medium text-primary underline"
                >
                  {" "}
                  Create account
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
