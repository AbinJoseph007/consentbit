import React, { useState, useEffect } from "react";
import "../style/styless.css";
const copyimg = new URL("../assets/fi-rr-copy.png", import.meta.url).href;
const questionmark = new URL("../assets/Group 20 (1).png", import.meta.url).href;
const settings = new URL("../assets/setting-2.png", import.meta.url).href;
const ignored = new URL("../assets/fi-rr-shield-exclamation.png", import.meta.url).href;

const Script: React.FC<{ fetchScripts: boolean; setFetchScripts: React.Dispatch<React.SetStateAction<boolean>> }> = ({
    fetchScripts,
    setFetchScripts
}) => {
    const [isDismissed, setIsDismissed] = useState(false);
    const categories = ["Essential", "Personalization", "Analytics", "Marketing"];
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [scriptCode, setScriptCode] = useState<string>("");
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiNjc4OTc2ZTIzYmY2NDMzNjhiN2M5OWQ2IiwiZW1haWwiOiJ3ZWJAY29uc2VudGJpdC5jb20iLCJmaXJzdE5hbWUiOiJDb25zZW50Yml0IiwibGFzdE5hbWUiOiJDb29raWUifSwiZXhwIjoxNzQxNjM3NTEzfQ.HsO8qyvZ5kMc1ALLUrEqh83b3-FI-lF85aXFbD3lwYM"

    useEffect(() => {
        const fetchCustomCode = async () => {
            try {
                const response = await fetch("https://cors-anywhere.herokuapp.com/https://api.webflow.com/v2/sites/67c6b33db14886f99df46d69/custom_code", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                         "Accept-Version": "2.0", // Required for Webflow v2 API
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest"
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                setScriptCode(data.scripts.map((script: any) => script.code).join("\n\n"));
            } catch (error) {
                console.error("Failed to fetch scripts:", error);
                setScriptCode("Error fetching scripts.");
            }
        };

        if (fetchScripts) {
            fetchCustomCode();
            setFetchScripts(false);
        }
    }, [fetchScripts, setFetchScripts]);

    const handleToggle = (category: string) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(category)
                ? prevSelected.filter((item) => item !== category)
                : [...prevSelected, category]
        );
    };

    return (
        <div className="container-script">
            <div className="section back-color">
                <div className="header">
                    <div>
                        <span>Update the scripts in your project that handle cookie creation</span>
                    </div>
                </div>
                <p>Check your project scripts for any that create cookies. Organize them, replace with our snippet, and follow our tutorial to streamline your workflow.</p>
                <a href="#">Need help? See the docs <i>&#x2197;</i></a>
            </div>
            <div className="section">
                {!isDismissed ? (
                    <>
                        <div className="header">
                            <div>
                                <span className="font-14">Update the Facebook Pixel script.</span>
                            </div>
                            <div className="flex">
                                <img src={settings} alt="" />
                                <span className="font-14 light">Site Settings &gt; Custom Code</span>
                            </div>
                            <button className="dismiss-btn" onClick={() => setIsDismissed(true)}>Dismiss</button>
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
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => handleToggle(category)}
                                        />
                                        <span className="slider"></span>
                                        <span className="category-label">{category}</span>
                                        <img src={questionmark} alt="info" className="tooltip-icon" />
                                    </label>
                                ))}
                            </div>
                            <div className="code-block">
                                <textarea
                                    value={scriptCode}
                                    onChange={(e) => setScriptCode(e.target.value)}
                                    className="script-input"
                                    rows={8}
                                    placeholder="Scanned script will appear here..."
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="dismissed-message">
                        <p>Uncategorized script is dismissed.</p>
                        <button className="activate-btn" onClick={() => setIsDismissed(false)}>Activate</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Script;