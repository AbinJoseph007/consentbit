import React, { useEffect, useRef, useState } from "react";
import iro from "@jaames/iro"; // Import iro.js
const left = new URL("../assets/align-left.png", import.meta.url).href;
const center = new URL("../assets/center.png", import.meta.url).href;
const right = new URL("../assets/right.png", import.meta.url).href;
const justiflyleft = new URL("../assets/content-left.png", import.meta.url).href;
const justiflycenter = new URL("../assets/content-center.png", import.meta.url).href;
const justiflyright = new URL("../assets/content-right.png", import.meta.url).href;
const checkdleft = new URL("../assets/Group 47.png", import.meta.url).href;
const checkedcenter = new URL("../assets/Group 125.png", import.meta.url).href;
const unchedcked = new URL("../assets/Group 126.png", import.meta.url).href;
const normalchecked = new URL("../assets/normal.png", import.meta.url).href;
const normalstyle = new URL("../assets/normal style.png", import.meta.url).href;
const bigstyle = new URL("../assets/big style.png", import.meta.url).href;
const centeralign = new URL("../assets/center style.png", import.meta.url).href;



interface CustomizationProps {
  animation: string;
  setAnimation: (value: string) => void;
  easing: string;
  setEasing: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
  weight: string;
  SetWeight: (value: string) => void;
  size: string;
  SetSize: (value: string) => void;
  selected: string;
  setSelected: (value: string) => void;
  Font: string;
  SetFont: (value: string) => void;
  selectedtext: "left" | "center" | "right";  // ✅ Restrict to valid values
  settextSelected: (value: "left" | "center" | "right") => void;  // ✅ Ensure setter only accepts valid values
  style: string;
  setStyle: (value: string) => void;

}

const Customization: React.FC<CustomizationProps> = ({
  animation,
  setAnimation,
  easing,
  setEasing,
  language,
  setLanguage,
  weight,
  SetWeight,
  size,
  SetSize,
  selected,
  setSelected,
  Font,
  SetFont,
  selectedtext,
  settextSelected,
  style,
  setStyle

}) => {
  // const [selected, setSelected] = useState("right");
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState("#ff0000");
  const colorPickerRef = useRef<HTMLDivElement | null>(null);
  const pickerInstance = useRef<any>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsActive(false);
    setTimeout(() => setIsActive(true), 50);
  }, [animation]);

  useEffect(() => {
    document.body.style.fontFamily = Font;
  }, [Font]);

  useEffect(() => {
    if (!pickerInstance.current && colorPickerRef.current) {
      pickerInstance.current = iro.ColorPicker(colorPickerRef.current, {
        width: 100,
        color: color,
        borderWidth: 2,
        borderColor: "#ccc",
      });

      pickerInstance.current.on("color:change", (newColor: any) => {
        setColor(newColor.hexString);
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen && pickerInstance.current) {
      pickerInstance.current.color.set(color);
    }
  }, [isOpen]);

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
              <img className="img-width cursor-pointer" src={normalchecked} alt="Align icon" style={{ opacity: style === "align" ? 1 : 0.4 }} onClick={() => setStyle(style === "align" ? "" : "align")} />
              <img className="img-width cursor-pointer" src={normalstyle} alt="Align icon" style={{ opacity: style === "alignstyle" ? 1 : 0.4 }} onClick={() => setStyle(style === "alignstyle" ? "" : "alignstyle")} />
              <img src={bigstyle} alt="Align icon" style={{ opacity: style === "bigstyle" ? 1 : 0.4 }} onClick={() => setStyle(style === "bigstyle" ? "" : "bigstyle")} />
            </div>
            <div>
              <img
                className="img-width cursor-pointer"
                src={centeralign}
                alt="Align icon"
                style={{ opacity: style === "centeralign" ? 1 : 0.4 }}
                onClick={() => setStyle(style === "centeralign" ? "" : "centeralign")}
              />
            </div>
          </div>

          <div className="cust">
            <div>
              <span className="font-blue">Body</span>
            </div>

            <div className="settings-group">
              <select id="Font" value={Font} onChange={(e) => SetFont(e.target.value)}>
                <option value="Inter">Inter</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="'Roboto', sans-serif">Roboto</option>
                <option value="'Lato', sans-serif">Lato</option>
                <option value="'Montserrat', sans-serif">Montserrat</option>
                <option value="'Poppins', sans-serif">Poppins</option>
              </select>

            </div>

            <div className="flex">
              <div className="settings-group">
                <select id="weight" value={weight} onChange={(e) => SetWeight(e.target.value)}>
                  <option value="600">Semibold</option>
                  <option value="100">Thin</option>
                  <option value="300">Light</option>
                  <option value="400">Regular</option>
                  <option value="700">Bold</option>
                  <option value="800">Extra Bold</option>
                </select>
              </div>

              <div className="settings-group width">
                <select id="font-size" value={size} onChange={(e) => SetSize(e.target.value)}>
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
                  <img src={justiflyleft} alt="Left Align" style={{ opacity: selectedtext === "left" ? 1 : 0.4 }} onClick={() => settextSelected("left")} />
                  <img src={justiflycenter} alt="Center Align" style={{ opacity: selectedtext === "center" ? 1 : 0.4 }} onClick={() => settextSelected("center")} />
                  <img src={justiflyright} alt="Right Align" style={{ opacity: selectedtext === "right" ? 1 : 0.4 }} onClick={() => settextSelected("right")} />
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
                    <select id="border-radius">
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
                fontFamily: Font,
                textAlign: selectedtext,
                alignItems: style === "centeralign" ? "center" : undefined, // Change dynamically
                fontWeight: weight, // Apply font weight dynamically
              }}
            >
              <div className="space"><h4>Cookie Setting</h4></div>

              <div className="padding">
                <span>
                  {language === "English"
                    ? "We use cookies to provide you with the best possible experience. They also allow us to analyze user behavior in order to constantly improve the website for you."
                    : language === "Spanish"
                      ? "Utilizamos cookies para brindarle la mejor experiencia posible. También nos permiten analizar el comportamiento del usuario para mejorar constantemente el sitio web para usted."
                      : "Nous utilisons des cookies pour vous offrir la meilleure expérience possible. Ils nous permettent également d’analyser le comportement des utilisateurs afin d’améliorer constamment le site Web pour vous."}
                </span>

              </div>
              <div className="button-wrapp">
                <button className="btn-preferences">Preferences</button>
                <button className="btn-reject">Reject</button>
                <button className="btn-accept">Ok, Got it</button>
              </div>
            </div>
          </div>
          <div>
            <div className="preference-banner">
              <div>

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

{/* <img src={justiflyright} alt="Right Align" onClick={() => settextSelected("right")} /> */ }