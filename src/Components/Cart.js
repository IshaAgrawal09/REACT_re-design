import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./Cart.css";
import Nav from "./Nav";
import { Modal } from "@mui/material";

const Cart = () => {
  let navigate = useNavigate();
  const {
    number,
    setNumber,
    addCart,
    setAddCart,
    amount,
    setAmount,
    selectList,
    setSelectList,
    isLogged,
  } = useContext(CartContext);

  const [open, setOpen] = useState(false);
  const [removeImage, setRemoveImage] = useState();
  const [removeIndex, setRemoveIndex] = useState();
  const [removeId, setRemoveId] = useState();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  // CHECKOUT PAGE
  const checkout = () => {
    if (isLogged) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  // TOTAL AMOUNT FUNCTION
  setAmount(
    addCart.reduce((total, item) => {
      return total + item.currentPrice * item.quantity;
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
    debugger;
    if (addCart[event.currentTarget.id]["quantity"] == 1) {
      removeitemfromCart(event);
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

  //   CLICK ON CROSS OR BY DECREASING VALUE
  const removeitemfromCart = (event) => {
    setOpen(true);
    setRemoveId(event.currentTarget.value);
    addCart.filter((item, index) => {
      if (index == event.currentTarget.id) {
        setRemoveImage(item.image);
        setRemoveIndex(index);
      }
    });
  };

  //   MODAL REMOVE FUNCTION
  const remove = () => {
    console.log("Remove ID");
    console.log(typeof removeId);
    setAddCart(
      addCart.filter((item, index) => {
        return index != removeIndex;
      })
    );
    setSelectList(
      selectList.filter((item) => {
        if (item.id == removeId) {
          item.add = 0;
        }
        return item;
      })
    );

    setNumber(number - 1);
    setOpen(false);
  };

  //   CONTINUE SHOPPING
  const continueMethod = () => {
    navigate("/");
  };

  //   CLEAR CART TOTALLY
  const clearCart = () => {
    if (window.confirm("Delete all the Items from Cart?")) {
      addCart.map((item, index) => {
        setSelectList(
          selectList.map((mainItem, mainIndex) => {
            if (item.id == mainItem.id) {
              mainItem.add = 0;
            }
            return mainItem;
          })
        );
      });
      setAddCart([]);
      setNumber(0);
    }
  };
  return (
    <>
      <div className="mainCart">
        <div id="navFixed">
          <Nav />
        </div>
        {addCart.length == 0 ? (
          <div id="emptyCart">
            <div className="emptyImage">
              <img src="/images/emptyCart.webp" alt="" />
            </div>
            <h3>Your Cart is Empty!</h3>
            <p>Looks Like You haven't made Your Choice Yet</p>
            <Link to="/">Start Shopping</Link>
          </div>
        ) : (
          <>
            <div className="cartPage">
              {addCart.map((item, index) => {
                return (
                  <>
                    <div className="singleCart">
                      <div id="cartImage">
                        <img src={item.image} alt="" />
                      </div>
                      <div className="data">
                        <h5>{item.name}</h5>
                        <div className="CartArrPrice">
                          <p>
                            <del>
                              <p id="prevPrice">
                                &#x20B9;{item.prevPrice * item.quantity}.00
                              </p>
                            </del>
                          </p>
                          &nbsp;&nbsp;
                          <p>&#x20B9;{item.currentPrice * item.quantity}.00</p>
                        </div>

                        <div className="increase">
                          <button
                            value={item.id}
                            className="quantity"
                            id={index}
                            onClick={decrease}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                          {item.quantity}
                          <button
                            className="quantity"
                            id={index}
                            onClick={increase}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      </div>
                      <div>
                        <button
                          className="cross"
                          value={item.id}
                          id={index}
                          onClick={removeitemfromCart}
                        >
                          X
                        </button>
                      </div>
                    </div>
                    <hr id="line" />
                  </>
                );
              })}

              <hr id="line" />

              <div className="totalAmountofProduct">
                <table>
                  <tbody>
                    <tr>
                      <td>Total MRP:</td>
                      <td>&#8377;{amount}.00</td>
                    </tr>
                    <tr>
                      <td>Convenience Fee:</td>
                      <td>
                        &#8377;<del>99.00</del>
                        <span>FREE</span>
                      </td>
                    </tr>

                    <tr className="amount">
                      <td id="totalAmount">Total Amount:</td>
                      <td>&#8377;{amount}.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="cartButton">
              <button className="emptyButton" onClick={clearCart}>
                CLEAR CART
              </button>
              <button className="emptyButton" onClick={continueMethod}>
                CONTINUE SHOPPING
              </button>

              <button className="emptyButton" onClick={checkout}>
                CHECKOUT
              </button>
            </div>
          </>
        )}
        <Modal open={open} onClose={() => setOpen(false)}>
          <div id="modal">
            <div className="modalChild">
              <div className="modalImage">
                <img src={removeImage} alt="" />
              </div>
              <div className="modalContent">
                <h4>Move From Bag?</h4>
                <p>Are you sure you want to move this item from bag?</p>
                <div className="modalButton">
                  <button onClick={remove}>REMOVE</button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Cart;
