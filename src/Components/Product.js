import React, { useState } from "react";
import "./Product.css";
import CartContext from "../Context";
import { useContext } from "react";
import { Modal } from "@mui/material";

const Product = () => {
  const {
    list,
    selectList,
    setSelectList,
    addCart,
    setAddCart,
    setNumber,
    amount,
    setAmount,
    isLogged,
    number,
  } = useContext(CartContext);

  const [open, setOpen] = useState(false);
  const [singleIndex, setSingleIndex] = useState();

  // ADD TO CART FUNCTION
  const addToCart = (event) => {
    let count = 0;
    setAddCart(
      addCart.map((item) => {
        if (event.currentTarget.className == item.id) {
          count = count + 1;
        }
      })
    );
    if (count === 0) {
      setAddCart([...addCart, { ...selectList[event.currentTarget.id] }]);
    }
  };
  console.log(addCart);
  setNumber(addCart.length);

  setAmount(
    addCart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0)
  );

  // INCREASE QUANTITY FUNCTION
  const increase = (event) => {
    setAddCart(
      addCart.map((item, index) => {
        if (index == event.currentTarget.id) {
          item.quantity = item.quantity + 1;
          return item;
        }
        return item;
      })
    );
  };

  // DECREASE QUANTITY FUNCTION
  const decrease = (event) => {
    console.log(addCart[event.currentTarget.id]["quantity"]);

    if (addCart[event.currentTarget.id]["quantity"] == 1) {
      if (window.confirm("Are you Sure? you want to delete this item!"))
        setAddCart(
          addCart.filter((item, index) => {
            return index != event.currentTarget.id;
          })
        );
      setNumber(number - 1);
    } else {
      setAddCart(
        addCart.map((item, index) => {
          if (index == event.currentTarget.id) {
            item.quantity = item.quantity - 1;
            return item;
          }
          return item;
        })
      );
    }
  };

  // SINGLE PAGE FUNCTION
  const singlPageOpen = (event) => {
    setOpen(true);
    setSingleIndex(event.currentTarget.id);
  };

  return (
    <div className="mainProduct">
      <div className="productLine">
        Order Timing: <span>8:00 AM</span>&nbsp; To &nbsp;<span>6:00 PM</span>
        &nbsp;&nbsp;<span id="red">STORE CLOSE</span>
      </div>
      <div className="productImage">
        <img src="offer.png" alt="" />
      </div>

      {/* product listing  */}
      <div className="ProductList">
        {selectList.map((item, index) => {
          return (
            <div className="singleProduct" key={index}>
              <div className="container" id={index} onClick={singlPageOpen}>
                <div className="image-card">
                  <img src={item.image} alt="" />
                  {item.offer !== 0 ? <span>{item.offer}% OFF</span> : null}
                </div>
              </div>

              <h4>{item.name}</h4>
              <div id="reviews">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star-half"></i>
              </div>
              <div className="singleproductInfo">
                <p id="unit">{item.unit}</p>
                <p id="prevAmount">
                  <del>&#8377;{item.prevPrice}.00</del>
                </p>
                <p id="productprice">&#8377;{item.currentPrice}.00</p>
              </div>

              <div id="addCart">
                <button onClick={addToCart} className={item.id} id={index}>
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div id="modal">
          {selectList.map((item, index) => {
            return index == singleIndex ? (
              <div className="mainModal">
                <div className="modalChild">
                  <div className="modalImage">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="modalContent">
                    <h4>{item.name}</h4>
                    <div id="reviews">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star-half"></i>
                    </div>
                    <div id="unit">{item.unit}</div>
                    <p>
                      <span>
                        <del>&#8377;{item.prevPrice}.00</del>
                      </span>
                      &#8377;{item.currentPrice}.00
                    </p>
                  </div>
                </div>
                <p>
                  <span>Details: &nbsp;</span>Lorem Ipsum is simply dummy text
                  of the printing and typesetting industry. Lorem Ipsum has been
                  the industry's standard dummy text ever since the 1500s.
                </p>
              </div>
            ) : null;
          })}
        </div>
      </Modal>
    </div>
  );
};

export default Product;
