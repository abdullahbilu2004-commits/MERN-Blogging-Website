import React from "react";
import {assets} from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-500 mt-[100px] py-10 px-8 sm:px-20 xl:px-32">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Branding */}
        <div>
          <img src={assets.logo} alt="QuickBlog Logo" className="w-32 mb-4" />
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
            Rerum unde quaerat eveniet cumque accusamus atque qui error quo enim fugiat?
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gray-600 font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" >Home</a></li>
            <li><a href="/best-sellers" >Best Sellers</a></li>
            <li><a href="/offers" >Offers & Deals</a></li>
            <li><a href="/contact" >Contact Us</a></li>
            <li><a href="/faqs" >FAQs</a></li>
          </ul>
        </div>

        {/* Need Help */}
        <div>
          <h3 className="text-gray-600 font-semibold mb-4">Need Help?</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/delivery" >Delivery Information</a></li>
            <li><a href="/returns" >Return & Refund Policy</a></li>
            <li><a href="/payment" >Payment Methods</a></li>
            <li><a href="/track-order" >Track your Order</a></li>
            <li><a href="/contact" >Contact Us</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-gray-600 font-semibold mb-4">Follow Us</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" >Instagram</a></li>
            <li><a href="#" >Twitter</a></li>
            <li><a href="#" >Facebook</a></li>
            <li><a href="#" >YouTube</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-xs text-gray-500 mt-10 border-t border-gray-700 pt-5">
        Copyright 2025 © QuickBlog All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
