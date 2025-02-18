import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./style/styless.css";
import Customization from "./components/Customization";
import Script from "./components/Script";
const questionmark = new URL("./assets/questionmark.png", import.meta.url).href;


const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("General Settings");
  const [expires, setExpires] = useState("");
  const [animation, setAnimation] = useState("Fade");
  const [easing, setEasing] = useState("Ease");
  const [language, setLanguage] = useState("English");
  const [isActive, setIsActive] = useState(false);


  useEffect(() => {
    setIsActive(false); 
    setTimeout(() => setIsActive(true), 50);
  }, [animation]);


  return (
    <div className="app">
      {/* Top Navigation */}
      <div className="navbar">
        <div>
          <h2>CookieAPP</h2>
        </div>
        <div className="need-help">
          <img src={questionmark} alt="" />
          <h5>Need help?</h5>
        </div>
      </div>

      {/* Configuration Section */}
      <div className="configuration">
        <div className="mode-switch">
          <span>Configuration</span>
          <button className="mode-btn active">Simple</button>
          <button className="mode-btn">Advanced</button>
        </div>
        <div className="component-width">
          <div><a className="link" href="#">You need a subscription to publish the production <i>&#x2197;</i></a></div>
          <div><button>Create Component</button></div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tabs">
        {["General Settings", "Customization", "Script"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Container */}
      <div className="container">
        {/* Settings Panel */}
        <div className="settings-panel">
          {activeTab === "General Settings" && (
            <>
              <div className="general">
                <div>
                  <div className="settings-group">
                    <label htmlFor="expires">Expires</label>
                    <img src={questionmark} alt="" />
                    <input
                      type="text"
                      id="expires"
                      placeholder="120s"
                      value={expires || ""}
                      onChange={(e) => setExpires(e.target.value)}
                    />

                  </div>

                  <div className="settings-group">
                    <label htmlFor="animation">Animation</label>
                    <img src={questionmark} alt="" />
                    <select
                      id="animation"
                      value={animation}
                      onChange={(e) => setAnimation(e.target.value)}
                    >
                      <option value="fade">Fade</option>
                      <option value="slide-up">Slide Up</option>
                      <option value="slide-down">Slide Down</option>
                      <option value="slide-left">Slide Left</option>
                      <option value="slide-right">Slide Right</option>
                    </select>

                  </div>

                  <div className="settings-group">
                    <label htmlFor="easing">Easing</label>
                    <img src={questionmark} alt="" />
                    <select
                      id="easing"
                      value={easing}
                      onChange={(e) => setEasing(e.target.value.toLowerCase())}
                    >
                      <option value="ease">Ease</option>
                      <option value="linear">Linear</option>
                      <option value="ease-in">Ease-in</option>
                      <option value="ease-out">Ease-out</option>
                      <option value="ease-in-out">Ease-in-out</option>
                    </select>
                  </div>

                  <div className="settings-group">
                    <label htmlFor="language">Language</label>
                    <img src={questionmark} alt="" />
                    <select
                      id="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="settings-group-preview">
                    <h3>Preview</h3>
                    <div className="preview-area">
                      <div className={`cookie-banner ${animation} ${isActive ? "active" : ""}`} style={{ transitionTimingFunction: easing }}>
                        <div>
                          <span>
                            {language === "English"
                              ? "Cookie consent content here..."
                              : language === "Spanish"
                                ? "Contenido de consentimiento de cookies aquí..."
                                : "Contenu de consentement aux cookies ici..."}
                          </span>
                        </div>
                        <div>
                          <button className="btn-preferences">Preferences</button>
                          <button className="btn-reject">Reject</button>
                          <button className="btn-accept">Ok, Got it</button>
                        </div>
                      </div>
                    </div>
                    {/* <p>Expires in: {expires}</p> */}
                  </div>
                </div>
              </div>
            </>
          )}
          {activeTab === "Customization" && <Customization />}
          {activeTab === "Script" && <Script />}
        </div>

        {/* Preview Panel (Inside Container) */}

      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
