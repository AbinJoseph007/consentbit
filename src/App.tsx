import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import "./style/styless.css";
import Customization from "./components/Customization";
import Script from "./components/Script";
const questionmark = new URL("./assets/questionmark.png", import.meta.url).href;
const openeye = new URL("./assets/closedeye.png", import.meta.url).href;
const eye = new URL("./assets/eye.png", import.meta.url).href;
const dots = new URL("./assets/dots.png", import.meta.url).href;
const book = new URL("./assets/book.png", import.meta.url).href;
const users = new URL("./assets/user.png", import.meta.url).href;
const watch = new URL("./assets/fi-rr-play (1).png", import.meta.url).href;
const doc = new URL("./assets/message.png", import.meta.url).href;
import { customCodeApi } from "./services/api";
import { useAuth } from "../src/hooks/userAuth";
import webflow, { WebflowAPI } from './types/webflowtypes';
import { CodeApplication } from "./types/types";
import createCookiePreferences from "./hooks/gdprPreference";
import createCookieccpaPreferences from "./hooks/ccpaPreference";
import usePersistentState from './hooks/usePersistentState'; // Adjust the path as necessary
import { json } from "stream/consumers";



type Orientation = "left" | "center" | "right";
type BannerStyle = "align" | "alignstyle" | "bigstyle" | "centeralign" | "fullwidth" | "";
interface HelpItem {
  label: string;
  href: string;
  icon: string;
}

type BreakpointAndPseudo = {
  breakpoint: string;
  pseudoClass: string;
};

type UserData = {
  firstName: string;
  email: string;
  exp: number;
  sessionToken: string;
};

