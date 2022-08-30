import React, { useEffect } from "react";
import "./Placeorder.css";
import { useNavigate } from "react-router-dom";
const Placeorder = () => {
  let navigate = useNavigate();
  const backtoShop = () => {
    navigate("/");
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="placeOrder">
      <div>
        <i class="fa-solid fa-circle-check"></i>
      </div>
      <h1>Thank You!</h1>
      <p>You order was successfuly completed.</p>
      <button onClick={backtoShop}>back to shop</button>
    </div>
  );
};

export default Placeorder;
