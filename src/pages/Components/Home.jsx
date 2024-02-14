import React from "react";
import BannerBackground from "../../assets/home-banner-background.png";
import BannerImage from "../../assets/home-banner-image.jpeg"; 
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="home-container">

      <div className="home-banner-container">

    

        <div className="home-text-section">
        <h1 className="primary-heading1">
            Discover Your Next Adventure with UPlay!
          </h1>
          <p className="primary-text">
            Explore a world of experiences with UPlay! From action-packed
            adventures to serene family moments, we offer a diverse range of
            activities tailored to your interests. Join the adventure with UPlay
            and enjoy exclusive benefits on your first booking. Dive into
            excitement today!
          </p>
          <button className="secondary-button">
            Learn more <FiArrowRight />{" "}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Home;