const App: React.FC = ({ onAuth }: { onAuth: () => void }) => {
  // const [activeTab, setActiveTab] = useState("General Settings");
  // const [expires, setExpires] = useState("");
  // // const [animation, setAnimation] = useState("select");
  // // const [easing, setEasing] = useState("select");
  // const [size, setSize] = useState("16");
  // const [isActive, setIsActive] = useState(false);
  // const [Font, SetFont] = useState("")
  // const [selectedtext, settextSelected] = useState("left");
  // // const [style, setStyle] = useState("align")
  // const [style, setStyle] = useState<BannerStyle>("align");
  // // const [activeMode, setActiveMode] = useState("Simple");
  // const [activeMode, setActiveMode] = useState(() => {
  //   const savedMode = localStorage.getItem("activeMode");
  //   return savedMode ? JSON.parse(savedMode) : "Simple";
  // });
  // const [selected, setSelected] = useState<Orientation>("right");
  // const [selectedOption, setSelectedOption] = useState("US State laws");
  // const [weight, setWeight] = useState("semibold");
  // // const [language, setLanguage] = useState("English");
  // const [showPopup, setShowPopup] = useState(false);
  // // const [selectedOptions, setSelectedOptions] = useState(["GDPR"]);
  // const [selectedOptions, setSelectedOptions] = useState(() => {
  //   const savedOptions = localStorage.getItem("selectedOptions");
  //   return savedOptions ? JSON.parse(savedOptions) : ["GDPR"];
  // });
  // const [siteInfo, setSiteInfo] = useState<{ siteId: string; siteName: string; shortName: string } | null>(null);
  // const [accessToken, setAccessToken] = useState<string>('');
  // const [pages, setPages] = useState([]);
  // const [fetchScripts, setFetchScripts] = useState(false);
  // const [borderRadius, setBorderRadius] = useState(16);
  // // const [buttonRadius, setButtonRadius] = useState(2);
  // const [buttonRadius, setButtonRadius] = useState<number>(2);
  // const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [btnColor, setBtnColor] = useState("#F1F1F1");
  const [paraColor, setParaColor] = useState("#1F1D40");
  const [secondcolor, setSecondcolor] = useState("#483999");
  const [bgColors, setBgColors] = useState("#798EFF");
  const [headColor, setHeadColor] = useState("#483999");

  const [activeTab, setActiveTab] = usePersistentState("activeTab", "General Settings");
  const [expires, setExpires] = usePersistentState("expires", "");
  const [size, setSize] = usePersistentState("size", "16");
  const [isActive, setIsActive] = usePersistentState("isActive", false);
  const [Font, SetFont] = usePersistentState("Font", "");
  const [selectedtext, settextSelected] = usePersistentState("selectedtext", "left");
  const [style, setStyle] = usePersistentState<BannerStyle>("style", "align");
  const [activeMode, setActiveMode] = usePersistentState("activeMode", "Simple");
  const [selected, setSelected] = usePersistentState<Orientation>("selected", "right");
  const [selectedOption, setSelectedOption] = usePersistentState("selectedOption", "US State laws");
  const [weight, setWeight] = usePersistentState("weight", "semibold");
  const [showPopup, setShowPopup] = usePersistentState("showPopup", false);
  const [selectedOptions, setSelectedOptions] = usePersistentState("selectedOptions", ["GDPR"]);
  const [siteInfo, setSiteInfo] = usePersistentState<{ siteId: string; siteName: string; shortName: string } | null>("siteInfo", null);
  const [accessToken, setAccessToken] = usePersistentState<string>("accessToken", '');
  const [pages, setPages] = usePersistentState("pages", []);
  const [fetchScripts, setFetchScripts] = usePersistentState("fetchScripts", false);
  const [borderRadius, setBorderRadius] = usePersistentState("borderRadius", 16);
  const [buttonRadius, setButtonRadius] = usePersistentState<number>("buttonRadius", 2);
  const [isLoading, setIsLoading] = usePersistentState("isLoading", false);
  // const [color, setColor] = usePersistentState("color", "#ffffff");
  // const [bgColor, setBgColor] = usePersistentState("bgColor", "#ffffff");
  // const [btnColor, setBtnColor] = usePersistentState("btnColor", "#F1F1F1");
  // const [paraColor, setParaColor] = usePersistentState("paraColor", "#1F1D40");
  // const [secondcolor, setSecondcolor] = usePersistentState("secondcolor", "#483999");
  // const [bgColors, setBgColors] = usePersistentState("bgColors", "#798EFF");
  // const [headColor, setHeadColor] = usePersistentState("headColor", "#483999");
  const [userlocaldata, setUserlocaldata] = useState<UserData | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const base_url = "https://cb-server.web-8fb.workers.dev"
  const [isBannerAdded, setIsBannerAdded] = useState(false);



  const [toggleStates, setToggleStates] = usePersistentState('toggleStates', {
    customToggle: false,
    resetInteractions: false,
    disableScroll: false,
    storeConsents: false,
    globalvariable: false,
  });


  // const [toggleStates, setToggleStates] = useState(() => {
  //   const savedToggles = localStorage.getItem("toggleStates");
  //   return savedToggles
  //     ? JSON.parse(savedToggles)
  //     : {
  //         customToggle: false,
  //         resetInteractions: false,
  //         disableScroll: false,
  //         storeConsents: false,
  //         globalvariable: false,
  //       };
  // });


  // Your default states
  const defaultState = {
    animation: "select",
    easing: "select",
    language: "English",
  };

  // const [animation, setAnimation] = useState(defaultState.animation);
  // const [easing, setEasing] = useState(defaultState.easing);
  // const [language, setLanguage] = useState(defaultState.language);

  const [animation, setAnimation] = usePersistentState('animation', defaultState.animation);
  const [easing, setEasing] = usePersistentState('easing', defaultState.easing);
  const [language, setLanguage] = usePersistentState('language', defaultState.language);

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

        const localstoragedata = localStorage.getItem("wf_hybrid_user");
        if (localstoragedata) {
          try {
            const parsed = JSON.parse(localstoragedata);
            console.log("session details", parsed);
            setUserlocaldata(parsed);
          } catch (error) {
            console.error("Invalid JSON in localStorage:", error);
          }
        }

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

  // useEffect(() => {
  //   const fetchPages = async () => {
  //     try {
  //       console.log("Fetching pages...");
  //       const pagesAndFolders = await webflow.getAllPagesAndFolders();
  //       console.log("API Response:", pagesAndFolders);

  //       if (Array.isArray(pagesAndFolders) && pagesAndFolders.length > 0) {
  //         const pages = pagesAndFolders.filter(i => i.type === "Page");
  //         const pageDetails = await Promise.all(
  //           pages.map(async page => ({
  //             id: page.id,
  //             name: await page.getName(),
  //           }))
  //         );

  //         setPages(pageDetails);
  //         console.log("Pages set in state:", pageDetails);
  //       } else {
  //         console.warn("No pages found.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching pages:", error);
  //     }
  //   };

  //   fetchPages();
  // }, [webflow]);

  const handlePageChange = async (event) => {
    const pageId = event.target.value;
    const selectedPage = pages.find(page => page.id === pageId);
    if (selectedPage) {
      try {
        console.log(`Switching to page: ${selectedPage.name}`);
        await webflow.switchPage(selectedPage);
        console.log("Page switch successful");
      } catch (error) {
        console.error("Failed to switch page:", error);
      }
    }
  };

  //main function for adding custom code to the head
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

      await createCookiePreferences(selectedPreferences, language, color, btnColor, headColor, paraColor, secondcolor, buttonRadius, animation, toggleStates.customToggle
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
      await createCookieccpaPreferences(language, color, btnColor, headColor, paraColor, secondcolor, buttonRadius, animation);
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

  //need help dropdown
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const helpItems: HelpItem[] = [
    { label: 'Watch tutorial', href: '#', icon: watch },
    { label: 'Check docs', href: '#', icon: book },
    { label: 'Get support', href: '#', icon: users },
    { label: 'Send feedback', href: '#', icon: doc },
  ];

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="app">
      {/* Top Navigation */}
      <div className="navbar">
        <div>
          {user?.firstName ? (
            <p>Hello, {user.firstName}!</p>
          ) : (
            <button className="publish-buttons" onClick={openAuthScreen}>
              Authenticate
            </button>
          )}
        </div>

        {/* <div className="need-help">
          <img src={questionmark} alt="" />
          <h5>Need help?</h5>
        </div> */}

        <div className="help-dropdown-container">
          <div className="need-help" onClick={toggleOpen} ref={buttonRef}>
            <img src={questionmark} alt="Need help?" />
            <h5>Need help?</h5>
          </div>

          {isOpen && (
            <div className="help-dropdown" ref={dropdownRef}>
              <p className="helptext">help</p>
              <ul>
            {helpItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  <img src={item.icon} alt={item.label} style={{ marginRight: '8px', verticalAlign: 'middle' }} width="16" height="16" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
            </div>
          )}
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
              <div>
                {/* {!isBannerAdded ? ( */}
                <button className="publish-button" onClick={() => setShowPopup(true)}>
                  Add Your Banner
                </button>
                {/* ) : (
                  <button className="publish-buttons">
                    Update Your Banner
                  </button>
                )} */}
              </div>

            </div>
          )}

          {activeTab === "Script" && (
            <div>
              <button className="publish-buttons" onClick={() => setFetchScripts(true)}>
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
            <div className="gap">
              {activeMode === "Simple" && (
                <button
                  className="confirm-button"
                  onClick={async () => {
                    const isBannerAlreadyAdded = localStorage.getItem("cookieBannerAdded") === "true";

                    try {
                      const selectedElement = await webflow.getSelectedElement();
                      if (!selectedElement) {
                        webflow.notify({ type: "error", message: "No element selected in the Designer." });
                        return;
                      }

                      const newDiv = await selectedElement.before(webflow.elementPresets.DivBlock);
                      if (!newDiv) {
                        webflow.notify({ type: "error", message: "Failed to create div." });
                        return;
                      }
                      if ((newDiv as any).setDomId) {
                        await (newDiv as any).setDomId("simple-consent-banner"); // Type assertion
                      } else {
                      }

                      const timestamp = Date.now();
                      const divStyleName = `consentbit-banner-div`;
                      const paragraphStyleName = `consentbit-banner-text`;
                      const buttonContainerStyleName = `consentbit-button-container`;
                      const buttonStyleName = `consentbit-button-accept`;
                      const DeclinebuttonStyleName = `consentbit-button-decline`;
                      const headingStyleName = `consentbit-banner-heading`;
                      const secondbackgorundstyle = `consentbit-second-background`
                      const innerdivstyles = `consentbit-innerdiv`

                      const divStyle = await webflow.createStyle(divStyleName);
                      const paragraphStyle = await webflow.createStyle(paragraphStyleName);
                      const buttonContainerStyle = await webflow.createStyle(buttonContainerStyleName);
                      const buttonStyle = await webflow.createStyle(buttonStyleName);
                      const declinebutton = await webflow.createStyle(DeclinebuttonStyleName)
                      const headingStyle = await webflow.createStyle(headingStyleName);
                      const secondivstyle = await webflow.createStyle(secondbackgorundstyle)
                      const innerdivstyle = await webflow.createStyle(innerdivstyles)

                      const collection = await webflow.getDefaultVariableCollection();
                      const webflowBlue = await collection?.createColorVariable("Webflow Blue", "rgba(255, 255, 255, 1)");

                      const animationAttributeMap = {
                        "fade": "fade",
                        "slide-up": "slide-up",
                        "slide-down": "slide-down",
                        "slide-left": "slide-left",
                        "slide-right": "slide-right",
                        "select": "select", // No attribute if "select"
                      };

                      const animationAttribute = animationAttributeMap[animation] || "";

                      const divPropertyMap: Record<string, string> = {
                        "background-color": color,
                        "position": "fixed",
                        "font-family": Font,
                        "z-index": "9999",
                        "padding-top": "20px",
                        "padding-right": "20px",
                        "padding-bottom": "20px",
                        "padding-left": "20px",
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
                          divPropertyMap["max-width"] = "370px";
                          divPropertyMap["min-height"] = "284px";
                          break;
                        case "fullwidth":
                          divPropertyMap["max-width"] = "100%";
                          divPropertyMap["min-height"] = "167px";
                          delete divPropertyMap["left"];
                          delete divPropertyMap["right"];
                          divPropertyMap["bottom"] = "0px" // Or set to "auto"
                          break;
                        case "centeralign":
                          divPropertyMap["max-width"] = "566px";
                          divPropertyMap["min-height"] = "167px";

                          break;
                        case "align":
                        case "alignstyle":
                        default:
                          divPropertyMap["max-width"] = "438px";
                          divPropertyMap["min-height"] = "220px";
                          break;
                      }

                      const responsivePropertyMap: Record<string, string> = {
                        "max-width": "100%",
                        "width": "100%",
                        "bottom": "0",
                        "left": "0",
                        "right": "0",
                        "top": "auto",
                        "transform": "none"
                      };
                      const responsiveOptions = { breakpoint: "small" } as BreakpointAndPseudo;


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


                      const innerdivPropertyMap: Record<string, string> = {
                        "max-width": "877px",
                        "margin-left": "auto",
                        "margin-right": "auto",
                      };


                      await divStyle.setProperties(divPropertyMap);
                      await divStyle.setProperties(responsivePropertyMap, responsiveOptions);
                      await paragraphStyle.setProperties(paragraphPropertyMap);
                      await buttonContainerStyle.setProperties(buttonContainerPropertyMap);
                      await buttonStyle.setProperties(buttonPropertyMap);
                      await declinebutton.setProperties(declineButtonPropertyMap)
                      await headingStyle.setProperties(headingPropertyMap);
                      await secondivstyle.setProperties(secondbackgroundPropertyMap)
                      await innerdivstyle.setProperties(innerdivPropertyMap)

                      if (newDiv.setStyles) {
                        await newDiv.setStyles([divStyle]);
                      }

                      if (newDiv.setCustomAttribute) {
                        await newDiv.setCustomAttribute("data-animation", animationAttribute);
                        await newDiv.setCustomAttribute("scrollcontrol", toggleStates.disableScroll ? "true" : "false");

                      } else {
                        console.error("❌ setCustomAttribute method not available on newDiv element");
                      }

                      try {

                        let SecondDiv;
                        if (style === "alignstyle") {
                          SecondDiv = await selectedElement.before(webflow.elementPresets.DivBlock);
                          if (SecondDiv.setStyles) {
                            await SecondDiv.setStyles([secondivstyle]);
                          }
                        }

                        const innerdiv = await selectedElement.before(webflow.elementPresets.DivBlock);
                        await innerdiv.setStyles([innerdivstyle]);

                        const tempHeading = await selectedElement.before(webflow.elementPresets.Heading);
                        if (!tempHeading) {
                          throw new Error("Failed to create heading");
                        }
                        if (tempHeading.setStyles) {
                          await tempHeading.setStyles([headingStyle]);
                        }
                        if (tempHeading.setTextContent) {
                          await tempHeading.setTextContent(translations[language as keyof typeof translations].heading);
                        } else {
                          console.error("❌ setText method not available on heading element");
                        }

                        const tempParagraph = await selectedElement.before(webflow.elementPresets.Paragraph);
                        if (!tempParagraph) {
                          throw new Error("Failed to create paragraph");
                        }

                        if (tempParagraph.setStyles) {
                          await tempParagraph.setStyles([paragraphStyle]);
                        }

                        if (tempParagraph.setTextContent) {
                          await tempParagraph.setTextContent(translations[language as keyof typeof translations].description);
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

                        if ((acceptButton as any).setDomId) {
                          await (acceptButton as any).setDomId("simple-accept"); // Type assertion
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
                          await (declineButton as any).setDomId("simple-reject"); // Type assertion
                          console.log("✅ Accept button ID set to #simple-accept");
                        } else {
                          console.error("❌ setDomId method not available on accept button element");
                        }

                        if (newDiv.append && innerdiv && tempHeading && tempParagraph && buttonContainer) {
                          // Append elements inside innerDiv
                          await newDiv.append(innerdiv);
                          if (SecondDiv) await innerdiv.append(SecondDiv);
                          await innerdiv.append(tempHeading);
                          await innerdiv.append(tempParagraph);
                          await innerdiv.append(buttonContainer);

                          console.log("✅ Wrapped all elements inside innerDiv!");

                          // Append buttons inside buttonContainer
                          if (buttonContainer.append && acceptButton && declineButton) {
                            await buttonContainer.append(acceptButton);
                            await buttonContainer.append(declineButton);
                          } else {
                            console.error("❌ Failed to append buttons to the button container.");
                          }

                          // Append innerDiv inside newDiv
                        } else {
                          console.error("❌ Failed to append elements to the innerDiv or newDiv.");
                        }


                        console.log("🎉 Cookie consent banner successfully created!");
                        if (!isBannerAlreadyAdded) {
                          fetchAnalyticsBlockingsScripts()
                          localStorage.setItem("cookieBannerAdded", "true");
                        }
                        setShowPopup(false)
                        setIsBannerAdded(true);
                        setShowSuccessPopup(true);

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
                    // const isBannerAlreadyAdded = localStorage.getItem("cookieBannerAdded") === "true";
                    try {

                      const selectedElement = await webflow.getSelectedElement();
                      if (!selectedElement) {
                        console.error("❌ No element selected.");
                        webflow.notify({ type: "error", message: "No element selected in the Designer." });
                        setIsLoading(false); // Reset loading state
                        return;
                      }


                      const newDiv = await selectedElement.before(webflow.elementPresets.DivBlock);
                      console.log("the main div", newDiv);

                      if (!newDiv) {
                        webflow.notify({ type: "error", message: "Failed to create div." });
                        return;
                      }


                      if ((newDiv as any).setDomId) {
                        await (newDiv as any).setDomId("consent-banner"); // Type assertion

                      } else {
                        console.error("❌ setDomId method not available on accept button element");
                      }

                      const timestamp = Date.now();
                      const divStyleName = `consentbit-gdpr-banner-div`;
                      const paragraphStyleName = `consentbit-banner-text`;
                      const buttonContainerStyleName = `consentbit-banner-button-container`;
                      const prefrenceButton = `consentbit-banner-button-preference`
                      const buttonStyleName = `consentbit-banner-button-accept`;
                      const DeclinebuttonStyleName = `consentbit-banner-button-decline`;
                      const headingStyleName = `consentbit-banner-headings`;
                      const secondbackgorundstyle = `consentbit-second-backgrounds`
                      const innerdivstyles = `consentbit-innerdiv`


                      const divStyle = await webflow.createStyle(divStyleName);
                      const paragraphStyle = await webflow.createStyle(paragraphStyleName);
                      const buttonContainerStyle = await webflow.createStyle(buttonContainerStyleName);
                      const buttonStyle = await webflow.createStyle(buttonStyleName);
                      const declinebutton = await webflow.createStyle(DeclinebuttonStyleName)
                      const prefrenceButtons = await webflow.createStyle(prefrenceButton)
                      const headingStyle = await webflow.createStyle(headingStyleName);
                      const secondivstyle = await webflow.createStyle(secondbackgorundstyle)
                      const innerdivstyle = await webflow.createStyle(innerdivstyles)

                      const collection = await webflow.getDefaultVariableCollection();
                      const webflowBlue = await collection?.createColorVariable("Webflow Blue", "rgba(255, 255, 255, 1)");
                      const webflowBlueValue = (webflowBlue as any)?.value || "rgba(255, 255, 255, 1)";

                      const animationAttributeMap = {
                        "fade": "fade",
                        "slide-up": "slide-up",
                        "slide-down": "slide-down",
                        "slide-left": "slide-left",
                        "slide-right": "slide-right",
                        "select": "select", // No attribute if "select"
                      };

                      const animationAttribute = animationAttributeMap[animation] || "";

                      const divPropertyMap: Record<string, string> = {
                        "background-color": color,
                        "position": "fixed",
                        "z-index": "99999",
                        "padding-top": "20px",
                        "padding-right": "20px",
                        "padding-bottom": "20px",
                        "padding-left": "20px",
                        "border-radius": `${borderRadius}px`,
                        "display": "none",
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

                      const responsivePropertyMap: Record<string, string> = {
                        "max-width": "100%",
                        "width": "100%",
                        "bottom": "0",
                        "left": "0",
                        "right": "0",
                        "top": "auto",
                        "transform": "none"
                      };
                      const responsiveOptions = { breakpoint: "small" } as BreakpointAndPseudo;

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

                      const responsivebuttonPropertyMap: Record<string, string> = {
                        "margin-bottom": "10px",
                        "flex-direction": "column",
                        "justify-content": "center",
                        "text-align": "center"
                      };
                      const responsivebuttonOptions = { breakpoint: "small" } as BreakpointAndPseudo;

                      const declineButtonPropertyMap: Record<string, string> = {
                        "border-radius": `${buttonRadius}px`,
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

                      const innerdivPropertyMap: Record<string, string> = {
                        "max-width": "877px",
                        "margin-left": "auto",
                        "margin-right": "auto",
                      };


                      await divStyle.setProperties(divPropertyMap);
                      await divStyle.setProperties(responsivePropertyMap, responsiveOptions);

                      await paragraphStyle.setProperties(paragraphPropertyMap);
                      await buttonContainerStyle.setProperties(buttonContainerPropertyMap);
                      await buttonContainerStyle.setProperties(responsivebuttonPropertyMap, responsivebuttonOptions);

                      await buttonStyle.setProperties(buttonPropertyMap);
                      await declinebutton.setProperties(declineButtonPropertyMap)
                      await prefrenceButtons.setProperties(declineButtonPropertyMap)
                      await headingStyle.setProperties(headingPropertyMap);
                      await secondivstyle.setProperties(secondbackgroundPropertyMap)
                      await innerdivstyle.setProperties(innerdivPropertyMap)
                      if (newDiv.setStyles) {
                        await newDiv.setStyles([divStyle]);
                      }
                      if (newDiv.setCustomAttribute) {
                        await newDiv.setCustomAttribute("data-animation", animationAttribute);
                        await newDiv.setCustomAttribute("data-cookie-banner", toggleStates.disableScroll ? "true" : "false");
                      } else {
                        console.error("❌ setCustomAttribute method not available on newDiv element");
                      }
                      try {
                        let SecondDiv;
                        if (style === "alignstyle") {
                          SecondDiv = await selectedElement.before(webflow.elementPresets.DivBlock);
                          if (SecondDiv.setStyles) {
                            await SecondDiv.setStyles([secondivstyle]);
                          }
                        }
                        const innerdiv = await selectedElement.before(webflow.elementPresets.DivBlock);
                        await innerdiv.setStyles([innerdivstyle]);

                        const tempHeading = await selectedElement.before(webflow.elementPresets.Heading);
                        if (!tempHeading) {
                          throw new Error("Failed to create heading");
                        }
                        if (tempHeading.setStyles) {
                          await tempHeading.setStyles([headingStyle]);
                        }
                        if (tempHeading.setTextContent) {
                          await tempHeading.setTextContent(translations[language as keyof typeof translations].heading);
                        } else {
                          console.error("❌ setText method not available on heading element");
                        }
                        const tempParagraph = await selectedElement.before(webflow.elementPresets.Paragraph);
                        if (!tempParagraph) {
                          throw new Error("Failed to create paragraph");
                        }
                        if (tempParagraph.setStyles) {
                          await tempParagraph.setStyles([paragraphStyle]);

                        }

                        if (tempParagraph.setTextContent) {
                          await tempParagraph.setTextContent(translations[language as keyof typeof translations].description);

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

                        } else {
                          console.error("❌ setDomId method not available on accept button element");
                        }

                        const acceptButton = await selectedElement.before(webflow.elementPresets.Button);
                        if (!acceptButton) {
                          throw new Error("Failed to create accept button");
                        }
                        await acceptButton.setStyles([buttonStyle]);
                        await acceptButton.setTextContent(translations[language as keyof typeof translations].accept);


                        if ((acceptButton as any).setDomId) {
                          await (acceptButton as any).setDomId("accept-btn"); // Type assertion

                        } else {
                          console.error("❌ setDomId method not available on accept button element");
                        }

                        const declineButton = await selectedElement.before(webflow.elementPresets.Button);
                        if (!declineButton) {
                          throw new Error("Failed to create decline button");
                        }
                        await declineButton.setStyles([declinebutton]);
                        await declineButton.setTextContent(translations[language as keyof typeof translations].reject);


                        if ((declineButton as any).setDomId) {
                          await (declineButton as any).setDomId("decline-btn"); // Type assertion

                        } else {
                          console.error("❌ setDomId method not available on accept button element");
                        }



                        if (newDiv.append && innerdiv && tempHeading && tempParagraph && buttonContainer) {
                          // Append elements inside innerDiv
                          await newDiv.append(innerdiv);
                          if (SecondDiv) await innerdiv.append(SecondDiv);
                          await innerdiv.append(tempHeading);
                          await innerdiv.append(tempParagraph);
                          await innerdiv.append(buttonContainer);

                          if (buttonContainer.append && acceptButton && declineButton && prefrenceButton) {
                            await buttonContainer.append(acceptButton);
                            await buttonContainer.append(declineButton);
                            await buttonContainer.append(prefrenceButton)

                          } else {
                            console.error("❌ Failed to append buttons to the button container.");
                          }
                        } else {
                          console.error("❌ Failed to append elements to the main div.");
                        }

                        // ... existing code ...
                        setIsLoading(false);
                        handleCreatePreferences();
                        // if (!isBannerAlreadyAdded) {
                        fetchAnalyticsBlockingsScripts()
                        //   localStorage.setItem("cookieBannerAdded", "true");
                        // }

                        setTimeout(() => {
                          setShowPopup(false);
                        }, 30000);
                        setIsBannerAdded(true);


                      } catch (error) {

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
                  const isBannerAlreadyAdded = localStorage.getItem("cookieBannerAdded") === "true";

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
                    const divStyleName = `consentbit-ccpa-banner-div`;
                    const paragraphStyleName = `consentbit-ccpa-banner-text`;
                    const buttonContainerStyleName = `consentbit-ccpa-button-container`;
                    const buttonStyleName = `consentbit-ccpa--button-accept`;
                    const headingStyleName = `consentbit-ccpa-banner-heading`;
                    const linktextstyle = `consentbit-ccpa-linkblock`

                    const divStyle = await webflow.createStyle(divStyleName);
                    const paragraphStyle = await webflow.createStyle(paragraphStyleName);
                    const buttonContainerStyle = await webflow.createStyle(buttonContainerStyleName);
                    const Linktext = await webflow.createStyle(linktextstyle)
                    const headingStyle = await webflow.createStyle(headingStyleName);
                    console.log("✅ Created new styles:", divStyleName, paragraphStyleName, buttonContainerStyleName, buttonStyleName, headingStyleName);

                    const collection = await webflow.getDefaultVariableCollection();
                    const webflowBlue = await collection?.createColorVariable("Webflow Blue", "rgba(255, 255, 255, 1)");
                    const webflowBlueValue = (webflowBlue as any)?.value || "rgba(255, 255, 255, 1)";

                    const animationAttributeMap = {
                      "fade": "fade",
                      "slide-up": "slide-up",
                      "slide-down": "slide-down",
                      "slide-left": "slide-left",
                      "slide-right": "slide-right",
                      "select": "select", // No attribute if "select"
                    };

                    const animationAttribute = animationAttributeMap[animation] || "";

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
                      "display": "none",
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
                    const responsivePropertyMap: Record<string, string> = {
                      "max-width": "100%", // Full width
                      "bottom": "0",
                      "left": "0",
                      "right": "0",
                      "top": "auto", // Reset top to auto
                      "transform": "none" // Reset transform to none
                    };
                    const responsiveOptions = { breakpoint: "small" } as BreakpointAndPseudo;

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
                    switch (style) {
                      case "centeralign":
                        paragraphPropertyMap["text-align"] = "center";
                        break;
                    }

                    const buttonContainerPropertyMap: Record<string, string> = {
                      "display": "flex",
                      "justify-content": "left",
                      "margin-top": "10px",
                      "width": "100%",
                    };
                    switch (style) {
                      case "centeralign":
                        buttonContainerPropertyMap["justify-content"] = "center";
                        break;
                    }

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
                    await divStyle.setProperties(responsivePropertyMap, responsiveOptions);
                    await paragraphStyle.setProperties(paragraphPropertyMap);
                    await buttonContainerStyle.setProperties(buttonContainerPropertyMap);
                    await Linktext.setProperties(declineButtonPropertyMap);
                    await headingStyle.setProperties(headingPropertyMap);
                    console.log("✅ Style properties set for all elements");

                    if (newDiv.setStyles) {
                      await newDiv.setStyles([divStyle]);
                      console.log("✅ Div styles applied successfully!");
                    }

                    if (newDiv.setCustomAttribute) {
                      await newDiv.setCustomAttribute("data-animation", animationAttribute);
                      console.log(`✅ Attribute "data-animation" set to "${animationAttribute}"!`);
                    } else {
                      console.error("❌ setCustomAttribute method not available on newDiv element");
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
                      if (!isBannerAlreadyAdded) {
                        fetchAnalyticsBlockingsScripts()
                        localStorage.setItem("cookieBannerAdded", "true");
                      }
                      setTimeout(() => {
                        setShowPopup(false);
                      }, 40000);
                      setIsBannerAdded(true);


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

              {showSuccessPopup && (
                <div className="success-popup">
                  <p>🎉 Banner added successfully! Now publish your site to make it live.</p>
                  <button onClick={() => setShowSuccessPopup(false)}>Close</button>
                </div>
              )}


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
                <div className={`cookie-settings ${(activeMode === "Advanced" && selectedOptions.includes("GDPR")) ? "active" : ""}`}>
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


                {/* Use Custom Toggle Button - Advanced Mode Only */}
                {activeMode === "Advanced" && (
                  <div className="togglediv">
                    <label className="toggle-container">
                      <div className="flex">
                        <span className="toggle-label">Use custom toggle button</span>

                        <div className="tooltip-containers">
                          <img src={questionmark} alt="info" className="tooltip-icon" />
                          <span className="tooltip-text">For the better user experience use this feature</span>
                        </div>
                      </div>

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
                    <div className="flex">
                      <span className="toggle-label">Reset interactions</span>

                      <div className="tooltip-containers">
                        <img src={questionmark} alt="info" className="tooltip-icons" />
                        <span className="tooltip-text">this will reset the interactions that you have added</span>
                      </div>
                    </div>

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
                    <div className="flex">
                      <span className="toggle-label">Use Global Banner</span>

                      <div className="tooltip-containers">
                        <img src={questionmark} alt="info" className="tooltip-icons" />
                        <span className="tooltip-text">this will set the Banner Globally</span>
                      </div>
                    </div>

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
                  // <div className="settings-group border">
                  //   <div className="flex">
                  //     <label htmlFor="source">Source</label>
                  //     <div className="tooltip-container">
                  //       <img src={questionmark} alt="info" className="tooltip-icon" />
                  //       <span className="tooltip-text">Pages of your site</span>
                  //     </div>
                  //   </div>
                  //   <div className="setting-groups">
                  //     <select id="pages">
                  //       {/* <option value="">Select a page</option> */}
                  //       {pages.map((page) => (
                  //         <option key={page.id} value={page.id}>
                  //           {page.name}
                  //         </option>
                  //       ))}
                  //     </select>
                  //   </div>
                  // </div>
                  <div className="settings-group border">
  <div className="flex">
    <label htmlFor="source">Source</label>
    <div className="tooltip-container">
      <img src={questionmark} alt="info" className="tooltip-icon" />
      <span className="tooltip-text">Pages of your site</span>
    </div>
  </div>
  <div className="setting-groups">
    <select id="pages" onChange={handlePageChange}>
      {/* <option value="">Select a page</option> */}
      {pages.map((page) => (
        <option key={page.id} value={page.id}>
          {page.name}
        </option>
      ))}
    </select>
  </div>
</div>
                )}

                {/* Disable Scroll - Advanced Mode Only */}
                {activeMode === "Advanced" ? (
                  <div className="togglediv">
                    <label className="toggle-container">
                      <div className="flex">
                        <span className="toggle-label">Disable scroll</span>

                        <div className="tooltip-containers">
                          <img src={questionmark} alt="info" className="tooltip-icon" />
                          <span className="tooltip-text">This option disables the scroll of the page when banner is shown</span>
                        </div>
                      </div>

                      <input
                        type="checkbox"
                        className="toggle-checkbox"
                        checked={toggleStates.disableScroll}
                        onChange={() => {
                          handleToggle("disableScroll");

                          // Optionally call the scroll function only when enabling
                          // if (!toggleStates.disableScroll) {
                          //   ApplyScrollcontroll();
                          // }
                        }}
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
                      {["US State laws", "GDPR"].map((option) => ( //US State laws
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
                  <div className="topbar">
                    <img src={dots} alt="" className="threedots" />
                  </div>
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
                    <div className="space" style={{ color: headColor, fontWeight: weight, }}><h4>Cookie Setting</h4></div>

                    <div className="padding" style={{ color: paraColor }}>
                      <span>
                        {language === "English"
                          ? "We use cookies to provide you with the best possible experience. They also allow us to analyze user behavior in order to constantly improve the website for you."
                          : language === "Spanish"
                            ? "Utilizamos cookies para brindarle la mejor experiencia posible. También nos permiten analizar el comportamiento del usuario para mejorar constantemente el sitio web para usted."
                            : "Nous utilisons des cookies pour vous offrir la meilleure expérience possible. Ils nous permettent également d'analyser le comportement des utilisateurs afin d'améliorer constamment le site Web pour vous."}
                      </span>
                    </div>
                    <div className="button-wrapp" style={{ justifyContent: style === "centeralign" ? "center" : undefined, }}>
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

