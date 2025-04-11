// src/components/Script.tsx
import React, { useState, useEffect } from "react";
import "../style/styless.css";
import { Script as ScriptType, ScriptCategory } from "../types/types";
import { customCodeApi } from "../services/api";

const copyimg = new URL("../assets/fi-rr-copy.png", import.meta.url).href;
const questionmark = new URL("../assets/Group 20 (1).png", import.meta.url).href;
const settings = new URL("../assets/setting-2.png", import.meta.url).href;
const ignored = new URL("../assets/fi-rr-shield-exclamation.png", import.meta.url).href;

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

            // Fetch analytics scripts
            const result = await customCodeApi.analyticsScript(tokewern);
            console.log("Analytics Script Result:", result);
            
            if (result?.success && result?.data?.analyticsScripts) {
                const scriptsResponse = result?.data?.analyticsScripts ?? [];
                console.log("Inside formatted script:", scriptsResponse);
                
                // Filter out scripts with null or empty fullTag
                const validScripts = scriptsResponse.filter(script => script.fullTag && script.fullTag.trim() !== '');
                
                const formattedScripts = validScripts.map(script => ({
                    url: script.src || null,
                    script: script.fullTag || null,
                    isDismissed: false,
                    selectedCategories: [],
                    src: script.src,
                    content: script.content,
                    type: script.type,
                    async: script.async,
                    defer: script.defer,
                    crossorigin: script.crossorigin,
                    category: script.category,
                    fullTag: script.fullTag
                }));
            console.log("individual formatted script",formattedScripts)
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

    // const handleSaveAll = async () => {
    //     try {
    //         setIsSaving(true);
    //         setSaveStatus(null);

    //         const siteId = "67c6b33db14886f99df46d69";
    //         const tokenss = JSON.parse(userinfo);
    //         const tokewern = tokenss.sessionToken;

    //         // Filter scripts that have categories selected
    //         const scriptsWithCategories = scripts.filter(script => 
    //             script.selectedCategories.length > 0
    //         );

    //         if (scriptsWithCategories.length === 0) {
    //             setSaveStatus({
    //                 success: false,
    //                 message: "Please select at least one category for a script"
    //             });
    //             return;
    //         }

    //         const scriptsToSave: ScriptCategory[] = scriptsWithCategories.map(script => ({
    //             src: script.src || script.url || null,
    //             content: script.content || script.script || null,
    //             selectedCategories: script.selectedCategories || []
    //         }));

    //         const result = await customCodeApi.saveScriptCategorizations(
    //             tokewern,
    //             scriptsToSave
    //         );
            
    //         if (result.success) {
    //             setSaveStatus({
    //                 success: true,
    //                 message: "Script categories saved successfully!"
    //             });
    //         } else {
    //             throw new Error(result.error || "Failed to save categories");
    //         }
    //     } catch (error) {
    //         setSaveStatus({
    //             success: false,
    //             message: error instanceof Error ? error.message : "Failed to save categories"
    //         });
    //     } finally {
    //         setIsSaving(false);
    //     }
    // };

    // const handleToggle = (category: string, scriptIndex: number) => {
    //     setScripts(prevScripts => {
    //         const newScripts = [...prevScripts];
    //         const script = newScripts[scriptIndex];
            
    //         if (script.selectedCategories.includes(category)) {
    //             script.selectedCategories = script.selectedCategories.filter(c => c !== category);
    //         } else {
    //             script.selectedCategories.push(category);
    //         }
            
    //         return newScripts;
    //     });
    // };
//new code

    const handleSaveAll = async () => {
        try {
            setIsSaving(true);
            setSaveStatus(null);
    
           
            const tokenss = JSON.parse(userinfo);
            const tokewern = tokenss.sessionToken;
    
            // Filter scripts that have a data-category attribute in the fullTag
            const scriptsWithCategories = scripts.filter(script =>
                (script.fullTag || '').includes('data-category=')
            );
    
            if (scriptsWithCategories.length === 0) {
                setSaveStatus({
                    success: false,
                    message: "Please select at least one category for a script"
                });
                return;
            }
    
            const scriptsToSave : ScriptCategory[] = scriptsWithCategories.map(script => ({
                src: script.src || script.url || null,
                content: script.fullTag || script.script || null,
                // no need for selectedCategories anymore
            }));
    
            const result = await customCodeApi.saveScriptCategorizations(
                tokewern,
                scriptsToSave
            );
            
            if (result.success) {
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
    


    const handleToggle = (category: string, scriptIndex: number) => {
        setScripts(prevScripts => {
            const newScripts = [...prevScripts];
            const script = newScripts[scriptIndex];
    
            // Toggle the category
            if (script.selectedCategories.includes(category)) {
                script.selectedCategories = script.selectedCategories.filter(c => c !== category);
            } else {
                script.selectedCategories.push(category);
            }
    
            // Update the script tag's data-category attribute
            const selectedCategories = script.selectedCategories;
            const content = script.fullTag || '';
            const tagRegex = /<script\b([^>]*)>/i;
            const match = content.match(tagRegex);
    
            if (match) {
                let attrs = match[1];
    
                // Remove existing data-category if present
                attrs = attrs.replace(/\s*data-category\s*=\s*"[^"]*"/i, '');
    
                // Add data-category only if there are selected categories
                const categoryAttr = selectedCategories.length > 0
                    ? ` data-category="${selectedCategories.join(',')}"`
                    : '';
    
                const updatedTag = `<script${attrs}${categoryAttr}>`;
                const updatedScript = content.replace(tagRegex, updatedTag);
    
                // Save the updated script back
                script.fullTag = updatedScript;
                script.script = updatedScript;
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
    );
};

export default Script;