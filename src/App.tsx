import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import "./style/styless.css";
import Customization from "./components/Customization";
import Script from "./components/Script";
const questionmark = new URL("./assets/question.svg", import.meta.url).href;
const openeye = new URL("./assets/closedeye.svg", import.meta.url).href;
const eye = new URL("./assets/eye.svg", import.meta.url).href;
const dots = new URL("./assets/3 dots.svg", import.meta.url).href;
const checkedcatogry = new URL("./assets/tick-square catogeries.svg", import.meta.url).href;
const tickmark = new URL("./assets/tickmark.svg", import.meta.url).href;
const logo = new URL("./assets/icon.svg", import.meta.url).href;
const rightarrow = new URL("./assets/up arrow.svg", import.meta.url).href;
import { customCodeApi } from "./services/api";
import { useAuth } from "../src/hooks/userAuth";
import webflow, { WebflowAPI } from './types/webflowtypes';
import { CodeApplication } from "./types/types";
import createCookiePreferences from "./hooks/gdprPreference";
import createCookieccpaPreferences from "./hooks/ccpaPreference";
import usePersistentState from './hooks/usePersistentState';
import { Script as ScriptType } from "../src/types/types";
import { useQueryClient } from "@tanstack/react-query";
import PulseAnimation from "./components/PulseAnimation";
import NeedHelp from "./components/NeedHelp";



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
  const [color, setColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [btnColor, setBtnColor] = useState("#C9C9C9");
  const [paraColor, setParaColor] = useState("#4C4A66");
  const [secondcolor, setSecondcolor] = useState("#000000");
  const [bgColors, setBgColors] = useState("#798EFF");
  const [headColor, setHeadColor] = useState("#000000");
  const [secondbuttontext, setsecondbuttontext] = useState("#000000")
  const [primaryButtonText, setPrimaryButtonText] = useState('#FFFFFF');
  const [activeTab, setActiveTab] = useState("General Settings");
  const [expires, setExpires] = usePersistentState("expires", "");
  const [size, setSize] = usePersistentState("size", "12");
  const [isActive, setIsActive] = usePersistentState("isActive", false);
  const [Font, SetFont] = usePersistentState("Font", "");
  const [selectedtext, settextSelected] = usePersistentState("selectedtext", "left");
  const [style, setStyle] = usePersistentState<BannerStyle>("style", "align");
  const [activeMode, setActiveMode] = useState("Simple");
  const [selected, setSelected] = usePersistentState<Orientation>("selected", "right");
  const [selectedOption, setSelectedOption] = usePersistentState("selectedOption", "US State laws");
  const [weight, setWeight] = usePersistentState("weight", "semibold");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOptions, setSelectedOptions] = usePersistentState("selectedOptions", ["GDPR"]);
  const [siteInfo, setSiteInfo] = usePersistentState<{ siteId: string; siteName: string; shortName: string } | null>("siteInfo", null);
  const [accessToken, setAccessToken] = usePersistentState<string>("accessToken", '');
  const [pages, setPages] = usePersistentState("pages", []);
  const [fetchScripts, setFetchScripts] = usePersistentState("fetchScripts", false);
  const [borderRadius, setBorderRadius] = usePersistentState<number>("borderRadius", 16);
  const [buttonRadius, setButtonRadius] = usePersistentState<number>("buttonRadius", 2);
  const [isLoading, setIsLoading] = usePersistentState("isLoading", false);
  const [userlocaldata, setUserlocaldata] = useState<UserData | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [buttonText, setButtonText] = useState("Scan Project");
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [cookieExpiration, setCookieExpiration] = useState(String());


  const base_url = "https://cb-server.web-8fb.workers.dev"
  const [isBannerAdded, setIsBannerAdded] = useState(false);


  const [toggleStates, setToggleStates] = usePersistentState('toggleStates', {
    customToggle: false,
    resetInteractions: false,
    disableScroll: false,
    storeConsents: false,
    globalvariable: false,
  });


  // Your default states
  const defaultState = {
    animation: "fade",
    easing: "Ease",
    language: "English",
  };

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

            setUserlocaldata(parsed);
          } catch (error) {
            console.error("Invalid JSON in localStorage:", error);
          }
        }


        const pagesAndFolders = await webflow.getAllPagesAndFolders();


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
          console.log(pageDetails);


          setPages(pageDetails);

        } else {
          console.warn("No pages found.");
        }
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };

    fetchPages();
  }, [webflow]);

  useEffect(() => {
    const fetchbannerdetails = async () => {
      try {
        const userinfo = localStorage.getItem("wf_hybrid_user");
        const tokenss = JSON.parse(userinfo);
        const token = tokenss.sessionToken;

        if(token){

        const response = await customCodeApi.getBannerStyles(token)

        if (response) (
          setCookieExpiration(response?.cookieExpiration),
          setBgColor(response?.bgColor),
          setActiveTab(response?.activeTab),
          setActiveMode(response?.activeMode),
          settextSelected(response?.selectedtext),
          setFetchScripts(response?.fetchScripts),
          setBtnColor(response?.btnColor),
          setParaColor(response?.paraColor),
          setSecondcolor(response?.secondcolor),
          setBgColors(response?.bgColors),
          setHeadColor(response?.headColor),
          setsecondbuttontext(response?.secondbuttontext),
          setPrimaryButtonText(response?.primaryButtonText),
          SetFont(response?.Font),
          setStyle(response?.style),
          setActiveMode(response?.activeMode),
          setSelected(response?.selected),
          setWeight(response?.weight),
          setBorderRadius(response?.borderRadius),
          setButtonRadius(response?.buttonRadius),
          setAnimation(response?.animation),
          setEasing(response?.easing),
          setLanguage(response?.language),
          setButtonText(response?.buttonText),
          setIsBannerAdded(response?.isBannerAdded),
          setColor(response?.color)
        )}

      } catch (error) {

      }
    }
    fetchbannerdetails()
  }, []);

  const handlePageChange = async (event) => {
    const pageId = event.target.value;
    const selectedPage = pages.find(page => page.id === pageId);
    if (selectedPage) {
      try {

        await webflow.switchPage(selectedPage);

      } catch (error) {
        console.error("Failed to switch page:", error);
      }
    }
  };


  //main function for adding custom code to the head
  const fetchAnalyticsBlockingsScripts = async () => {
    try {
      const userinfo = localStorage.getItem("wf_hybrid_user");
      if (!userinfo) {
        console.error("No user info found");
        return;
      }

      const tokenss = JSON.parse(userinfo);

      const tokewern = tokenss.sessionToken;
      const siteIdinfo = await webflow.getSiteInfo();
      setSiteInfo(siteIdinfo);

      if (!tokewern) {
        console.error("No session token found");
        return;
      }
      const hostingScript = await customCodeApi.registerAnalyticsBlockingScript(tokewern);

      if (hostingScript) {
        try {

          const scriptId = hostingScript.result.id;
          const version = hostingScript.result.version;

          const params: CodeApplication = {
            targetType: 'site',
            targetId: siteIdinfo.siteId,
            scriptId: scriptId,
            location: 'header',
            version: version
          };
          const applyScriptResponse = await customCodeApi.applyScript(params, tokewern);

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

  const queryClient = useQueryClient();

  useEffect(() => {
    const stored = localStorage.getItem("wf_hybrid_user");

    if (!user?.firstName && stored) {
      const parsed = JSON.parse(stored);

      if (parsed?.sessionToken) {
        exchangeAndVerifyIdToken();
      } else {
        // fallback manual restore if no sessionToken (dev/test scenarios)
        queryClient.setQueryData(["auth"], {
          user: {
            firstName: parsed.firstName,
            email: parsed.email,
          },
          sessionToken: "",
        });
      }
    }
  }, []);


  useEffect(() => {
    const data = localStorage.getItem('wf_hybrid_user')
    if (data) {
      localStorage.removeItem("wf_hybrid_user");
      console.log("localstorage removed");
    }
    const onAuth = async () => {
      await exchangeAndVerifyIdToken();
    };
    onAuth();
  }, [])

  

  //GDPR BANNER-------------------------------------------------------------------
  const handleCreatePreferences = async () => {
    try {
      const selectedPreferences = Object.entries(cookiePreferences)
        .filter(([_, isChecked]) => isChecked)
        .map(([category]) => category);

      if (!selectedPreferences.includes("essential")) {
        selectedPreferences.push("essential");
      }

      await createCookiePreferences(selectedPreferences, language, color, btnColor, headColor, paraColor, secondcolor, buttonRadius, animation, toggleStates.customToggle, primaryButtonText, secondbuttontext
      );


    } catch (error) {
      console.error("❌ Error creating cookie preferences:", error);
    }
  };

  //createCookieccpaPreferences
  const handleCreatePreferencesccpa = async () => {
    try {
      await createCookieccpaPreferences(language, color, btnColor, headColor, paraColor, secondcolor, buttonRadius, animation, primaryButtonText, secondbuttontext);
    } catch (error) {
      console.error("❌ Error creating cookie preferences:", error);
    }
  };

  const previewDimensions = React.useMemo(() => {
    switch (style) {
      case "bigstyle":
        return { width: "250px", minHeight: "151px" };
      case "fullwidth":
        return { width: "445px", dislay: "flex" };
      case "centeralign":
        return { width: "303px" };
      default:
        return { width: "318px" }; // Default
    }
  }, [style]);

  const ccpabanner = async () => {
    setShowPopup(false); // close the first popup
    setShowLoadingPopup(true); // show loading popup
    setIsLoading(true);
    const isBannerAlreadyAdded = localStorage.getItem("cookieBannerAdded") === "true";
    try {

      const allElements = await webflow.getAllElements();
      const idsToCheck = ["initial-consent-banner", "main-consent-banner", "toggle-consent-btn"];

      // Run domId checks in parallel
      const domIdPromises = allElements.map(async (el) => {
        const domId = await el.getDomId?.();
        return { el, domId };
      });

      const elementsWithDomIds = await Promise.all(domIdPromises);

      // Filter matching elements
      const matchingElements = elementsWithDomIds
        .filter(({ domId }) => domId && idsToCheck.includes(domId))
        .map(({ el, domId }) => el);


      // Remove matching elements and children
      await Promise.all(matchingElements.map(async (el) => {
        try {
          const domId = await el.getDomId?.();
          const children = await el.getChildren?.();

          if (children?.length) {
            await Promise.all(children.map(child => child.remove()));
          }

          await el.remove();
        } catch (err) {
          console.error("⚠️ Error removing element:", err);
          webflow.notify({ type: "error", message: "Failed to remove a banner." });
        }
      }));


      const selectedElement = await webflow.getSelectedElement();
      if (!selectedElement) {
        console.error("❌ No element selected.");
        webflow.notify({ type: "error", message: "No element selected in the Designer." });
        return;
      }

      const newDiv = await selectedElement.before(webflow.elementPresets.DivBlock);
      if (!newDiv) {
        console.error("❌ Failed to create div.");
        webflow.notify({ type: "error", message: "Failed to create div." });
        return;
      }

      if ((newDiv as any).setDomId) {
        await (newDiv as any).setDomId("initial-consent-banner"); // Type assertion
      } else {
        console.error("❌ setDomId method not available on accept button element");
      }

      const styleNames = {
        divStyleName: "consentbit-ccpa-banner-div",
        paragraphStyleName: "consentbit-ccpa-banner-text",
        buttonContainerStyleName: "consentbit-ccpa-button-container",
        headingStyleName: "consentbit-ccpa-banner-heading",
        linktextstyle: "consentbit-ccpa-linkblock",
        innerDivStyleName: "consentbit-ccpa-innerdiv",
        secondBackgroundStyleName: "consentbit-banner-ccpasecond-bg"
      };


      const styles = await Promise.all(
        Object.values(styleNames).map(async (name) => {
          return (await webflow.getStyleByName(name)) || (await webflow.createStyle(name));
        })
      );

      const [
        divStyle,
        paragraphStyle,
        buttonContainerStyle,
        headingStyle,
        Linktext,
        innerDivStyle,
        secondBackgroundStyle
      ] = styles;


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
      const innerdivPropertyMap: Record<string, string> = {
        "max-width": "877px",
        "margin-left": "auto",
        "margin-right": "auto",
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


      await divStyle.setProperties(divPropertyMap);
      await divStyle.setProperties(responsivePropertyMap, responsiveOptions);
      await paragraphStyle.setProperties(paragraphPropertyMap);
      await buttonContainerStyle.setProperties(buttonContainerPropertyMap);
      await Linktext.setProperties(declineButtonPropertyMap);
      await headingStyle.setProperties(headingPropertyMap);
      await innerDivStyle.setProperties(innerdivPropertyMap);
      await secondBackgroundStyle.setProperties(secondbackgroundPropertyMap);


      if (newDiv.setStyles) {
        await newDiv.setStyles([divStyle]);
      }

      if (newDiv.setCustomAttribute) {
        await newDiv.setCustomAttribute("data-animation", animationAttribute);
        await newDiv.setCustomAttribute("data-cookie-banner", toggleStates.disableScroll ? "true" : "false");
      } else {
        console.error("❌ setCustomAttribute method not available on newDiv element");
      }

      const innerdiv = await selectedElement.before(webflow.elementPresets.DivBlock);
      await innerdiv.setStyles([innerDivStyle]);


      try {
        let SecondDiv;
        if (style === "alignstyle") {
          SecondDiv = await selectedElement.before(webflow.elementPresets.DivBlock);
          if (SecondDiv.setStyles) {
            await SecondDiv.setStyles([secondBackgroundStyle]);
          }
        }

        const tempHeading = await selectedElement.before(webflow.elementPresets.Heading);
        if (!tempHeading) {
          throw new Error("Failed to create heading");
        }
        if (tempHeading.setStyles) {
          await tempHeading.setStyles([headingStyle]);
        }
        if (tempHeading.setTextContent) {
          await tempHeading.setTextContent(translations[language as keyof typeof translations].ccpa.heading);
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
        } else {
          console.error("❌ setDomId method not available on accept button element");
        }

        if (newDiv.append && innerdiv && tempHeading && tempParagraph && buttonContainer) {
          await newDiv.append(innerdiv);
          if (SecondDiv) await innerdiv.append(SecondDiv);
          await innerdiv.append(tempHeading);
          await innerdiv.append(tempParagraph);
          await innerdiv.append(buttonContainer);

          if (buttonContainer.append && prefrenceButton) {

            await buttonContainer.append(prefrenceButton)
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
          setIsBannerAdded(true);
          setShowSuccessPopup(true);
          setIsLoading(false);
        }, 20000);
        saveBannerDetails()
      } catch (error) {
        console.error("❌ Error creating cookie banner:", error);
        webflow.notify({ type: "error", message: "An error occurred while creating the cookie banner." });
      }
    } catch (error) {
      console.error("❌ Unexpected error:", error);
      webflow.notify({ type: "error", message: "Unexpected error occurred." });
    }
  }

  const gdpr = async () => {
    setShowPopup(false); // close the first popup
    setShowLoadingPopup(true); // show loading popup
    setIsLoading(true);
    const isBannerAlreadyAdded = localStorage.getItem("cookieBannerAdded") === "true";
    try {

      const allElements = await webflow.getAllElements();
      const idsToCheck = ["consent-banner", "main-banner", "toggle-consent-btn"];


      // Run domId checks in parallel
      const domIdPromises = allElements.map(async (el) => {
        const domId = await el.getDomId?.();
        return { el, domId };
      });

      const elementsWithDomIds = await Promise.all(domIdPromises);

      // Filter matching elements
      const matchingElements = elementsWithDomIds
        .filter(({ domId }) => domId && idsToCheck.includes(domId))
        .map(({ el, domId }) => el);


      // Remove matching elements and children
      await Promise.all(matchingElements.map(async (el) => {
        try {
          const domId = await el.getDomId?.();
          const children = await el.getChildren?.();

          if (children?.length) {
            await Promise.all(children.map(child => child.remove()));
            console.log(`🧽 Removed ${children.length} children from ${domId}`);
          }

          await el.remove();
        } catch (err) {
          console.error("⚠️ Error removing element:", err);
          webflow.notify({ type: "error", message: "Failed to remove a banner." });
        }
      }));

      const selectedElement = await webflow.getSelectedElement();
      if (!selectedElement) {
        console.error("❌ No element selected.");
        webflow.notify({ type: "error", message: "No element selected in the Designer." });
        setIsLoading(false); // Reset loading state
        return;
      }


      const newDiv = await selectedElement.before(webflow.elementPresets.DivBlock);

      if (!newDiv) {
        webflow.notify({ type: "error", message: "Failed to create div." });
        return;
      }


      if ((newDiv as any).setDomId) {
        await (newDiv as any).setDomId("consent-banner"); // Type assertion

      } else {
        console.error("❌ setDomId method not available on accept button element");
      }


      const styleNames = {
        divStyleName: "consentbit-gdpr-banner-div",
        paragraphStyleName: "consentbit-gdpr-banner-text",
        buttonContainerStyleName: "consentbit-banner-button-container",
        prefrenceButtonStyleName: "consentbit-banner-button-preference",
        declineButtonStyleName: "consentbit-banner-button-decline",
        buttonStyleName: "consentbit-banner-accept",
        headingStyleName: "consentbit-banner-headings",
        innerDivStyleName: "consentbit-innerdiv",
        secondBackgroundStyleName: "consentbit-banner-second-bg"
      };

      const styles = await Promise.all(
        Object.values(styleNames).map(async (name) => {
          return (await webflow.getStyleByName(name)) || (await webflow.createStyle(name));
        })
      );

      const [
        divStyle, paragraphStyle, buttonContainerStyle, prefrenceButtonStyle, declineButtonStyle, buttonStyle, headingStyle, innerDivStyle, secondBackgroundStyle
      ] = styles;


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
        "color": primaryButtonText,
        "text-align": "center",

      };

      const responsivebuttonPropertyMap: Record<string, string> = {
        "margin-bottom": "10px",
        "flex-direction": "column",
        "justify-content": "center",
        "text-align": "center",
        "display": "flex",
        "row-gap": "12px"

      };
      const responsivebuttonOptions = { breakpoint: "small" } as BreakpointAndPseudo;

      const declineButtonPropertyMap: Record<string, string> = {
        "border-radius": `${buttonRadius}px`,
        "cursor": "pointer",
        "background-color": btnColor,
        "color": secondbuttontext,
        "margin-left": "5px",
        "margin-right": "5px",
        "min-width": "80px",
        "text-align": "center",

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
      await declineButtonStyle.setProperties(declineButtonPropertyMap);
      await prefrenceButtonStyle.setProperties(declineButtonPropertyMap);
      await headingStyle.setProperties(headingPropertyMap);
      await secondBackgroundStyle.setProperties(secondbackgroundPropertyMap);
      await innerDivStyle.setProperties(innerdivPropertyMap);


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
            await SecondDiv.setStyles([secondBackgroundStyle]);
          }
        }
        const innerdiv = await selectedElement.before(webflow.elementPresets.DivBlock);
        await innerdiv.setStyles([innerDivStyle]);

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
        await prefrenceButton.setStyles([prefrenceButtonStyle]);
        await prefrenceButton.setTextContent(translations[language as keyof typeof translations].preferences);


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
        await declineButton.setStyles([declineButtonStyle]);
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


        handleCreatePreferences();
        console.log("🎉 Cookie consent banner successfully created!");
        if (!isBannerAlreadyAdded) {
          fetchAnalyticsBlockingsScripts()
          localStorage.setItem("cookieBannerAdded", "true");
        }

        setTimeout(() => {
          setShowPopup(false);
          setIsBannerAdded(true);
          setShowSuccessPopup(true);
          setIsLoading(false);
        }, 30000);

        saveBannerDetails()

      } catch (error) {

        webflow.notify({ type: "error", message: "An error occurred while creating the cookie banner." });

      }
    } catch (error) {
      console.error("❌ Unexpected error:", error);
      webflow.notify({ type: "error", message: "Unexpected error occurred." });
      setIsLoading(false);
    }
  }

  const handleBothBanners = async () => {
    await gdpr();
    await ccpabanner();
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCookieExpiration(e.target.value);
  };

  const saveBannerDetails = async () => {
    try {
      const userinfo = localStorage.getItem("wf_hybrid_user");
      if (!userinfo) {
        return;
      }
      const tokenss = JSON.parse(userinfo);
      const tokewern = tokenss.sessionToken;
      const siteIdinfo = await webflow.getSiteInfo();
      setSiteInfo(siteIdinfo);
      if (!tokewern) {
        return;
      }
      const bannerData = {
        cookieExpiration: cookieExpiration,
        bgColor: bgColor,
        activeTab: activeTab,
        activeMode: activeMode,
        selectedtext: selectedtext,
        fetchScripts: fetchScripts,
        btnColor: btnColor,
        paraColor: paraColor,
        secondcolor: secondcolor,
        bgColors: bgColors,
        headColor: headColor,
        secondbuttontext: secondbuttontext,
        primaryButtonText: primaryButtonText,
        Font: Font,
        style: style,
        selected: selected,
        weight: weight,
        borderRadius: borderRadius,
        buttonRadius: buttonRadius,
        animation: animation,
        easing: easing,
        language: language,
        buttonText: buttonText,
        isBannerAdded: isBannerAdded,
        color: color

      }
      const response = await customCodeApi.saveBannerStyles(tokewern, bannerData);
      if (response.ok) {
        console.log("data saved successfully");
      }
    }
    catch (error) {
      throw error; // or handle it differently based on your needs
    }
  }

  const handleExportCSV = async () => {
    setIsExporting(true); // Start loading feedback
    try {
      const userinfo = localStorage.getItem("wf_hybrid_user"); // Or your actual token storage
      if (!userinfo) {
        console.error("No user info found in localStorage");
        alert("Authentication error: User info not found.");
        setIsExporting(false);
        return;
      }
      const tokenss = JSON.parse(userinfo);
      const token = tokenss.sessionToken; // Get the token
      if (!token) {
        console.error("No session token found in user info");
        alert("Authentication error: Session token missing.");
        setIsExporting(false);
        return;
      }
      console.log('Calling CSV export API...');
      // Call the API function - it now returns { csvData, response }
      const { csvData, response } = await customCodeApi.exportCSV(token);
      // --- CSV Download Logic ---
      // 1. Create a Blob from the CSV string
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      // 2. Determine filename
      let filename = 'consent_report.csv'; // Default filename
      const contentDisposition = response.headers.get('Content-Disposition');
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+?)"?(;|$)/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1];
        }
      }
      console.log(`Attempting to download as "${filename}"`);
      // 3. Create a link element
      const link = document.createElement("a");
      // 4. Create an object URL for the blob
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      // 5. Append link to body, click, and remove/revoke
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up the object URL
      console.log('CSV download initiated.');
    } catch (error) {
      console.error('Failed to export CSV:', error);
      // Provide user-friendly error message
      alert(`Failed to export CSV report: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsExporting(false); // Stop loading feedback regardless of success/failure
    }
  };


  return (
    <div className="app">
      {/* Top Navigation */}
      <div className="navbar">
        <div>
          {user?.firstName ? (
            <p className="hello">Hello, {user.firstName}!</p>
          ) : (
            <button className="publish-buttons" onClick={openAuthScreen}>
              Authenticate
            </button>
          )}
        </div>

        <NeedHelp />
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
              setTimeout(() => setIsActive(true), 50);
            }}
          >
            Advanced
          </button>

        </div>
        <div className="component-width">
          <div className="subscribe">
            <a className="link" href="#">
              You need a subscription to publish the production <i><img src={rightarrow} alt="rightarrow" /></i>
            </a>
          </div>

          {activeTab !== "Script" && (
            // <div>
            //   <div>
            //     <button
            //       className="publish-button"
            //       onClick={() => {
            //         if (user?.firstName) {
            //           setShowPopup(true);
            //         } else {
            //           setShowAuthPopup(true);
            //         }
            //       }}
            //     >
            //       {isBannerAdded ? "Publish your changes" : "Create Component"}
            //     </button>
            //   </div>

            // </div>
            <div>
              <div>
                <button
                  className="publish-button"
                  onClick={async () => {
                    const isUserValid = user?.firstName;

                    try {
                      const selectedElement = await webflow.getSelectedElement();

                      if (isUserValid && selectedElement) {
                        setShowPopup(true);
                      } else {
                        if (!isUserValid) {
                          setShowAuthPopup(true);
                        } else if (!selectedElement) {
                          webflow.notify({ type: "error", message: "No element selected in the Designer." });
                        }
                      }
                    } catch (error) {
                      console.error("Error checking selected element:", error);
                      webflow.notify({ type: "error", message: "Something went wrong while checking selection." });
                    }
                  }}
                >
                  {isBannerAdded ? "Publish your changes" : "Create Component"}
                </button>
              </div>
            </div>

          )}

          {activeTab === "Script" && (
            <div>
              <button
                className="publish-buttons"
                onClick={() => {
                  if (user?.firstName) {
                    setFetchScripts(true);
                    setButtonText("Rescan Project");
                  } else {
                    setShowAuthPopup(true);
                  }
                }}
              >
                {buttonText}
              </button>
            </div>
          )}
        </div>
      </div>

      {showAuthPopup && (
        <div className="popup-overlay">
          <div className="success-popup">
            <div className="popup-content">
              <h3>Authentication Required</h3>
              <button onClick={() => setShowAuthPopup(false)}>Close</button>
            </div>
          </div>

          {/* <PulseAnimation /> */}
        </div>
      )}

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay1">
          <div className="popup-box">
            {/* <div>Are you sure you want to add a cookie banner to your website?</div> */}
            <div className="flex down">
              {isBannerAdded ? (
                <>
                  <span className="spanbox">Hang tight! We’re updating your banner with the latest changes.</span>
                  <span className="spanbox">Applying your updates to the project now!</span>
                </>
              ) : (
                <>
                  <span className="spanbox">We are installing the script in your code...</span>
                  <span className="spanbox">We are adding a banner on your project</span>
                </>
              )}
            </div>

            <div className="gap">

              {selectedOptions.includes("GDPR") && selectedOptions.includes("US State laws") ?
                (<button
                  className="confirm-button"
                  onClick={handleBothBanners}
                >
                  Confirm Both
                </button>) : selectedOptions.includes("GDPR") ?
                  (<button
                    className={`confirm-button ${isLoading ? "loading" : ""}`}
                    onClick={gdpr}
                  >
                    {isLoading ? (
                      <span>wait...</span>
                    ) : (
                      "Confirm"
                    )}
                  </button>) : selectedOptions.includes("US State laws") ?
                    (<button
                      className="confirm-button"
                      onClick={ccpabanner}
                    >
                      Confirm
                    </button>) : <div className="confirm-button1"> Nothing Selected</div>
              }

              <button className="cancel-btn" onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showLoadingPopup && isLoading && (
        <div className="popup">
          <div className="popup-loading-content">
            <PulseAnimation />
            <p className="popup-message">
              Almost there… your cookie banner is in the oven. Nothing’s breaking, just baking!
            </p>
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div className="popup-overlay">
          <div className="success-popup">
            <p>To make the banner live, click the ‘Publish’ button in the top-right corner of the Webflow interface and publish your site.</p>
            <button onClick={() => setShowSuccessPopup(false)}>Close</button>
          </div>
        </div>
      )}
      {/* Tab Navigation */}
      <div className="tabs">

        {["General Settings", "Customization", "Script"].map((tab) => {
          const isDisabled = tab === "Script" && activeMode !== "Advanced";

          return (
            <div key={tab} className="tab-button-wrapper">
              <button
                className={`tab-button ${activeTab === tab ? "active" : ""}`}
                onClick={() => {
                  if (!isDisabled) setActiveTab(tab);
                }}
                disabled={isDisabled}
              >
                {tab}
              </button>
              {/* Tooltip only shows if in Simple mode and this is Script */}
              {isDisabled && (
                <span className="tab-tooltip">Available only in Advanced mode.</span>
              )}
            </div>
          );
        })}

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
                      <span className="tooltip-text1">The Amount of days to remember user's consent preferences.</span>
                    </div>
                  </div>
                  <input
                    type="text"
                    id="expires"
                    placeholder="120s"
                    value={cookieExpiration}
                    onChange={handleExpirationChange}
                  />
                </div>

                <div className="settings-group">
                  <div className="flex">
                    <label htmlFor="animation">Animation</label>
                    <div className="tooltip-container">
                      <img src={questionmark} alt="info" className="tooltip-icon" />
                      <span className="tooltip-text">Shows different types of animations to apply to the banner.</span>
                    </div>
                  </div>
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
                  <div className="flex">
                    <label htmlFor="easing">Easing</label>
                    <div className="tooltip-container">
                      <img src={questionmark} alt="info" className="tooltip-icon" />
                      <span className="tooltip-text">Controls the smoothness  of the animation.</span>
                    </div>
                  </div>
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
                  <div className="flex">
                    <label htmlFor="language">Languages</label>
                    <div className="tooltip-container">
                      <img src={questionmark} alt="info" className="tooltip-icon" />
                      <span className="tooltip-text">Indicates the language preference for the cookie
                        banner.</span>
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

                <div className="compliance-container">
                  <label className="compliance">
                    <span className="compliance">Compliance</span>
                    <span className="tooltip-container">
                      <img src={questionmark} alt="info" className="tooltip-icon" />
                      <span className="tooltip-text">Specifies the type of cookie compliance standard, like GDPR or CCPA.</span>
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

                {/* Cookie Settings - Visible only in Advanced Mode */}
                <div className={`cookie-settings ${(activeMode === "Advanced" && selectedOptions.includes("GDPR")) ? "active" : ""}`}>
                  <h3 className="cookie-title">Categories</h3>

                  {/* Essentials - Always active */}
                  <div className="cookie-category">
                    <img src={checkedcatogry} alt="checkedcatogry" />
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
                        <span className="custom-checkbox"> {isChecked && <img src={tickmark} alt="checked" className="tick-icon" />}</span>
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


                {activeMode === "Advanced" && (
                  <div className="export-csv">
                    <div className="flex">
                      <button
                        className="exportbutton"
                        onClick={handleExportCSV}
                        disabled={isExporting}
                      >
                        {isExporting ? 'Exporting...' : 'Export CSV'}
                      </button>
                      <div className="tooltip-containers">
                        <img src={questionmark} alt="info" className="tooltip-icon" />
                        <span className="tooltip-text">Download consents in CSV format for easy analysis and sharing.</span>
                      </div>
                    </div>
                  </div>)}


                {/* Use Custom Toggle Button - Advanced Mode Only */}
                {activeMode === "Advanced" && (
                  <div className="togglediv">
                    <label className="toggle-container">
                      <div className="flex">
                        <span className="toggle-label">Use custom Toggle Button</span>

                        <div className="tooltip-containers">
                          <img src={questionmark} alt="info" className="tooltip-icon" />
                          <span className="tooltip-text"> Enables a toggle switch. Off = standard checkbox.</span>
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
                      <span className="toggle-label">Reset Interactions</span>

                      <div className="tooltip-containers">
                        <img src={questionmark} alt="info" className="tooltip-icons" />
                        <span className="tooltip-text">this will reset the interactions that you have added.</span>
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

                {/* Disable Scroll - Advanced Mode Only */}
                {activeMode === "Advanced" ? (
                  <div className="togglediv">
                    <label className="toggle-container">
                      <div className="flex">
                        <span className="toggle-label">Disable Scroll</span>

                        <div className="tooltip-containers">
                          <img src={questionmark} alt="info" className="tooltip-icon" />
                          <span className="tooltip-text">This option disables the scroll of the page when banner is shown.</span>
                        </div>
                      </div>

                      <input
                        type="checkbox"
                        className="toggle-checkbox"
                        checked={toggleStates.disableScroll}
                        onChange={() => {
                          handleToggle("disableScroll");

                        }}
                      />

                      <div className={`toggle ${toggleStates.disableScroll ? "toggled" : ""}`}></div>
                    </label>
                  </div>
                ) : null}


              </div>

              <div className="settings-group-preview">
                <h3>Preview</h3>
                <div className="preview-area">
                  <div className="topbar">
                    <img src={dots} alt="dots" className="threedots" />
                  </div>
                  <div className="consentbit-logo">
                    <img src={logo} alt="dots" />
                  </div>
                  <div
                    className={`cookie-banner ${animation} ${isActive ? "active" : ""}`}
                    style={{
                      transition: `transform 0.5s ${easing}, opacity 0.5s ${easing}`,
                      position: "absolute",
                      ...(style !== "fullwidth" && {
                        bottom: "16px",
                        left: selected === "left" ? "16px" : selected === "center" ? "17%" : "auto",
                        right: selected === "right" ? "16px" : "auto",
                        // transform: selected === "center" ? "translateX(-50%)" : "none",
                      }),
                      // transform: selected === "center" ? "translateX(-50%)" : "none",
                      fontFamily: Font,
                      textAlign: selectedtext as "left" | "center" | "right",
                      alignItems: style === "centeralign" ? "center" : undefined,
                      fontWeight: weight,
                      width: previewDimensions.width,
                      height: previewDimensions.minHeight,
                      borderRadius: `${borderRadius}px`,
                      backgroundColor: color,
                      fontSize: `${size}px`,
                    }}
                  >

                    {style === "alignstyle" && <div className="secondclass" style={{ backgroundColor: bgColors, borderBottomRightRadius: `${borderRadius}px`, borderTopRightRadius: `${borderRadius}px` }}></div>}
                    <div className="space" style={{ color: headColor, fontWeight: weight }}>
                      <h4>
                        {language === "English"
                          ? "Cookie Settings"
                          : language === "Spanish"
                            ? "Configuración de Cookies"
                            : "Paramètres des Cookies"}
                      </h4>
                    </div>
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
                      <button className="btn-preferences" style={{ borderRadius: `${buttonRadius}px`, backgroundColor: btnColor, color: secondbuttontext }} >Preferences</button>
                      <button className="btn-reject" style={{ borderRadius: `${buttonRadius}px`, backgroundColor: btnColor, color: secondbuttontext }} >Reject</button>
                      <button className="btn-accept" style={{ borderRadius: `${buttonRadius}px`, backgroundColor: secondcolor, color: primaryButtonText }} >Accept</button>
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
              secondbuttontext={secondbuttontext}
              setsecondbuttontext={setsecondbuttontext}
              primaryButtonText={primaryButtonText}
              setPrimaryButtonText={setPrimaryButtonText}

            />
          )}

          {activeTab === "Script" && <Script fetchScripts={fetchScripts} setFetchScripts={setFetchScripts} />}
        </div>
      </div>
    </div>
  );
};

export default App;

