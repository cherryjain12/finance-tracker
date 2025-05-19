import React, { useState } from "react";
import "/home/aman/Desktop/React/finance-tracker/src/index.css";
import InputLabel from "./InputLabel";
import CustomButton from "./CustomButton";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { auth, doc, db, setDoc, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [confirmPswd, setConfirmPswd] = useState("");
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const signupWithEmail = () => {
    if (!name || !email || !pswd || !confirmPswd) {
      toast.error("fill out all fields");
      return;
    }
    if (pswd.length < 6 || confirmPswd.length < 6) {
      setConfirmPswd("");
      setPswd("");
      toast.error("Password less than 6 characters");
      return;
    }
    if (pswd !== confirmPswd) {
      toast.error("Password is not same");
      setConfirmPswd("");
      setPswd("");
      return;
    }

    //authenticate email pswd with and without gooogle
    createUserWithEmailAndPassword(auth, email, pswd)
      .then((userCred) => {
        const user = userCred.user;
        createDoc(user);
        toast.success("doc created!!");
        navigate("/dashboard");
      })
      .catch((err) => toast.error(err.message));
  };

  const logIn = () => {
    if (!email || !pswd) {
      toast.error("fill out the fields");
      return;
    }
    signInWithEmailAndPassword(auth, email, pswd)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast.success("logged in", user);
        navigate("/dashboard");

        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        // ..
      });
  };

  async function createDoc(user) {
    //when you login/signup with google, there is no way to check if if use is logging in or signing up : it uses same API createUserWithEmailandPassword
    //but for normal email login we can track if user exists or not, if yes, then move him to login page : purpose of this function
    try {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName ? user.displayName : name,
        email: user.email,
        photoURL: user.photoURL ? user.photoURL : "",
        createdAt: new Date(),
      });
      toast.success("setdoc successful");
    } catch (err) {
      toast.error("error while setting the doc");
    }
  }

  function signWithGoogle() {
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("signed in ", result);
      })
      .catch((error) => {
        toast.error("error while logging in via google", error);
      });
  }
  return (
    <div className="signupform">
      {login ? (
        <div className="signup">
          <p className="title">
            Login <span style={{ color: "blue" }}> financeTRACKER.</span>
          </p>

          <InputLabel
            label={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholderVal={"cherryjain234@gmail.com"}
          />
          <InputLabel
            label={"Password"}
            value={pswd}
            onChange={(e) => setPswd(e.target.value)}
            type="password"
            placeholderVal={"Password@123"}
          />

          <div className="buttons">
            <CustomButton
              text={"Login with Email and Password"}
              isBlue={false}
              onClick={logIn}
            />
            <p>OR</p>
            <CustomButton
              onClick={signWithGoogle}
              text={"Login with Google"}
              isBlue={true}
            />
          </div>
          <p>
            Don't have an account?{" "}
            <span className="switchProfile" onClick={() => setLogin(!login)}>
              Click here
            </span>
          </p>
        </div>
      ) : (
        <div className="signup">
          <p className="title">
            Sign Up on <span style={{ color: "blue" }}> financeTRACKER.</span>
          </p>
          <InputLabel
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="string"
            placeholderVal={"Cherry Jain"}
          />
          <InputLabel
            label={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholderVal={"cherryjain234@gmail.com"}
          />
          <InputLabel
            label={"Password"}
            value={pswd}
            onChange={(e) => setPswd(e.target.value)}
            type="password"
            placeholderVal={"Password@123"}
          />
          <InputLabel
            label={"Confirm Password"}
            onChange={(e) => setConfirmPswd(e.target.value)}
            type="password"
            placeholderVal={"Password@123"}
          />
          <div className="buttons">
            <CustomButton
              text={"SignUp with Email and Password"}
              isBlue={false}
              onClick={signupWithEmail}
            />
            <p>OR</p>
            <CustomButton
              onClick={signWithGoogle}
              text={"SignUp with Google"}
              isBlue={true}
            />
          </div>
          <p>
            Or have an account already?{" "}
            <span className="switchProfile" onClick={() => setLogin(!login)}>
              Click here
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
