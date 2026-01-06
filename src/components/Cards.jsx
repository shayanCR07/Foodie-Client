import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

const Cards = ({ item }) => {
  
  const { name, price, image, recipe, _id } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  //add to Cart btn
  const handleAddToCart = (item) => {
    if (user && user?.email) {
      const cartItem = {
        menuItemId: item._id,
        image: item.image,
        price: item.price,
        name: item.name,
        quantity: 1,
        email: user.email,
      };
      console.log(cartItem);
      fetch("http://localhost:6001/cart", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then(async(res) => {
          console.log(res);
          const data = await res.json()
          if (res.ok) {
              queryClient.invalidateQueries(["cart", user.email]);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: data?.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }else{
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: data?.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
    } else {
      Swal.fire({
        title: "Please Login",
        text: "Without an account can't able to add products.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SignUp Now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/signup', {state:{from: location}})
        }
      });
    }
  };

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };
  return (
    <div className="card bg-base-100 w-96 shadow-sm bg-white text-black relative">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt=""
            className="hover:scale-105 transition-all duration-200 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          {" "}
          <h2 className="card-title">{item.name}</h2>
        </Link>
        <p>Description of the Item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-red text-sm">$</span>
            {item.price}
          </h5>
          <button
            className="btn bg-green text-white border-none"
            onClick={() => handleAddToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
