import "../../App.css";
import image from "../../assets/bot_image.jpg";
import { useState, useRef, useEffect } from "react";

function Chatbox() {
  const [message, setMessage] = useState(""); // State to handle input message
  const botmessage = useRef();
  const input = useRef();

  useEffect(() => {
    // Function to set status based on certain conditions
    const checkStatus = () => {
      // Example condition for demonstration
      let isActive = true; // Determine active status dynamically if needed
      const status = document.querySelector(".status");
      status.innerText = isActive ? "Active" : "Not Active";
      status.style.color = isActive ? "green" : "red";
    };
    checkStatus();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default form submission on Enter
      handleInput();
    }
  };

  const handleInput = () => {
    const inputVal = message.trim().toLowerCase(); // Normalize input
    let responseMessage = "";

    // Define patterns and responses
    let patterns = {
      badwords: /fuck|bad|stupid|useless|bitch|crazy|nonsense/i,
      welcome: /hi|hello|hey|sup|yo|wassup|whats up|howdy|greetings|good morning|good afternoon|good evening/i,
      bye: /bye|goodbye|see you later|cya|goodnight/i,
      thanks: /thanks|thank you|thank you very much/i,
      how: /how are you|how are you doing|how are you doing today/i,
      good: /that's good|sounds nice|that sounds awesome|great|nice/i,
      workshopsEventsInquiry: /types of workshops and events|how can I participate/i,
      collaborationOpportunitiesInquiry: /unions and companies collaborate|creating engaging communities/i,
      communityEngagementInquiry: /connect with others|share similar interests through UPlay/i,
      membershipBenefitsInquiry: /exclusive benefits|what rewards do I receive as a Friend of UPlay/i,
      feedbackProcess: /how can I report a bug|where to send gameplay improvement suggestions/i,
      firstBookingInquiry: /how do I make my first booking|book a recreational experience/i,
    };

    // Check against patterns and set response message
    for (let key in patterns) {
      if (patterns[key].test(inputVal)) {
        switch (key) {
          case "badwords":
            responseMessage = "Please do not use bad words.";
            break;
          case "welcome":
            responseMessage = "Hello There how are you doing today?";
            break;
          case "bye":
            responseMessage = "Bye, have a nice day.";
            break;
          case "thanks":
            responseMessage = "You are welcome!";
            break;
          case "how":
            responseMessage = "I am fine, thank you!";
            break;
          case "good":
            responseMessage = "😁";
            break;
          case "workshopsEventsInquiry":
            responseMessage = "UPlay organizes a wide array of workshops and events, ranging from creative arts to outdoor adventures. Check our 'Events' section for the latest offerings and how to participate!";
            break;
          case "collaborationOpportunitiesInquiry":
            responseMessage = "Unions and companies can collaborate with UPlay by offering exclusive experiences or co-creating community engagement programs. Reach out to us for more information on partnerships!";
            break;
          case "communityEngagementInquiry":
            responseMessage = "UPlay offers various ways to connect with like-minded individuals, including thematic workshops and events. Join the activities that interest you and meet new friends!";
            break;
          case "membershipBenefitsInquiry":
            responseMessage = "As a Friend of UPlay, you'll enjoy exclusive benefits such as special discounts, early access to events, and unique rewards. Your first successful booking unlocks these privileges!";
            break;
          case "feedbackProcess":
            responseMessage = "Your feedback is important to us. Please report bugs or send suggestions through our 'Contact Us' page. We're always looking to improve!";
            break;
          case "firstBookingInquiry":
            responseMessage = "To make your first booking on UPlay, simply visit our 'Experiences' section, choose an activity you're interested in, and follow the booking instructions. Begin your journey with us today!";
            break;
          case "gameInquiry":
            responseMessage = "We have a wide range of activities including workshops and events. Check out our catalog on the website!";
            break;
          default:
            responseMessage = "I'm not sure how to help with that.";
            break;
        }
        break; // Break out of the loop once a match is found
      }
    }

    if (!responseMessage) {
      responseMessage = "I'm not sure how to help with that. Can you try asking something else?";
    }

    // Display the response
    botmessage.current.innerText = responseMessage;
    setMessage(""); // Clear the input field
  };

  return (
    <div className="App1">
      <div className="wrapper">
        <div className="content">
          <div className="header">
            <div className="img">
              <img src={image} alt="Chat Bot" />
            </div>
            <div className="right">
              <div className="name">ChatBot</div>
              <div className="status">Active</div>
            </div>
          </div>
          <div className="main">
            <div className="main_content">
              <div className="messages">
                <div className="bot-message" id="message1" ref={botmessage}></div>
                <div className="human-message" id="message2"></div> {/* Note: You may want to use this ref if you plan to display human messages */}
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="btm">
              <div className="input">
                <input
                  type="text"
                  id="input"
                  placeholder="Enter your message"
                  ref={input}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className="btn">
                <button onClick={handleInput}>
                  <i className="fas fa-paper-plane"></i>Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
