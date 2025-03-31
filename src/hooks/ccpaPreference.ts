import { aw } from 'framer-motion/dist/types.d-6pKw1mTI';
import webflow, { WebflowAPI } from '../types/webflowtypes';


const ccpaTranslations = {
    English: {
        heading: "Opt-out Preference",
        description: "We use third-party cookies that help us analyze how you use this website, store your preferences, and provide the content and advertisements that are relevant to you. We do not sell your information. However, you can opt out of these cookies by checking Do Not Share My Personal Information and clicking the Save My Preferences button. Once you opt out, you can opt in again at any time by unchecking Do Not Share My Personal Information and clicking the Save My Preferences button",
        doNotShare: "Do Not Share My Personal Information",
        savePreference: "Save My Preference",
        cancel: "Cancel"
    },
    Spanish: {
        heading: "Preferencia de Exclusión",
        description: "Utilizamos cookies de terceros que nos ayudan a analizar cómo utiliza este sitio web, almacenar sus preferencias y proporcionar contenido y anuncios relevantes para usted. No vendemos su información. Sin embargo, puede optar por no recibir estas cookies marcando No Compartir Mi Información Personal y haciendo clic en el botón Guardar Mis Preferencias. Una vez que opte por no participar, puede volver a participar en cualquier momento desmarcando No Compartir Mi Información Personal y haciendo clic en el botón Guardar Mis Preferencias",
        doNotShare: "No Compartir Mi Información Personal",
        savePreference: "Guardar Mi Preferencia",
        cancel: "Cancelar"
    },
    French: {
        heading: "Préférence de Désinscription",
        description: "Nous utilisons des cookies tiers qui nous aident à analyser votre utilisation de ce site web, à stocker vos préférences et à fournir du contenu et des publicités pertinents pour vous. Nous ne vendons pas vos informations. Cependant, vous pouvez désactiver ces cookies en cochant Ne Pas Partager Mes Informations Personnelles et en cliquant sur le bouton Enregistrer Mes Préférences. Une fois désactivé, vous pouvez réactiver à tout moment en décochant Ne Pas Partager Mes Informations Personnelles et en cliquant sur le bouton Enregistrer Mes Préférences",
        doNotShare: "Ne Pas Partager Mes Informations Personnelles",
        savePreference: "Enregistrer Mes Préférences",
        cancel: "Annuler"
    }
};


