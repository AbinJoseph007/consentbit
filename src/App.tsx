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
import createCookiePreferences from "./hooks/gdprPreference";
import createCookieccpaPreferences from "./hooks/ccpaPreference";


type Orientation = "left" | "center" | "right";
type BannerStyle = "align" | "alignstyle" | "bigstyle" | "centeralign" | "fullwidth" | "";


const App: React.FC = ({ onAuth }: { onAuth: () => void }) => {
  const [activeTab, setActiveTab] = useState("General Settings");
  const [expires, setExpires] = useState("");
  // const [animation, setAnimation] = useState("select");
  // const [easing, setEasing] = useState("select");
  const [size, setSize] = useState("16");
  const [isActive, setIsActive] = useState(false);
  const [Font, SetFont] = useState("")
  const [selectedtext, settextSelected] = useState("left");
  // const [style, setStyle] = useState("align")
  const [style, setStyle] = useState<BannerStyle>("align");
  // const [activeMode, setActiveMode] = useState("Simple");
  const [activeMode, setActiveMode] = useState(() => {
    const savedMode = localStorage.getItem("activeMode");
    return savedMode ? JSON.parse(savedMode) : "Simple";
  });
  const [selected, setSelected] = useState<Orientation>("right"); 
  const [selectedOption, setSelectedOption] = useState("US State laws");
  const [weight, setWeight] = useState("semibold");
  // const [language, setLanguage] = useState("English");
  const [showPopup, setShowPopup] = useState(false);
  // const [selectedOptions, setSelectedOptions] = useState(["GDPR"]);
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const savedOptions = localStorage.getItem("selectedOptions");
    return savedOptions ? JSON.parse(savedOptions) : ["GDPR"];
  });
  const [siteInfo, setSiteInfo] = useState<{ siteId: string; siteName: string; shortName: string } | null>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const [pages, setPages] = useState([]);
  const [fetchScripts, setFetchScripts] = useState(false);
  const [borderRadius, setBorderRadius] = useState(16);
  const [buttonRadius, setButtonRadius] = useState(2);
  const [isLoading, setIsLoading] = useState(false); 
  const [color, setColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [btnColor, setBtnColor] = useState("#F1F1F1");
  const [paraColor, setParaColor] = useState("#1F1D40");
  const [secondcolor, setSecondcolor] = useState("#483999");
  const [bgColors, setBgColors] = useState("#798EFF");
  const [headColor, setHeadColor] = useState("#483999");
    const base_url ="https://cb-server.web-8fb.workers.dev"


  const [toggleStates, setToggleStates] = useState({
    customToggle: false,
    resetInteractions: false,
    disableScroll: false,
    storeConsents: false,
    globalvariable: true,
  });

  // Your default states
  const defaultState = {
    animation: "select",
    easing: "select",
    language: "English",
  };

  const [animation, setAnimation] = useState(defaultState.animation);
  const [easing, setEasing] = useState(defaultState.easing);
  const [language, setLanguage] = useState(defaultState.language);

  const handleToggle = (toggleName: keyof typeof toggleStates) => {
    setToggleStates((prev) => {
      const newState = { ...prev, [toggleName]: !prev[toggleName] };

      // If resetInteractions is turned ON, reset to default values
      if (toggleName === "resetInteractions" && newState.resetInteractions) {
        resetToDefaults();
      }

      return newState;
    });
  };

  const resetToDefaults = () => {
    setAnimation(defaultState.animation);
    setEasing(defaultState.easing);
    setLanguage(defaultState.language);
  };

  const translations = {
    English: {
      heading: "Cookie Settings",
      description: "We use cookies to provide you with the best possible experience. They also allow us to analyze user behavior in order to constantly improve the website for you.",
      accept: "Accept",
      reject: "Reject",
      preferences: "Preference",
      ccpa: {
        heading: "We value your Privacy",
        description: "We use cookies to provide you with the best possible experience. They also allow us to analyze user behavior in order to constantly improve the website for you.",
        doNotShare: "Do Not Share My Personal Information"
      }
    },
    Spanish: {
      heading: "Configuración de Cookies",
      description: "Utilizamos cookies para brindarle la mejor experiencia posible. También nos permiten analizar el comportamiento del usuario para mejorar constantemente el sitio web para usted.",
      accept: "Aceptar",
      reject: "Rechazar",
      preferences: "Preferencias",
      ccpa: {
        heading: "Valoramos tu Privacidad",
        description: "Utilizamos cookies para brindarle la mejor experiencia posible. También nos permiten analizar el comportamiento del usuario para mejorar constantemente el sitio web para usted.",
        doNotShare: "No Compartir Mi Información Personal"
      }
    },
    French: {
      heading: "Paramètres des Cookies",
      description: "Nous utilisons des cookies pour vous offrir la meilleure expérience possible. Ils nous permettent également d'analyser le comportement des utilisateurs afin d'améliorer constamment le site Web pour vous.",
      accept: "Accepter",
      reject: "Refuser",
      preferences: "Préférences",
      ccpa: {
        heading: "Nous Respectons Votre Vie Privée",
        description: "Nous utilisons des cookies pour vous offrir la meilleure expérience possible. Ils nous permettent également d'analyser le comportement des utilisateurs afin d'améliorer constamment le site Web pour vous.",
        doNotShare: "Ne Pas Partager Mes Informations Personnelles"
      }
    }
  };


  // const [cookiePreferences, setCookiePreferences] = useState(() => {
  //   return {
  //     marketing: true,
  //     Preferences: true,
  //     analytics: true,
  //   };
  // });

  const [cookiePreferences, setCookiePreferences] = useState(() => {
    // Get stored preferences from localStorage or use default values
    const savedPreferences = localStorage.getItem("cookiePreferences");
    return savedPreferences
      ? JSON.parse(savedPreferences)
      : {
        marketing: true,
        preferences: true,
        analytics: true,
      };
  });

  useEffect(() => {
    localStorage.setItem("cookiePreferences", JSON.stringify(cookiePreferences));
  }, [cookiePreferences]);

  // const handleToggle = (key) => {
  //   setToggleStates((prev) => ({
  //     ...prev,
  //     [key]: !prev[key],
  //   }));
  // };


  // const toggleCategory = (category) => {
  //   setCookiePreferences((prev) => ({
  //     ...prev,
  //     [category]: !prev[category],
  //   }));
  // };

  const toggleCategory = (category) => {
    setCookiePreferences((prev) => {
      const updatedPreferences = {
        ...prev,
        [category]: !prev[category],
      };

      // Save new state to localStorage
      localStorage.setItem("cookiePreferences", JSON.stringify(updatedPreferences));

      return updatedPreferences;
    });
  };
 

  // const handleToggles = (option) => {
  //   setSelectedOptions((prev) =>
  //     prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
  //   );
  // };

  // const handleToggles = (option) => {

  //   setSelectedOptions((prev) =>
  //     prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
  //   );
  // };

  const handleToggles = (option) => {
    setSelectedOptions((prev) => {
      const updatedOptions = prev.includes(option)
        ? prev.filter((item) => item !== option) // Remove if already selected
        : [...prev, option]; // Add if not selected

      localStorage.setItem("selectedOptions", JSON.stringify(updatedOptions)); // Save immediately
      return updatedOptions;
    });
  };

  useEffect(() => {
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
  }, [selectedOptions]);


  useEffect(() => {
    setIsActive(false);
    setTimeout(() => setIsActive(true), 50);
  }, [animation]);

  // useEffect(() => {
  //   if (activeMode === "Simple" && activeTab === "Script") {
  //     setActiveTab("Customization");
  //   }

  //   // Force re-render to make sure UI updates
  //   setTimeout(() => setIsActive(true), 50);
  // }, [activeMode]);

  useEffect(() => {
    // Save activeMode to localStorage whenever it changes
    localStorage.setItem("activeMode", JSON.stringify(activeMode));

    if (activeMode === "Simple" && activeTab === "Script") {
      setActiveTab("Customization");
    }

    // Force re-render to ensure UI updates
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

  const ApplyCustomToggle = async () => {
    try {
      console.log('=== Component Debug for custom toggle ===');
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
      const hostingScript = await customCodeApi.registerCustomToggle(tokewern, siteIdinfo.siteId);
      console.log('Hosting script response:', hostingScript);

      if (hostingScript) {
        try {

          const scriptId = hostingScript.result.id;
          const version = hostingScript.result.version; // Get version from registration response
          const params: CodeApplication = {
            targetType: 'site',
            targetId: siteIdinfo.siteId,
            scriptId: scriptId,
            location: 'header',
            version: version
          };
          const applyScriptResponse = await customCodeApi.applyScript(params, tokewern)
          console.log("apply script response", applyScriptResponse);
        } catch (error) {
          console.log("apply script error", error);
        }
      }
    } catch (error) {
      console.error('=== Component Error ===');
    }
  };

  const ApplyScrollcontroll = async () => {
    try {
      console.log('=== Component Debug for ApplyScrollcontroll ===');
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
      const hostingScript = await customCodeApi.registerScrollScript(tokewern, siteIdinfo.siteId);
      console.log('Hosting script response:', hostingScript);

      if (hostingScript) {
        try {

          const scriptId = hostingScript.result.id;
          const version = hostingScript.result.version; // Get version from registration response
          const params: CodeApplication = {
            targetType: 'site',
            targetId: siteIdinfo.siteId,
            scriptId: scriptId,
            location: 'header',
            version: version
          };
          const applyScriptResponse = await customCodeApi.applyScript(params, tokewern)
          console.log("apply script response", applyScriptResponse);
        } catch (error) {
          console.log("apply script error", error);
        }
      }
    } catch (error) {
      console.error('=== Component Error ===');
    }
  };







  // const { user } = useAuth();
  const { user, exchangeAndVerifyIdToken } = useAuth();


  // Function to open the authorization popup authorization window
  const openAuthScreen = () => {
    console.log("Opening auth window...");
    const authWindow = window.open(
      `${base_url}/api/auth/authorize?state=webflow_designer`,
      "_blank",
      "width=600,height=600"
    );

    const onAuth = async () => {
      console.log("User authenticated!");
      await exchangeAndVerifyIdToken();
    };
    const checkWindow = setInterval(() => {
      if (authWindow?.closed) {
        console.log("Auth window closed");
        clearInterval(checkWindow);
        onAuth();
      }
    }, 1000);
  };

  //GDPR BANNER-------------------------------------------------------------------


  const handleCreatePreferences = async () => {
    try {
      const selectedPreferences = Object.entries(cookiePreferences)
        .filter(([_, isChecked]) => isChecked)
        .map(([category]) => category);

      if (!selectedPreferences.includes("essential")) {
        selectedPreferences.push("essential");
      }

      console.log("✅ Selected Preferences:", selectedPreferences);

      await createCookiePreferences(
        selectedPreferences,
        language,
        color,
        btnColor,
        headColor,
        paraColor,
        secondcolor
      );

      console.log("✅ Cookie preferences created successfully!");
    } catch (error) {
      console.error("❌ Error creating cookie preferences:", error);
    }
  };


  //--------------------------------------------------------------------------


  //createCookieccpaPreferences
  const handleCreatePreferencesccpa = async () => {
    try {
      await createCookieccpaPreferences(language);
      console.log("✅ Cookie preferences created successfully!");
    } catch (error) {
      console.error("❌ Error creating cookie preferences:", error);
    }
  };


  const previewDimensions = React.useMemo(() => {
    switch (style) {
      case "bigstyle":
        return { width: "250px", height: "151px" };
      case "fullwidth":
        return { width: "443px", dislay: "flex" };
      case "centeralign":
        return { width: "303px", height: "103px" };
      default:
        return { width: "65%" }; // Default
    }
  }, [style]);

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

              {activeMode === "Simple" && (
                <button
                  className="confirm-button"
                  onClick={async () => {
                    try {
                      console.log("🟢 Button clicked!");

                      const selectedElement = await webflow.getSelectedElement();
                      if (!selectedElement) {
                        console.error("❌ No element selected.");
                        webflow.notify({ type: "error", message: "No element selected in the Designer." });
                        return;
                      }
                      console.log("✅ Selected element:", selectedElement);

                      const newDiv = await selectedElement.before(webflow.elementPresets.DivBlock);
                      if (!newDiv) {
                        console.error("❌ Failed to create div.");
                        webflow.notify({ type: "error", message: "Failed to create div." });
                        return;
                      }
                      console.log("✅ New div created:", newDiv);

                      // if (newDiv.setCustomAttribute) {
                      //   await newDiv.setCustomAttribute("consent","Simple-consent-banner");
                      //   console.log("✅ Main div ID set to #Simple-consent-banner");
                      // } else {
                      //   console.error("❌ setAttributes method not available on div element");
                      // }
                      if ((newDiv as any).setDomId) {
                        await (newDiv as any).setDomId("simple-consent-banner"); // Type assertion
                        console.log("✅ Accept button ID set to #simple-accept");
                      } else {
                        console.error("❌ setDomId method not available on accept button element");
                      }

                      const timestamp = Date.now();
                      const divStyleName = `consebit-banner-div-${timestamp}`;
                      const paragraphStyleName = `consebit-banner-text-${timestamp}`;
                      const buttonContainerStyleName = `consebit-button-container-${timestamp}`;
                      const buttonStyleName = `consebit-button-accept${timestamp}`;
                      const DeclinebuttonStyleName = `consebit-button-decline${timestamp}`;
                      const headingStyleName = `consebit-banner-heading-${timestamp}`;
                      const secondbackgorundstyle = `consentbit-second-background-${timestamp}`

                      const divStyle = await webflow.createStyle(divStyleName);
                      const paragraphStyle = await webflow.createStyle(paragraphStyleName);
                      const buttonContainerStyle = await webflow.createStyle(buttonContainerStyleName);
                      const buttonStyle = await webflow.createStyle(buttonStyleName);
                      const declinebutton = await webflow.createStyle(DeclinebuttonStyleName)
                      const headingStyle = await webflow.createStyle(headingStyleName);
                      const secondivstyle = await webflow.createStyle(secondbackgorundstyle)
                      console.log("✅ Created new styles:", divStyleName, paragraphStyleName, buttonContainerStyleName, buttonStyleName, headingStyleName);

                      const collection = await webflow.getDefaultVariableCollection();
                      const webflowBlue = await collection?.createColorVariable("Webflow Blue", "rgba(255, 255, 255, 1)");
                      // const webflowBlueValue = (webflowBlue as any)?.value || "rgba(255, 255, 255, 1)";

                      const divPropertyMap: Record<string, string> = {
                        "background-color": color,
                        // "height": "220px",
                        // "width": "438px",
                        "position": "fixed",
                        "z-index": "999",
                        "padding-top": "20px",
                        "padding-right": "20px",
                        "padding-bottom": "20px",
                        "padding-left": "20px",
                        // "top": "65%", // Remove static position
                        // "right": "5%", // Remove static position
                        "border-radius": `${borderRadius}px`,
                        "display": "flex",
                        "flex-direction": "column",
                        "align-items": "center",
                        "justify-content": "center",
                        "box-shadow": "2px 2px 20px rgba(0, 0, 0, 0.51)",
                        
                      };

                      if (window.innerWidth <= 768) { // Adjusting for mobile screens
                        divPropertyMap["width"] = "100%";
                        divPropertyMap["height"] = "40%";
                      }

                      divPropertyMap["bottom"] = "3%"; // Common top position

                      switch (selected) {
                        case "left":
                          divPropertyMap["left"] = "3%";
                          delete divPropertyMap["right"]; // Or set to "auto"
                          break;

                        case "center":
                          divPropertyMap["left"] = "50%"; // As requested
                          delete divPropertyMap["right"]; // Or set to "auto"
                          divPropertyMap["transform"] = "translateX(-50%)";
                          break;
                        case "right":
                        default: // Default to right
                          divPropertyMap["right"] = "5%";
                          delete divPropertyMap["left"]; // Or set to "auto"
                          break;
                      }
                      switch (style) {
                        case "bigstyle":
                          divPropertyMap["width"] = "370px";
                          divPropertyMap["min-height"] = "284px";
                          break;
                        case "fullwidth":
                          divPropertyMap["width"] = "100%";
                          divPropertyMap["min-height"] = "167px";
                          delete divPropertyMap["left"];
                          delete divPropertyMap["right"];
                          divPropertyMap["bottom"] = "0px" // Or set to "auto"
                          break;
                        case "centeralign":
                          divPropertyMap["width"] = "566px";
                          divPropertyMap["min-height"] = "167px";
                       
                          break;
                        case "align":
                        case "alignstyle": 
                        default: 
                          divPropertyMap["width"] = "438px"; 
                          divPropertyMap["min-height"] = "220px"; 
                          break;
                      }


                      const paragraphPropertyMap: Record<string, string> = {
                        "color": paraColor,
                        "font-size": "16px",
                        "font-weight": `${weight}`,
                        "line-height": "1.5",
                        "text-align": `${selectedtext}`,
                        "margin-top": "0",
                        "margin-right": "0",
                        "margin-bottom": "10px",
                        "margin-left": "0",
                        // "max-width": "400px",
                        "display": "block",
                        "width": "100%",
                      };
                      switch (style) {
                        case "centeralign":
                          paragraphPropertyMap["text-align"] = "center";
                          break;
                      }

                      const buttonContainerPropertyMap: Record<string, string> = {
                        "display": "flex",
                        "justify-content": "right",
                        "margin-top": "10px",
                        "width": "100%",
                      };
                      switch (style) {
                        case "centeralign":
                          buttonContainerPropertyMap["justify-content"] = "center";
                          break;
                      }

                      const buttonPropertyMap: Record<string, string> = {
                        "border-radius": `${buttonRadius}px`,
                        "cursor": "pointer",
                        "background-color": secondcolor,
                        "margin-left": "5px",
                        "margin-right": "5px",
                        "min-width": "80px",
                      };

                      const declineButtonPropertyMap: Record<string, string> = {
                        "border-radius": `${buttonRadius}px`,
                        "cursor": "pointer",
                        "background-color": btnColor,
                        "color": "rgba(72, 57, 153, 1)",
                        "margin-left": "5px",
                        "margin-right": "5px",
                        "min-width": "80px",
                      };


                      const headingPropertyMap: Record<string, string> = {
                        "color": headColor,
                        "font-size": "20px",
                        "font-weight": `${weight}`,
                        "text-align": `${selectedtext}`,
                        "margin-top": "0",
                        "margin-bottom": "10px",
                        "width": "100%",
                      };
                      switch (style) {
                        case "centeralign":
                          headingPropertyMap["text-align"] = "center";
                          break;
                      }

                      const secondbackgroundPropertyMap: Record<string, string> = {
                        "position": "absolute",
                        "background-color": bgColors,
                        "width": "35%",
                        "right": "0px",
                        "height": "100%",
                        "z-index": "-3",
                        "opacity": "30%",
                        "bottom": "0px",
                        "border-bottom-right-radius": `${borderRadius}px`,
                        "border-top-right-radius": `${borderRadius}px`
                      };



                      await divStyle.setProperties(divPropertyMap);
                      await paragraphStyle.setProperties(paragraphPropertyMap);
                      await buttonContainerStyle.setProperties(buttonContainerPropertyMap);
                      await buttonStyle.setProperties(buttonPropertyMap);
                      await declinebutton.setProperties(declineButtonPropertyMap)
                      await headingStyle.setProperties(headingPropertyMap);
                      await secondivstyle.setProperties(secondbackgroundPropertyMap)
                      console.log("✅ Style properties set for all elements");

                      if (newDiv.setStyles) {
                        await newDiv.setStyles([divStyle]);
                        console.log("✅ Div styles applied successfully!");
                      }

                      try {

                        let SecondDiv;
                        if (style === "alignstyle") {
                          SecondDiv = await selectedElement.before(webflow.elementPresets.DivBlock);
                          if (SecondDiv.setStyles) {
                            await SecondDiv.setStyles([secondivstyle]);
                            console.log("✅ SecondDiv styles applied!");
                          }
                        }
                        const tempHeading = await selectedElement.before(webflow.elementPresets.Heading);
                        if (!tempHeading) {
                          throw new Error("Failed to create heading");
                        }
                        if (tempHeading.setStyles) {
                          await tempHeading.setStyles([headingStyle]);
                          console.log("✅ Heading styles applied!");
                        }
                        if (tempHeading.setTextContent) {
                          await tempHeading.setTextContent(translations[language as keyof typeof translations].heading);
                          console.log("✅ Heading text set via setText!");
                        } else {
                          console.error("❌ setText method not available on heading element");
                        }

                        const tempParagraph = await selectedElement.before(webflow.elementPresets.Paragraph);
                        if (!tempParagraph) {
                          throw new Error("Failed to create paragraph");
                        }

                        if (tempParagraph.setStyles) {
                          await tempParagraph.setStyles([paragraphStyle]);
                          console.log("✅ Paragraph styles applied!");
                        }

                        if (tempParagraph.setTextContent) {
                          await tempParagraph.setTextContent(translations[language as keyof typeof translations].description);
                          console.log("✅ Paragraph text set via setText!");
                        } else {
                          console.error("❌ setText method not available on paragraph element");
                        }

                        const buttonContainer = await selectedElement.before(webflow.elementPresets.DivBlock);
                        if (!buttonContainer) {
                          throw new Error("Failed to create button container");
                        }
                        await buttonContainer.setStyles([buttonContainerStyle]);

                        const acceptButton = await selectedElement.before(webflow.elementPresets.Button);
                        if (!acceptButton) {
                          throw new Error("Failed to create accept button");
                        }
                        await acceptButton.setStyles([buttonStyle]);
                        await acceptButton.setTextContent(translations[language as keyof typeof translations].accept);
                        console.log("acceptButton:", acceptButton);

                        // if (acceptButton.setCustomAttribute) {
                        //   await acceptButton.setCustomAttribute("consent","simple-accept");
                        //   console.log("✅ Accept button ID set to #simple-accept");
                        // }
                        if ((acceptButton as any).setDomId) {
                          await (acceptButton as any).setDomId("simple-accept"); // Type assertion
                          console.log("✅ Accept button ID set to #simple-accept");
                        } else {
                          console.error("❌ setDomId method not available on accept button element");
                        }

                        const declineButton = await selectedElement.before(webflow.elementPresets.Button);
                        if (!declineButton) {
                          throw new Error("Failed to create decline button");
                        }
                        await declineButton.setStyles([declinebutton]);
                        await declineButton.setTextContent(translations[language as keyof typeof translations].reject);
                        console.log("declineButton:", declineButton);

                        // if (declineButton.setCustomAttribute) {
                        //   await declineButton.setCustomAttribute("consent","simple-reject" );
                        //   console.log("✅ Decline button ID set to #simple-reject");
                        // } else {
                        //   console.error("❌ setAttributes method not available on decline button element");
                        // }

                        if ((declineButton as any).setDomId) {
                          await (declineButton as any).setDomId("simple-reject"); // Type assertion
                          console.log("✅ Accept button ID set to #simple-accept");
                        } else {
                          console.error("❌ setDomId method not available on accept button element");
                        }

                        if (newDiv.append && tempHeading && tempParagraph && buttonContainer) {
                          if (SecondDiv) await newDiv.append(SecondDiv);
                          await newDiv.append(tempHeading);
                          await newDiv.append(tempParagraph);
                          await newDiv.append(buttonContainer);
                          console.log("✅ Appended heading, paragraph, and button container to div!");

                          if (buttonContainer.append && acceptButton && declineButton) {
                            await buttonContainer.append(acceptButton);
                            await buttonContainer.append(declineButton);
                            console.log("✅ Appended accept and decline buttons to button container!");
                          } else {
                            console.error("❌ Failed to append buttons to the button container.");
                          }
                        } else {
                          console.error("❌ Failed to append elements to the main div.");
                        }

                        console.log("🎉 Cookie consent banner successfully created!");
                        setShowPopup(false)
                      } catch (error) {
                        console.error("❌ Error creating cookie banner:", error);
                        webflow.notify({ type: "error", message: "An error occurred while creating the cookie banner." });
                      }
                    } catch (error) {
                      console.error("❌ Unexpected error:", error);
                      webflow.notify({ type: "error", message: "Unexpected error occurred." });
                    }
                  }}
                >
                  Simple Confirm
                </button>
              )}
              {activeMode === "Advanced" && selectedOptions.includes("GDPR") && (
                <button
                  className={`confirm-button ${isLoading ? "loading" : ""}`}
                  onClick={async () => {
                    setIsLoading(true);
                    try {
                      console.log("🟢 Button clicked!");

                      const selectedElement = await webflow.getSelectedElement();
                      if (!selectedElement) {
                        console.error("❌ No element selected.");
                        webflow.notify({ type: "error", message: "No element selected in the Designer." });
                        setIsLoading(false); // Reset loading state
                        return;
                      }
                      console.log("✅ Selected element:", selectedElement);

                      const newDiv = await selectedElement.before(webflow.elementPresets.DivBlock);
                      if (!newDiv) {
                        console.error("❌ Failed to create div.");
                        webflow.notify({ type: "error", message: "Failed to create div." });
                        return;
                      }
                      console.log("✅ New div created:", newDiv);

                      if ((newDiv as any).setDomId) {
                        await (newDiv as any).setDomId("consent-banner"); // Type assertion
                        console.log("✅ prefrence button ID set to #simple-accept");
                      } else {
                        console.error("❌ setDomId method not available on accept button element");
                      }

                      const timestamp = Date.now();
                      const divStyleName = `consebit-banner-div-${timestamp}`;
                      const paragraphStyleName = `consebit-banner-text-${timestamp}`;
                      const buttonContainerStyleName = `consebit-button-container-${timestamp}`;
                      const prefrenceButton = `consent-button-preference-${timestamp}`
                      const buttonStyleName = `consebit-button-accept${timestamp}`;
                      const DeclinebuttonStyleName = `consebit-button-decline${timestamp}`;
                      const headingStyleName = `consebit-banner-heading-${timestamp}`;
                      const secondbackgorundstyle = `consentbit-second-background-${timestamp}`

                      const divStyle = await webflow.createStyle(divStyleName);
                      const paragraphStyle = await webflow.createStyle(paragraphStyleName);
                      const buttonContainerStyle = await webflow.createStyle(buttonContainerStyleName);
                      const buttonStyle = await webflow.createStyle(buttonStyleName);
                      const declinebutton = await webflow.createStyle(DeclinebuttonStyleName)
                      const prefrenceButtons = await webflow.createStyle(prefrenceButton)
                      const headingStyle = await webflow.createStyle(headingStyleName);
                      const secondivstyle = await webflow.createStyle(secondbackgorundstyle)
                      console.log("✅ Created new styles:", divStyleName, paragraphStyleName, buttonContainerStyleName, buttonStyleName, headingStyleName);

                      const collection = await webflow.getDefaultVariableCollection();
                      const webflowBlue = await collection?.createColorVariable("Webflow Blue", "rgba(255, 255, 255, 1)");
                      const webflowBlueValue = (webflowBlue as any)?.value || "rgba(255, 255, 255, 1)";

                      const divPropertyMap: Record<string, string> = {
                        "background-color": color,
                        // "height": "220px",
                        // "width": "438px",
                        "position": "fixed",
                        "z-index": "99999",
                        "padding-top": "20px",
                        "padding-right": "20px",
                        "padding-bottom": "20px",
                        "padding-left": "20px",
                        // "top": "65%", // Remove static position
                        // "right": "5%", // Remove static position
                        "border-radius": `${borderRadius}px`,
                        "display": "flex",
                        "flex-direction": "column",
                        "align-items": "center",
                        "justify-content": "center",
                        "box-shadow": "2px 2px 20px rgba(0, 0, 0, 0.51)",
                      };

                      if (window.innerWidth <= 768) { 
                        divPropertyMap["width"] = "100%";
                        divPropertyMap["height"] = "40%";
                      }


                     
                      divPropertyMap["bottom"] = "3%"; 

                      switch (selected) {
                        case "left":
                          divPropertyMap["left"] = "3%";
                         
                          delete divPropertyMap["right"]; 
                          break;

                        case "center":
                          divPropertyMap["left"] = "50%"; 
                         
                          delete divPropertyMap["right"]; 
                          
                          divPropertyMap["transform"] = "translateX(-50%)";
                          break;
                        case "right":
                        default: 
                          divPropertyMap["right"] = "5%";
                          
                          delete divPropertyMap["left"]; 
                          break;
                      }
                      switch (style) {
                        case "bigstyle":
                          divPropertyMap["width"] = "370px";
                          divPropertyMap["min-height"] = "284px";
                          break;
                        case "fullwidth":
                          divPropertyMap["width"] = "100%";
                          divPropertyMap["min-height"] = "167px";
                          delete divPropertyMap["left"];
                          delete divPropertyMap["right"];
                          divPropertyMap["bottom"] = "0px" 
                          break;
                        case "centeralign":
                          divPropertyMap["width"] = "566px";
                          divPropertyMap["min-height"] = "167px";
                        
                          break;
                        case "align":
                        case "alignstyle": 
                        default: 
                          divPropertyMap["width"] = "438px"; 
                          divPropertyMap["min-height"] = "220px"; 
                          break;
                      }

                      const paragraphPropertyMap: Record<string, string> = {
                        "color": paraColor,
                        "font-size": "16px",
                        "font-weight": `${weight}`,
                        "line-height": "1.5",
                        "text-align": `${selectedtext}`,
                        "margin-top": "0",
                        "margin-right": "0",
                        "margin-bottom": "10px",
                        "margin-left": "0",
                        // "max-width": "400px",
                        "display": "block",
                        "width": "100%",
                      };
                      switch (style) {
                        case "centeralign":
                          paragraphPropertyMap["text-align"] = "center";
                          break;
                      }

                      const buttonContainerPropertyMap: Record<string, string> = {
                        "display": "flex",
                        "justify-content": "right",
                        "margin-top": "10px",
                        "width": "100%",
                      };
                      switch (style) {
                        case "centeralign":
                          buttonContainerPropertyMap["justify-content"] = "center";
                          break;
                      }

                      const buttonPropertyMap: Record<string, string> = {
                        "border-radius": `${buttonRadius}px`,
                        "cursor": "pointer",
                        "background-color": secondcolor,
                        "margin-left": "5px",
                        "margin-right": "5px",
                        "min-width": "80px",
                      };

                      const declineButtonPropertyMap: Record<string, string> = {
                        "border-radius": "48px",
                        "cursor": "pointer",
                        "background-color": btnColor,
                        "color": "rgba(72, 57, 153, 1)",
                        "margin-left": "5px",
                        "margin-right": "5px",
                        "min-width": "80px",
                      };

                      const secondbackgroundPropertyMap: Record<string, string> = {
                        "position": "absolute",
                        "background-color": bgColors,
                        "width": "35%",
                        "right": "0px",
                        "height": "100%",
                        "z-index": "-3",
                        "opacity": "30%",
                        "bottom": "0px",
                        "border-bottom-right-radius": `${borderRadius}px`,
                        "border-top-right-radius": `${borderRadius}px`
                      };


                      const headingPropertyMap: Record<string, string> = {
                        "color": headColor,
                        "font-size": "20px",
                        "font-weight": `${weight}`,
                        "text-align": `${selectedtext}`,
                        "margin-top": "0",
                        "margin-bottom": "10px",
                        "width": "100%",
                      };
                      switch (style) {
                        case "centeralign":
                          headingPropertyMap["text-align"] = "center";
                          break;
                      }

                      await divStyle.setProperties(divPropertyMap);
                      await paragraphStyle.setProperties(paragraphPropertyMap);
                      await buttonContainerStyle.setProperties(buttonContainerPropertyMap);
                      await buttonStyle.setProperties(buttonPropertyMap);
                      await declinebutton.setProperties(declineButtonPropertyMap)
                      await prefrenceButtons.setProperties(declineButtonPropertyMap)

                      await headingStyle.setProperties(headingPropertyMap);
                      await secondivstyle.setProperties(secondbackgroundPropertyMap)
                      console.log("✅ Style properties set for all elements");

                      if (newDiv.setStyles) {
                        await newDiv.setStyles([divStyle]);
                        console.log("✅ Div styles applied successfully!");
                      }

                      try {

                        let SecondDiv;
                        if (style === "alignstyle") {
                          SecondDiv = await selectedElement.before(webflow.elementPresets.DivBlock);
                          if (SecondDiv.setStyles) {
                            await SecondDiv.setStyles([secondivstyle]);
                            console.log("✅ SecondDiv styles applied!");
                          }
                        }

                        const tempHeading = await selectedElement.before(webflow.elementPresets.Heading);
                        if (!tempHeading) {
                          throw new Error("Failed to create heading");
                        }
                        if (tempHeading.setStyles) {
                          await tempHeading.setStyles([headingStyle]);
                          console.log("✅ Heading styles applied!");
                        }
                        if (tempHeading.setTextContent) {
                          await tempHeading.setTextContent(translations[language as keyof typeof translations].heading);
                          console.log("✅ Heading text set via setText!");
                        } else {
                          console.error("❌ setText method not available on heading element");
                        }

                        const tempParagraph = await selectedElement.before(webflow.elementPresets.Paragraph);
                        if (!tempParagraph) {
                          throw new Error("Failed to create paragraph");
                        }

                        if (tempParagraph.setStyles) {
                          await tempParagraph.setStyles([paragraphStyle]);
                          console.log("✅ Paragraph styles applied!");
                        }

                        if (tempParagraph.setTextContent) {
                          await tempParagraph.setTextContent(translations[language as keyof typeof translations].description);
                          console.log("✅ Paragraph text set via setText!");
                        } else {
                          console.error("❌ setText method not available on paragraph element");
                        }

                        const buttonContainer = await selectedElement.before(webflow.elementPresets.DivBlock);
                        if (!buttonContainer) {
                          throw new Error("Failed to create button container");
                        }
                        await buttonContainer.setStyles([buttonContainerStyle]);

                        const prefrenceButton = await selectedElement.before(webflow.elementPresets.Button);
                        if (!prefrenceButton) {
                          throw new Error("Failed to create decline button");
                        }
                        await prefrenceButton.setStyles([prefrenceButtons]);
                        await prefrenceButton.setTextContent(translations[language as keyof typeof translations].preferences);
                        console.log("declineButton:", prefrenceButton);


                        if ((prefrenceButton as any).setDomId) {
                          await (prefrenceButton as any).setDomId("preferences-btn"); // Type assertion
                          console.log("✅ Accept button ID set to #simple-accept");
                        } else {
                          console.error("❌ setDomId method not available on accept button element");
                        }

                        const acceptButton = await selectedElement.before(webflow.elementPresets.Button);
                        if (!acceptButton) {
                          throw new Error("Failed to create accept button");
                        }
                        await acceptButton.setStyles([buttonStyle]);
                        await acceptButton.setTextContent(translations[language as keyof typeof translations].accept);
                        console.log("acceptButton:", acceptButton);

                        if ((acceptButton as any).setDomId) {
                          await (acceptButton as any).setDomId("accept-btn"); // Type assertion
                          console.log("✅ prefrence button ID set to #simple-accept");
                        } else {
                          console.error("❌ setDomId method not available on accept button element");
                        }

                        const declineButton = await selectedElement.before(webflow.elementPresets.Button);
                        if (!declineButton) {
                          throw new Error("Failed to create decline button");
                        }
                        await declineButton.setStyles([declinebutton]);
                        await declineButton.setTextContent(translations[language as keyof typeof translations].reject);
                        console.log("declineButton:", declineButton);

                        if ((declineButton as any).setDomId) {
                          await (declineButton as any).setDomId("decline-btn"); // Type assertion
                          console.log("✅ prefrence button ID set to #simple-accept");
                        } else {
                          console.error("❌ setDomId method not available on accept button element");
                        }


                        if (newDiv.append && tempHeading && tempParagraph && buttonContainer) {
                          if (SecondDiv) await newDiv.append(SecondDiv);
                          await newDiv.append(tempHeading);
                          await newDiv.append(tempParagraph);
                          await newDiv.append(buttonContainer);
                          console.log("✅ Appended heading, paragraph, and button container to div!");

                          if (buttonContainer.append && acceptButton && declineButton && prefrenceButton) {
                            await buttonContainer.append(acceptButton);
                            await buttonContainer.append(declineButton);
                            await buttonContainer.append(prefrenceButton)
                            console.log("✅ Appended accept and decline buttons to button container!");
                          } else {
                            console.error("❌ Failed to append buttons to the button container.");
                          }
                        } else {
                          console.error("❌ Failed to append elements to the main div.");
                        }

                        console.log("🎉 Cookie consent banner successfully created!");
                        setIsLoading(false);
                        handleCreatePreferences()
                        fetchAnalyticsBlockingsScripts()
                        setShowPopup(false)

                      } catch (error) {
                        console.error("❌ Error creating cookie banner:", error);
                        webflow.notify({ type: "error", message: "An error occurred while creating the cookie banner." });

                      }
                    } catch (error) {
                      console.error("❌ Unexpected error:", error);
                      webflow.notify({ type: "error", message: "Unexpected error occurred." });
                      setIsLoading(false);
                    }
                  }}
                >
                  {isLoading ? (
                    <span>wait...</span> 
                  ) : (
                    "Confirm"
                  )}
                </button>
              )}
              {selectedOptions.includes("US State laws") && activeMode === "Advanced" && (<button
                className="confirm-button"
                onClick={async () => {
                  try {
                    console.log("🟢 Button clicked!");

                    const selectedElement = await webflow.getSelectedElement();
                    if (!selectedElement) {
                      console.error("❌ No element selected.");
                      webflow.notify({ type: "error", message: "No element selected in the Designer." });
                      return;
                    }
                    console.log("✅ Selected element:", selectedElement);

                    const newDiv = await selectedElement.before(webflow.elementPresets.DivBlock);
                    if (!newDiv) {
                      console.error("❌ Failed to create div.");
                      webflow.notify({ type: "error", message: "Failed to create div." });
                      return;
                    }
                    console.log("✅ New div created:", newDiv);

                    if ((newDiv as any).setDomId) {
                      await (newDiv as any).setDomId("initial-consent-banner"); // Type assertion
                      console.log("✅ prefrence button ID set to #simple-accept");
                    } else {
                      console.error("❌ setDomId method not available on accept button element");
                    }

                    const timestamp = Date.now();
                    const divStyleName = `consebit-ccpa-banner-div-${timestamp}`;
                    const paragraphStyleName = `consebit-ccpa-banner-text-${timestamp}`;
                    const buttonContainerStyleName = `consebit-ccpa-button-container-${timestamp}`;
                    const buttonStyleName = `consebit-ccpa--button-accept${timestamp}`;
                    const headingStyleName = `consebit-ccpa-banner-heading-${timestamp}`;
                    const linktextstyle = `consnetbit-linkblock-${timestamp}`

                    const divStyle = await webflow.createStyle(divStyleName);
                    const paragraphStyle = await webflow.createStyle(paragraphStyleName);
                    const buttonContainerStyle = await webflow.createStyle(buttonContainerStyleName);
                    const Linktext = await webflow.createStyle(linktextstyle)
                    const headingStyle = await webflow.createStyle(headingStyleName);
                    console.log("✅ Created new styles:", divStyleName, paragraphStyleName, buttonContainerStyleName, buttonStyleName, headingStyleName);

                    const collection = await webflow.getDefaultVariableCollection();
                    const webflowBlue = await collection?.createColorVariable("Webflow Blue", "rgba(255, 255, 255, 1)");
                    const webflowBlueValue = (webflowBlue as any)?.value || "rgba(255, 255, 255, 1)";

                    const divPropertyMap: Record<string, string> = {
                      "background-color": color,
                      // "height": "220px",
                      // "width": "438px",
                      "position": "fixed",
                      "z-index": "99999",
                      "padding-top": "20px",
                      "padding-right": "20px",
                      "padding-bottom": "20px",
                      "padding-left": "20px",
                      // "top": "65%", // Remove static position
                      // "right": "5%", // Remove static position
                      "border-radius": `${borderRadius}px`,
                      "display": "flex",
                      "flex-direction": "column",
                      "align-items": "center",
                      "justify-content": "center",
                      "box-shadow": "2px 2px 20px rgba(0, 0, 0, 0.51)",
                    };

                    if (window.innerWidth <= 768) { 
                      divPropertyMap["width"] = "100%";
                      divPropertyMap["height"] = "40%";
                    }
                   
                    divPropertyMap["bottom"] = "3%"; 

                    switch (selected) {
                      case "left":
                        divPropertyMap["left"] = "3%";
                       
                        delete divPropertyMap["right"]; 
                        break;

                      case "center":
                        divPropertyMap["left"] = "50%"; 
                       
                        delete divPropertyMap["right"]; 
                        
                        divPropertyMap["transform"] = "translateX(-50%)";
                        break;
                      case "right":
                      default: 
                        divPropertyMap["right"] = "5%";
                        
                        delete divPropertyMap["left"]; 
                        break;
                    }
                    switch (style) {
                      case "bigstyle":
                        divPropertyMap["width"] = "370px";
                        divPropertyMap["min-height"] = "284px";
                        break;
                      case "fullwidth":
                        divPropertyMap["width"] = "100%";
                        divPropertyMap["min-height"] = "167px";
                        delete divPropertyMap["left"];
                        delete divPropertyMap["right"];
                        divPropertyMap["bottom"] = "0px" 
                        break;
                      case "centeralign":
                        divPropertyMap["width"] = "566px";
                        divPropertyMap["min-height"] = "167px";
                      
                        break;
                      case "align":
                      case "alignstyle": 
                      default: 
                        divPropertyMap["width"] = "438px"; 
                        divPropertyMap["min-height"] = "220px"; 
                        break;
                    }

                    const paragraphPropertyMap: Record<string, string> = {
                      "color": "rgba(25, 25, 25, 1)",
                      "font-size": "16px",
                      "font-weight": "400",
                      "line-height": "1.5",
                      "text-align": "left",
                      "margin-top": "0",
                      "margin-right": "0",
                      "margin-bottom": "10px",
                      "margin-left": "0",
                      "max-width": "400px",
                      "display": "block",
                      "width": "100%",
                    };

                    const buttonContainerPropertyMap: Record<string, string> = {
                      "display": "flex",
                      "justify-content": "left",
                      "margin-top": "10px",
                      "width": "100%",
                    };

                    const buttonPropertyMap: Record<string, string> = {
                      "text-align": "left",
                      "cursor": "pointer",
                      "color": "rgba(72, 57, 153, 1)",
                      "font-size": "16px",
                      "font-weight": "500",
                      "text-decoration": "none"

                    };

                    const declineButtonPropertyMap: Record<string, string> = {
                      "border-radius": "48px",
                      "cursor": "pointer",
                      "background-color": "rgba(241, 241, 241, 1)",
                      "color": "rgba(72, 57, 153, 1)",
                      "margin-left": "5px",
                      "margin-right": "5px",
                      "min-width": "80px",
                    };


                    const headingPropertyMap: Record<string, string> = {
                      "color": "rgba(72, 57, 153, 1)",
                      "font-size": "20px",
                      "font-weight": "500",
                      "text-align": "left",
                      "margin-top": "0",
                      "margin-bottom": "10px",
                      "width": "100%",
                    };

                    await divStyle.setProperties(divPropertyMap);
                    await paragraphStyle.setProperties(paragraphPropertyMap);
                    await buttonContainerStyle.setProperties(buttonContainerPropertyMap);
                    await Linktext.setProperties(declineButtonPropertyMap);



                    await headingStyle.setProperties(headingPropertyMap);
                    console.log("✅ Style properties set for all elements");

                    if (newDiv.setStyles) {
                      await newDiv.setStyles([divStyle]);
                      console.log("✅ Div styles applied successfully!");
                    }

                    try {
                      const tempHeading = await selectedElement.before(webflow.elementPresets.Heading);
                      if (!tempHeading) {
                        throw new Error("Failed to create heading");
                      }
                      if (tempHeading.setStyles) {
                        await tempHeading.setStyles([headingStyle]);
                        console.log("✅ Heading styles applied!");
                      }
                      if (tempHeading.setTextContent) {
                        await tempHeading.setTextContent(translations[language as keyof typeof translations].ccpa.heading);
                        console.log("✅ Heading text set via setText!");
                      } else {
                        console.error("❌ setText method not available on heading element");
                      }

                      const tempParagraph = await selectedElement.before(webflow.elementPresets.Paragraph);
                      if (!tempParagraph) {
                        throw new Error("Failed to create paragraph");
                      }

                      if (tempParagraph.setStyles) {
                        await tempParagraph.setStyles([paragraphStyle]);
                        console.log("✅ Paragraph styles applied!");
                      }

                      if (tempParagraph.setTextContent) {
                        await tempParagraph.setTextContent(translations[language as keyof typeof translations].ccpa.description);
                      } else {
                        console.error("❌ setText method not available on paragraph element");
                      }

                      const buttonContainer = await selectedElement.before(webflow.elementPresets.DivBlock);
                      if (!buttonContainer) {
                        throw new Error("Failed to create button container");
                      }
                      await buttonContainer.setStyles([buttonContainerStyle]);

                      const prefrenceButton = await selectedElement.before(webflow.elementPresets.LinkBlock);
                      if (!prefrenceButton) {
                        throw new Error("Failed to create decline button");
                      }
                      await prefrenceButton.setStyles([Linktext])
                      await prefrenceButton.setTextContent(translations[language as keyof typeof translations].ccpa.doNotShare);
                      console.log("declineButton:", prefrenceButton);


                      if ((prefrenceButton as any).setDomId) {
                        await (prefrenceButton as any).setDomId("do-not-share-link"); // Type assertion
                        console.log("✅ Accept button ID set to #simple-accept");
                      } else {
                        console.error("❌ setDomId method not available on accept button element");
                      }



                      if (newDiv.append && tempHeading && tempParagraph && buttonContainer) {
                        await newDiv.append(tempHeading);
                        await newDiv.append(tempParagraph);
                        await newDiv.append(buttonContainer);
                        console.log("✅ Appended heading, paragraph, and button container to div!");

                        if (buttonContainer.append && prefrenceButton) {

                          await buttonContainer.append(prefrenceButton)
                          console.log("✅ Appended accept and decline buttons to button container!");
                        } else {
                          console.error("❌ Failed to append buttons to the button container.");
                        }
                      } else {
                        console.error("❌ Failed to append elements to the main div.");
                      }

                      console.log("🎉 Cookie consent banner successfully created!");
                      handleCreatePreferencesccpa()
                      setShowPopup(false)

                    } catch (error) {
                      console.error("❌ Error creating cookie banner:", error);
                      webflow.notify({ type: "error", message: "An error occurred while creating the cookie banner." });
                    }
                  } catch (error) {
                    console.error("❌ Unexpected error:", error);
                    webflow.notify({ type: "error", message: "Unexpected error occurred." });
                  }
                }}
              >
                Confirm ccpa
              </button>)}


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
                {activeMode === "Advanced" && selectedOptions.includes("GDPR") && (
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

                        onChange={() => {
                          if (!toggleStates.customToggle) { // Only allow enabling, not disabling
                            handleToggle("customToggle");
                            ApplyCustomToggle(); // Call the function when enabling
                          }
                        }}
                        disabled={toggleStates.customToggle} // Disable checkbox after it's checked
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


                {/* Disable Scroll - Advanced Mode Only
                {activeMode === "Advanced" ? (
                  <div className="togglediv">
                    <label className="toggle-container">
                      <span className="toggle-label">Disable scroll</span>
                      <input
                        type="checkbox"
                        className="toggle-checkbox"
                        checked={toggleStates.disableScroll}
                        onChange={() => {
                          handleToggle("disableScroll");
                          ApplyCustomToggle(); // Call the function here
                        }}
                      />
                      <div className={`toggle ${toggleStates.disableScroll ? "toggled" : ""}`}></div>
                    </label>
                  </div>
                ) : null} */}

                {/* Disable Scroll - Advanced Mode Only */}
                {activeMode === "Advanced" ? (
                  <div className="togglediv">
                    <label className="toggle-container">
                      <span className="toggle-label">Disable scroll</span>
                      <input
                        type="checkbox"
                        className="toggle-checkbox"
                        checked={toggleStates.disableScroll}
                        onChange={() => {
                          if (!toggleStates.disableScroll) { // Only allow enabling, not disabling
                            handleToggle("disableScroll");
                            ApplyScrollcontroll(); // Call the function when enabling
                          }
                        }}
                        disabled={toggleStates.disableScroll} // Disable checkbox after it's checked
                      />
                      <div className={`toggle ${toggleStates.disableScroll ? "toggled" : ""}`}></div>
                    </label>
                  </div>
                ) : null}


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
                  <div className="topbar"></div>
                  <div
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
                      textAlign: selectedtext as "left" | "center" | "right",
                      alignItems: style === "centeralign" ? "center" : undefined, // Change dynamically
                      fontWeight: weight, 
                      width: previewDimensions.width,
                      height: previewDimensions.height,
                      borderRadius: `${borderRadius}px`,
                      backgroundColor: color,
                    }}
                  >

                    {style === "alignstyle" && <div className="secondclass" style={{ backgroundColor: bgColors, borderBottomRightRadius: `${borderRadius}px`, borderTopRightRadius: `${borderRadius}px` }}></div>}
                    <div className="space" style={{ color: headColor , fontWeight: weight,  }}><h4>Cookie Setting</h4></div>

                    <div className="padding" style={{ color: paraColor }}>
                      <span>
                        {language === "English"
                          ? "We use cookies to provide you with the best possible experience. They also allow us to analyze user behavior in order to constantly improve the website for you."
                          : language === "Spanish"
                            ? "Utilizamos cookies para brindarle la mejor experiencia posible. También nos permiten analizar el comportamiento del usuario para mejorar constantemente el sitio web para usted."
                            : "Nous utilisons des cookies pour vous offrir la meilleure expérience possible. Ils nous permettent également d'analyser le comportement des utilisateurs afin d'améliorer constamment le site Web pour vous."}
                      </span>
                    </div>
                    <div className="button-wrapp" style={{ justifyContent:  style === "centeralign" ? "center" : undefined, }}>
                      {activeMode === "Advanced" && (<button className="btn-preferences" style={{ borderRadius: `${buttonRadius}px`, backgroundColor: btnColor }} >Preferences</button>)}
                      <button className="btn-reject" style={{ borderRadius: `${buttonRadius}px`, backgroundColor: btnColor }} >Reject</button>
                      <button className="btn-accept" style={{ borderRadius: `${buttonRadius}px`, backgroundColor: secondcolor }} >Accept</button>


                    </div>
                  </div>

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
              borderRadius={borderRadius}
              setBorderRadius={setBorderRadius}
              buttonRadius={buttonRadius}
              setButtonRadius={setButtonRadius}
              color={color}
              setColor={setColor}
              bgColor={bgColor}
              setBgColor={setBgColor}
              btnColor={btnColor}
              setBtnColor={setBtnColor}
              headColor={headColor}
              setHeadColor={setHeadColor}
              paraColor={paraColor}
              setParaColor={setParaColor}
              secondcolor={secondcolor}
              setSecondcolor={setSecondcolor}
              bgColors={bgColors}
              setBgColors={setBgColors}
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

