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



const createCookiePreferences = async (selectedPreferences: string[], language: string = "English", color: string = "#ffffff", btnColor: string = "#F1F1F1", headColor: string = "#483999", paraColor: string = "#1F1D40", secondcolor: string = "secondcolor") => {
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
      await (newDiv as any).setDomId("main-banner"); // Type assertion
      console.log("✅ prefrence button ID set to #simple-accept");
    } else {
      console.error("❌ setDomId method not available on accept button element");
    }

    const timestamp = Date.now();
    const preferenceDiv = `consebit-preference-div-${timestamp}`;
    const paragraphStyleNames = `consebit-prefrence-text-${timestamp}`;
    const formfield = `consentbit-formblock-${timestamp}`
    const preferenceblock = `consentbit-prefrence-block-${timestamp}`
    const toggledivs = `consentbit-prefrence-toggle-${timestamp}`
    const buttonContainerStyleName = `consebit-prefrence-container-${timestamp}`;
    const prefrenceButton = `consent-button-preference-${timestamp}`
    const checkboxlabeltextstyle = `consentbit-checkbox-label${timestamp}`
    const buttonStyleName = `consebit-prefrence-accept${timestamp}`;
    const DeclinebuttonStyleName = `consebit-prefrence-decline${timestamp}`;
    const headingStyleName = `consebit-prefrence-heading-${timestamp}`;
    ///////////////////////////////////////////////////////////////////
    const checkboxContainerStyleName = `consentbit-toggle-${timestamp}`;
    const changeprefrencediv = `consentbit-change-prefrence-${timestamp}`

    const divStyle = await webflow.createStyle(preferenceDiv);
    const paragraphStyle = await webflow.createStyle(paragraphStyleNames);
    const formBlockStyle = await webflow.createStyle(formfield)
    const prefrenceDiv = await webflow.createStyle(preferenceblock)
    const togglediv = await webflow.createStyle(toggledivs)
    const buttonContainerStyle = await webflow.createStyle(buttonContainerStyleName);
    const checkboxContainerStyle = await webflow.createStyle(checkboxContainerStyleName);

    const checkboxlabeltext = await webflow.createStyle(checkboxlabeltextstyle)
    const buttonStyle = await webflow.createStyle(buttonStyleName);
    const declinebutton = await webflow.createStyle(DeclinebuttonStyleName)
    const prefrenceButtons = await webflow.createStyle(prefrenceButton)
    const headingStyle = await webflow.createStyle(headingStyleName);
    const changepre = await webflow.createStyle(changeprefrencediv)

    console.log("✅ Created new styles:", preferenceDiv, paragraphStyleNames, buttonContainerStyleName, buttonStyleName, headingStyleName);

    const collection = await webflow.getDefaultVariableCollection();
    const webflowBlue = await collection?.createColorVariable("Webflow Blue", "rgba(255, 255, 255, 1)");
    const webflowBlueValue = (webflowBlue as any)?.value || "rgba(255, 255, 255, 1)";

    const divPropertyMap: Record<string, string> = {
      "background-color": color,
      "height": "510px",
      "width": "435px",
      "position": "fixed",
      "z-index": "9999",
      "top": "50%",
      "left": "50%",
      "transform": "translate(-50%, -50%)",
      "border-radius": "12px",
      "display": "flex",
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
      "border-radius": "48px",
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
      "color": "rgba(72, 57, 153, 1)",
      "font-size": "18px",
      "font-weight": "500",
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

        // ✅ FIRST: Create preference container inside the wrapperDiv
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
          console.error(`❌ setTextContent method not available on paragraph element for ${section.label}`);
        }

        // ✅ Add Checkbox Field inside the preference container
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
            await child.setTextContent(".");

            console.log(`✅ Checkbox label set to "Essential".`);
          }
        }

        // ✅ Set the ID for the checkbox
        if (checkboxField.setDomId) {
          await checkboxField.setDomId(section.id);
          console.log(`✅ Checkbox ID set: #${section.id}`);
        } else {
          console.error(`❌ setDomId method not available on checkbox element for ${section.label}`);
        }

        // ✅ Ensure "Essential" checkbox is always checked and disabled
        if (section.checked) {
          if (checkboxField.setCustomAttribute) {
            await checkboxField.setCustomAttribute("checked", "true");
            await checkboxField.setCustomAttribute("disabled", "true");

            console.log(`✅ "${section.label}" checkbox is always checked and disabled.`);
          } else {
            console.error(`❌ setCustomAttribute method not available on checkbox element for ${section.label}`);
          }
        }

        // ✅ SECOND: Now add the paragraph inside the wrapperDiv (AFTER the checkbox)
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

        console.log(`✅ Successfully added section: ${section.label}`);
      }


      // ... (rest of the code above, including checkbox creation)///////////////////////////////////////
      // try {
      //   const codeBlockElement = webflow.elementPresets.HtmlEmbed;
      //   console.log(`codeBlockElement`,codeBlockElement);

      //   if (!codeBlockElement || !codeBlockElement.create) {
      //       throw new Error("❌ Failed to create HTML embed element or create function is missing.");
      //   }

      //   const createdEmbed = codeBlockElement.create({ id: codeBlockElement.id });
      //   console.log(`createdEmbed: ${createdEmbed}`);

      //   if (!createdEmbed) {
      //       throw new Error("❌ Failed to create a new HTML embed element.");
      //   }

      //   console.log(`newDiv before append: ${newDiv}`);
      //   await newDiv.append(createdEmbed);
      //   console.log(`newDiv after append: ${newDiv}`);
      //   console.log(`newDiv.children after append: ${newDiv.children}`);

      //   await new Promise((resolve) => setTimeout(resolve, 100));

      //   console.log(`newDiv.children: ${JSON.stringify(newDiv.children)}`);
      //   const newEmbed = newDiv.children[newDiv.children.length - 1] as any;

      //   if (!newEmbed) {
      //       throw new Error("❌ Failed to retrieve the newly appended HTML embed element.");
      //   }

      //   console.log("✅ Successfully created and appended newEmbed:", newEmbed);
      //   console.log("🔍 Available properties in newEmbed:", Object.keys(newEmbed || {}));
      //   console.log("newEmbed.setHtml:", newEmbed.setHtml);

      //   const cssStyles = `
      //   <style>
      //       .consentbit-toggle-${timestamp} { ... }
      //       ...
      //   </style>
      //   `;

      //   console.log(`cssStyles: ${cssStyles}`);

      //   if (typeof newEmbed.setHtml === "function") {
      //       await newEmbed.setHtml(cssStyles.replace(/{{timestamp}}/g, timestamp.toString()));
      //       console.log("✅ Successfully added CSS styles using setHtml.");
      //   } else {
      //       console.warn("⚠️ setHtml method not found. Using innerHTML fallback.");
      //       newEmbed.innerHTML = cssStyles.replace(/{{timestamp}}/g, timestamp.toString());
      //   }

      // } catch (error) {
      //   console.error("❌ An error occurred:", error);
      // }



      // // Create a code block element for CSS


      // // Generate the CSS with timestamp replacement
      // const cssCode = `
      // <style>
      //     .consentbit-toggle-${timestamp} {
      //         position: relative;
      //         display: inline-block;
      //         width: 60px;
      //         height: 34px;
      //     }

      //     .consentbit-toggle-${timestamp} .w-checkbox-input {
      //         opacity: 0;
      //         width: 0;
      //         height: 0;
      //     }

      //     .consentbit-toggle-${timestamp} .w-form-label {
      //         position: absolute;
      //         cursor: pointer;
      //         top: 0;
      //         left: 0;
      //         right: 0;
      //         bottom: 0;
      //         background-color: #ccc;
      //         border-radius: 34px;
      //         transition: .4s;
      //     }

      //     .consentbit-toggle-${timestamp} .w-form-label:before {
      //         position: absolute;
      //         content: "";
      //         height: 26px;
      //         width: 26px;
      //         left: 4px;
      //         bottom: 4px;
      //         background-color: white;
      //         border-radius: 50%;
      //         transition: .4s;
      //     }

      //     .consentbit-toggle-${timestamp} .w-checkbox-input:checked + .w-form-label {
      //         background-color: #4A00E0;
      //     }

      //     .consentbit-toggle-${timestamp} .w-checkbox-input:checked + .w-form-label:before {
      //         transform: translateX(26px);
      //     }
      // </style>
      // `;

      // Set the code block content
      // if (codeBlockElement.setCode) {
      //     await codeBlockElement.setCode(cssCode);
      //     console.log("✅ Code block element added with CSS.");
      // } else {
      //     console.error("❌ setCode method not available on code block element");
      // }

      // ... (rest of the code below)
