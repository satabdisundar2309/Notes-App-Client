import React, { useContext, useState } from "react";
import PasswordInput from "../components/input/PasswordInput";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const { mode, isAuthenticated, setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();
  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} />;
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    if (!confirmPassword) {
      setError("Please enter confirm password");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password and Confirm password must be same");
      return;
    }
    setError("");
    try {
      const response = await fetch(
        "https://notes-app-server-rlud.onrender.com/api/v1/create-account",
        {
          method: "POST",
          body: JSON.stringify({name, email, password, confirmPassword}),
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
        setName("")
        setEmail("");
        setPassword("");
        setConfirmPassword("")
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in signup page handle signup", error);
    }
  };
  return (
    <>
      <div className="p-2">
        <div className="flex items-center justify-center mt-10 md:mt-28">
          <div className="width-96 border rounded bg-white px-7 py-10">
            <form
              onSubmit={(e) => {
                handleSignUp(e);
              }}
            >
              <h4 className="text-exl mb-7">Signup Here</h4>
              <input
                type="text"
                placeholder="Name"
                className="input-box"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
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
              <PasswordInput
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                placeholder={"Confirm Password"}
              />
              {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

              <button type="submit" className="btn-primary">
                Create Account
              </button>

              <p className="text-sm text-center mt-4">
                Already have an account?
                <NavLink
                  to={"/login"}
                  className="font-medium text-primary underline"
                >
                  {" "}
                  Login
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
