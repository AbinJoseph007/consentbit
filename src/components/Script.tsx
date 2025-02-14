import React, { useState } from "react";
import "../style/styless.css";

const Script: React.FC = () => {
    const categories = ["Essential", "Personalization", "Analytics", "Marketing"];

    // Store multiple selected categories
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const handleToggle = (category: string) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(category)
                ? prevSelected.filter((item) => item !== category) // Uncheck
                : [...prevSelected, category] // Check
        );
    };

    return (
        <div className="container-script">
            {/* First Section */}
            <div className="section">
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
                                <span className="info-icon">❔</span>
                            </label>
                        ))}
                    </div>

                    {/* Script Code Block */}
                    <div className="code-block">
                        <pre><code>{`
    <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'your-pixel-id-goes-here');
    fbq('track', 'PageView');
    </script>
                        `}</code></pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Script;


{/* <div className="category">
{["Essential", "Personalization", "Analytics", "Marketing"].map((category) => (
    <label key={category}>
        <input 
            type="checkbox" 
            name="category" 
            value={category} 
            checked={selectedCategory === category} 
            onChange={() => setSelectedCategory(category)} 
        />
        <span>{category}</span>
    </label>
))}
</div> */}