//       const codeBlockElement = webflow.elementPresets.HtmlEmbed;
//       console.log(`codeBlockElement`, codeBlockElement);

//       const newHtmlEmbed = await selectedElement.before(codeBlockElement);
//       if (!newHtmlEmbed) {
//         console.error("❌ Failed to create HTML Embed.");
//         webflow.notify({ type: "error", message: "Failed to create HTML Embed." });
//         return;
//       }
//       console.log("✅ New HTML Embed created:", newHtmlEmbed);

//       const cssContent = `
//   <style>
//     .consentbit-toggle-${timestamp} {
//       position: relative;
//       display: inline-block;
//       width: 60px;
//       height: 34px;
//     }
//     .consentbit-toggle-${timestamp} .w-checkbox-input {
//       opacity: 0;
//       width: 0;
//       height: 0;
//     }
//     .consentbit-toggle-${timestamp} .w-form-label {
//       position: absolute;
//       cursor: pointer;
//       top: 0;
//       left: 0;
//       right: 0;
//       bottom: 0;
//       background-color: #ccc;
//       border-radius: 34px;
//       transition: .4s;
//     }
//     .consentbit-toggle-${timestamp} .w-form-label:before {
//       position: absolute;
//       content: "";
//       height: 26px;
//       width: 26px;
//       left: 4px;
//       bottom: 4px;
//       background-color: white;
//       border-radius: 50%;
//       transition: .4s;
//     }
//     .consentbit-toggle-${timestamp} .w-checkbox-input:checked + .w-form-label {
//       background-color: #4A00E0;
//     }
//     .consentbit-toggle-${timestamp} .w-checkbox-input:checked + .w-form-label:before {
//       transform: translateX(26px);
//     }
//   </style>
// `;

