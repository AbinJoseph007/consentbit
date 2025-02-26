import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./style/styless.css";
import Customization from "./components/Customization";
// import SettingsContainer from "./components/SettingsContainer";
import Script from "./components/Script";
const questionmark = new URL("./assets/questionmark.png", import.meta.url).href;
const openeye = new URL("./assets/closedeye.png", import.meta.url).href;
const eye = new URL("./assets/eye.png", import.meta.url).href;
import { motion } from "framer-motion";



const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("General Settings");
  const [expires, setExpires] = useState("");
  const [animation, setAnimation] = useState("select");
  const [easing, setEasing] = useState("select");
  const [language, setLanguage] = useState("English");
  const [isActive, setIsActive] = useState(false);
  const [activeMode, setActiveMode] = useState("Simple");
  const [showPopup, setShowPopup] = useState(false);
  const [toggleStates, setToggleStates] = useState({
    customToggle: false,
    resetInteractions: false,
    disableScroll: false,
    storeConsents: false,
    globalvariable: false
  });
  const [cookiePreferences, setCookiePreferences] = useState({
    marketing: false,
    personalization: false,
    analytics: false,
  });

  const handleToggle = (key) => {
    setToggleStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleCategory = (category) => {
    setCookiePreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  useEffect(() => {
    setIsActive(false);
    setTimeout(() => setIsActive(true), 50);
  }, [animation]);

  useEffect(() => {
    if (activeMode === "Simple" && activeTab === "Script") {
      setActiveTab("Customization");
    }

    // Force re-render to make sure UI updates
    setTimeout(() => setIsActive(true), 50);
  }, [activeMode]);


  return (
    <div className="app">
      {/* Top Navigation */}
      <div className="navbar">
        <div>
          {/* <h2>CookieAPP</h2> */}
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
          <button
            className={`mode-btn ${activeMode === "Simple" ? "active" : ""}`}
            onClick={() => {
              setActiveMode("Simple");
            }}
          >
            Simple
          </button>

          <button
            className={`mode-btn ${activeMode === "Advanced" ? "active" : ""}`}
            onClick={() => {
              setActiveMode("Advanced");
              setTimeout(() => setIsActive(true), 50); // Force re-render
            }}
          >
            Advanced
          </button>

        </div>
        <div className="component-width">
          <div>
            <a className="link" href="#">
              You need a subscription to publish the production <i>&#x2197;</i>
            </a>
          </div>

          {activeTab !== "Script" && (
            <div>
              <button className="publish-button" onClick={() => setShowPopup(true)}>
                Create Component
              </button>
            </div>
          )}

          {activeTab === "Script" && (
            <div>
              <button className="publish-button">Scan Project</button>
            </div>
          )}
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>We are installing the script in your code...</h3>
            <button className="confirm-button" onClick={() => setShowPopup(false)}>
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="tabs">
        {["General Settings", "Customization", "Script"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => {
              if (activeMode === "Advanced" || tab !== "Script") {
                setActiveTab(tab);
              }
            }}
            disabled={tab === "Script" && activeMode !== "Advanced"}
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
            <div className="general">
              <div className="width-cust">
                <div className="settings-group">
                  <div className="flex">
                    <label htmlFor="expires">Expires</label>
                    <div className="tooltip-container">
                      <img src={questionmark} alt="info" className="tooltip-icon" />
                      <span className="tooltip-text">The Amount of days to remember user's consent preferences</span>
                    </div>
                  </div>
                  <input
                    type="text"
                    id="expires"
                    placeholder="120s"
                    value={expires || ""}
                    onChange={(e) => setExpires(e.target.value)}
                  />
                </div>

                <div className="settings-group">
                  <div className="flex">
                    <label htmlFor="animation">Animation</label>
                    {/* Tooltip Wrapper */}
                    <div className="tooltip-container">
                      <img src={questionmark} alt="info" className="tooltip-icon" />
                      <span className="tooltip-text">Optional animation for Component.</span>
                    </div>
                  </div>
                  <select
                    id="animation"
                    value={animation}
                    onChange={(e) => setAnimation(e.target.value)}
                  ><option >select</option>
                    <option value="fade">Fade</option>
                    <option value="slide-up">Slide Up</option>
                    <option value="slide-down">Slide Down</option>
                    <option value="slide-left">Slide Left</option>
                    <option value="slide-right">Slide Right</option>
                  </select>
                </div>

                <div className="settings-group">
                  <div className="flex">
                    <label htmlFor="easing">Easing</label>
                    <div className="tooltip-container">
                      <img src={questionmark} alt="info" className="tooltip-icon" />
                      <span className="tooltip-text">Optional animation for easing.</span>
                    </div>
                  </div>
                  <select
                    id="easing"
                    value={easing}
                    onChange={(e) => setEasing(e.target.value.toLowerCase())}
                  >
                    <option >select</option>
                    <option value="ease">Ease</option>
                    <option value="linear">Linear</option>
                    <option value="ease-in">Ease-in</option>
                    <option value="ease-out">Ease-out</option>
                    <option value="ease-in-out">Ease-in-out</option>
                  </select>
                </div>

                <div className="settings-group">
                  <div className="flex">
                    <label htmlFor="language">Languages</label>
                    <div className="tooltip-container">
                      <img src={questionmark} alt="info" className="tooltip-icon" />
                      <span className="tooltip-text">Optional languages</span>
                    </div>
                  </div>
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

                {/* Cookie Settings - Visible only in Advanced Mode */}
                {activeMode === "Advanced" && (
                  <div className="cookie-settings">
                    <h3 className="cookie-title">Categories</h3>

                    {/* Essentials - Always active */}
                    <div className="cookie-category">
                      <span className="category-name">Essentials</span>
                      <span className="category-status">Always active</span>
                    </div>

                    {/* Dynamically render other categories */}
                    {Object.keys(cookiePreferences).map((category) => {
                      const isChecked = cookiePreferences[category];

                      return (
                        <label key={category} className="cookie-category">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleCategory(category)}
                          />
                          <span className="custom-checkbox"></span>
                          <span className="category-name">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </span>
                          <img
                            src={isChecked ? eye : openeye}
                            alt={isChecked ? "Enabled" : "Disabled"}
                            className="category-icon"
                          />
                        </label>
                      );
                    })}
                  </div>
                )}

                {/* Use Custom Toggle Button - Advanced Mode Only */}
                {activeMode === "Advanced" && (
                  <div className="togglediv">
                    <label className="toggle-container">
                      <span className="toggle-label">Use Custom toggle button</span>
                      <input
                        type="checkbox"
                        className="toggle-checkbox"
                        checked={toggleStates.customToggle}
                        onChange={() => handleToggle("customToggle")}
                      />
                      <div className={`toggle ${toggleStates.customToggle ? "toggled" : ""}`}></div>
                    </label>
                  </div>
                )}

                {/* Reset Interactions - Available in BOTH Simple & Advanced Modes */}
                <div className="togglediv">
                  <label className="toggle-container">
                    <span className="toggle-label">Reset interactions</span>
                    <input
                      type="checkbox"
                      className="toggle-checkbox"
                      checked={toggleStates.resetInteractions}
                      onChange={() => handleToggle("resetInteractions")}
                    />
                    <div className={`toggle ${toggleStates.resetInteractions ? "toggled" : ""}`}></div>
                  </label>
                </div>

                <div className="togglediv">
                  <label className="toggle-container">
                    <span className="toggle-label">Use Global Banner</span>
                    <input
                      type="checkbox"
                      className="toggle-checkbox"
                      checked={toggleStates.globalvariable}
                      onChange={() => handleToggle("globalvariable")}
                    />
                    <div className={`toggle ${toggleStates.globalvariable ? "toggled" : ""}`}></div>
                  </label>
                </div>

                {/* Conditionally render the settings-group */}
                {toggleStates.globalvariable && (
                  <div className="settings-group">
                    <div className="flex">
                      <label htmlFor="source">Source</label>
                      {/* Tooltip Wrapper */}
                      <div className="tooltip-container">
                        <img src={questionmark} alt="info" className="tooltip-icon" />
                        <span className="tooltip-text">pages of your site</span>
                      </div>
                    </div>
                    <select id="animation">
                      <option>select</option>
                      <option value="fade">Fade</option>
                      <option value="slide-up">Slide Up</option>
                      <option value="slide-down">Slide Down</option>
                      <option value="slide-left">Slide Left</option>
                      <option value="slide-right">Slide Right</option>
                    </select>
                  </div>
                )}


                {/* Disable Scroll - Advanced Mode Only */}
                {activeMode === "Advanced" ? (
                  <div className="togglediv">
                    <label className="toggle-container">
                      <span className="toggle-label">Disable scroll</span>
                      <input
                        type="checkbox"
                        className="toggle-checkbox"
                        checked={toggleStates.disableScroll}
                        onChange={() => handleToggle("disableScroll")}
                      />
                      <div className={`toggle ${toggleStates.disableScroll ? "toggled" : ""}`}></div>
                    </label>
                  </div>
                ) : null}

                {/* Store Consents - Advanced Mode Only */}
                {activeMode === "Advanced" && (
                  <div className="togglediv">
                    <label className="toggle-container">
                      <span className="toggle-label">Store consents</span>
                      <input
                        type="checkbox"
                        className="toggle-checkbox"
                        checked={toggleStates.storeConsents}
                        onChange={() => handleToggle("storeConsents")}
                      />
                      <div className={`toggle ${toggleStates.storeConsents ? "toggled" : ""}`}></div>
                    </label>
                  </div>
                )}


              </div>

              <div className="settings-group-preview">
                <h3>Preview</h3>
                <div className="preview-area">
                  <div
                    className={`cookie-banner ${animation} ${isActive ? "active" : ""}`}
                    style={{ transition: `transform 0.5s ${easing}, opacity 0.5s ${easing}` }}
                  >
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

                  <div>

                  </div>
                </div>
              </div>

            </div>
          )}
          {activeTab === "Customization" && <Customization />}
          {activeTab === "Script" && <Script />}
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
