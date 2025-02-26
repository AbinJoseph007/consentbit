import React, { useEffect, useRef, useState } from "react";
import iro from "@jaames/iro"; // Import iro.js
const left = new URL("../assets/align-left.png", import.meta.url).href;
const center = new URL("../assets/center.png", import.meta.url).href;
const right = new URL("../assets/right.png", import.meta.url).href;
const alignleft = new URL("../assets/align-right.png", import.meta.url).href;
const align = new URL("../assets/Group 184.png", import.meta.url).href;
const bigalign = new URL("../assets/Group 185.png", import.meta.url).href;
const justiflyleft = new URL("../assets/content-left.png", import.meta.url).href;
const justiflycenter = new URL("../assets/content-center.png", import.meta.url).href;
const justiflyright = new URL("../assets/content-right.png", import.meta.url).href;
const aligncenter = new URL("../assets/align-center.png", import.meta.url).href;
const checkdleft = new URL("../assets/Group 47.png", import.meta.url).href;
const checkedcenter = new URL("../assets/Group 125.png", import.meta.url).href;
const unchedcked = new URL("../assets/Group 126.png", import.meta.url).href;

const Customization: React.FC = () => {
  const [expires, setExpires] = useState("");
  const [animation, setAnimation] = useState("select");
  const [easing, setEasing] = useState("select");
  const [language, setLanguage] = useState("English");
  const [selected, setSelected] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Controls dropdown visibility
  const [color, setColor] = useState("#ff0000"); // Stores selected color

  const colorPickerRef = useRef<HTMLDivElement | null>(null);
  const pickerInstance = useRef<any>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    setIsActive(false);
    setTimeout(() => setIsActive(true), 50);
  }, [animation]);


  useEffect(() => {
    // Initialize iro.ColorPicker only once
    if (!pickerInstance.current && colorPickerRef.current) {
      pickerInstance.current = iro.ColorPicker(colorPickerRef.current, {
        width: 100,
        color: color,
        borderWidth: 2,
        borderColor: "#ccc",
      });

      // Update color state when color changes
      pickerInstance.current.on("color:change", (newColor: any) => {
        setColor(newColor.hexString);
      });
    }
  }, []);

  // Ensure color picker updates when reopened
  useEffect(() => {
    if (isOpen && pickerInstance.current) {
      pickerInstance.current.color.set(color);
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);


  return (
    <>
      {/* Main Container */}
      <div className="general">
        <div className="width-cust">
          <div className="cust">
            <div>
              <span className="font-blue">Orientation</span>
            </div>
            <div className="category-2 flex gap-4">
              {/* Left Image */}
              <img
  src={selected === "left" ? checkdleft : left}
  alt=""
  onClick={() => setSelected("left")}
  className="cursor-pointer"
/>
<img
  src={selected === "center" ? checkedcenter : center}
  alt=""
  onClick={() => setSelected("center")}
  className="cursor-pointer"
/>
<img
  src={selected === "right" ? right : unchedcked}
  alt=""
  onClick={() => setSelected("right")}
  className="cursor-pointer"
/>
            </div>
          </div>
          <div className="cust">
            <div>
              <span className="font-blue">Styles</span>
            </div>
            <div className="category-2">
              <img className="img-width" src={alignleft} alt="" />
              <img className="img-width" src={align} alt="" />
              <img src={bigalign} alt="" />
            </div>
            <div>
              <img className="img-width" src={aligncenter} alt="" />
            </div>
          </div>

          <div className="cust">
            <div>
              <span className="font-blue">Body</span>
            </div>

            <div className="settings-group">
              <select id="animation">
                <option>Inter</option>
                <option value="fade">Times New Roman</option>
                <option value="slide-up">Roboto</option>
                <option value="slide-down">Lato</option>
                <option value="slide-left">Montserrat</option>
                <option value="slide-right">Poppins</option>
              </select>
            </div>

            <div className="flex">
              <div className="settings-group">
                <select id="easing" >
                  <option>Semibold</option>
                  <option value="ease">thin</option>
                  <option value="linear">light</option>
                  <option value="ease-in">regular</option>
                  <option value="ease-out">bold</option>
                  <option value="ease-in-out">extra bold</option>
                </select>
              </div>

              <div className="settings-group width">
                <select id="font-weight" value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option>16</option>
                  <option>17</option>
                  <option>18</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex">
                <span>Alignment</span>
                <div className="category-3">
                  <img src={justiflyleft} alt="" />
                  <img src={justiflycenter} alt="" />
                  <img src={justiflyright} alt="" />
                </div>
              </div>
            </div>

            {/* Color Picker Section */}

          </div>

          <div className="cust">
            <div>
              <span>background Color</span>
              <div className="color-picker-dropdown" ref={dropdownRef}>
                {/* Button to Open Color Picker */}
                <button className="color-picker-button" onClick={() => setIsOpen(!isOpen)}>
                  <div className="color-preview" style={{ backgroundColor: color }}></div>
                  <span className="color-text">{color}</span>
                  <span className="dropdown-arrow">▼</span>
                </button>

                {/* Color Picker (Hidden/Shown with CSS) */}
                <div
                  ref={colorPickerRef}
                  className={`color-picker-container ${isOpen ? "visible" : "hidden"}`}
                ></div>
              </div>
            </div>

          </div>

          <div className="cust">
            <div className="flexy">
              <div className="flex-down">
                <div className="bottom">
                  <span className="font-blue">Container</span>
                </div>
                <div>
                  <span>Corner radius</span>
                  <div className="settings-group width">
                    <select id="font-weight">
                      <option>16</option>
                      <option>17</option>
                      <option>18</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex-down">
                <div className="bottom">
                  <span className="font-blue">Button</span>
                </div>
                <div>
                  <span>Corner radius</span>
                  <div className="settings-group width">
                    <select id="font-weight">
                      <option>16</option>
                      <option>17</option>
                      <option>18</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div>

            </div>
          </div>
        </div>

        <div className="settings-group-preview">
          <h3>Preview</h3>
          <div className="preview-area">
            <div
              className={`cookie-banner ${animation} ${isActive ? "active" : ""}`}
              style={{
                transition: `transform 0.5s ${easing}, opacity 0.5s ${easing}`,
                position: "absolute",
                bottom: "10px", // Ensure it's at the bottom
                left: selected === "left" ? "10px" : selected === "center" ? "50%" : "auto",
                right: selected === "right" ? "10px" : "auto",
                transform: selected === "center" ? "translateX(-50%)" : "none",
              }}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Customization;


// value={language} onChange={(e) => setLanguage(e.target.value)}>

// value={animation} onChange={(e) => setAnimation(e.target.value)}