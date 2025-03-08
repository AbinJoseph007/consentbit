import React, { useState, useEffect } from "react";
import "../style/styless.css";
const copyimg = new URL("../assets/fi-rr-copy.png", import.meta.url).href;
const questionmark = new URL("../assets/Group 20 (1).png", import.meta.url).href;
const settings = new URL("../assets/setting-2.png", import.meta.url).href;
const ignored = new URL("../assets/fi-rr-shield-exclamation.png", import.meta.url).href;



const Script: React.FC = () => {
    const [isDismissed, setIsDismissed] = useState(false);

    const categories = ["Essential", "Personalization", "Analytics", "Marketing"];

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [scriptCode, setScriptCode] = useState<string>("");

    // Simulate scanning scripts from the project
    useEffect(() => {
        const scanScripts = async () => {
            // Simulated scan function - replace this with actual logic
            const scannedScript = ``;
            setScriptCode(scannedScript);
        };

        scanScripts();
    }, []);

    const handleToggle = (category: string) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(category)
                ? prevSelected.filter((item) => item !== category)
                : [...prevSelected, category]
        );
    };

    return (
        <div className="container-script">
            {/* First Section */}
            <div className="section back-color">
            {/* <div><img src={ignored} alt="" /></div> */}

                <div className="header">
                    <div>
                        <span>Update the scripts in your project that handle cookie creation</span>
                    </div>
                </div>
                <p>Check your project scripts for any that create cookies. Organize them, replace with our snippet, and follow our tutorial to streamline your workflow.</p>
                <a href="#">Need help? See the docs <i>&#x2197;</i></a>
            </div>

            {/* Second Section */}

            <div className="section">
            {!isDismissed ? (
                <>
                    {/* Main content when not dismissed */}
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
                        {/* Category Selection */}
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

                        {/* Script Code Block */}
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
                /* Content when dismissed */
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
