import React from "react";

const Footer = () => {
  return (
    <div className="bg-white ">
      <footer className="footer py-10 px-4 text-base-content xl:px-24">
        <aside>
          <img src="/public/logo.png" alt="" />
          <p className="my-5 md:w-40">
            Savor the artistry where every dish is a culinary masterpiece
          </p>
        </aside>
        <nav>
          <h6 className="footer-title text-black">Usefull Links</h6>
          <a className="link link-hover">About Us</a>
          <a className="link link-hover">Events</a>
          <a className="link link-hover">Blogs</a>
          <a className="link link-hover">FAQ</a>
        </nav>
        <nav>
          <h6 className="footer-title text-black">Main Menu</h6>
          <a className="link link-hover" href="/">Home</a>
          <a className="link link-hover">Offers</a>
          <a className="link link-hover" href="/menu">Menus</a>
          <a className="link link-hover">Reservation</a>
        </nav>
        <nav>
          <h6 className="footer-title text-black">Contact Us</h6>
          <a className="link link-hover">example@gmail.com</a>
          <a className="link link-hover">9118248665</a>
          <a className="link link-hover">Social Media</a>
        </nav>
      </footer>
      <footer className="footer sm:footer-horizontal footer-center text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
