import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { BookContext } from "../../App";
import Navigation from "../Navigation/Navigation";
import firebaseConfig from "./Firebase.config";
import "./Login.css";

export default function Login() {
  // console.log(useContext(vehicleContext));
  const [, , , setLoggedInUser] = useContext(BookContext);

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const [User, setUser] = useState({
    hasAccount: false,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    errorMsg: "",
    successMsg: "",
  });
  //firebase initializing
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  //////////////////////////////////////////////////////////////
  //Manual sign up and sign in
  //////////////////////////////////////////////////////////////
  const handleFormSubmit = (event) => {
    //Creating New User
    if (User.hasAccount === false) {
      if (User.password === User.confirmPassword) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(User.email, User.password)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            updateUserName(User.name);
            //console.log(user);
            setLoggedInUser(user);
            history.replace(from);
            //console.log(LoggedInUser);
            let newArr = { ...User };
            newArr.successMsg = "User Sign Up Successful!";
            newArr.errorMsg = "";
            setUser(newArr);
          })
          .catch((error) => {
            var errorMessage = error.message;
            let newArr = { ...User };
            newArr.errorMsg = errorMessage;
            //console.log(errorMessage);
            newArr.successMsg = "";
            setUser(newArr);

            //console.log(User);
          });
      } else {
        let newArr = { ...User };
        //console.log(User.password);
        User.password === ""
          ? (newArr.errorMsg =
              "Invalid Password.Password length must be greater than 6 and have to contain character and number digit.")
          : (newArr.errorMsg = "Password didnot match");
        newArr.successMsg = "";
        setUser(newArr);
      }
    }

    //Log in existing User
    else {
      firebase
        .auth()
        .signInWithEmailAndPassword(User.email, User.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          //console.log("successful login");
          console.log(user);
          setLoggedInUser(user);
          let newArr = { ...User };
          newArr.errorMsg = "";
          newArr.successMsg = "Login Successful.";
          setUser(newArr);
          history.replace(from);
        })
        .catch((error) => {
          var errorMessage = error.message;
          let newArr = { ...User };
          newArr.errorMsg = errorMessage;
          newArr.successMsg = "";
          setUser(newArr);
        });
    }

    event.preventDefault();
  };

  //firebase update user name
  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        console.log("Username updated successfully.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //handiling form input value
  const handleInput = (event) => {
    let isFormValid = true;
    if (event.target.name === "email") {
      isFormValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        event.target.value
      );
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
      //console.log(isFormValid);
    }
    if (isFormValid) {
      let newUser = { ...User };
      newUser[event.target.name] = event.target.value;
      setUser(newUser);
      //console.log(User);
    }
  };

  //ridirect user to login page
  const redirectLogin = () => {
    let newArr = {
      hasAccount: true,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMsg: "",
      successMsg: "",
    };

    setUser(newArr);
  };

  //////////////////////////////////////////////////////////////
  //Google Sign In
  //////////////////////////////////////////////////////////////
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const googleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        let user = result.user;
        setLoggedInUser(user);
        history.replace(from);
      })
      .catch((error) => {
        let newArr = { ...User };
        newArr.errorMsg = error.message;
        newArr.successMsg = "";
        setUser(newArr);
      });
  };

  return (
    <div className="pb-5">
      <Container>
        <Navigation></Navigation>
        <div className=" mx-auto p-4 form-container shadow">
          {User.hasAccount ? (
            <h3 className="mb-3">Login</h3>
          ) : (
            <h3 className="mb-3">Sign Up</h3>
          )}
          <form onSubmit={handleFormSubmit}>
            {!User.hasAccount && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="form-control mb-2 "
                onBlur={handleInput}
                required
              />
            )}
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="form-control mb-2"
              onBlur={handleInput}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control mb-2"
              onBlur={handleInput}
              required
            />
            {!User.hasAccount && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="form-control mb-3"
                onBlur={handleInput}
                required
              />
            )}
            {User.hasAccount ? (
              <button className="btn w-100 d-block bg-primary text-light">
                Login
              </button>
            ) : (
              <button className="btn w-100 d-block bg-primary text-light">
                Create an account
              </button>
            )}
            <p className="text-center text-danger mt-3">{User.errorMsg}</p>
            <p className="text-center text-success mt-3">{User.successMsg}</p>

            {!User.hasAccount && (
              <p className="mt-3 text-center">
                Already have an account?
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={redirectLogin}
                >
                  Login
                </span>
              </p>
            )}
          </form>
        </div>
        <h4 className="text-center  my-3 ">OR</h4>
        <button
          className="btn btn-outline-danger mx-auto d-block login-btn"
          onClick={googleSignIn}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-google"
            viewBox="0 0 16 16"
          >
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
          </svg>{" "}
          Sign In With Google
        </button>
      </Container>
    </div>
  );
}
