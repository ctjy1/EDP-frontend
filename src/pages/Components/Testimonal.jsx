import React from "react";
//import ProfilePic from "../Assets/john-doe-image.png";
import { AiFillStar } from "react-icons/ai";

const Testimonial = () => {
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Promotions</p>
        <h1 className="primary-heading">
          Unlock More with UPlay: Limited-Time Specials!
        </h1>
        <p className="primary-text">
          Unlock instant rewards and special discounts on your first booking!
          Whether it's adrenaline-fueled activities or relaxing family outings,
          UPlay brings you closer to your next unforgettable experience. Limited
          time only – seize the fun now!
        </p>
      </div>
      <div className="testimonial-section-bottom">
        <p>
          Sign up now to unlock special deals and additional perks on your first
          adventure. Don't miss out on the chance to make unforgettable memories
          at exceptional value. Your journey to joy begins here – embrace the
          thrill with UPlay!
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>John Doe</h2>
      </div>
    </div>
  );
};

export default Testimonial;