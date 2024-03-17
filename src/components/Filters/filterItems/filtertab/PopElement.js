import React, { useEffect, useState } from "react";
import "../filtertab/popElementstyle.css";
import { atom, useRecoilState } from "recoil";
import { restaurant } from "../../../Lists";

export const variety = [
  {
    id: "1",
    type: "Burger",
  },
  {
    id: "2",
    type: "Breakfast meals",
  },
  {
    id: "3",
    type: "Drinks",
  },
  {
    id: "4",
    type: "Pizza",
  },
  {
    id: "5",
    type: "Sushi",
  },
  {
    id: "6",
    type: "Breakfast",
  },
];

export const setAtomPrice = atom({
  key: "myPrice",
  default: 50,
});

export const setAtomRating = atom({
  key: "myRating",
  default: 5,
});

export const setAtomTime = atom({
  key: "myTime",
  default: 50,
});

export const setAtomCheckBox = atom({
  key: "myCheckBox",
  default: new Array(variety.length).fill(false),
});

export const setAtomActive = atom({
  key: "myActive",
  default: "",
});
// Component
const PopElement = () => {
  const [toggleState, setToggleState] = useState(1);
  const [radioActive, setRadioActive] = useRecoilState(setAtomActive);
  const [price, setPrice] = useRecoilState(setAtomPrice);
  const [time, setTime] = useRecoilState(setAtomTime);
  const [rating, setRating] = useRecoilState(setAtomRating);
  const [checkBox, setCheckBox] = useRecoilState(setAtomCheckBox);
  const [filteredItems, setFilteredItems] = useState([])

  useEffect(() => {
    const filtered = restaurant.filter(item =>
      checkBox.some((checked, index) => checked && variety[index].type === item.foodType)
    );
    setFilteredItems(filtered);
  }, [checkBox]);

  // console.log(radioActive);

  const handleChange = (position) => {
    const updatedCheckedState = checkBox.map((item, index) =>
      index === position ? !item : item
    );
    setCheckBox(updatedCheckedState);
  };

  useEffect(() => {
    let val = document.getElementById("first");
    val.checked = true;
  }, []);

  const toggleTab = (idx) => {
    setToggleState(idx);
  };
  const resetFilters = () => {
    setRadioActive("");
    setPrice(50);
    setTime(50);
    setRating(5);
    setCheckBox(new Array(variety.length).fill(false));
  };

  return (
    <div className="container">
      <div className="bloc-tabs">
        <div
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Sort By
          <h6 className="chng-btn">{radioActive}</h6>
        </div>
        <div
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Food Type
        </div>
        <div
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Rating
        </div>
        <div
          className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(4)}
        >
          Price
        </div>
        <div
          className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(5)}
        >
          Time
        </div>
      </div>
      <div className="content-tabs">
        <div className={toggleState === 1 ? "content active-content" : "content"}>
          <div className="radio-container">
            <h3 className={radioActive === 1 ? "radio active-radio" : "radio"}>
              <input
                type="radio"
                name="btn"
                id="first"
                onClick={() => setRadioActive("Popularity") /*radioTab(1)*/}
              />{""}
              Popularity
            </h3>
          </div>
        </div>
        <div className={toggleState === 2 ? "content active-content" : "content"}>
          <div className="Variety-box">
            <h3>Which Variety Do You Like?</h3>
            {variety.map(({ type }, index) => {
              return (
                <li key={index} className="li">
                  <div className="inner-variety-box">
                    <div className="variety-checkbox">
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={type}
                        value={type}
                        checked={checkBox[index]}
                        onChange={() => handleChange(index)}
                      />
                      <label htmlFor={`custom-checkbox-${index}`}>{type}</label>
                    </div>
                  </div>
                </li>
              );
            })}
          </div>
        </div>
        <div
          className={toggleState === 3 ? "content active-content" : "content"}
        >
          <div className="rangeslider">
            <input
              onChange={(e) => setRating(e.target.value)}
              type="range"
              min="2"
              max="5"
              step="1"
              value={rating}
              class="myslider"
              id="sliderRange"
            />
            <p>
              Rating: <span id="demo">{rating + "+"}</span>
            </p>
          </div>
        </div>
        <div
          className={toggleState === 4 ? "content active-content" : "content"}
        >
          <div className="rangeslider">
            <input
              onChange={(e) => setPrice(e.target.value)}
              type="range"
              min="10"
              max="50"
              step="5"
              value={price}
              class="myslider"
              id="sliderRange"
            />
            <p>
              Price: <span id="demo">{price + "$"}</span>
            </p>
          </div>
        </div>
        <div
          className={toggleState === 5 ? "content active-content" : "content"}
        >
          <div className="rangeslider">
            <input
              onChange={(e) => setTime(e.target.value)}
              type="range"
              min="5"
              max="50"
              step="1"
              value={time}
              class="myslider"
              id="sliderRange"
            />
            <br />
            <p>
              Time: <span id="demo">{time + "min"}</span>
            </p>
          </div>
        </div>
      </div>
      <button className="reset-button" onClick={resetFilters}>
        Reset Filters
      </button>
      <div className={toggleState === 2 ? "content active-content" : "content"}>
        
        {filteredItems.map(item => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>Food Type: {item.foodType}</p>
            <p>Price: {item.price}</p>
            <p>Rating: {item.rating}</p>
            {/* Add more item details as needed */}
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default PopElement;
