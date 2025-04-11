// import { useState } from "react";
// import Customization from "./Customization";
// import Index from "../index"; // Import index.tsx

// const SettingsContainer = () => {
//   const [animation, setAnimation] = useState("fade");
//   const [easing, setEasing] = useState("ease");
//   const [language, setLanguage] = useState("English");
//   const [selected, setSelected] = useState("left");
//   const [isActive, setIsActive] = useState(false);

//   return (
//     <div>
//       {/* Pass state and update functions to both components */}
//       <Customization
//         animation={animation}
//         setAnimation={setAnimation}
//         easing={easing}
//         setEasing={setEasing}
//         language={language}
//         setLanguage={setLanguage}
//         selected={selected}
//         setSelected={setSelected}
//         isActive={isActive}
//         setIsActive={setIsActive}
//       />

//       <Index
//         animation={animation}
//         easing={easing}
//         language={language}
//         selected={selected}
//         isActive={isActive}
//       />
//     </div>
//   );
// };

// export default SettingsContainer;


import React, { useState, useEffect } from "react";
import "../style/styless.css";
import { Script as ScriptType, ScriptCategory } from "../types/types";
import { customCodeApi } from "../services/api";

const copyimg = new URL("../assets/fi-rr-copy.png", import.meta.url).href;
const questionmark = new URL("../assets/Group 20 (1).png", import.meta.url).href;
const settings = new URL("../assets/setting-2.png", import.meta.url).href;
const ignored = new URL("../assets/fi-rr-shield-exclamation.png", import.meta.url).href;
const tickmark = new URL("../assets/Group 52.png", import.meta.url).href; // Ensure you have this asset
const edit = new URL("../assets/fi-rr-edit.png", import.meta.url).href; // Ensure you have this asset