//       // Attempt JavaScript Injection (if applicable and preferred)
//       try {
//         const scriptContent = `
//     const style = document.createElement('style');
//     style.textContent = \`${cssContent}\`;
//     document.head.appendChild(style);
//   `;

//         if (newHtmlEmbed.setCustomAttribute) {
//           await newHtmlEmbed.setCustomAttribute("data-script", scriptContent); // use custom attribute to store javascript.
//           console.log("✅ JavaScript injection script set as custom attribute.");
//         } else {
//           console.error("❌ setCustomAttribute method not available.");
//           webflow.notify({ type: "error", message: "Failed to set JavaScript injection script." });
//         }

//       } catch (javascriptError) {
//         console.error("❌ JavaScript injection failed:", javascriptError);
//         webflow.notify({ type: "error", message: "JavaScript injection failed." });
//       }



      //////////////////////
      const prefrenceContainerinner = await selectedElement.before(webflow.elementPresets.DivBlock);
      if (!prefrenceContainerinner) {
        throw new Error("Failed to create button container");
      }
      await prefrenceContainerinner.setStyles([prefrenceDiv]);

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
        await (declineButton as any).setDomId("cancel-btn"); // Type assertion
        console.log("✅ prefrence button ID set to #simple-accept");
      } else {
        console.error("❌ setDomId method not available on accept button element");
      }


      if (newDiv.append && tempHeading && tempParagraph && buttonContainer && prefrenceContainer) {
        await newDiv.append(tempHeading);
        await newDiv.append(tempParagraph);
        await newDiv.append(prefrenceContainer)
        await newDiv.append(buttonContainer);
        console.log("✅ Appended heading, paragraph, and button container to div!");

        if (prefrenceContainer.append && prefrenceContainerinner) {
          // await prefrenceContainer.append(prefrenceContainertoggle)
          await prefrenceContainer.append(prefrenceContainerinner)
        }

        if (prefrenceContainerinner.append && formBlock) {
          await prefrenceContainerinner.append(formBlock)
          // await prefrenceContainerinner.append(prefeParagraph)
        }

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



      const mainDivBlock = await selectedElement.before(webflow.elementPresets.DivBlock);
      console.log("mainDivBlock:", mainDivBlock);
      await mainDivBlock.setStyles([changepre])

      if ((mainDivBlock as any).setDomId) {
        await (mainDivBlock as any).setDomId("toggle-consent-btn"); // Type assertion
        console.log("✅ prefrence button ID set to #simple-accept");
      } else {
        console.error("❌ setDomId method not available on accept button element");
      }

      const linkBlock = (await mainDivBlock.append(webflow.elementPresets.LinkBlock)) as any;

      const changepara = await selectedElement.before(webflow.elementPresets.Paragraph)
      await changepara.setTextContent("Change Preference")

      if (linkBlock.append && changepara) {
        await linkBlock.append(changepara)
      }

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