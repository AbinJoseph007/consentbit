import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./style/styless.css";
import Customization from "./components/Customization";
import Script from "./components/Script";
const questionmark = new URL("./assets/questionmark.png", import.meta.url).href;
const App = () => {
    const [activeTab, setActiveTab] = useState("General Settings");
    const [expires, setExpires] = useState("");
    const [animation, setAnimation] = useState("Fade");
    const [easing, setEasing] = useState("Ease");
    const [language, setLanguage] = useState("English");
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        setIsActive(false);
        setTimeout(() => setIsActive(true), 50);
    }, [animation]);
    return (React.createElement("div", { className: "app" },
        React.createElement("div", { className: "navbar" },
            React.createElement("div", null,
                React.createElement("h2", null, "CookieAPP")),
            React.createElement("div", { className: "need-help" },
                React.createElement("img", { src: questionmark, alt: "" }),
                React.createElement("h5", null, "Need help?"))),
        React.createElement("div", { className: "configuration" },
            React.createElement("div", { className: "mode-switch" },
                React.createElement("span", null, "Configuration"),
                React.createElement("button", { className: "mode-btn active" }, "Simple"),
                React.createElement("button", { className: "mode-btn" }, "Advanced")),
            React.createElement("div", { className: "component-width" },
                React.createElement("div", null,
                    React.createElement("a", { className: "link", href: "#" },
                        "You need a subscription to publish the production ",
                        React.createElement("i", null, "\u2197"))),
                React.createElement("div", null,
                    React.createElement("button", null, "Create Component")))),
        React.createElement("div", { className: "tabs" }, ["General Settings", "Customization", "Script"].map((tab) => (React.createElement("button", { key: tab, className: activeTab === tab ? "active" : "", onClick: () => setActiveTab(tab) }, tab)))),
        React.createElement("div", { className: "container" },
            React.createElement("div", { className: "settings-panel" },
                activeTab === "General Settings" && (React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "general" },
                        React.createElement("div", null,
                            React.createElement("div", { className: "settings-group" },
                                React.createElement("label", { htmlFor: "expires" }, "Expires"),
                                React.createElement("img", { src: questionmark, alt: "" }),
                                React.createElement("input", { type: "text", id: "expires", placeholder: "120s", value: expires || "", onChange: (e) => setExpires(e.target.value) })),
                            React.createElement("div", { className: "settings-group" },
                                React.createElement("label", { htmlFor: "animation" }, "Animation"),
                                React.createElement("img", { src: questionmark, alt: "" }),
                                React.createElement("select", { id: "animation", value: animation, onChange: (e) => setAnimation(e.target.value) },
                                    React.createElement("option", { value: "fade" }, "Fade"),
                                    React.createElement("option", { value: "slide-up" }, "Slide Up"),
                                    React.createElement("option", { value: "slide-down" }, "Slide Down"),
                                    React.createElement("option", { value: "slide-left" }, "Slide Left"),
                                    React.createElement("option", { value: "slide-right" }, "Slide Right"))),
                            React.createElement("div", { className: "settings-group" },
                                React.createElement("label", { htmlFor: "easing" }, "Easing"),
                                React.createElement("img", { src: questionmark, alt: "" }),
                                React.createElement("select", { id: "easing", value: easing, onChange: (e) => setEasing(e.target.value.toLowerCase()) },
                                    React.createElement("option", { value: "ease" }, "Ease"),
                                    React.createElement("option", { value: "linear" }, "Linear"),
                                    React.createElement("option", { value: "ease-in" }, "Ease-in"),
                                    React.createElement("option", { value: "ease-out" }, "Ease-out"),
                                    React.createElement("option", { value: "ease-in-out" }, "Ease-in-out"))),
                            React.createElement("div", { className: "settings-group" },
                                React.createElement("label", { htmlFor: "language" }, "Language"),
                                React.createElement("img", { src: questionmark, alt: "" }),
                                React.createElement("select", { id: "language", value: language, onChange: (e) => setLanguage(e.target.value) },
                                    React.createElement("option", null, "English"),
                                    React.createElement("option", null, "Spanish"),
                                    React.createElement("option", null, "French")))),
                        React.createElement("div", null,
                            React.createElement("div", { className: "settings-group-preview" },
                                React.createElement("h3", null, "Preview"),
                                React.createElement("div", { className: "preview-area" },
                                    React.createElement("div", { className: `cookie-banner ${animation} ${isActive ? "active" : ""}`, style: { transitionTimingFunction: easing } },
                                        React.createElement("div", null,
                                            React.createElement("span", null, language === "English"
                                                ? "Cookie consent content here..."
                                                : language === "Spanish"
                                                    ? "Contenido de consentimiento de cookies aquí..."
                                                    : "Contenu de consentement aux cookies ici...")),
                                        React.createElement("div", null,
                                            React.createElement("button", { className: "btn-preferences" }, "Preferences"),
                                            React.createElement("button", { className: "btn-reject" }, "Reject"),
                                            React.createElement("button", { className: "btn-accept" }, "Ok, Got it"))))))))),
                activeTab === "Customization" && React.createElement(Customization, null),
                activeTab === "Script" && React.createElement(Script, null)))));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App, null));
