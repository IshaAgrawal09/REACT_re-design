import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const Login = () => {
  let navigate = useNavigate();
  const { userArr, setIsLogged, setLoggedUser, number } =
    useContext(CartContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = () => {
    let flag = 0;
    if (email === "" || password === "") {
      setError("Please fill all the fields!");
    } else {
      userArr.map((item) => {
        if (email === item.email && password === item.password) {
          flag = flag + 1;
          setIsLogged(true);
          setLoggedUser(item.email);
          if (number !== 0) {
            navigate("/checkout");
          } else {
            navigate("/");
          }
        }
      });
      if (flag === 0) {
        setError("Username or Password is invalid!");
        setEmail("");
        setPassword("");
      }
    }
  };

  const homePage = () => {
    navigate("/");
  };
  return (
    <div className="loginDiv">
      <div className="loginMain">
        <div className="login">
          <h1>Welcome Back</h1>
          <div className="loginLogo animate__animated animate__shakeX">
            <img src="/images/loginLogo.jpg" alt="" />
          </div>
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
          <p>
            New Here? <Link to="/signup">SIGN UP</Link>
          </p>
          <button onClick={login}>LOG IN</button>
          <div className="homeIcon">
            <i class="fa-solid fa-house" onClick={homePage}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
