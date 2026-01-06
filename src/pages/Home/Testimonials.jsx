import React from "react";
import testimonials from "/images/home/testimonials/testimonials.png";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <div
      className="section-container bg-gradient-to-r text-black
     from-[#FAFAFA] from-0% to-[#FCFCFC] to-100% "
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <img src={testimonials} alt="" />
        </div>
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Testimonials</p>
            <h2 className="title">What our Customer says about Us</h2>
            <blockquote className="my-5 text-secondary leading-[20px]">
              “I had the pleasure of dining at Foodie last night, and I'm still
              raving about the experience! The attention to detail in
              presentation and service was impeccable”
            </blockquote>

            {/* Avatar */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse ">
                <div className="avatar border-white">
                  <div className="w-12 ">
                    <img src="/images/home/testimonials/testimonial1.png" />
                  </div>
                </div>
                <div className="avatar border-white">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial2.png" />
                  </div>
                </div>
                <div className="avatar border-white">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial3.png" />
                  </div>
                </div>
              </div>

              <div className="space-y-1 gap-1">
                <h5 className="text-lg font-semibold">Customer Feedback</h5>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  <span className="font-medium">4.9</span>
                  <span className="text-[#807E7E]">(18.9k reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
