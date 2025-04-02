import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./style/styless.css";
import Customization from "./components/Customization";
import Script from "./components/Script";
const questionmark = new URL("./assets/questionmark.png", import.meta.url).href;
const openeye = new URL("./assets/closedeye.png", import.meta.url).href;
const eye = new URL("./assets/eye.png", import.meta.url).href;
import { customCodeApi } from "./services/api";
import { useAuth } from "../src/hooks/userAuth";
import webflow, { WebflowAPI } from './types/webflowtypes'; 
import { CodeApplication } from "./types/types";



const App: React.FC = ({ onAuth }: { onAuth: () => void }) => {
  const [activeTab, setActiveTab] = useState("General Settings");
  const [expires, setExpires] = useState("");
  const [animation, setAnimation] = useState("select");
  const [easing, setEasing] = useState("select");
  const [size, setSize] = useState("16");
  const [isActive, setIsActive] = useState(false);
  const [Font, SetFont] = useState("")
  const [selectedtext, settextSelected] = useState("left");
  const [style, setStyle] = useState("align")
  const [activeMode, setActiveMode] = useState("Simple");
  const [selected, setSelected] = useState("right");
  const [selectedOption, setSelectedOption] = useState("US State laws");
  const [weight, setWeight] = useState("semibold");
  const [language, setLanguage] = useState("English");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [siteInfo, setSiteInfo] = useState<{ siteId: string; siteName: string; shortName: string } | null>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const [pages, setPages] = useState([]);
  const [fetchScripts, setFetchScripts] = useState(false);

  const base_url = "https://cb-server.web-8fb.workers.dev";

  const [toggleStates, setToggleStates] = useState({
    customToggle: false,
    resetInteractions: false,
    disableScroll: false,
    storeConsents: false,
    globalvariable: true
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

  const handleToggles = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
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



  useEffect(() => {
    const fetchPages = async () => {
      try {
        console.log("Fetching pages...");
        const pagesAndFolders = await webflow.getAllPagesAndFolders();
        console.log("API Response:", pagesAndFolders);

        if (Array.isArray(pagesAndFolders) && pagesAndFolders.length > 0) {
          // Filter only "Page" types
          const pages = pagesAndFolders.filter(i => i.type === "Page");

          // Fetch page names asynchronously
          const pageDetails = await Promise.all(
            pages.map(async page => ({
              id: page.id,
              name: await page.getName(),
            }))
          );

          setPages(pageDetails);
          console.log("Pages set in state:", pageDetails);
        } else {
          console.warn("No pages found.");
        }
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };

    fetchPages();
  }, [webflow]);


  
  
  const fetchAnalyticsBlockingsScripts = async () => {
    try {
      console.log('=== Component Debug ===');
      console.log('Starting script registration process');

      const userinfo = localStorage.getItem("wf_hybrid_user");
      console.log('User info from localStorage:', userinfo ? 'Found' : 'Not found');

      if (!userinfo) {
        console.error("No user info found");
        return;
      }

      const tokenss = JSON.parse(userinfo);
      console.log('Parsed user info:', {
        hasSessionToken: !!tokenss.sessionToken,
        tokenPreview: tokenss.sessionToken ? tokenss.sessionToken : 'No token'
      });

      const tokewern = tokenss.sessionToken;
      const siteIdinfo = await webflow.getSiteInfo();
      setSiteInfo(siteIdinfo);
      console.log('Site ID:', siteIdinfo.siteId);

      if (!tokewern) {
        console.error("No session token found");
        return;
      }

      console.log('Calling API with:', { siteIdinfo, tokenPreview: tokewern });
      const hostingScript = await customCodeApi.registerAnalyticsBlockingScript(tokewern);
      console.log('Hosting script response:', hostingScript);

      if (hostingScript) {
        try {
          // Log the initial data we're working with
          console.log("Hosting script data:", hostingScript);
          console.log("Site ID:", siteIdinfo.siteId);
          console.log("Token:", tokewern);
      
          const scriptId = hostingScript.result.id;
          const version = hostingScript.result.version;
          
          const params: CodeApplication = {
            targetType: 'site',
            targetId: siteIdinfo.siteId,
            scriptId: scriptId,
            location: 'header',
            version: version
          };
      
          // Log the params being sent
          console.log("Applying script with params:", params);
      
          const applyScriptResponse = await customCodeApi.applyScript(params, tokewern);
          console.log("Script applied successfully:", applyScriptResponse);
          
        } 
        catch (error) {
          // More detailed error logging
          console.error("Failed to apply script:", {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            params: {
              scriptId: hostingScript?.result?.id,
              siteId: siteIdinfo?.siteId,
              version: hostingScript?.result?.version
            }
          });
          
          // You might want to handle the error appropriately here
          // For example, showing a user-friendly error message
          throw error; // or handle it differently based on your needs
        }
      } else {
        console.warn("No hosting script data available");
      }
    }
      

     catch (error) {
      console.error('=== Component Error ===');
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      console.error('Full error object:', error);
    }
  }






  // const base_url = "https://consent-bit-server.web-8fb.workers.dev"

  // Initialize the auth hook which provides methods for authentication
  // const { user } = useAuth();
  const { user, exchangeAndVerifyIdToken } = useAuth(); // Add token exchange function


  // Function to open the authorization popup authorization window
  const openAuthScreen = () => {
    console.log("Opening auth window..."); // Debug
    const authWindow = window.open(
      `${base_url}/api/auth/authorize?state=webflow_designer`,
      "_blank",
      "width=600,height=600"
    );

    const onAuth = async () => {
      console.log("User authenticated!");
      await exchangeAndVerifyIdToken(); // ✅ Force token exchange after auth
    };
    // Check if the authorization window is closed
    const checkWindow = setInterval(() => {
      if (authWindow?.closed) {
        console.log("Auth window closed"); // Debug
        clearInterval(checkWindow);
        // The token exchange will be handled by the message event listener in App.tsx
        onAuth();
      }
    }, 1000);
  };



  return (
    <div className="app">
      {/* Top Navigation */}
      <div className="navbar">
        <div>
          {user.firstName ? (
            <p>Hello, {user.firstName}!</p>
          ) : (
            <button className="publish-button" onClick={openAuthScreen}>
              Authenticate
            </button>
          )}
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
              <button className="publish-button" onClick={() => {
                setShowPopup(true);
               
              }}>
                Create Components
              </button>
            </div>
          )}


          {activeTab === "Script" && (
            <div>
              <button className="publish-button" onClick={() => setFetchScripts(true)}>
                Scan Project
              </button>

            </div>
          )}
        </div>
      </div>



      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="flex down">
              <span className="spanbox">We are installing the script in your code...</span>
              <span className="spanbox">we are adding a banner on your project</span>
            </div>
            {/* 
            <button
              className="confirm-button"
              onClick={async () => {
                try {
                  // Get site information
                  const info = await webflow.getSiteInfo();
                  setSiteInfo(info);
                  console.log('Site ID:', info.siteId);
                  console.log('Site Name:', info.siteName);

                  // Proceed with your installation logic
                  // await handleAddCookieBanner();

                  setShowPopup(false);
                } catch (error) {
                  console.error('Error getting site info:', error);
                  alert('Failed to get site information');
                }
              }}
            >
              Confirm
            </button> */}

            <div className="gap">
              <button
                className="confirm-button"
                onClick={async () => {
                  try {
                    console.log("🟢 Button clicked!");

                    // ✅ Get the selected element
                    // const selectedElement = await webflow.getSelectedElement();
                    // if (!selectedElement) {
                    //   console.error("❌ No element selected.");
                    //   webflow.notify({ type: "error", message: "No element selected in the Designer." });
                    //   return;
                    // }
                    // console.log("✅ Selected element:", selectedElement);

                    // // ✅ Insert a new DivBlock before the selected element
                    // const newDiv = await selectedElement.before(webflow.elementPresets.DivBlock);
                    // if (!newDiv) {
                    //   console.error("❌ Failed to create div.");
                    //   webflow.notify({ type: "error", message: "Failed to create div." });
                    //   return;
                    // }
                    // console.log("✅ New div created:", newDiv);

                    // // ✅ Create a new style
                    // const newStyle = await webflow.createStyle("consebit-banni");

                    // // ✅ Create a variable for color
                    // const collection = await webflow.getDefaultVariableCollection();
                    // const webflowBlue = await collection?.createColorVariable("Webflow Blue", "rgba(255, 255, 255, 1)");

                    // // ✅ Ensure the color variable is converted to a string
                    // const webflowBlueValue = (webflowBlue as any)?.value || "rgba(255, 255, 255, 1)";

                    // // ✅ Define style properties
                    // const propertyMap: Record<string, string> = {
                    //   "background-color": webflowBlueValue, // Ensure it's a string
                    //   "font-size": "16px",
                    //   "font-weight": "bold",
                    //   "height": "180px",
                    //   "width": "438px",
                    //   "position": "fixed",
                    //   "z-index": "999",
                    //   "top": "70%",
                    //   "left": "50%",
                    //   "border-radius": "12px"
                    //   // Set z-index
                    // };

                    // // ✅ Set style properties
                    // await newStyle.setProperties(propertyMap);
                    // console.log("✅ Style properties set:", propertyMap);

                    // // ✅ Apply the style to the new div
                    // if (newDiv.setStyles) {
                    //   await newDiv.setStyles([newStyle]);
                    //   console.log("✅ Styles applied successfully!");
                    // } else {
                    //   console.error("❌ `setStyles` method not available on newDiv.");
                    //   webflow.notify({ type: "error", message: "Could not apply styles to the new div." });
                    // }

                    // ✅ Notify user
                    // webflow.notify({ type: "info", message: "Styled Div added successfully!" });
                    setShowPopup(false)
                    fetchAnalyticsBlockingsScripts(); 
                    // handleRegisterScript()

                  } catch (error) {
                    console.error("❌ Error adding Div:", error);
                    webflow.notify({ type: "error", message: "Failed to add styled div." });
                  }
                }}
              >
                Confirm
              </button>

              {/* <button
                className="confirm-button"
                onClick={async () => {
                  try {
                    console.log("🟢 Button clicked!");

                    // ✅ Get the selected element
                    const selectedElement = await webflow.getSelectedElement();
                    if (!selectedElement) {
                      console.error("❌ No element selected.");
                      webflow.notify({ type: "error", message: "No element selected in the Designer." });
                      return;
                    }
                    console.log("✅ Selected element:", selectedElement);

                    // ✅ Check if elementBuilder exists
                    if (!webflow.elementBuilder) {
                      console.error("❌ elementBuilder method is not available in Webflow API.");
                      webflow.notify({ type: "error", message: "Element creation not supported." });
                      return;
                    }

                    // ✅ Create a root div
                    const rootDiv = await webflow.elementBuilder({ tag: "div" }).catch((err: any) => {
                      console.error("❌ Error creating div:", err);
                      return null;
                    });

                    if (!rootDiv) {
                      webflow.notify({ type: "error", message: "Failed to create div." });
                      return;
                    }
                    console.log("✅ Root div created:", rootDiv);

                    // ✅ Set attributes for the root div
                    if (rootDiv.setAttributes) {
                      await rootDiv.setAttributes({ id: "consent-banner" });
                    }

                    // ✅ Append root div to the selected element
                    if (selectedElement.setAttributes) {
                      const existingHTML = selectedElement.getStyles ? await selectedElement.getStyles() : "";
                      await selectedElement.setAttributes({
                        innerHTML: existingHTML + `<div id="consent-banner"></div>`,
                      });
                    }

                    // ✅ Notify user
                    webflow.notify({ type: "info", message: "Styled Div with content added successfully!" });
                    setShowPopup(false);

                  } catch (error) {
                    console.error("❌ Error adding Div:", error);
                    webflow.notify({ type: "error", message: "Failed to add styled div." });
                  }
                }}
              >
                Confirm
              </button> */}

              <button className="cancel-btn" onClick={() => setShowPopup(false)}>Cancel</button>
            </div>

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
                  <div className="settings-group border">
                    <div className="flex">
                      <label htmlFor="source">Source</label>
                      <div className="tooltip-container">
                        <img src={questionmark} alt="info" className="tooltip-icon" />
                        <span className="tooltip-text">Pages of your site</span>
                      </div>
                    </div>
                    <select id="pages">
                      <option value="">Select a page</option>
                      {pages.map((page) => (
                        <option key={page.id} value={page.id}>
                          {page.name}
                        </option>
                      ))}
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

                {activeMode === "Advanced" && (
                  <div className="compliance-container">
                    <label className="compliance">
                      <span className="compliance">Compliance</span>
                      <span className="tooltip-container">
                        <img src={questionmark} alt="info" className="tooltip-icon" />
                        <span className="tooltip-text">Choose a compliance option.</span>
                      </span>
                    </label>

                    <div className="checkbox-group">
                      {["US State laws", "GDPR"].map((option) => (
                        <label key={option} className="custom-checkboxs">
                          <input
                            type="checkbox"
                            value={option}
                            checked={selectedOptions.includes(option)}
                            onChange={() => handleToggles(option)}
                          />
                          <span className="checkbox-box"></span>
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                )}


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
                      textAlign: selectedtext as "left" | "center" | "right",
                      alignItems: style === "centeralign" ? "center" : undefined, // Change dynamically
                    }}
                  >

                    <div className="space"><h4>Cookie Setting</h4></div>

                    <div className="padding">
                      <span>
                        {language === "English"
                          ? "We use cookies to provide you with the best possible experience. They also allow us to analyze user behavior in order to constantly improve the website for you."
                          : language === "Spanish"
                            ? "Utilizamos cookies para brindarle la mejor experiencia posible. También nos permiten analizar el comportamiento del usuario para mejorar constantemente el sitio web para usted."
                            : "Nous utilisons des cookies pour vous offrir la meilleure expérience possible. Ils nous permettent également d'analyser le comportement des utilisateurs afin d'améliorer constamment le site Web pour vous."}
                      </span>
                    </div>
                    <div className="button-wrapp">
                      <button className="btn-preferences">Preferences</button>
                      <button className="btn-reject">Reject</button>
                      <button className="btn-accept">Ok, Got it</button>
                    </div>
                  </div>
                  {/* { activeMode === "Advanced" && (<div
                    className={`cookie-banner ${animation} ${isActive ? "active" : ""}`}
                  >

                    <div className="space"><h4>Pefrense setting</h4></div>

                    <div className="padding">
                      <span>
                        {language === "English"
                          ? "We use cookies to provide you with the best possible experience. They also allow us to analyze user behavior in order to constantly improve the website for you."
                          : language === "Spanish"
                            ? "Utilizamos cookies para brindarle la mejor experiencia posible. También nos permiten analizar el comportamiento del usuario para mejorar constantemente el sitio web para usted."
                            : "Nous utilisons des cookies pour vous offrir la meilleure expérience possible. Ils nous permettent également d'analyser le comportement des utilisateurs afin d'améliorer constamment le site Web pour vous."}
                      </span>
                    </div>
                    <div className="button-wrapp">
                      <button className="btn-preferences">Preferences</button>
                      <button className="btn-reject">Reject</button>
                      <button className="btn-accept">Ok, Got it</button>
                    </div>
                  </div>)} */}
                  <div>

                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "Customization" && (
            <Customization
              animation={animation}
              setAnimation={setAnimation}
              easing={easing}
              setEasing={setEasing}
              language={language}
              setLanguage={setLanguage}
              weight={weight}
              SetWeight={setWeight}
              size={size}
              SetSize={setSize}
              selected={selected}
              setSelected={setSelected}
              Font={Font}
              SetFont={SetFont}
              selectedtext={selectedtext as "left" | "right" | "center"}
              settextSelected={settextSelected}
              style={style}
              setStyle={setStyle}
            />
          )}

          {activeTab === "Script" && <Script fetchScripts={fetchScripts} setFetchScripts={setFetchScripts} />}
        </div>
      </div>
    </div>
  );
};

// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(<App />);

export default App;

