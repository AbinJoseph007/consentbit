import React, { useEffect, useRef, useState } from "react";
import iro from "@jaames/iro"; // Import iro.js
const left = new URL("../assets/left unchecked.svg", import.meta.url).href;
const center = new URL("../assets/center unchecked.svg", import.meta.url).href;
const right = new URL("../assets/right checked.svg", import.meta.url).href;
const justiflyleft = new URL("../assets/content-left.png", import.meta.url).href;
const justiflycenter = new URL("../assets/content-center.png", import.meta.url).href;
const justiflyright = new URL("../assets/content-right.png", import.meta.url).href;
const checkdleft = new URL("../assets/left checked.svg", import.meta.url).href;
const checkedcenter = new URL("../assets/center checked.svg", import.meta.url).href;
const unchedcked = new URL("../assets/right unchecked.svg", import.meta.url).href;
const normalchecked = new URL("../assets/normal banner.svg", import.meta.url).href;
const normalstyle = new URL("../assets/double banner.svg", import.meta.url).href;
const bigstyle = new URL("../assets/big banner.svg", import.meta.url).href;
const centeralign = new URL("../assets/center aligned.svg", import.meta.url).href;
const fullwidth = new URL("../assets/full width banner.svg", import.meta.url).href;
const dots = new URL("../assets/3 dots.svg", import.meta.url).href;
const line = new URL("../assets/Vector 20.svg", import.meta.url).href;
const questionmark = new URL("../assets/question.svg", import.meta.url).href;
const logo = new URL("../assets/icon.svg", import.meta.url).href;





