import React from "react";
import AboutBackground from "../../assets/about-background.png";
//import AboutBackgroundImage from "../Assets/about-background-image.png";


const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
       <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">

      </div>
      <div className="about-section-text-container">
      <p className="primary-subheading">About</p>
        <h1 className="primary-heading">UPlay, powered by NTUC Club</h1>
        <p className="primary-text">You Play, We'll Do The Rest</p>
        <p className="primary-text">
          We are a phygital (physical + digital) concierge of curatorial
          recreation experiences to enhance the social well-being of all
          workers. More than just a booking platform, UPlay aspires to connect
          people from all walks of life, forging new relationships over time as
          they find a common thread through shared interests. Union and
          companies can also join us in creating fun and engaging communities
          while cultivating deep connections and lifelong relationships.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          
        </div>
      </div>
    </div>
  );
};

export default About;