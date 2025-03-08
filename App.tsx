// import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom/client";
// import "./style/styless.css";
// // import Customization from "./components/Customization"; // Comment out until component is available
// // import { ConsentBanner, useConsentManager } from "./cookieBanner";
// import { motion } from "framer-motion";

// const questionmark = new URL("./assets/questionmark.png", import.meta.url).href;
// const openeye = new URL("./assets/closedeye.png", import.meta.url).href;
// const eye = new URL("./assets/eye.png", import.meta.url).href;

// declare const Webflow: {
//   getSelectedElement: () => Promise<{
//     before: (preset: any) => Promise<{
//       setInnerHTML: (html: string) => Promise<void>;
//     }>;
//   }>;
//   elementPresets: {
//     DivBlock: any;
//   };
// };

// const App: React.FC = () => {
//   const [activeTab, setActiveTab] = useState("General Settings");
//   const [expires, setExpires] = useState("");
//   const [animation, setAnimation] = useState("select");
//   const [easing, setEasing] = useState("select");
//   const [size, setSize] = useState("16");
//   const [isActive, setIsActive] = useState(false);
//   const [Font, SetFont] = useState("");
//   const [selectedtext, settextSelected] = useState("left");
//   const [style, setStyle] = useState("align");
//   const [activeMode, setActiveMode] = useState("Simple");
//   const [selected, setSelected] = useState("right");
//   const [selectedOption, setSelectedOption] = useState("US State laws");
//   const [weight, setWeight] = useState("semibold");
//   const [language, setLanguage] = useState("English");
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

//   const [toggleStates, setToggleStates] = useState({
//     customToggle: false,
//     resetInteractions: false,
//     disableScroll: false,
//     storeConsents: false,
//     globalvariable: false
//   });

//   const [cookiePreferences, setCookiePreferences] = useState({
//     marketing: false,
//     personalization: false,
//     analytics: false,
//   });

//   const consentManager = useConsentManager();

//   const handleAddCookieBanner = async (): Promise<void> => {
//     try {
//       console.log("Starting to add cookie banner...");

//       // Get the currently selected element
//       const selectedElement = await Webflow.getSelectedElement();

//       if (!selectedElement) {
//         throw new Error('Please select an element in the Webflow Designer first');
//       }

//       // Create new div using element presets
//       const newDiv = await selectedElement.before(Webflow.elementPresets.DivBlock);

//       if (!newDiv) {
//         throw new Error('Failed to create banner element');
//       }

//       // Add the banner HTML with Webflow-friendly classes and structure
//       await newDiv.setInnerHTML(`
//         <div class="cookie-banner-wrapper">
//           <div class="cookie-banner-container">
//             <div class="cookie-banner-content">
//               <div class="cookie-banner-header">
//                 <h4 class="cookie-banner-title">Cookie Settings</h4>
//               </div>
//               <div class="cookie-banner-text-block">
//                 <p class="cookie-banner-description">We use cookies to enhance your browsing experience and analyze our traffic.</p>
//               </div>
//               <div class="cookie-banner-buttons">
//                 <a href="#" class="cookie-banner-button preferences">Preferences</a>
//                 <a href="#" class="cookie-banner-button reject">Reject</a>
//                 <a href="#" class="cookie-banner-button accept">Accept All</a>
//               </div>
//             </div>
//           </div>
//         </div>
//         <style>
//           /* Default styles that users can override in Webflow */
//           .cookie-banner-wrapper {
//             position: fixed;
//             left: 0%;
//             top: auto;
//             right: 0%;
//             bottom: 0%;
//             z-index: 9999;
//             display: flex;
//             padding: 20px;
//             justify-content: center;
//             align-items: flex-end;
//           }
//           .cookie-banner-container {
//             background-color: #333;
//             border-radius: 8px;
//             box-shadow: 0 2px 10px rgba(0,0,0,0.2);
//             width: 100%;
//             max-width: 500px;
//             margin: 0 auto;
//             padding: 20px;
//           }
//           .cookie-banner-content {
//             color: white;
//             font-family: system-ui, -apple-system, sans-serif;
//           }
//           .cookie-banner-title {
//             margin: 0 0 10px 0;
//             font-size: 18px;
//             line-height: 1.4;
//           }
//           .cookie-banner-description {
//             margin: 0 0 15px 0;
//             font-size: 14px;
//             line-height: 1.5;
//           }
//           .cookie-banner-buttons {
//             display: flex;
//             justify-content: flex-end;
//             gap: 10px;
//           }
//           .cookie-banner-button {
//             padding: 8px 16px;
//             border-radius: 4px;
//             background-color: #555;
//             color: white;
//             text-decoration: none;
//             font-size: 14px;
//             transition: background-color 0.2s ease;
//             cursor: pointer;
//           }
//           .cookie-banner-button.accept {
//             background-color: #4CAF50;
//           }
//           .cookie-banner-button:hover {
//             opacity: 0.9;
//           }
//         </style>
//         <script>
//           // Basic functionality
//           document.addEventListener('DOMContentLoaded', function() {
//             const banner = document.querySelector('.cookie-banner-wrapper');
//             if (!banner) return;

