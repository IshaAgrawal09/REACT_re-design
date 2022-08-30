import React, { useState } from "react";
import "./Filter.css";
import CartContext from "../Context";
import { useContext } from "react";

const Filter = () => {
  const { list, selectList, setSelectList } = useContext(CartContext);

  const [option, setOption] = useState();

  const select = (event) => {
    if (event.currentTarget.value === "fruits") {
      setSelectList(
        list.filter((item) => {
          return item.category.includes("fruit");
        })
      );
      setOption(event.currentTarget.value);
    } else if (event.currentTarget.value === "vegeies") {
      setSelectList(
        list.filter((item) => {
          return item.category.includes("vegetable");
        })
      );
      setOption(event.currentTarget.value);
    } else if (event.currentTarget.value === "dry") {
      setSelectList(
        list.filter((item) => {
          return item.category.includes("dry");
        })
      );
      setOption(event.currentTarget.value);
    } else if (event.currentTarget.value === "nonveg") {
      setSelectList(
        list.filter((item) => {
          return item.category.includes("nonveg");
        })
      );
      setOption(event.currentTarget.value);
    } else if (event.currentTarget.value === "all") {
      setSelectList(list);
      setOption(event.currentTarget.value);
    }
  };

  console.log("select List **********");
  console.log(selectList);
  return (
    <div className="filterMain">
      <h2>Categories</h2>
      <ul>
        <li>
          <button
            onClick={select}
            value="fruits"
            className={"fruits" === option && "active"}
          >
            Fresh Fruits
          </button>
        </li>
        <li>
          <button
            onClick={select}
            value="vegeies"
            className={"vegeies" === option && "active"}
          >
            Fresh Vegetables
          </button>
        </li>
        <li>
          <button
            onClick={select}
            value="dry"
            className={"dry" === option && "active"}
          >
            Dry Fruits
          </button>
        </li>
        <li>
          <button
            onClick={select}
            value="nonveg"
            className={"nonveg" === option && "active"}
          >
            Fresh non Veg
          </button>
        </li>
        <li>
          <button
            onClick={select}
            value="all"
            className={"all" === option && "active"}
          >
            All Items
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Filter;
