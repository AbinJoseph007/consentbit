import exp from 'constants';
import webflow, { WebflowAPI } from '../types/webflowtypes';


const translations = {
  English: {
    heading: "Cookie Preferences",
    description: "By clicking you agree to the storing of cookies on your device to enhance site navigation, analyze site usage and assist in our marketing efforts as outlined in our.",
    acceptAll: "Save Preference",
    reject: "Reject",
    changePreference: "Change Preference",
    sections: {
      essential: {
        label: "Essential",
        description: 'By clicking "Accept All", you agree to the storing of cookies on your device to enhance site navigation.'
      },
      analytics: {
        label: "Analytics",
        description: 'By clicking "Accept All", you agree to the storing of cookies on your device to enhance site navigation, analyze site usage and assist in.'
      },
      marketing: {
        label: "Marketing",
        description: 'By clicking "Accept All", you agree to the storing of cookies on your device to enhance site navigation, analyze site usage and assist in our marketing efforts as outlined in our'
      },
      preferences: {
        label: "Preferences",
        description: 'Customize your experience based on your preferences and behavior on the website.'
      }
    }
  },
  Spanish: {
    heading: "Preferencias de Cookies",
    description: "Al hacer clic, acepta el almacenamiento de cookies en su dispositivo para mejorar la navegación del sitio, analizar el uso del sitio y ayudar en nuestros esfuerzos de marketing como se describe en nuestro.",
    acceptAll: "Aceptar Todo",
    reject: "Rechazar",
    changePreference: "Cambiar Preferencias",
    sections: {
      essential: {
        label: "Esenciales",
        description: 'Al hacer clic en "Aceptar Todo", acepta el almacenamiento de cookies en su dispositivo para mejorar la navegación del sitio.'
      },
      analytics: {
        label: "Analíticas",
        description: 'Al hacer clic en "Aceptar Todo", acepta el almacenamiento de cookies en su dispositivo para mejorar la navegación del sitio, analizar el uso del sitio y ayudar en.'
      },
      marketing: {
        label: "Marketing",
        description: 'Al hacer clic en "Aceptar Todo", acepta el almacenamiento de cookies en su dispositivo para mejorar la navegación del sitio, analizar el uso del sitio y ayudar en nuestros esfuerzos de marketing como se describe en nuestro.'
      },
      preferences: {
        label: "Preferencias",
        description: 'Personalice su experiencia según sus preferencias y comportamiento en el sitio web.'
      }
    }
  },
  French: {
    heading: "Préférences des Cookies",
    description: "En cliquant, vous acceptez le stockage de cookies sur votre appareil pour améliorer la navigation du site, analyser l'utilisation du site et aider nos efforts de marketing comme décrit dans notre.",
    acceptAll: "Tout Accepter",
    reject: "Refuser",
    changePreference: "Modifier les Préférences",
    sections: {
      essential: {
        label: "Essentiels",
        description: 'En cliquant sur "Tout Accepter", vous acceptez le stockage de cookies sur votre appareil pour améliorer la navigation du site.'
      },
      analytics: {
        label: "Analytiques",
        description: 'En cliquant sur "Tout Accepter", vous acceptez le stockage de cookies sur votre appareil pour améliorer la navigation du site, analyser l\'utilisation du site et aider dans.'
      },
      marketing: {
        label: "Marketing",
        description: 'En cliquant sur "Tout Accepter", vous acceptez le stockage de cookies sur votre appareil pour améliorer la navigation du site, analyser l\'utilisation du site et aider nos efforts de marketing comme décrit dans notre.'
      },
      preferences: {
        label: "Préférences",
        description: 'Personnalisez votre expérience en fonction de vos préférences et de votre comportement sur le site Web.'
      }
    }
  }
};

type BreakpointAndPseudo = {
  breakpoint: string;
  pseudoClass: string;
};