const createCookieccpaPreferences = async (language: string = "English") => {
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
            await (newDiv as any).setDomId("main-consent-banner"); // Type assertion
            console.log("✅ prefrence button ID set to #simple-accept");
        } else {
            console.error("❌ setDomId method not available on accept button element");
        }

        const timestamp = Date.now();
        const preferenceDiv = `consebit-ccpa-preference-div-${timestamp}`;
        const paragraphStyleNames = `consebit-ccpa-prefrence-text-${timestamp}`;
        const formfield = `consentbit-ccpa-formblock-${timestamp}`
        const preferenceblock = `consentbit-ccpa-prefrence-block-${timestamp}`
        const toggledivs = `consentbit-ccpa-prefrence-toggle-${timestamp}`
        const buttonContainerStyleName = `consebit-ccpa-prefrence-container-${timestamp}`;
        const prefrenceButton = `consentbit-ccpa-button-preference-${timestamp}`
        const checkboxstyle = `consentbit-ccpa-checkbox-${timestamp}`
        const buttonStyleName = `consebit-ccpa-prefrence-accept${timestamp}`;
        const DeclinebuttonStyleName = `consebit-ccpa-prefrence-decline${timestamp}`;
        const headingStyleName = `consebit-ccpa-prefrence-heading-${timestamp}`;
        const changepreference = `consentbit-change-preference-${timestamp}`

        const divStyle = await webflow.createStyle(preferenceDiv);
        const paragraphStyle = await webflow.createStyle(paragraphStyleNames);
        const formBlockStyle = await webflow.createStyle(formfield)
        const prefrenceDiv = await webflow.createStyle(preferenceblock)
        const togglediv = await webflow.createStyle(toggledivs)
        const buttonContainerStyle = await webflow.createStyle(buttonContainerStyleName);
        const buttonStyle = await webflow.createStyle(buttonStyleName);
        const changepre = await webflow.createStyle(changepreference)
        const declinebutton = await webflow.createStyle(DeclinebuttonStyleName)
        const prefrenceButtons = await webflow.createStyle(prefrenceButton)
        const checkbosstyle = await webflow.createStyle(checkboxstyle)
        const headingStyle = await webflow.createStyle(headingStyleName);
        console.log("✅ Created new styles:", preferenceDiv, paragraphStyleNames, buttonContainerStyleName, buttonStyleName, headingStyleName);

        const collection = await webflow.getDefaultVariableCollection();
        const webflowBlue = await collection?.createColorVariable("Webflow Blue", "rgba(255, 255, 255, 1)");
        const webflowBlueValue = (webflowBlue as any)?.value || "rgba(255, 255, 255, 1)";

        const divPropertyMap: Record<string, string> = {
            "background-color": webflowBlueValue,
            "height": "310px",
            "width": "435px",
            "position": "fixed",
            "z-index": "9999",
            "top": "50%",
            "left": "50%",
            "transform": "translate(-50%, -50%)",
            "border-radius": "12px",
            "display": "flex",
            "flex-direction": "column",
            "overflow-y": "scroll",
            "align-items": "center",
            "justify-content": "flex-start",
            "padding-top": "20px",
            "padding-right": "20px",
            "padding-bottom": "20px",
            "padding-left": "20px",
            "box-shadow": "2px 2px 20px rgba(0, 0, 0, 0.51)",

        };

        const paragraphPropertyMap: Record<string, string> = {
            "color": "rgba(25, 25, 25, 1)",
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

        const prefrencePropertyMap: Record<string, string> = {
            "display": "flex",
            "flex-direction": "column",
            "margin-top": "10px",
            "width": "100%",
        };

        const setTooglePropertyMap: Record<string, string> = {
            "color": "rgba(72, 57, 153, 1)",
            "display": "flex",
            "flex-direction": "row", /* Items are arranged in a row */
            "flex-wrap": "nowrap",   /* Prevents wrapping */
            "direction": "rtl",
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
            "background-color": "rgba(72, 57, 153, 1)",
            "margin-left": "5px",
            "margin-right": "5px",
            "min-width": "80px",
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

        const changepreferencePropertyMap: Record<string, string> = {
            "height": "86px",
            "width": "89px",
            "border-radius": "50%",
            "background-image": "url('https://cdn.prod.website-files.com/6409f0703d2118edcd3ea560/67b8b29754766de084052c4b_88228154495.png')",
            "background-size": "cover",
            "box-shadow": "2px 2px 20px rgba(0, 0, 0, 0.51)",
            "position": "fixed",
            "z-index": "999",
            "top": "85%",
            "left": "3%",
            "cursor": "pointer",
            "background-position-x": "50%",
            "background-position-y": "50%"
        };

        const checkboxStyleMap: Record<string, string> = {
            "appearance": "none", // Removes default checkbox styling
            "width": "20px", // Checkbox width
            "height": "20px", // Checkbox height
            "border-radius": "4px", // Rounded corners
            "background-color": " rgb(255, 255, 255)", // White background
            "cursor": "pointer",
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
        await buttonContainerStyle.setProperties(buttonContainerPropertyMap);
        await buttonStyle.setProperties(buttonPropertyMap);
        await changepre.setProperties(changepreferencePropertyMap)
        await declinebutton.setProperties(declineButtonPropertyMap)
        await prefrenceButtons.setProperties(declineButtonPropertyMap)
        await checkbosstyle.setProperties(checkboxStyleMap)
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
                await tempHeading.setTextContent(ccpaTranslations[language as keyof typeof ccpaTranslations].heading);
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
                await tempParagraph.setTextContent(ccpaTranslations[language as keyof typeof ccpaTranslations].description);
            } else {
                console.error("❌ setText method not available on paragraph element");
            }

            //divblock///////////////////////////////////////////////////////////////////

            const prefrenceContainer = await selectedElement.before(webflow.elementPresets.DivBlock);
            if (!prefrenceContainer) {
                throw new Error("Failed to create button container");
            }
            await prefrenceContainer.setStyles([prefrenceDiv]);




            // Add the form block
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

            // Create DivBlock inside the form
            const prefrenceContainertoggle = await form.append(webflow.elementPresets.DivBlock);
            if (!prefrenceContainertoggle) {
                throw new Error("Failed to create div block inside form");
            }
            await prefrenceContainertoggle.setStyles([togglediv]);

            // Create Paragraph inside the DivBlock (First)
            const toggleParagraph = await prefrenceContainertoggle.append(webflow.elementPresets.Paragraph);
            if (!toggleParagraph) {
                throw new Error("Failed to create paragraph inside div block");
            }

            // Apply styles and text to paragraph
            if (toggleParagraph.setStyles) {
                await toggleParagraph.setStyles([paragraphStyle]);
                console.log("✅ Paragraph styles applied!");
            }

            if (toggleParagraph.setTextContent) {
                await toggleParagraph.setTextContent(ccpaTranslations[language as keyof typeof ccpaTranslations].doNotShare);
            } else {
                console.error("❌ setTextContent method not available on paragraph element");
            }



            // Add Checkbox Field inside the prefrenceContainertoggle DivBlock (Second)
            // const checkboxField = await prefrenceContainertoggle.append(webflow.elementPresets.FormCheckboxInput);
            // console.log(checkboxField);

            // if (!checkboxField) {
            //     throw new Error("Failed to create checkbox field inside div block");
            // }

            // // Set the label text
            // checkboxField.label = "Do Not Share My Personal Information";

            // console.log("✅ Successfully added paragraph first, then checkbox inside the form with label!");

            const checkboxField = await prefrenceContainertoggle.append(webflow.elementPresets.FormCheckboxInput);
            console.log(checkboxField);

            if (!checkboxField) {
                throw new Error("Failed to create checkbox field inside div block");
            }

            if ((checkboxField as any).setDomId) {
                await (checkboxField as any).setDomId("do-not-share-checkbox"); // Type assertion
                console.log("✅ prefrence button ID set to #simple-accept");
            } else {
                console.error("ccpa banner id setteled");
            }

            // Get all child elements inside the checkbox field
            const children = await checkboxField.getChildren();
            for (const child of children) {
                console.log("Child type:", child.type); // Debugging

                if (child.type.includes("Label") && child.setTextContent) {
                    await child.setTextContent(".");
                    console.log(`✅ Checkbox label set to "Essential".`);
                }
            }


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
            await acceptButton.setTextContent(ccpaTranslations[language as keyof typeof ccpaTranslations].savePreference);
            console.log("acceptButton:", acceptButton);

            if ((acceptButton as any).setDomId) {
                await (acceptButton as any).setDomId("save-btn"); // Type assertion
                console.log("✅ prefrence button ID set to #simple-accept");
            } else {
                console.error("❌ setDomId method not available on accept button element");
            }

            const declineButton = await selectedElement.before(webflow.elementPresets.Button);
            if (!declineButton) {
                throw new Error("Failed to create decline button");
            }
            await declineButton.setStyles([declinebutton]);
            await declineButton.setTextContent(ccpaTranslations[language as keyof typeof ccpaTranslations].cancel);
            console.log("declineButton:", declineButton);

            if ((declineButton as any).setDomId) {
                await (declineButton as any).setDomId("close-consent-banner"); // Type assertion
                console.log("✅ prefrence button ID set to #simple-accept");
            } else {
                console.error("❌ setDomId method not available on accept button element");
            }




            ///////////////////////////////////////////////////////imgae prefrence




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



            const mainDivBlock = await selectedElement.before(webflow.elementPresets.DivBlock);
            console.log("mainDivBlock:", mainDivBlock);
            await mainDivBlock.setStyles([changepre])

            if (!mainDivBlock) {
                throw new Error("Failed to create main div block");
            }

            if ((mainDivBlock as any).setDomId) {
                await (mainDivBlock as any).setDomId("toggle-consent-btn"); // Type assertion
                console.log("✅ prefrence button ID set to #simple-accept");
            } else {
                console.error("ccpa banner id setteled");
            }

            // const linkBlock = (await mainDivBlock.append(webflow.elementPresets.LinkBlock)) as any;

            // const imageBlock = await linkBlock.append(webflow.elementPresets.Image);
            // console.log("imageBlock:", imageBlock);

            // if (!imageBlock) {
            //     throw new Error("Failed to create image block");
            // }
            // await imageBlock.setStyles([changepre])


            // // await imageBlock.setAsset({
            // //     url: "https://cdn.prod.website-files.com/6409f0703d2118edcd3ea560/67b8b29754766de084052c4b_88228154495.png",
            // //     alt: "Preferences Icon"
            // // });

            // // await imageBlock.setAltText("Preferences Icon");

            // // const retrievedAsset = await imageBlock.getAsset();
            // // console.log("Retrieved asset:", retrievedAsset);

            // const assetData = {
            //     url: "https://cdn.prod.website-files.com/6409f0703d2118edcd3ea560/67b8b29754766de084052c4b_88228154495.png",
            //     fileName: "preferences-icon.png",
            //     contentType: "image/png",
            //     width: 140,
            //     height: 140,
            //     fileSize: 403
            // };

            // // Try setting the asset with full metadata
            // await imageBlock.setAsset(assetData);
            // await imageBlock.setAltText("Preferences Icon");

            //             const imageBlock = await linkBlock.append(webflow.elementPresets.Image);
            // if (!imageBlock) {
            //     throw new Error("Failed to create image block");
            // }

            // try {
            //     await imageBlock.setStyles([changepre]);

            //     // First, create an asset reference
            //     const assetData = {
            //         url: "https://cdn.prod.website-files.com/6409f0703d2118edcd3ea560/67b8b29754766de084052c4b_88228154495.png",
            //         fileName: "preferences-icon.png",
            //         contentType: "image/png",
            //         width: 140,
            //         height: 140,
            //         fileSize: 403
            //     };

            //     // Try setting the asset with full metadata
            //     await imageBlock.setAsset(assetData);
            //     await imageBlock.setAltText("Preferences Icon");

            //     // Set additional attributes
            //     await imageBlock.setCustomAttribute("loading", "lazy");
            //     await imageBlock.setCustomAttribute("width", "140");
            //     await imageBlock.setCustomAttribute("height", "140");

            //     console.log("✅ Image asset set successfully");
            // } catch (error) {
            //     console.error("Error setting image asset:", error);

            //     // Fallback to div with background image if the image setting fails
            //     try {
            //         const timestamp = Date.now();
            //         const imageStyleName = `consentbit-image-${timestamp}`;
            //         const imageStyle = await webflow.createStyle(imageStyleName);

            //         const imageStyles = {
            //             "background-image": "url('https://cdn.prod.website-files.com/6409f0703d2118edcd3ea560/67b8b29754766de084052c4b_88228154495.png')",
            //             "background-size": "contain",
            //             "background-position": "center",
            //             "background-repeat": "no-repeat",
            //             "width": "140px",
            //             "height": "140px"
            //         };

            //         await imageStyle.setProperties(imageStyles);

            //         // Remove the image block since it failed
            //         await imageBlock.remove();

            //         // Create a div instead
            //         const imageDiv = await linkBlock.append(webflow.elementPresets.DivBlock);
            //         await imageDiv.setStyles([imageStyle, changepre]);

            //         console.log("✅ Fallback to background image successful");
            //     } catch (fallbackError) {
            //         console.error("Fallback also failed:", fallbackError);
            //     }
            // }


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

export default createCookieccpaPreferences