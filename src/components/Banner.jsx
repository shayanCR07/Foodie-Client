import React from "react";
import banner from "../../public/images/home/banner.png";
import b_food from "../../public/images/home/b-food1.png";

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8">
         {/* Images */}
        <div className="md:w-1/2">
          <img src={banner} alt="Banner" />
          <div className="flex flex-row md:flex-row items-center justify-around -mt-14 gap-4">
            <div className="flex bg-white py-2 px-3 rounded-2xl items-center gap-2 shadow-md w-64">
              <img src={b_food} alt="" className="rounded-2xl " />
              <div className="space-y-1">
                <h5 className="text-lg font-medium mb-1 text-[#4A4A4A]">Spicy noodles</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500"
                    aria-label="1 star"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500"
                    aria-label="2 star"
                    
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500"
                    aria-label="3 star"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500"
                    aria-label="4 star"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500"
                    aria-label="5 star"
                  />
                </div>
                <p className="text-red">$18.00</p>
              </div>
            </div>
            <div className="hidden sm:flex bg-white py-2 px-3 rounded-2xl items-center gap-2 shadow-md w-64">
              <img src={b_food} alt="" className="rounded-2xl " />
              <div className="space-y-1">
                <h5 className="text-lg font-medium mb-1 text-[#4A4A4A] ">Spicy noodles</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500"
                    aria-label="1 star"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500"
                    aria-label="2 star"
                    
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500"
                    aria-label="3 star"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500"
                    aria-label="4 star"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500"
                    aria-label="5 star"
                  />
                </div>
                <p className="text-red">$18.00</p>
              </div>
            </div>
            
          </div>
        </div>
        {/* Texts */}
        <div className="md:w-1/2 space-y-7 px-4">
          <h2 className="text-black md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Dive into Delights of Delectable{" "}
            <span className="text-green">Food</span>
          </h2>
          <p className="text-xl text-[#4A4A4A]">
            Where each plate Weaves a Story Culinary Mastery ans Passionate
            Craftsmanship
          </p>
          <button className="btn bg-green px-8 py-3 font-semibold text-white rounded-full border-none">
            Order Now
          </button>
        </div>
       
      </div>
    </div>
  );
};

export default Banner;
