import React, { useState, useEffect, useCallback } from "react";
import "../style/styless.css";
import { ScriptCategory } from "../types/types";
import { customCodeApi } from "../services/api";
import { useScriptContext } from "../context/ScriptContext";
import PulseAnimation from './PulseAnimation';

const questionmark = new URL("../assets/blue question.svg", import.meta.url).href;
const settings = new URL("../assets/setting-2.svg", import.meta.url).href;
const tickmark = new URL("../assets/implement correctly.svg", import.meta.url).href;
const edit = new URL("../assets/edit.svg", import.meta.url).href;
const explain = new URL("../assets/catogery.svg", import.meta.url).href;
const sheild = new URL("../assets/sheild.svg", import.meta.url).href;
const line = new URL("../assets/Line 6.svg", import.meta.url).href;
const dismiss = new URL("../assets/Vector.svg", import.meta.url).href;
const Active = new URL("../assets/active.svg", import.meta.url).href;
const search = new URL("../assets/search.svg", import.meta.url).href;
const uparrow = new URL("../assets/blue up arrow.svg", import.meta.url).href;
const line2 = new URL("../assets/line.svg", import.meta.url).href;


const Script: React.FC<{
    fetchScripts: boolean;
    setFetchScripts: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ fetchScripts, setFetchScripts }) => {
    const { scripts, setScripts } = useScriptContext();
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<{ success: boolean; message: string } | null>(null);
    const categories = ["Essential", "Personalization", "Analytics", "Marketing"];
    const userinfo = localStorage.getItem("wf_hybrid_user");
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showAuthPopup, setShowAuthPopup] = useState(false); 


    const getScriptIdentifier = useCallback((script: { src?: string | null; fullTag?: string | null }) => {
        return script.src || script.fullTag?.replace(/\s*data-category\s*=\s*"[^"]*"/i, '') || null;
    }, []);

    const fetchScriptData = useCallback(async () => {
        setIsLoading(true);
        try {
            const tokens = JSON.parse(userinfo || "{}")?.sessionToken;
            if (!tokens) {
                console.error("Session token not found.");
                setIsLoading(false);
                return;
            }

            const result = await customCodeApi.analyticsScript(tokens);
            if (result?.success && result?.data?.analyticsScripts) {
                const scriptsResponse = result.data.analyticsScripts ?? [];
                const validScripts = scriptsResponse.filter(script => script.fullTag?.trim() !== "");

                const formattedScripts = validScripts.map(script => ({
                    identifier: getScriptIdentifier(script),
                    url: script.src || null,
                    script: script.fullTag || null,
                    isDismissed: false,
                    isSaved: false,
                    selectedCategories: [],
                    ...script,
                }));

                setScripts(prevScripts => {
                    const existingScriptsMap = new Map(prevScripts.map(script => [script.identifier, script]));
                    const mergedScripts = formattedScripts.map(newScript => {
                        const existingScript = existingScriptsMap.get(newScript.identifier);
                        if (existingScript) {
                            return {
                                ...newScript,
                                isSaved: existingScript.isSaved,
                                selectedCategories: existingScript.selectedCategories,
                                isDismissed: existingScript.isDismissed,
                            };
                        }
                        return newScript;
                    });
                    setIsLoading(false);
                    return mergedScripts.filter(script => script.identifier !== null);
                });
            } else {
                console.error("Failed to fetch scripts or no scripts found.");
                setIsLoading(false);
            }
        } catch (error) {
            setSaveStatus({
                success: false,
                message: error instanceof Error ? error.message : "Failed to fetch scripts",
            });
            setIsLoading(false);
        }
    }, [setScripts, userinfo, getScriptIdentifier]);

  

    useEffect(() => {
        if (fetchScripts) {
            fetchScriptData();
            setFetchScripts(false);
        }
    }, [fetchScripts, fetchScriptData, setFetchScripts]);

    const handleSaveAll = async () => {
        setIsSaving(true);
        setSaveStatus(null);
        try {
            const tokens = JSON.parse(userinfo || "{}")?.sessionToken;
            if (!tokens) {
                console.error("Session token not found.");
                return;
            }

            const scriptsToSave: ScriptCategory[] = scripts
                .filter(script => script.identifier !== null && (script.fullTag || "").includes("data-category="))
                .map(script => ({
                    src: script.src || script.url || null,
                    content: script.fullTag || script.script || null,
                    categories: script.selectedCategories,
                }));

            if (scriptsToSave.length === 0) {
                setSaveStatus({
                    success: false,
                    message: "No scripts with selected categories to save.",
                });
                return;
            }

            const result = await customCodeApi.saveScriptCategorizations(tokens, scriptsToSave);

            if (result.success) {
                setSaveStatus({
                    success: true,
                    message: "Script categories saved successfully!",
                });
                // Update the local state: mark the currently saved scripts as 'isSaved: true',
                // and keep the 'isSaved' status of other scripts as they were.
                setScripts(prevScripts =>
                    prevScripts.map(script => {
                        if (!script.identifier) {
                            return script; 
                        }
                        const wasJustSaved = scriptsToSave.some(savedScript =>
                            savedScript.content === (script.fullTag || script.script) &&
                            savedScript.src === (script.src || script.url)
                        );
                        return { ...script, isSaved: script.isSaved || wasJustSaved };
                    })
                );
            } else {
                throw new Error(result.error || "Failed to save categories");
            }
        } catch (error) {
            setSaveStatus({
                success: false,
                message: error instanceof Error ? error.message : "Failed to save categories",
            });
        } finally {
            setIsSaving(false);
        }
    };


    const handleToggleEdit = useCallback((index: number) => {
        setScripts(prevScripts =>
            prevScripts.map((script, i) =>
                i === index ? { ...script, isSaved: false } : script
            )
        );
    }, [setScripts]);

    // ... existing code ...

    const handleToggle = useCallback((category: string, scriptIndex: number) => {
        if (category === "Essential") {
            return; 
        }

        setScripts(prevScripts =>
            prevScripts.map((script, index) => {
                if (index === scriptIndex && script.identifier) {
                    let updatedCategories = script.selectedCategories.includes(category)
                        ? script.selectedCategories.filter(c => c !== category)
                        : [...script.selectedCategories, category];

                    // Always include "Essential" in the categories
                    if (!updatedCategories.includes("Essential")) {
                        updatedCategories = ["Essential", ...updatedCategories];
                    }

                    let updatedTag = script.fullTag || '';
                    const tagRegex = /<script\b([^>]*)>/i;
                    const match = updatedTag.match(tagRegex);

                    if (match) {
                        let attrs = match[1];
                        attrs = attrs.replace(/\s*data-category\s*=\s*"[^"]*"/i, '');
                        const categoryAttr = updatedCategories.length > 0
                            ? ` data-category="${updatedCategories.join(',')}"`
                            : '';
                        const newTag = `<script${attrs}${categoryAttr}>`;
                        updatedTag = updatedTag.replace(tagRegex, newTag);
                    }

                    return {
                        ...script,
                        selectedCategories: updatedCategories,
                        fullTag: updatedTag,
                        script: updatedTag,
                    };
                }
                return script;
            })
        );
    }, [setScripts]);


    const handleDismiss = useCallback((scriptIndex: number) => {
        // Start fade-out animation
        setScripts(prev =>
            prev.map((s, i) =>
                i === scriptIndex ? { ...s, transitionState: 'fade-out' } : s
            )
        );

        // After animation, hide script
        setTimeout(() => {
            setScripts(prev =>
                prev.map((s, i) =>
                    i === scriptIndex ? { ...s, isDismissed: true, transitionState: '' } : s
                )
            );
        }, 300); // must match CSS transition time
    }, [setScripts]);

    const handleActivate = useCallback((scriptIndex: number) => {
        // Instantly show script, then fade it in
        setScripts(prev =>
            prev.map((s, i) =>
                i === scriptIndex ? { ...s, isDismissed: false, transitionState: 'fade-in' } : s
            )
        );

        setTimeout(() => {
            setScripts(prev =>
                prev.map((s, i) =>
                    i === scriptIndex ? { ...s, transitionState: '' } : s
                )
            );
        }, 300);
    }, [setScripts]);


    useEffect(() => {
        if (saveStatus) {
            setShowPopup(true);
            const timer = setTimeout(() => {
                setShowPopup(false);
                setTimeout(() => {
                    setSaveStatus(null);
                }, 200);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [saveStatus]);

    return (
        <div className="container-script">
            <div className="section back-color">
                <div className="flexings">
                    <div>
                        <img src={sheild} style={{ marginTop: '5px' }} alt="catogery image" />
                    </div>
                    <div>
                        <div className="header">
                            <div>
                                <span>Update the scripts in your project that handle cookie creation</span>
                            </div>
                        </div>
                        {saveStatus && (
                            <div className={`popup-overlays ${showPopup ? 'fade-in' : 'fade-out'}`}>
                                <div className={`popup-boxs ${saveStatus.success ? 'success' : 'error'}`}>
                                    <p>{saveStatus.message}</p>
                                </div>
                            </div>
                        )}
                        <p>Check your project scripts for any that create cookies. Organize them, replace with our snippet, and follow our tutorial to streamline your workflow.</p>
                        <a href="https://www.consentbit.com/help-document" target="_blank">Need help? See the docs <i><img src={uparrow} alt="uparrow" /></i></a>
                    </div>
                </div>
            </div>

            {scripts.length > 0 && (
                <div className="line">
                    <img src={line2} alt="line2" />
                </div>)}

            {scripts.length > 0 && (
                <div className="save-btn-container">
                    <button className="save-all-btn" onClick={handleSaveAll} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Categories"}
                    </button>
                </div>
            )}

            {isLoading ? (
                <div className="pulse-overlays">
                    <PulseAnimation />
                </div>
            ) : scripts.length === 0 ? (
                <div className="sections">
                    <img src={search} alt="search" />
                    <p>Click 'Scan Project' to analyze your project.</p>
                </div>
            ) : (

                scripts
                    .filter(script => script.identifier !== null) 
                    .map((script, index) => (
                        <div key={script.identifier || index} className={`section-script script-container ${script.transitionState || ''}`}>
                            {script.isSaved && !script.isDismissed ? (
                                // --- EDIT CONFIRMATION VIEW ---
                                <div className="flexing">
                                    <div>
                                        <img src={tickmark} alt="checkmark" className="flex-image" />
                                    </div>
                                    <div className="editdiv">
                                        <div className="editname">
                                            <h4 className="heading-text">{script.category.charAt(0).toUpperCase() + script.category.slice(1) || 'Script'} is implemented correctly.</h4>
                                        </div>
                                        <div className="bottom-row">
                                            <p className="category-text">Categories: <span className="category-highlight">{script.selectedCategories.join(', ')}</span></p>
                                            <div className="edit-flex" onClick={() => handleToggleEdit(index)} style={{ cursor: 'pointer' }}>
                                                <img className="editimage" src={edit} alt="edit icon" />
                                                <p className="edit-text">Edit</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {script.isDismissed ? (
                                        <div className="dismissed-message">
                                            <p>
                                                <span>
                                                    {script.category
                                                        ? script.category.charAt(0).toUpperCase() + script.category.slice(1)
                                                        : script.src
                                                            ? script.src.charAt(0).toUpperCase() + script.src.slice(1)
                                                            : 'Unknown'}
                                                </span>{' '}
                                                Script is Dismissed!
                                            </p>

                                            <button className="dismiss-btn" onClick={() => handleActivate(index)}> <img src={Active} alt="activate icon" style={{ marginRight: '8px', width: "14px", height: "14px" }} />Activate</button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flexings">
                                                <div>
                                                    <img src={explain} alt="catogery image" />
                                                </div>
                                                <div className="width-100">
                                                    <div className="header">
                                                        <div>
                                                            <span className="text-[12px] font-bold">
                                                                {script.category
                                                                    ? `Update the ${script.category.charAt(0).toUpperCase() + script.category.slice(1)} Script`
                                                                    : 'Unknown Script'}
                                                            </span>
                                                        </div>
                                                        <div className="flex">
                                                            <img src={settings} alt="settingsimage" />
                                                            <span className="font-14 light">Site Settings &gt; Custom Code</span>
                                                        </div>
                                                        <button className="dismiss-btn" onClick={() => handleDismiss(index)}>  <img src={dismiss} alt="Dismiss icon" style={{ marginRight: '8px' }} />Dismiss</button>
                                                    </div>
                                                    <p>Select a category:</p>
                                                    <div><img src={line} alt="lineimage" /></div>
                                                    <div className="category-code-block">
                                                        <div className="category">
                                                            <span>Category:</span>
                                                            {categories.map((category) => (
                                                                <label key={category} className="toggle-switch">
                                                                    <input
                                                                        type="checkbox"
                                                                        value={category}
                                                                        checked={category === "Essential" || script.selectedCategories.includes(category)}
                                                                        onChange={() => handleToggle(category, index)}
                                                                        disabled={category === "Essential"} 
                                                                    />
                                                                    <span className="slider"></span>
                                                                    <span className="category-label">{category}</span>
                                                                    <div className="tooltip-containers">
                                                                        <img src={questionmark} alt="info" className="tooltip-icon" />
                                                                        <span className="tooltip-text">Categorize this script based on its purpose.</span>
                                                                    </div>
                                                                </label>
                                                            ))}
                                                        </div>
                                                        <div className="code-block">
                                                            <textarea
                                                                value={script.fullTag || ''}
                                                                readOnly
                                                                className="script-input"
                                                                rows={8}
                                                                placeholder="Script content..."
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    ))
            )}
        </div>
    );
};

export default Script;