type Orientation = "left" | "center" | "right";
type BannerStyle = "align" | "alignstyle" | "bigstyle" | "centeralign" | "fullwidth" | "";

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
  selected: Orientation;
  setSelected: React.Dispatch<React.SetStateAction<Orientation>>;
  Font: string;
  SetFont: (value: string) => void;
  selectedtext: "left" | "center" | "right";
  settextSelected: (value: "left" | "center" | "right") => void;
  style: BannerStyle;
  setStyle: React.Dispatch<React.SetStateAction<BannerStyle>>;
  borderRadius: number;
  setBorderRadius: (value: number) => void;
  buttonRadius: number;
  setButtonRadius: (value: number) => void;
  color: string;
  setColor: (value: string) => void;
  bgColor: string;
  setBgColor: (value: string) => void;
  btnColor: string;
  setBtnColor: (value: string) => void;
  headColor: string;
  setHeadColor: (value: string) => void;
  paraColor: string;
  setParaColor: (value: string) => void;
  secondcolor: string;
  setSecondcolor: (value: string) => void;
  bgColors: string;
  setBgColors: (value: string) => void;
  secondbuttontext: string;
  setsecondbuttontext: (value: string) => void;
  primaryButtonText: string
  setPrimaryButtonText: (value: string) => void;

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
  setStyle,
  buttonRadius,
  setButtonRadius,
  borderRadius,
  setBorderRadius,
  color,
  setColor,
  bgColor,
  setBgColor,
  btnColor,
  setBtnColor,
  headColor,
  setHeadColor,
  paraColor,
  setParaColor,
  secondcolor,
  setSecondcolor,
  bgColors,
  setBgColors,
  secondbuttontext,
  setsecondbuttontext,
  primaryButtonText,
  setPrimaryButtonText,
}) => {
  // const [selected, setSelected] = useState("right");
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDiv, setShowDiv] = useState(false); // State to toggle visibility
  const colorPickerRef = useRef<HTMLDivElement | null>(null);
  const pickerInstance = useRef<any>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // const [secondbuttontext, setsecondbuttontext] = useState("#4C4A66")
  // const [primaryButtonText, setPrimaryButtonText] = useState('#FFFFFF'); // Initial color (black)

  const [btnOpen, setBtnOpen] = useState(false);
  const [headOpen, setHeadOpen] = useState(false);
  const [paraOpen, setParaOpen] = useState(false);
  const [secondbuttonOpen, setSecondButtonOpen] = useState(false);
  const [secondbgOpen, setSecondbgopen] = useState(false)
  const [SecondbuttonTextOpen, setSecondbuttonTextOpen] = useState(false)
  const [primaryButtonTextOpen, setPrimaryButtonTextOpen] = useState(false);



  const btnPickerRef = useRef<HTMLDivElement | null>(null);
  const headPickerRef = useRef<HTMLDivElement | null>(null);
  const paraPickerRef = useRef<HTMLDivElement | null>(null);
  const secondbtnPickerRef = useRef<HTMLDivElement | null>(null);
  const secondbgPickerRef = useRef<HTMLDivElement | null>(null);
  const SecondbuttonTextPickerRef = useRef<HTMLDivElement | null>(null);
  const primaryButtonTextPickerRef = useRef<HTMLDivElement>(null);


  const btnPickerInstance = useRef<any>(null);
  const headPickerInstance = useRef<any>(null);
  const paraPickerInstance = useRef<any>(null);
  const secondbtnPickerInstance = useRef<any>(null);
  const secondbgPickerInstance = useRef<any>(null);
  const SecondbuttonTextInstance = useRef<any>(null);
  const primaryButtonTextInstance = useRef<iro.ColorPicker | null>(null);


  const btnDropdownRef = useRef<HTMLDivElement | null>(null);
  const headDropdownRef = useRef<HTMLDivElement | null>(null);
  const paraDropdownRef = useRef<HTMLDivElement | null>(null);
  const secondbtnDropdownRef = useRef<HTMLDivElement | null>(null);
  const secondbgDropdownRef = useRef<HTMLDivElement | null>(null);
  const secondbuttonDropdownRef = useRef<HTMLDivElement | null>(null);
  const primaryButtonTextDropdownRef = useRef<HTMLDivElement>(null);


  const handleBorderRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBorderRadius(Number(e.target.value));
  };

  const handleButtonRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setButtonRadius(Number(e.target.value));
  };

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

  const previewDimensions = React.useMemo(() => {
    switch (style) {
      case "bigstyle":
        return { width: "250px", minHeight: "151px" };
      case "fullwidth":
        return { width: "443px", dislay: "flex" };
      case "centeralign":
        return { width: "303px" };
      default:
        return { width: "318px" }; // Default
    }
  }, [style]);
  // ---

  useEffect(() => {
    // Initialize all color pickers

    if (!btnPickerInstance.current && btnPickerRef.current) {
      btnPickerInstance.current = iro.ColorPicker(btnPickerRef.current, { width: 100, color: btnColor, borderWidth: 2, borderColor: "#ccc" });
      btnPickerInstance.current.on("color:change", (newColor: any) => setBtnColor(newColor.hexString));
    }
    if (!headPickerInstance.current && headPickerRef.current) {
      headPickerInstance.current = iro.ColorPicker(headPickerRef.current, { width: 100, color: headColor, borderWidth: 2, borderColor: "#ccc" });
      headPickerInstance.current.on("color:change", (newColor: any) => setHeadColor(newColor.hexString));
    }
    if (!paraPickerInstance.current && paraPickerRef.current) {
      paraPickerInstance.current = iro.ColorPicker(paraPickerRef.current, { width: 100, color: paraColor, borderWidth: 2, borderColor: "#ccc" });
      paraPickerInstance.current.on("color:change", (newColor: any) => setParaColor(newColor.hexString));
    }
    if (!secondbtnPickerInstance.current && secondbtnPickerRef.current) {
      secondbtnPickerInstance.current = iro.ColorPicker(secondbtnPickerRef.current, { width: 100, color: secondcolor, borderWidth: 2, borderColor: "#ccc" });
      secondbtnPickerInstance.current.on("color:change", (newColor: any) => setSecondcolor(newColor.hexString));
    }
    if (!secondbgPickerInstance.current && secondbgPickerRef.current) {
      secondbgPickerInstance.current = iro.ColorPicker(secondbgPickerRef.current, { width: 100, color: bgColors, borderWidth: 2, borderColor: "#ccc" });
      secondbgPickerInstance.current.on("color:change", (newColor: any) => setBgColors(newColor.hexString));
    }
    if (!SecondbuttonTextInstance.current && SecondbuttonTextPickerRef.current) {
      SecondbuttonTextInstance.current = iro.ColorPicker(SecondbuttonTextPickerRef.current, { width: 100, color: secondbuttontext, borderWidth: 2, borderColor: "#ccc" });
      SecondbuttonTextInstance.current.on("color:change", (newColor: any) => setsecondbuttontext(newColor.hexString));
    }
    if (!primaryButtonTextInstance.current && primaryButtonTextPickerRef.current) {
      primaryButtonTextInstance.current = iro.ColorPicker(primaryButtonTextPickerRef.current, { width: 100, color: primaryButtonText, borderWidth: 2, borderColor: "#ccc" });
      primaryButtonTextInstance.current.on("color:change", (newColor: any) => setPrimaryButtonText(newColor.hexString));
    }
  }, []);

  useEffect(() => {
    // Sync picker color with state when dropdown opens
    if (btnOpen && btnPickerInstance.current) btnPickerInstance.current.color.set(btnColor);
    if (headOpen && headPickerInstance.current) headPickerInstance.current.color.set(headColor);
    if (paraOpen && paraPickerInstance.current) paraPickerInstance.current.color.set(paraColor);
    if (secondbuttonOpen && secondbtnPickerInstance.current) secondbtnPickerInstance.current.color.set(secondcolor);
    if (secondbgOpen && secondbgPickerInstance.current) secondbgPickerInstance.current.color.set(bgColors);
    if (SecondbuttonTextOpen && SecondbuttonTextInstance.current) SecondbuttonTextInstance.current.color.set(secondbuttontext);
    if (primaryButtonTextOpen && primaryButtonTextInstance.current) primaryButtonTextInstance.current.color.set(primaryButtonText);


  }, [btnOpen, headOpen, paraOpen, secondbuttonOpen, secondbgOpen, SecondbuttonTextOpen, primaryButtonTextOpen]);

  useEffect(() => {
    // Handle click outside to close dropdowns
    function handleClickOutside(event: MouseEvent) {

      if (btnOpen && btnDropdownRef.current && !btnDropdownRef.current.contains(event.target as Node) && btnPickerRef.current && !btnPickerRef.current.contains(event.target as Node)) setBtnOpen(false);
      if (headOpen && headDropdownRef.current && !headDropdownRef.current.contains(event.target as Node) && headPickerRef.current && !headPickerRef.current.contains(event.target as Node)) setHeadOpen(false);
      if (paraOpen && paraDropdownRef.current && !paraDropdownRef.current.contains(event.target as Node) && paraPickerRef.current && !paraPickerRef.current.contains(event.target as Node)) setParaOpen(false);
      if (secondbuttonOpen && secondbtnDropdownRef.current && !secondbtnDropdownRef.current.contains(event.target as Node) && secondbtnPickerRef.current && !secondbtnPickerRef.current.contains(event.target as Node)) setSecondButtonOpen(false);
      if (secondbgOpen && secondbgDropdownRef.current && !secondbgDropdownRef.current.contains(event.target as Node) && secondbgPickerRef.current && !secondbgPickerRef.current.contains(event.target as Node)) setSecondbgopen(false);
      if (SecondbuttonTextOpen && secondbuttonDropdownRef.current && !secondbuttonDropdownRef.current.contains(event.target as Node) && SecondbuttonTextPickerRef.current && !SecondbuttonTextPickerRef.current.contains(event.target as Node)) setSecondbuttonTextOpen(false);
      if (primaryButtonTextOpen && primaryButtonTextDropdownRef.current && !primaryButtonTextDropdownRef.current.contains(event.target as Node) && primaryButtonTextPickerRef.current && !primaryButtonTextPickerRef.current.contains(event.target as Node)) setPrimaryButtonTextOpen(false);
    }

    if (btnOpen || headOpen || paraOpen || secondbuttonOpen || secondbgOpen || SecondbuttonTextOpen || primaryButtonTextOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [btnOpen, headOpen, paraOpen, secondbuttonOpen, secondbgOpen, SecondbuttonTextOpen, primaryButtonTextOpen]);

  return (
    <>
      {/* Main Container */}
      <div className="general">
        <div className="width-cust">
          <div className="cust">
            {/* <div>
              <span className="font-blue">Orientation</span>
            </div> */}
            <div className="flex">
              <span className="font-blue">Cookie Banner Alignment</span>

              <div className="tooltip-containers">
                <img src={questionmark} alt="info" className="tooltip-icon" />
                <span className="tooltip-text">Adjust the cookie banner's alignment for optimal placement on your site.</span>
              </div>
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
            <div className="flex">
              <span className="font-blue">Cookie Banner Styles</span>

              <div className="tooltip-containers">
                <img src={questionmark} alt="info" className="tooltip-icon" />
                <span className="tooltip-text">Customize the appearance of the cookie banner to match your site's design.</span>
              </div>
            </div>
            <div className="category-2">
              <img className="img-width cursor-pointer" src={normalchecked} alt="Align icon" style={{ opacity: style === "align" ? 1 : 0.4 }} onClick={() => setStyle(style === "align" ? "" : "align")} />
              <img className="img-width cursor-pointer" src={normalstyle} alt="Align icon" style={{ opacity: style === "alignstyle" ? 1 : 0.4 }} onClick={() => setStyle(style === "alignstyle" ? "" : "alignstyle")} />
              <img src={bigstyle} alt="Align icon" style={{ opacity: style === "bigstyle" ? 1 : 0.4 }} onClick={() => setStyle(style === "bigstyle" ? "" : "bigstyle")} />
            </div>
            <div className="category-2">
              <img
                className="img-width cursor-pointer"
                src={centeralign}
                alt="Align icon"
                style={{ opacity: style === "centeralign" ? 1 : 0.4 }}
                onClick={() => setStyle(style === "centeralign" ? "" : "centeralign")}
              />
              <img
                className="img-width cursor-pointer"
                src={fullwidth}
                alt="Full Width icon"
                style={{ opacity: style === "fullwidth" ? 1 : 0.4 }}
                onClick={() => setStyle(style === "fullwidth" ? "" : "fullwidth")}
              />
            </div>
          </div>

          <div className="custs">
            {/* <div className="font-blues">
              <span className="font-blue">Body</span>
            </div> */}
            <div className="flexs">
              <span className="font-blues">Typography</span>
              <div className="tooltip-containers">
                <img src={questionmark} alt="info" className="tooltip-icon" />
                <span className="tooltip-text">Customize font styles and sizes to enhance readability and design.</span>
              </div>
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
          <div><img src={line} alt="" /></div>

          <div className="cust">
            <div className="flex">
              <span className="font-blue">Colours</span>
              <div className="tooltip-containers">
                <img src={questionmark} alt="info" className="tooltip-icon" />
                <span className="tooltip-text">"Customize the colors to match your site's branding and design.</span>
              </div>
            </div>
            <div className="custom">
              <div className="customs">
                <div>
                  <span>Banner Background </span>
                  <div className="color-picker-dropdown" ref={dropdownRef}>
                    {/* Button to Open Color Picker */}
                    <button className="color-picker-button" onClick={() => setIsOpen(!isOpen)}>
                      <span className="color-text">{color}</span>
                      <div className="color-preview" style={{ backgroundColor: color }}></div>
                      {/* <span className="dropdown-arrow">▼</span> */}
                    </button>

                    {/* Color Picker (Hidden/Shown with CSS) */}
                    <div
                      ref={colorPickerRef}
                      className={`color-picker-container ${isOpen ? "visible" : "hidden"}`}
                    ></div>
                  </div>
                </div>

                {style === "alignstyle" &&
                  <div>
                    <span>Second Backgorund</span>
                    <div className="color-picker-dropdown" ref={secondbgDropdownRef}>
                      <button className="color-picker-button" onClick={() => setSecondbgopen(!secondbgOpen)}>
                        <span className="color-text">{bgColors}</span>
                        <div className="color-preview" style={{ backgroundColor: bgColors }}></div>
                        {/* <span className="dropdown-arrow">▼</span> */}
                      </button>
                      <div ref={secondbgPickerRef} className={`color-picker-container ${secondbgOpen ? "visible" : "hidden"}`}></div>
                    </div>
                  </div>
                }
              </div>

              <div className="customs">
                <div>
                  <span>Body Text Color</span>
                  <div className="color-picker-dropdown" ref={paraDropdownRef}>
                    <button className="color-picker-button" onClick={() => setParaOpen(!paraOpen)}>
                      <span className="color-text">{paraColor}</span>
                      <div className="color-preview" style={{ backgroundColor: paraColor }}></div>
                      {/* <span className="dropdown-arrow">▼</span> */}
                    </button>
                    <div ref={paraPickerRef} className={`color-picker-container ${paraOpen ? "visible" : "hidden"}`}></div>
                  </div>
                </div>
                <div>
                  <span>Title Text Color</span>
                  <div className="color-picker-dropdown" ref={headDropdownRef}>
                    <button className="color-picker-button" onClick={() => setHeadOpen(!headOpen)}>
                      <span className="color-text">{headColor}</span>
                      <div className="color-preview" style={{ backgroundColor: headColor }}></div>
                      {/* <span className="dropdown-arrow">▼</span> */}
                    </button>
                    <div ref={headPickerRef} className={`color-picker-container ${headOpen ? "visible" : "hidden"}`}></div>
                  </div>
                </div>
              </div>

              <div className="flex">
                <span className="font-blue">Primary button </span>
                <div className="tooltip-containers">
                  <img src={questionmark} alt="info" className="tooltip-icon" />
                  <span className="tooltip-text">"Customize the colors to match your site's branding and design.</span>
                </div>
              </div>
              <div className="customs">

                <div>
                  <span>Background Colour</span>
                  <div className="color-picker-dropdown" ref={secondbtnDropdownRef}>
                    <button className="color-picker-button" onClick={() => setSecondButtonOpen(!secondbuttonOpen)}>
                      <span className="color-text">{secondcolor}</span>
                      <div className="color-preview" style={{ backgroundColor: secondcolor }}></div>
                      {/* <span className="dropdown-arrow">▼</span> */}
                    </button>
                    <div ref={secondbtnPickerRef} className={`color-picker-container ${secondbuttonOpen ? "visible" : "hidden"}`}></div>
                  </div>
                </div>

                <div>
                  <span>Text Colour</span>
                  <div className="color-picker-dropdown" ref={primaryButtonTextDropdownRef}>
                    <button className="color-picker-button" onClick={() => setPrimaryButtonTextOpen(!primaryButtonTextOpen)}>
                      <span className="color-text">{primaryButtonText}</span>
                      <div className="color-preview" style={{ backgroundColor: primaryButtonText }}></div>
                      {/* <span className="dropdown-arrow">▼</span> */}
                    </button>
                    <div ref={primaryButtonTextPickerRef} className={`color-picker-container ${primaryButtonTextOpen ? "visible" : "hidden"}`}></div>
                  </div>
                </div>
              </div>

              <div className="flex">
                <span className="font-blue">Secondary button</span>
                <div className="tooltip-containers">
                  <img src={questionmark} alt="info" className="tooltip-icon" />
                  <span className="tooltip-text">"Customize the colors to match your site's branding and design.</span>
                </div>
              </div>

              <div className="customs">
                <div>
                  <span>Secondry Button</span>
                  <div className="color-picker-dropdown" ref={btnDropdownRef}>
                    <button className="color-picker-button" onClick={() => setBtnOpen(!btnOpen)}>
                      <span className="color-text">{btnColor}</span>
                      <div className="color-preview" style={{ backgroundColor: btnColor }}></div>
                      {/* <span className="dropdown-arrow">▼</span> */}
                    </button>
                    <div ref={btnPickerRef} className={`color-picker-container ${btnOpen ? "visible" : "hidden"}`}></div>
                  </div>
                </div>

                <div>
                  <span>second button text</span>
                  <div className="color-picker-dropdown" ref={secondbuttonDropdownRef}>
                    <button className="color-picker-button" onClick={() => setSecondbuttonTextOpen(!SecondbuttonTextOpen)}>
                      <span className="color-text">{secondbuttontext}</span>
                      <div className="color-preview" style={{ backgroundColor: secondbuttontext }}></div>
                      {/* <span className="dropdown-arrow">▼</span> */}
                    </button>
                    {/* Make sure this ref matches the one used in the first useEffect */}
                    <div ref={SecondbuttonTextPickerRef} className={`color-picker-container ${SecondbuttonTextOpen ? "visible" : "hidden"}`}></div>
                  </div>
                </div>
              </div>



            </div>

          </div>

          <div className="cust">
            <div className="flexs">
              <span className="font-blue">Corner Radius</span>
              <div className="tooltip-containers">
                <img src={questionmark} alt="info" className="tooltip-icon" />
                <span className="tooltip-text">Adjust the corner radius of buttons and containers in the cookie banner.</span>
              </div>
            </div>
            <div className="flexy">

              <div className="flex-down">

                {/* <div className="bottom">
                  <span className="font-blue">Corner radius</span>
                </div> */}
                <div>
                  <span>Container</span>
                  <div className="settings-groups width">
                    <input
                      type="number"
                      id="border-radius"
                      value={borderRadius}
                      min="0"
                      step="1"
                      onChange={handleBorderRadiusChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-down">
                {/* <div className="bottom">
                  <span className="font-blue">Button</span>
                </div> */}
                <div>
                  <span>Button</span>
                  <div className="settings-groups width">
                    <input
                      type="number"
                      id="border-radius-button"
                      value={buttonRadius}
                      min="0"
                      step="1"
                      onChange={handleButtonRadiusChange}
                    />
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
            <div className="topbar">
              <img src={dots} alt="" className="threedots" />
            </div>
            <div className="consentbit-logo">
              <img src={logo} alt="" />
            </div>
            {/* gdpr */}
            <div
              className={`cookie-banner ${animation} ${isActive ? "active" : ""}`}
              style={{
                transition: `transform 0.5s ${easing}, opacity 0.5s ${easing}`,
                position: "absolute",
                ...(style !== "fullwidth" && {
                  bottom: "16px",
                  left: selected === "left" ? "16px" : selected === "center" ? "50%" : "auto",
                  right: selected === "right" ? "16px" : "auto",
                  transform: selected === "center" ? "translateX(-50%)" : "none",
                }),
                transform: selected === "center" ? "translateX(-50%)" : "none",
                fontFamily: Font,
                textAlign: selectedtext,
                alignItems: style === "centeralign" ? "center" : undefined, // Change dynamically
                fontWeight: weight,
                width: previewDimensions.width,
                height: previewDimensions.minHeight,
                borderRadius: `${borderRadius}px`,
                backgroundColor: color,
              }}
            >
              {style === "alignstyle" && <div className="secondclass" style={{ backgroundColor: bgColors, borderBottomRightRadius: `${borderRadius}px`, borderTopRightRadius: `${borderRadius}px` }}></div>}
              <div className="space" style={{ color: headColor, fontWeight: weight, }}><h4>Cookie Setting</h4></div>

              <div className="padding" style={{ color: paraColor, alignItems: style === "centeralign" ? "center" : undefined, }}>
                <span style={{ alignItems: style === "centeralign" ? "center" : undefined, }}>
                  {language === "English"
                    ? "We use cookies to provide you with the best possible experience. They also allow us to analyze user behavior in order to constantly improve the website for you."
                    : language === "Spanish"
                      ? "Utilizamos cookies para brindarle la mejor experiencia posible. También nos permiten analizar el comportamiento del usuario para mejorar constantemente el sitio web para usted."
                      : "Nous utilisons des cookies pour vous offrir la meilleure expérience possible. Ils nous permettent également d’analyser le comportement des utilisateurs afin d’améliorer constamment le site Web pour vous."}
                </span>

              </div>
              <div className="button-wrapp" style={{ justifyContent: style === "centeralign" ? "center" : undefined, }}>
                <button className="btn-preferences" style={{ borderRadius: `${buttonRadius}px`, backgroundColor: btnColor, color: secondbuttontext }} >Preferences</button>
                <button className="btn-reject" style={{ borderRadius: `${buttonRadius}px`, backgroundColor: btnColor, color: secondbuttontext }} >Reject</button>
                <button className="btn-accept" style={{ borderRadius: `${buttonRadius}px`, backgroundColor: secondcolor, color: primaryButtonText }} >Accept</button>
              </div>
            </div>

            {/* ccpa banner */}
            {/* <div
              className={`cookie-banner ${animation} ${isActive ? "active" : ""}`}
              style={{
                transition: `transform 0.5s ${easing}, opacity 0.5s ${easing}`,
                position: "absolute",
                ...(style !== "fullwidth" && {
                  bottom: "10px",
                  left: selected === "left" ? "10px" : selected === "center" ? "50%" : "auto",
                  right: selected === "right" ? "10px" : "auto",
                  transform: selected === "center" ? "translateX(-50%)" : "none",
                }),
                transform: selected === "center" ? "translateX(-50%)" : "none",
                fontFamily: Font,
                textAlign: selectedtext,
                alignItems: style === "centeralign" ? "center" : undefined, // Change dynamically
                fontWeight: weight, 
                width: previewDimensions.width,
                height: previewDimensions.height,
                borderRadius: `${borderRadius}px`,
                backgroundColor: color,
              }}
            >
              {style === "alignstyle" && <div className="secondclass" style={{ backgroundColor: bgColors , borderBottomRightRadius:`${borderRadius}px` , borderTopRightRadius:`${borderRadius}px` }}></div>}
              <div className="space" style={{ color: headColor, fontWeight: weight, marginBottom:"0px" }}><h4>We value your Privacy</h4></div>

              <div className="padding" style={{ color: paraColor , alignItems: style === "centeralign" ? "center" : undefined, }}>
                <span  style={{ alignItems: style === "centeralign" ? "center" : undefined, }}>
                  {language === "English"
                    ? "We use cookies to provide you with the best possible experience. They also allow us to analyze user behavior in order to constantly improve the website for you."
                    : language === "Spanish"
                      ? "Utilizamos cookies para brindarle la mejor experiencia posible. También nos permiten analizar el comportamiento del usuario para mejorar constantemente el sitio web para usted."
                      : "Nous utilisons des cookies pour vous offrir la meilleure expérience possible. Ils nous permettent également d’analyser le comportement des utilisateurs afin d’améliorer constamment le site Web pour vous."}
                </span>

              </div>
              <div className="button-wrapp"  style={{ justifyContent:  style === "centeralign" ? "center" : undefined, }}>
                
                <p className="btn-accept" style={{ borderRadius: `${buttonRadius}px`, backgroundColor: secondcolor }} >do not share my Personal informations</p>
              </div>
            </div> */}

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
