import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa"

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  //loading Data
  useEffect(() => {
    //fetch Data
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:6001/menu");
        const data = await response.json();
        // console.log(data);
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };
    //call the function
    fetchData();
  }, []);

  //filtering data based on category
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };


  //show all data function
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
  }

  //sorting based on A-Z, Z-A, LOW to HIGH pricing
  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItems];

    //Logic
    switch(option){
        case "A to Z":
            sortedItems.sort((a, b)=> a.name.localeCompare(b.name) )
            break;
        case "Z to A":
            sortedItems.sort((a, b)=> b.name.localeCompare(a.name) )
            break;
        case "Low to High Pricing":
            sortedItems.sort((a, b)=> a.price - b.price)
            break;
        case "High to Low Pricing":
            sortedItems.sort((a, b)=> b.price - a.price )
            break;
        default:
            break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  }

  //pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem,indexOfLastItem);
  console.log(currentItems);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div >
      {/* Menu banner Section */}
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col justify-center items-center gap-8">
          {/* Texts */}
          <div className="text-center space-y-7 px-4">
            <h2 className="text-black md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              For the love of Delicious <span className="text-green">Food</span>
            </h2>
            <p className="text-xl text-[#4A4A4A] w-4/5 mx-auto">
              Come with family & feel the joy mouthwatering food such as Greek
              Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas Rellenas
              and more for a moderate cost
            </p>
            <button className="btn bg-green px-8 py-3 font-semibold text-white rounded-full border-none">
              Order Now
            </button>
          </div>
        </div>
      </div>
      {/* Menu shop section */}
      <div className="section-container">
        {/* filtering and sorting */}
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
            {/* all category btns */}
            <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap pb-5">
                <button onClick={showAll}
                className={selectedCategory === "all" ? "active": "" }>All</button>
                <button onClick={()=>filterItems("salad")}
                className={selectedCategory === "salad" ? "active": "" }>Salad</button>
                <button onClick={()=>filterItems("pizza")}
                className={selectedCategory === "pizza" ? "active": "" }>Pizza</button>
                <button onClick={()=>filterItems("soup")}
                className={selectedCategory === "soup" ? "active": "" }>Soups</button>
                <button onClick={()=>filterItems("dessert")}className={selectedCategory === "dessert" ? "active": "" }>Desserts</button>
                <button onClick={()=>filterItems("drinks")}
                className={selectedCategory === "drinks" ? "active": "" }>Drinks</button>
            </div>

            {/* sorting base filtering */}
            <div className="flex gap-1">
                <div className="bg-black p-2 rounded-md">
                    <FaFilter className="h-4 w-4 text-white "/>
                </div>

                {/* sorting options */}
                <select name="sort" id="sort"
                onChange={(e) => handleSortChange(e.target.value)}
                value={sortOption}
                className="bg-black px-2 py-1 rounded-full text-white"
                >
                  <option value="default">Default</option>
                  <option value="A to Z">A to Z</option>
                  <option value="Z to A">Z to A</option>
                  <option value="Low to High Pricing">Low to High Pricing</option>
                  <option value="High to Low Pricing">High to Low Pricing</option>
                </select>
            </div>
        </div>

        {/* Product card */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
            {
                currentItems?.map((item,index) => (
                    <Cards key={index} item={item}/>
                ))
            }
        </div>
      </div>
      {/* pagination section */}
      <div className="flex justify-center my-8">
        {
          Array.from({length: Math.ceil(filteredItems.length / itemsPerPage)}).map((_,index)=>(
            <button
            key={index+1}
            onClick={()=>paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full  ${currentPage === index+1 ? "bg-green text-white" : "bg-gray-200 text-black"}`}
            >
              {index+1}
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default Menu;