//             const buttons = banner.querySelectorAll('.cookie-banner-button');
//             buttons.forEach(button => {
//               button.addEventListener('click', function(e) {
//                 e.preventDefault();
//                 banner.style.display = 'none';
                
//                 // Store the consent
//                 const consent = this.classList.contains('accept') ? 'accepted' : 
//                               this.classList.contains('reject') ? 'rejected' : 'customized';
//                 localStorage.setItem('cookieConsent', consent);
//               });
//             });
//           });
//         </script>
//       `);

//       console.log("Cookie banner added successfully!");
//       alert("Cookie banner has been added successfully! You can now customize it in the Webflow Designer.");
//       setShowPopup(false);

//     } catch (error) {
//       console.error("Error:", error);
//       alert(error instanceof Error ? error.message : 'An unexpected error occurred');
//       setShowPopup(false);
//     }
//   };

//   return (
//     <div className="app">
//       {/* Your existing components */}
//       <div className="navbar">
//         <div>
//           {/* <h2>CookieAPP</h2> */}
//         </div>
//         <div className="need-help">
//           <img src={questionmark} alt="" />
//           <h5>Need help?</h5>
//         </div>
//       </div>

//       <div className="configuration">
//         <div className="mode-switch">
//           <span>Configuration</span>
//           <button
//             className={`mode-btn ${activeMode === "Simple" ? "active" : ""}`}
//             onClick={() => setActiveMode("Simple")}
//           >
//             Simple
//           </button>
//           <button
//             className={`mode-btn ${activeMode === "Advanced" ? "active" : ""}`}
//             onClick={() => {
//               setActiveMode("Advanced");
//               setTimeout(() => setIsActive(true), 50);
//             }}
//           >
//             Advanced
//           </button>
//         </div>

//         <div className="component-width">
//           <div>
//             <a className="link" href="#">
//               You need a subscription to publish the production <i>&#x2197;</i>
//             </a>
//           </div>

//           {activeTab !== "Script" && (
//             <div>
//               <button className="publish-button" onClick={() => setShowPopup(true)}>
//                 Create Component
//               </button>
//             </div>
//           )}

//           {activeTab === "Script" && (
//             <div>
//               <button className="publish-button">Scan Project</button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Popup Modal with ConsentBanner */}
//       {showPopup && (
//         <div className="popup-overlay">
//           <div className="popup-box">
//             <h3>We are installing the script in your code...</h3>
//             <ConsentBanner
//               onClose={() => setShowPopup(false)}
//               animation={animation}
//               easing={easing}
//               size={size}
//               Font={Font}
//               selectedtext={selectedtext}
//               weight={weight}
//               style={{
//                 position: 'static',
//                 transform: 'none',
//                 margin: '20px 0',
//                 width: '100%',
//                 maxWidth: '100%'
//               }}
//             />
//             <button
//               className="confirm-button"
//               onClick={handleAddCookieBanner}
//             >
//               Confirm
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(<App />); 