const createCookiePreferences = async (selectedPreferences: string[], language: string = "English", color: string = "#ffffff", btnColor: string = "#F1F1F1", headColor: string = "#483999", paraColor: string = "#1F1D40", secondcolor: string = "secondcolor", buttonRadius: number, animation: string ,customToggle: boolean , primaryButtonText :string = "#ffffff", secondbuttontext : string = "#4C4A66", ) => {
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
      await (newDiv as any).setDomId("main-banner"); 
    } else {
      console.error("setDomId method not available on accept button element");
    }
    const timestamp = Date.now();

    const styleNames = {
       preferenceDiv : `consentbit-preference-div`,
       paragraphStyleNames : `consentbit-prefrence-text`,
       formfield : `consentbit-formblock`,
       preferenceblock : `consentbit-prefrence-block`,
       toggledivs : `consentbit-prefrence-toggle`,
       buttonContainerStyleName : `consentbit-prefrence-container`,
       prefrenceButton : `consentbit-button-preference`,
       checkboxlabeltextstyle : `consentbit-checkbox-label`,
       buttonStyleName : `consebit-prefrence-accept`,
       DeclinebuttonStyleName : `consentbit-prefrence-decline`,
       headingStyleName : `consebit-prefrence-heading`,
       checkboxContainerStyleName : `consentbit-toggle`,
       changepreference : `consentbit-change-preference-${timestamp}`

    };

    const styles = await Promise.all(
      Object.values(styleNames).map(async (name) => {
        return (await webflow.getStyleByName(name)) || (await webflow.createStyle(name));
      })
    );

    const [divStyle, paragraphStyle, formBlockStyle, prefrenceDiv, togglediv, buttonContainerStyle,checkboxlabeltext, prefrenceButtons,buttonStyle, declinebutton,headingStyle,checkboxContainerStyle,changepre] = styles;



    // const preferenceDiv = `consentbit-preference-div`;
    // const paragraphStyleNames = `consentbit-prefrence-text`;
    // const formfield = `consentbit-formblock`
    // const preferenceblock = `consentbit-prefrence-block`
    // const toggledivs = `consentbit-prefrence-toggle`
    // const buttonContainerStyleName = `consentbit-prefrence-container`;
    // const prefrenceButton = `consentbit-button-preference`
    // const checkboxlabeltextstyle = `consentbit-checkbox-label`
    // const buttonStyleName = `consebit-prefrence-accept`;
    // const DeclinebuttonStyleName = `consentbit-prefrence-decline`;
    // const headingStyleName = `consebit-prefrence-heading`;
    // const checkboxContainerStyleName = `consentbit-toggle`;
    // const changepreference = `consentbit-change-preference-${timestamp}`

    // const divStyle = await webflow.createStyle(preferenceDiv);
    // const paragraphStyle = await webflow.createStyle(paragraphStyleNames);
    // const formBlockStyle = await webflow.createStyle(formfield)
    // const prefrenceDiv = await webflow.createStyle(preferenceblock)
    // const togglediv = await webflow.createStyle(toggledivs)
    // const buttonContainerStyle = await webflow.createStyle(buttonContainerStyleName);
    // const checkboxContainerStyle = await webflow.createStyle(checkboxContainerStyleName);
    // const checkboxlabeltext = await webflow.createStyle(checkboxlabeltextstyle)
    // const buttonStyle = await webflow.createStyle(buttonStyleName);
    // const declinebutton = await webflow.createStyle(DeclinebuttonStyleName)
    // const prefrenceButtons = await webflow.createStyle(prefrenceButton)
    // const headingStyle = await webflow.createStyle(headingStyleName);
    // const changepre = await webflow.createStyle(changepreference)


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
      "max-height": "510px",
      "max-width": "435px",
      "position": "fixed",
      "z-index": "99999",
      "top": "50%",
      "left": "50%",
      "transform": "translate(-50%, -50%)",
      "border-radius": "12px",
      "display": "none",
      "flex-direction": "column",
      "align-items": "center",
      "justify-content": "flex-start",
      "overflow-y": "scroll",
      "padding-top": "20px",
      "padding-right": "20px",
      "padding-bottom": "20px",
      "padding-left": "20px",
      "box-shadow": "2px 2px 20px rgba(0, 0, 0, 0.51)",
    };

      const responsivePropertyMap: Record<string, string> = {
        "max-width": "100%", 
        "width":"100%"

      };
      const responsiveOptions = { breakpoint: "small" } as BreakpointAndPseudo;

    const paragraphPropertyMap: Record<string, string> = {
      "color": paraColor,
      "font-size": "14px",
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

    const checkboxContainerPropertyMap: Record<string, string> = {
      "position": "relative",
      "display": "inline-block",
      "width": "50px"
    };

    const prefrencePropertyMap: Record<string, string> = {
      "display": "flex",
      "flex-direction": "column",
      "margin-top": "10px",
      "width": "100%",
    };

    const setTooglePropertyMap: Record<string, string> = {
      "color": "rgba(16, 214, 138, 0)",
      "display": "flex",
      "margin-top": "10px",
      "width": "100%",
      "justify-content": "space-between",
    };

    const buttonContainerPropertyMap: Record<string, string> = {
      "display": "flex",
      "justify-content": "right",
      "margin-top": "10px",
      "width": "100%",
    };

    const buttonPropertyMap: Record<string, string> = {
      "border-radius": `${buttonRadius}px`,
      "cursor": "pointer",
      "background-color": secondcolor,
      "margin-left": "5px",
      "margin-right": "5px",
      "min-width": "80px",
      "color":primaryButtonText
    };

    const declineButtonPropertyMap: Record<string, string> = {
      "border-radius": `${buttonRadius}px`,
      "cursor": "pointer",
      "background-color": btnColor,
      "color": secondbuttontext,
      "margin-left": "5px",
      "margin-right": "5px",
      "min-width": "80px",
    };


    const headingPropertyMap: Record<string, string> = {
      "color": headColor,
      "font-size": "20px",
      "font-weight": "500",
      "text-align": "left",
      "margin-top": "0",
      "margin-bottom": "10px",
      "width": "100%",
    };

    const checkboxlabelPropertyMap: Record<string, string> = {
      "color": "rgba(72, 57, 153, 1)",
      "font-size": "18px",
      "font-weight": "500",
    };

    const changepreferencePropertyMap: Record<string, string> = {
      "height": "55px",
      "width": "55px",
      "border-radius": "50%",
      "background-image": "url('https://cdn.prod.website-files.com/63d5330e6841081487be0bd6/67ebf5ee639d12979361f2bc_consent.png')",
      "background-size": "cover",
      // "box-shadow": "2px 2px 20px rgba(0, 0, 0, 0.51)",
      "position": "fixed",
      "z-index": "999",
      "bottom": "3%",
      "left": "2%",
      "cursor": "pointer",
      "background-position-x": "50%",
      "background-position-y": "50%"
  };


    const formPropertyMap: Record<string, string> = {
      "background-color": "rgb(255, 255, 255)", // White background
      "border-radius": "8px", // Rounded corners
      "width": "100%", // Full width
      "max-width": "400px", // Maximum width
      "display": "flex",
      "flex-direction": "column",
    };


    await divStyle.setProperties(divPropertyMap);
    await divStyle.setProperties(responsivePropertyMap, responsiveOptions);

    await paragraphStyle.setProperties(paragraphPropertyMap);
    await prefrenceDiv.setProperties(prefrencePropertyMap)
    await togglediv.setProperties(setTooglePropertyMap)
    await formBlockStyle.setProperties(formPropertyMap)
    await checkboxlabeltext.setProperties(checkboxlabelPropertyMap)
    await buttonContainerStyle.setProperties(buttonContainerPropertyMap);
    await checkboxContainerStyle.setProperties(checkboxContainerPropertyMap)
    await buttonStyle.setProperties(buttonPropertyMap);
    await declinebutton.setProperties(declineButtonPropertyMap)
    await prefrenceButtons.setProperties(declineButtonPropertyMap)
    await changepre.setProperties(changepreferencePropertyMap)

    await headingStyle.setProperties(headingPropertyMap);

    if (newDiv.setStyles) {
      await newDiv.setStyles([divStyle]);
    }

    if (newDiv.setCustomAttribute) {
      await newDiv.setCustomAttribute("data-animation", animationAttribute);
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

      //divblock///////////////////////////////////////////////////////////////////

      const prefrenceContainer = await selectedElement.before(webflow.elementPresets.DivBlock);
      if (!prefrenceContainer) {
        throw new Error("Failed to create button container");
      }
      await prefrenceContainer.setStyles([prefrenceDiv]);


      const formBlock = await selectedElement.before(webflow.elementPresets.FormForm);
      if (!formBlock) {
        throw new Error("Failed to create form block");
      }

      // Get all children of the form block
      const allChildren = await formBlock.getChildren();

      // Find the actual form inside the form wrapper
      const form = allChildren.find(child => child.plugin === "Form");
      if (!form) {
        throw new Error("Failed to find form inside form block");
      }

      // Get all elements inside the form and remove them
      const formElements = await form.getChildren();
      await Promise.all(formElements.map(child => child.remove()));


      // Define labels, corresponding checkbox IDs, and descriptions
      const allSections = [
        {
          label: "Essential",
          id: "necessary-checkbox",
          checked: true,
          description: translations[language as keyof typeof translations].sections.essential.description
        },
        {
          label: "Analytics",
          id: "analytics-checkbox",
          checked: false,
          description: translations[language as keyof typeof translations].sections.analytics.description
        },
        {
          label: "Marketing",
          id: "marketing-checkbox",
          checked: false,
          description: translations[language as keyof typeof translations].sections.marketing.description
        },
        {
          label: "Preferences",
          id: "personalization-checkbox",
          checked: false,
          description: translations[language as keyof typeof translations].sections.preferences.description
        }
      ];

      // const sections = allSections.filter(section => selectedPreferences.includes(section.label.toLowerCase()));
      const sections = allSections.filter(section =>
        selectedPreferences.map(pref => pref.toLowerCase()).includes(section.label.toLowerCase())
      );


      // Loop to create multiple sections
      for (const section of sections) {
        // 🏗️ Create a wrapper DivBlock inside the form
        const wrapperDiv = await form.append(webflow.elementPresets.DivBlock);
        if (!wrapperDiv) {
          throw new Error(`Failed to create wrapper div for ${section.label}`);
        }

        const prefrenceContainertoggle = await wrapperDiv.append(webflow.elementPresets.DivBlock);
        if (!prefrenceContainertoggle) {
          throw new Error(`Failed to create div block for ${section.label}`);
        }
        await prefrenceContainertoggle.setStyles([togglediv]);

        // 📝 Create Paragraph inside the preference container (Checkbox Label)
        const toggleParagraph = await prefrenceContainertoggle.append(webflow.elementPresets.Paragraph);
        if (!toggleParagraph) {
          throw new Error(`Failed to create paragraph for ${section.label}`);
        }
        await toggleParagraph.setStyles([checkboxlabeltext]);

        if (toggleParagraph.setTextContent) {
          await toggleParagraph.setTextContent(section.label);
        } else {
        }

        const checkboxField = await prefrenceContainertoggle.append(webflow.elementPresets.FormCheckboxInput);
        console.log("the checkboxxxxxxxxxxxxxxxxxxxx", checkboxField);

        if (!checkboxField) {
          throw new Error(`Failed to create checkbox field for ${section.label}`);
        }

        await checkboxField.setStyles([checkboxContainerStyle]);

        const children = await checkboxField.getChildren();
        //checkboxContainerStyle
        for (const child of children) {
          console.log("Child type:", child.type); // Debugging

          if (child.type.includes("Label") && child.setTextContent) {
            await child.setTextContent("");
          }
        }

        for (const child of children) {
          console.log("Child type:", child.type);
          console.log("Child type:", child);


          if (child.type.includes("FormCheckboxInput") && child.setCustomAttribute) {
            await child.setCustomAttribute("data-consent-id", section.id);
            // await child.setStyles([checkboxContainerStyle]);
          }
        }


        // ✅ Set the ID for the checkbox
        if (checkboxField.setDomId) {
          await checkboxField.setDomId(section.id);
        } else {
          console.error(`❌ setDomId method not available on checkbox element for ${section.label}`);
        }


     
          if (checkboxField.setCustomAttribute) {
            await checkboxField.setCustomAttribute("customtoggle", customToggle ? "true" : "false");

          } else {
            console.error(`❌ setCustomAttribute method not available on checkbox element for ${section.label}`);
          }
        

        const wrapperParagraph = await wrapperDiv.append(webflow.elementPresets.Paragraph);
        if (!wrapperParagraph) {
          throw new Error(`Failed to create wrapper paragraph for ${section.label}`);
        }

        // Apply text and styles to wrapper paragraph
        if (wrapperParagraph.setStyles) {
          await wrapperParagraph.setStyles([paragraphStyle]); // Define `wrapperParagraphStyle` before using
        }

        if (wrapperParagraph.setTextContent) {
          await wrapperParagraph.setTextContent(section.description);
        } else {
          console.error(`❌ setTextContent method not available on wrapper paragraph for ${section.label}`);
        }

      }

      //////////////////////
      const prefrenceContainerinner = await selectedElement.before(webflow.elementPresets.DivBlock);
      if (!prefrenceContainerinner) {
        throw new Error("Failed to create button container");
      }
      await prefrenceContainerinner.setStyles([prefrenceDiv]);

      const mainDivBlocks = await selectedElement.before(webflow.elementPresets.DivBlock);
      console.log("mainDivBlock:", mainDivBlocks);
      await mainDivBlocks.setStyles([changepre])

      
      if ((mainDivBlocks as any).setDomId) {
        await mainDivBlocks.setCustomAttribute("scroll-control","true");
        await (mainDivBlocks as any).setDomId("toggle-consent-btn"); // Type assertion
      } else {
          console.error("ccpa banner id setteled");
      }

      ////////////////////////////////////////////////////////////////////////////////////////
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
      await acceptButton.setTextContent(translations[language as keyof typeof translations].acceptAll);
      console.log("acceptButton:", acceptButton);

      if ((acceptButton as any).setDomId) {
        await (acceptButton as any).setDomId("save-preferences-btn"); // Type assertion
      } else {
      }

      const declineButton = await selectedElement.before(webflow.elementPresets.Button);
      if (!declineButton) {
        throw new Error("Failed to create decline button");
      }
      await declineButton.setStyles([declinebutton]);
      await declineButton.setTextContent(translations[language as keyof typeof translations].reject);
      console.log("declineButton:", declineButton);

      if ((declineButton as any).setDomId) {
        await (declineButton as any).setDomId("cancel-btn"); // Type assertion
      } else {
        console.error("❌ setDomId method not available on accept button element");
      }


      if (newDiv.append && tempHeading && tempParagraph && buttonContainer && prefrenceContainer) {
        await newDiv.append(tempHeading);
        await newDiv.append(tempParagraph);
        await newDiv.append(prefrenceContainer)
        await newDiv.append(buttonContainer);

        if (prefrenceContainer.append && prefrenceContainerinner) {
          // await prefrenceContainer.append(prefrenceContainertoggle)
          await prefrenceContainer.append(prefrenceContainerinner)
        }

        if (prefrenceContainerinner.append && formBlock) {
          await prefrenceContainerinner.append(formBlock)
          // await prefrenceContainerinner.append(prefeParagraph)
        }

        if (buttonContainer.append && acceptButton && declineButton ) {
          await buttonContainer.append(acceptButton);
          await buttonContainer.append(declineButton);
          // await buttonContainer.append(prefrenceButton)
        } else {
          console.error("❌ Failed to append buttons to the button container.");
        }
      } else {
        console.error("❌ Failed to append elements to the main div.");
      }


      // const mainDivBlocks = await selectedElement.before(webflow.elementPresets.DivBlock);
      // console.log("mainDivBlock:", mainDivBlocks);
      // await mainDivBlocks.setStyles([changepre])

      // if (!mainDivBlocks) {
      //     throw new Error("Failed to create main div block");
      // }

      // if ((mainDivBlocks as any).setDomId) {
      //     await (mainDivBlocks as any).setDomId("toggle-consent-btn"); // Type assertion
      //     console.log("✅ prefrence button ID set to #simple-accept");
      // } else {
      //     console.error("ccpa banner id setteled");
      // }


      console.log("🎉 Cookie consent banner successfully created!");

      

      ////////////////////////////////////change prefrence


    } catch (error) {
      console.error("❌ Error creating cookie banner:", error);
      webflow.notify({ type: "error", message: "An error occurred while creating the cookie banner." });
    }
    console.log("🎉 Cookie consent banner successfully created!");
  } catch (error) {
    console.error("❌ Error creating cookie banner:", error);
    webflow.notify({ type: "error", message: "An error occurred while creating the cookie banner." });
  } finally {

  }
};

export default createCookiePreferences