const Script: React.FC<{ 
    fetchScripts: boolean; 
    setFetchScripts: React.Dispatch<React.SetStateAction<boolean>> 
}> = ({
    fetchScripts,
    setFetchScripts
}) => {
    const [scripts, setScripts] = useState<ScriptType[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<{ success: boolean; message: string } | null>(null);
    const categories = ["Essential", "Personalization", "Analytics", "Marketing"];
    const userinfo = localStorage.getItem("wf_hybrid_user");

    useEffect(() => {
        if (fetchScripts) {
            console.log("Fetching scripts...");
            fetchScriptData();
            setFetchScripts(false);
        }
    }, [fetchScripts]);

    const fetchScriptData = async () => {
        try {
            const tokenss = JSON.parse(userinfo);
            const tokewern = tokenss.sessionToken;

            const result = await customCodeApi.analyticsScript(tokewern);
            if (result?.success && result?.data?.data?.analyticsScripts) {
                const scriptsResponse = result?.data?.data?.analyticsScripts ?? [];
                const validScripts = scriptsResponse.filter(script => script.fullTag && script.fullTag.trim() !== '');
                const formattedScripts = validScripts.map(script => ({
                    ...script,
                    isEdited: false,
                    selectedCategories: []
                }));
                setScripts(formattedScripts);
            } else {
                console.log("No analytics scripts found");
            }
        } catch (error) {
            console.error("Error fetching scripts:", error);
            setSaveStatus({
                success: false,
                message: error instanceof Error ? error.message : "Failed to fetch scripts"
            });
        }
    };

    const handleSaveAll = async () => {
        setIsSaving(true);
        setSaveStatus(null);

        const tokenss = JSON.parse(userinfo);
        const tokewern = tokenss.sessionToken;

        const scriptsWithCategories = scripts.filter(script => script.selectedCategories.length > 0);
        if (scriptsWithCategories.length === 0) {
            setSaveStatus({
                success: false,
                message: "Please select at least one category for a script"
            });
            setIsSaving(false);
            return;
        }

        const scriptsToSave: ScriptCategory[] = scriptsWithCategories.map(script => ({
            src: script.src || script.url || null,
            content: script.content || script.script || null,
            selectedCategories: script.selectedCategories || []
        }));

        try {
            const result = await customCodeApi.saveScriptCategorizations(tokewern, scriptsToSave);
            if (result.success) {
                setScripts(prevScripts => prevScripts.map(script => ({ ...script, isEdited: true })));
                setSaveStatus({
                    success: true,
                    message: "Script categories saved successfully!"
                });
            } else {
                throw new Error(result.error || "Failed to save categories");
            }
        } catch (error) {
            setSaveStatus({
                success: false,
                message: error instanceof Error ? error.message : "Failed to save categories"
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleToggleEdit = (index) => {
        setScripts(prevScripts => {
            const newScripts = [...prevScripts];
            newScripts[index].isEdited = !newScripts[index].isEdited;
            return newScripts;
        });
    };

        const handleToggle = (category: string, scriptIndex: number) => {
        setScripts(prevScripts => {
            const newScripts = [...prevScripts];
            const script = newScripts[scriptIndex];
            
            if (script.selectedCategories.includes(category)) {
                script.selectedCategories = script.selectedCategories.filter(c => c !== category);
            } else {
                script.selectedCategories.push(category);
            }
            
            return newScripts;
        });
    };

    const handleDismiss = (scriptIndex: number) => {
        setScripts(prevScripts => {
            const newScripts = [...prevScripts];
            newScripts[scriptIndex].isDismissed = true;
            return newScripts;
        });
    };
        const handleActivate = (scriptIndex: number) => {
        setScripts(prevScripts => {
            const newScripts = [...prevScripts];
            newScripts[scriptIndex].isDismissed = false;
            return newScripts;
        });
    };

    return (
        <div className="container-script">
            <div className="section back-color">
                <div className="header">
                    <div>
                        <span>Update the scripts in your project that handle cookie creation</span>
                    </div>
                    {scripts.length > 0 && (
                        <button 
                            className="save-all-btn"
                            onClick={handleSaveAll}
                            disabled={isSaving}
                        >
                            {isSaving ? "Saving..." : "Save All Categories"}
                        </button>
                    )}
                </div>
                {saveStatus && (
                    <div className={`save-status ${saveStatus.success ? 'success' : 'error'}`}>
                        {saveStatus.message}
                    </div>
                )}
                <p>Check your project scripts for any that create cookies. Organize them, replace with our snippet, and follow our tutorial to streamline your workflow.</p>
                <a href="#">Need help? See the docs <i>&#x2197;</i></a>
            </div>

            {scripts.length === 0 ? (
                <div className="section">
                    <p>No scripts found. Click "Scan Project" to analyze your scripts.</p>
                </div>
            ) : (
                scripts.map((script, index) => (
                    <div key={index} className="section">
                        {script.isEdited ? (
                            <div className="flexing">
                                <div>
                                    <img src={tickmark} alt="checkmark" className="flex-image" />
                                </div>
                                <div className="editdiv">
                                    <div className="editname">
                                        <h4 className="heading-text">{script.category} is implemented correctly.</h4>
                                    </div>
                                    <div className="bottom-row">
                                        <p className="category-text">Categories: <span className="category-highlight">{script.selectedCategories.join(', ')}</span></p>
                                        <div className="edit-flex" onClick={() => handleToggleEdit(index)}>
                                            <img className="editimage" src={edit} alt="edit icon" />
                                            <p className="edit-text">Edit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            scripts.map((script, index) => (
                                <div key={index} className="section">
                                    {!script.isDismissed ? (
                                        <>
                                            <div className="header">
                                                <div>
                                                    <span className="font-14">
                                                        {script.category ? `${script.category.toUpperCase()} Script` : 'Unknown Script'}
                                                    </span>
                                                </div>
                                                <div className="flex">
                                                    <img src={settings} alt="" />
                                                    <span className="font-14 light">Site Settings &gt; Custom Code</span>
                                                </div>
                                                <button 
                                                    className="dismiss-btn" 
                                                    onClick={() => handleDismiss(index)}
                                                >
                                                    Dismiss
                                                </button>
                                            </div>
                                            <p>Select a category for this script, remove the current script, and add the updated script to the Site or Page Settings:</p>
                                            <div className="category-code-block">
                                                <div className="category">
                                                    <span>Category:</span>
                                                    {categories.map((category) => (
                                                        <label key={category} className="toggle-switch">
                                                            <input
                                                                type="checkbox"
                                                                value={category}
                                                                checked={script.selectedCategories.includes(category)}
                                                                onChange={() => handleToggle(category, index)}
                                                            />
                                                            <span className="slider"></span>
                                                            <span className="category-label">{category}</span>
                                                            <div className="tooltip-containers">
                                      <img src={questionmark} alt="info" className="tooltip-icon" />
                                      <span className="tooltip-text">For the better user experience use this feature</span>
                                    </div>
                                                        </label>
                                                    ))}
                                                </div>
                                                <div className="code-block">
                                                    <textarea
                                                        value={script.fullTag || ''}
                                                        readOnly
                                                        onChange={(e) => {
                                                            const newScripts = [...scripts];
                                                            newScripts[index].fullTag = e.target.value;
                                                            newScripts[index].script = e.target.value;
                                                            setScripts(newScripts);
                                                        }}
                                                        className="script-input"
                                                        rows={8}
                                                        placeholder="Script content..."
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="dismissed-message">
                                            <p>Script is dismissed.</p>
                                            <button 
                                                className="activate-btn" 
                                                onClick={() => handleActivate(index)}
                                            >
                                                Activate
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default Script;
