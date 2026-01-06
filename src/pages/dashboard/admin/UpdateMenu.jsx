// import React from 'react'
// import { useLoaderData } from 'react-router-dom'

// const UpdateMenu = () => {
//     const item = useLoaderData()
//     console.log(item);
    
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default UpdateMenu





import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateMenu = () => {
  const item = useLoaderData(); // data from loader
  if (!item) {
    return <p className="text-center mt-5">Loading...</p>;
  }
   console.log(item);
  const navigate = useNavigate();

  const [name, setName] = useState(item.name);
  const [recipe, setRecipe] = useState(item.recipe);
  const [image, setImage] = useState(item.image);
  const [category, setCategory] = useState(item.category);
  const [price, setPrice] = useState(item.price);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedItem = { name, recipe, image, category, price };

    const res = await fetch(`http://localhost:6001/menu/${item._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      alert("Item updated successfully!");
      navigate("/dashboard/manage-items");
    } else {
      alert("Update failed!");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-5">
      <h1 className="text-2xl font-bold mb-4">Update Menu Item</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            value={name}
            className="w-full border p-2 rounded"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Recipe</label>
          <textarea
            value={recipe}
            className="w-full border p-2 rounded"
            rows="4"
            onChange={(e) => setRecipe(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Image URL</label>
          <input
            type="text"
            value={image}
            className="w-full border p-2 rounded"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            value={category}
            className="w-full border p-2 rounded"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            value={price}
            className="w-full border p-2 rounded"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Item
        </button>

      </form>
    </div>
  );
};

export default UpdateMenu;
