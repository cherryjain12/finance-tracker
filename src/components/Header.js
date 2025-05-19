import React, { useEffect } from "react";
import "/home/aman/Desktop/React/finance-tracker/src/index.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const loggingOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("User signed out successfully.");
      })
      .catch((error) => {
        toast.error("Error signing out");
      });
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="navbar">
      <p className="logo">financeTRACKER.</p>
      {user && (
        <p className="logout" onClick={loggingOut}>
          <strong>Logout</strong>
        </p>
      )}
    </div>
  );
};

export default Header;
