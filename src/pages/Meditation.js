import Navbar from "../Components/Navbar";
import { useEffect } from "react";
import supabase from "../config/index";
import { useNavigate } from "react-router-dom";

const Meditation = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = supabase.auth.user();
    if (!user) {
      navigate("/login");
    }
    const script1 = document.createElement("script");
    script1.src = "/js/app.js";
    const script2 = document.createElement("script");
    script2.src = "/js/hide-buttons.js";
    const script3 = document.createElement("script");
    script3.src = "/js/toggle-seasons-menu.js";

    document.body.appendChild(script1);
    document.body.appendChild(script2);
    document.body.appendChild(script3);
  }, [navigate]);
  return (
    <>
      <Navbar />
      <div className="video">
        <video autoPlay loop>
          <source src="/video/winter.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="app">
        <div className="audio">
          <audio>
            <source src="/audio/meditation.mp3" type="audio/mpeg" />
          </audio>
          <div className="pause">
            <img src="/images/pause-button.png" alt="pause" />
          </div>
          <div className="progress">
            <svg>
              <rect
                className="rect1"
                strokeWidth="10"
                rx="8"
                height="150"
                width="150"
                y="25"
                x="25"
                stroke="#F07281"
                fill="transparent"
              ></rect>
            </svg>
            <svg>
              <rect
                className="rect"
                strokeWidth="10"
                rx="8"
                height="150"
                width="150"
                y="25"
                x="25"
                stroke="#FFFFFF"
                fill="transparent"
              ></rect>
            </svg>
            <div className="audio-remaining-time">00:00</div>
          </div>
          <div className="play">
            <img src="/images/play-button.png" alt="play" />
          </div>
        </div>
        <div className="durations">
          <div className="duration" audio-duration="10">
            <img src="/images/2min.png" alt="10 s" />
            <p>10 s</p>
          </div>
          <div className="duration" audio-duration="120">
            <img src="/images/2min.png" alt="2 min" />
            <p>2 min</p>
          </div>
          <div className="duration" audio-duration="300">
            <img src="/images/5min.png" alt="5 min" />
            <p>5 min</p>
          </div>
          <div className="duration" audio-duration="600">
            <img src="/images/10min.png" alt="10 min" />
            <p>10 min</p>
          </div>
          <div className="duration" audio-duration="1200">
            <img src="/images/20min.png" alt="20 min" />
            <p>20 min</p>
          </div>
        </div>
        <div className="seasons">
          <div className="season" video-src="/video/winter.mp4">
            <img src="/images/winter.png" alt="winter" />
          </div>
          <div className="season" video-src="/video/spring.mp4">
            <img src="/images/spring.png" alt="spring" />
          </div>
          <div className="season" video-src="/video/summer.mp4">
            <img src="/images/summer.png" alt="summer" />
          </div>
          <div className="season" video-src="/video/autumn.mp4">
            <img src="/images/autumn.png" alt="autumn" />
          </div>
          <div className="toggle-menu">
            <img src="/images/right-arrow.png" alt="open menu" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Meditation;
