import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./style/styless.css";
import Customization from "./components/Customization";
import Script from "./components/Script";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("General Settings");

  return (
    <div className="app">
      {/* Top Navigation */}
      <div className="navbar">
        <div>
          <h2>CookieAPP</h2>
        </div>
        <div>
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
        <a className="link" href="#">You need a subscription to publish the production <i>&#x2197;</i></a>
        <button>Create Component</button>
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
          <input type="text" id="expires" placeholder="120s" />
        </div>
  
        <div className="settings-group">
          <label htmlFor="animation">Animation</label>
          <select id="animation">
            <option>Fade</option>
            <option>Slide Up</option>
            <option>Slide Down</option>
            <option>Slide Left</option>
            <option>Slide Right</option>
          </select>
        </div>
  
        <div className="settings-group">
          <label htmlFor="easing">Easing</label>
          <select id="easing">
            <option>Ease</option>
            <option>Linear</option>
            <option>Ease-in</option>
            <option>Ease-out</option>
            <option>Ease-in-out</option>
          </select>
        </div>
  
        <div className="settings-group">
          <label htmlFor="language">Language</label>
          <select id="language">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
      </div>

      <div>
        {/* Move the Preview Panel inside settings-group */}
        <div className="settings-group-preview">
          <h3>Preview</h3>
         <div className="preview-area">
            <div className="cookie-banner">
              <div><span>Cookie consent content here...</span></div>
              <div>
                <button className="btn-preferences">Preferences</button>
                <button className="btn-reject">Reject</button>
                <button className="btn-accept">Ok, Got it</button>
              </div>
            </div>
         </div>
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


{/* <div className="preview-panel">
<div className="cookie-banner">
  <span>Cookie consent content here...</span>
  <div>
    <button className="btn-preferences">Preferences</button>
    <button className="btn-reject">Reject</button>
    <button className="btn-accept">Ok, Got it</button>
  </div>
</div>
</div> */}