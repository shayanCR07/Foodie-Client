import React, { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cartData, refetch] = useCart();
  const cart = Array.isArray(cartData) ? cartData : [];
  const { user } = useContext(AuthContext);
  const [cartitems, setcartItems] = useState([]);

  //calculate price
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  //handle decrease function
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      fetch(`http://localhost:6001/cart/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; chartset=UTF-8",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedCart = cartitems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }

            return cartItem;
          });
          refetch();
          setcartItems(updatedCart);
        });
      refetch();
    } else {
      alert("Item cannot be zero.");
    }
  };

  //handle increase function
  const handleIncrease = (item) => {
    // console.log(item._id)
    fetch(`http://localhost:6001/cart/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; chartset=UTF-8",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartitems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }

          return cartItem;
        });
        refetch();
        setcartItems(updatedCart);
      });
    refetch();
  };

  //calculate total price
  const cartSubTotal = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);

  const orderTotal = cartSubTotal;

  //handleDelete btn
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:6001/cart/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("DELETE response:", data);
            // if (data.deletedCount > 0) {
            //   refetch();
            //   Swal.fire({
            //     title: "Deleted!",
            //     text: "Your file has been deleted.",
            //     icon: "success",
            //   });
            // }

             if (data?.message || data?.success || data?.acknowledged) {
            refetch();
            Swal.fire("Deleted!", "Item removed from cart.", "success");
          }
          });
      }
    });
  };
  return (
    <div className="section-container">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-36 flex flex-col justify-center items-center gap-8">
          {/* Texts */}
          <div className=" space-y-7 px-4">
            <h2 className="text-black md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items Added to The <span className="text-green">Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table for the cart */}
      <div>
        <div className="overflow-x-auto text-black">
          <table className="table">
            {/* head */}
            <thead className="bg-green text-white rounded-sm">
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">{item.name}</td>
                  <button
                    className="btn btn-xs bg-gray-200 border-none my-2 text-black"
                    onClick={() => handleDecrease(item)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={() => console.log(item.quantity)}
                    className="bg-white w-10 mx-2 text-center overflow-hidden appearance-none"
                  />
                  <button
                    className="btn btn-xs bg-gray-200 border-none my-2 text-black"
                    onClick={() => handleIncrease(item)}
                  >
                    +
                  </button>
                  <td>{calculatePrice(item).toFixed(2)}$</td>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs text-red"
                      onClick={() => handleDelete(item)}
                    >
                      <FaTrash />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* customer details */}
      <div className="my-12 flex flex-col md:flex-row justify-between items-start">
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium text-black">Customer Details</h3>
          <p className="text-black">Name: {user?.displayName}</p>
          <p className="text-black">Email: {user?.email}</p>
          <p className="text-black">User Id: {user?.uid}</p>
        </div>
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium text-black">Shopping Details</h3>
          <p className="text-black">Total Items: {cart.length}</p>
          <p className="text-black">Total Price: ${orderTotal.toFixed(2)}</p>
          <Link to="/process-checkout">
            <button className="btn bg-green text-white border-none mt-5">
              Procceed Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
