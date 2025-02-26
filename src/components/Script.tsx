import React, { useState, useEffect } from "react";
import "../style/styless.css";
const copyimg = new URL("../assets/fi-rr-copy.png", import.meta.url).href;
const questionmark = new URL("../assets/questionmark.png", import.meta.url).href;



const Script: React.FC = () => {
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
                <div className="header">
                    <div>
                        <span>Update the Facebook Pixel script.</span>
                    </div>
                    <div>
                        <img src="" alt="" />
                    </div>
                    <button className="dismiss-btn">Dismiss</button>
                </div>
                <p>Select a category for this script, remove the current script, and add the updated script to the Site or Page Settings:</p>

                <div className="category-code-block">
                    {/* Category Selection */}
                    <div className="category">
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
                                {/* <div className="tooltip-container"> */}
                                    <img src={questionmark} alt="info" className="tooltip-icon" />
                                    {/* <span className="tooltip-text">pages of your site</span> */}
                                {/* </div> */}
                            </label>
                        ))}
                    </div>

                    {/* Script Code Block */}
                    <div className="code-block">
                        {/* <button className="copy-button"><img src={copyimg} alt="" /></button> */}
                        <textarea
                            value={scriptCode}
                            onChange={(e) => setScriptCode(e.target.value)}
                            className="script-input"
                            rows={8}
                            placeholder="Scanned script will appear here..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Script;
