import React from "react";
import Navbar from "../components/header/Navbar";
import { Link } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import Logout from "./Logout";
import Login from "./Login";
import { removeWishlist } from "../components/redux/ShoppingCart";


const Profile = ({ showNavbar }) => {
  const firstName = sessionStorage.getItem('firstName');
  const lastName = sessionStorage.getItem('lastName');
  const ID = sessionStorage.getItem('userId')
  const { wish } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log("User ID:", ID); // Log user ID
  console.log("first Name:", firstName); // Log user ID

  const removeFromWishlist = (itemId) => {
    // Dispatch the removeWishlist action with the item id
    dispatch(removeWishlist({ id: itemId }));
  };
  const renderProfileContent = () => {
    if (firstName && lastName) {
        return (
            <div  className="">
                <div className="">
                {!showNavbar && <Navbar />}
                <img src="https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png" alt="profile" className="profile" />
            <h1 className="user">{firstName} {lastName} </h1>
                </div>
               
            <div className="wish-container">
                <h1 className="h1-text">Your Wishlist</h1>
                <div className="main">
                {wish.length === 0 ? (
                    <div>
                    <h1 className="text">Wishlist is empty!</h1>
                    </div>
                ) : (
                    wish?.map((food_cart) => (
                    <div className="under-container" key={food_cart.id}>
                        <div className="explore-card-cover">
                        <Link to={`/item/${food_cart.id}`}>
                            <img src={food_cart.image} alt={food_cart.name} className="explore-card-image"/>
                        </Link>
                        </div>
                        <div className="food-name">{food_cart.name}</div>
                        <div className="rat-pir">
                        <div className="approx-price">{food_cart.price + "$"}</div>
                        <button className="remove_btn" onClick={() => removeFromWishlist(food_cart.id)}>Remove</button>
                        </div>
                        
                    </div>
                    ))
                )}
                </div>
            </div>
            <Logout />
            </div>
            
        );
        } else {
        return (
            <>
             {!showNavbar && <Navbar />}
            <Login />
          
            </>
        );
        }
    };

    return (
        <>
       
        <div>
            <div className="only-profile">
            
            <div>
            {renderProfileContent()}
                
            </div>
            
            </div>
        </div>
        </>
    );
};

export default Profile;