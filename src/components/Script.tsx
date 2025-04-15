import React, { useState, useEffect } from "react";
import "../style/styless.css";
import { Script as ScriptType, ScriptCategory } from "../types/types";
import { customCodeApi } from "../services/api";

const copyimg = new URL("../assets/fi-rr-copy.png", import.meta.url).href;
const questionmark = new URL("../assets/Group 20 (1).png", import.meta.url).href;
const settings = new URL("../assets/setting-2.png", import.meta.url).href;
const ignored = new URL("../assets/fi-rr-shield-exclamation.png", import.meta.url).href;
const tickmark = new URL("../assets/Group 52.png", import.meta.url).href;
const edit = new URL("../assets/fi-rr-edit.png", import.meta.url).href;
import { useScriptContext } from "../context/ScriptContext"; 

const Script: React.FC<{
    fetchScripts: boolean;
    setFetchScripts: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ fetchScripts, setFetchScripts }) => {
    // const [scripts, setScripts] = useState<(ScriptType & { isSaved?: boolean })[]>([]);
    const { scripts, setScripts } = useScriptContext();
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<{ success: boolean; message: string } | null>(null);
    const categories = ["Essential", "Personalization", "Analytics", "Marketing"];
    const userinfo = localStorage.getItem("wf_hybrid_user");
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 


    useEffect(() => {
        if (fetchScripts) {
            setIsLoading(true); 
            fetchScriptData();
            setFetchScripts(false);
        }
    }, [fetchScripts]);

    const fetchScriptData = async () => {
        try {
            const tokenss = JSON.parse(userinfo || "{}");
            const tokewern = tokenss.sessionToken;

            const result = await customCodeApi.analyticsScript(tokewern);
            if (result?.success && result?.data?.analyticsScripts) {
                const scriptsResponse = result.data.analyticsScripts ?? [];
                const validScripts = scriptsResponse.filter(script => script.fullTag && script.fullTag.trim() !== "");

                const formattedScripts = validScripts.map(script => ({
                    url: script.src || null,
                    script: script.fullTag || null,
                    isDismissed: false,
                    isSaved: false,
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
                setIsLoading(false); 
                setScripts(formattedScripts);
            }
        } catch (error) {
            setSaveStatus({
                success: false,
                message: error instanceof Error ? error.message : "Failed to fetch scripts"
            });
        }
    };

    const handleSaveAll = async () => {
        try {
            setIsSaving(true);
            setSaveStatus(null);


            const tokenss = JSON.parse(userinfo || "{}");
            const tokewern = tokenss.sessionToken;

            const scriptsWithCategories = scripts.filter(script =>
                (script.fullTag || "").includes("data-category=")
            );

            if (scriptsWithCategories.length === 0) {
                setSaveStatus({
                    success: false,
                    message: "Please select at least one category for a script"
                });
                return;
            }

            const scriptsToSave: ScriptCategory[] = scriptsWithCategories.map(script => ({
                src: script.src || script.url || null,
                content: script.fullTag || script.script || null
            }));

            const result = await customCodeApi.saveScriptCategorizations(tokewern, scriptsToSave);

            if (result.success) {
                setSaveStatus({
                    success: true,
                    message: "Script categories saved successfully!"
                });

                setScripts(prevScripts =>
                    prevScripts.map(script => ({
                        ...script,
                        isSaved: (script.fullTag || "").includes("data-category=")
                    }))
                );
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

    const handleToggleEdit = (index: number) => {
        setScripts(prevScripts => {
            const newScripts = [...prevScripts];
            newScripts[index].isSaved = false;
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

            // Update data-category attribute
            const selectedCategories = script.selectedCategories;
            const content = script.fullTag || '';
            const tagRegex = /<script\b([^>]*)>/i;
            const match = content.match(tagRegex);

            if (match) {
                let attrs = match[1];
                attrs = attrs.replace(/\s*data-category\s*=\s*"[^"]*"/i, '');
                const categoryAttr = selectedCategories.length > 0
                    ? ` data-category="${selectedCategories.join(',')}"` : '';
                const updatedTag = `<script${attrs}${categoryAttr}>`;
                const updatedScript = content.replace(tagRegex, updatedTag);

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
                <div className="header">
                    <div>
                        <span>Update the scripts in your project that handle cookie creation</span>
                    </div>
                    {scripts.length > 0 && (
                        <button className="save-all-btn" onClick={handleSaveAll} disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save Categories"}
                        </button>
                    )}
                </div>
                {/* {saveStatus && (
                    <div className={`save-status ${saveStatus.success ? 'success' : 'error'}`}>
                        {saveStatus.message}
                    </div>
                )} */}

                {saveStatus && (
                    <div className={`popup-overlays ${showPopup ? 'fade-in' : 'fade-out'}`}>
                        <div className={`popup-boxs ${saveStatus.success ? 'success' : 'error'}`}>
                            <p>{saveStatus.message}</p>
                        </div>
                    </div>
                )}

                <p>Check your project scripts for any that create cookies. Organize them, replace with our snippet, and follow our tutorial to streamline your workflow.</p>
                <a href="#">Need help? See the docs <i>&#x2197;</i></a>
            </div>

            {isLoading ? (
                <div className="section">
                    <p>Scanning project scripts... <span className="loader"></span></p>
                    {/* You can replace the simple text loader with a more visual animation */}
                </div>
            ) : scripts.length === 0 ? (
                <div className="section">
                    <p>Click "Scan Project" to analyze your scripts.</p>
                </div>
            ) : (
                scripts.map((script, index) => (
                    <div key={script.fullTag || index} className="section">
                        {script.isSaved && !script.isDismissed ? (
                            // --- EDIT CONFIRMATION VIEW ---
                            <div className="flexing">
                                <div>
                                    <img src={tickmark} alt="checkmark" className="flex-image" />
                                </div>
                                <div className="editdiv">
                                    <div className="editname">
                                        <h4 className="heading-text">{script.category || 'Script'} is implemented correctly.</h4>
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
                                        <p><span>{script.category || script.src || 'Unknown'}</span>Script is dismissed.</p>
                                        <button className="activate-btn" onClick={() => handleActivate(index)}>Activate</button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="header">
                                            <div>
                                                <span className="font-12">
                                                    {script.category ? `Update the ${script.category.toUpperCase()} Script` : 'Unknown Script'}
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <img src={settings} alt="" />
                                                <span className="font-14 light">Site Settings &gt; Custom Code</span>
                                            </div>
                                            <button className="dismiss-btn" onClick={() => handleDismiss(index)}>Dismiss</button>
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
