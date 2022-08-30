import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../Context";
import { useContext } from "react";

const Signup = () => {
  const { userArr, setUserArr, count, setCount } = useContext(CartContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const signup = () => {
    if (email === "" || password === "" || rePassword === "") {
      setError("Please fill all the Fields!");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setError("You have entered an invalid email!");
        setEmail("");
      } else if (password !== rePassword) {
        setError("Password Doesn't Match!");
        setPassword("");
        setRePassword("");
      } else {
        setUserArr([
          ...userArr,
          {
            id: count,
            email: email,
            password: password,
          },
        ]);
        setCount(count + 1);
        setError("");
        setSuccess("Account created successfully!");

        setEmail("");

        setPassword("");
        setRePassword("");
      }
    }
  };

  return (
    <div className="loginDiv">
      <div className="loginMain">
        <div className="login">
          <h1>Welcome to Way2Door</h1>
          <div className="loginLogo">
            <img src="/images/loginLogo.jpg" alt="" />
          </div>
          <p style={{ color: "green", margin: "1% 0" }}>{success}</p>
          <p id="error">{error}</p>
          <div>
            <span>
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input
              type="text"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <span>
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type="password"
              id="pass"
              placeholder="Enter Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div>
            <span>
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type="password"
              id="pass"
              placeholder="Enter Confirm Password"
              value={rePassword}
              onChange={(event) => setRePassword(event.target.value)}
            />
          </div>
          <p>
            Already have an account? <Link to="/login">LOG IN</Link>
          </p>
          <button onClick={signup}>SIGN UP</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
