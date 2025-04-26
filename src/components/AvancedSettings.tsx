
// import React from "react";

// const AdvancedSettings: React.FC = () => {

//   return (
//     <>
//      <div className="general">
//         <div className="width-cust">
//           <div className="cust">
//             {/* <div>
//               <span className="font-blue">Orientation</span>
//             // </div> */}
//             <div className="flex">
//               <span className="font-blue">Cookie Banner Alignment</span>

              
           
//             <div
//               className={`cookie-banner ${animation} ${isActive ? "active" : ""}`}
//               style={{
//                 transition: `transform 0.5s ${easing}, opacity 0.5s ${easing}`,
//                 position: "absolute",
//                 ...(style !== "fullwidth" && {
//                   bottom: "10px",
//                   left: selected === "left" ? "10px" : selected === "center" ? "50%" : "auto",
//                   right: selected === "right" ? "10px" : "auto",
//                   transform: selected === "center" ? "translateX(-50%)" : "none",
//                 }),
//                 transform: selected === "center" ? "translateX(-50%)" : "none",
//                 fontFamily: Font,
//                 textAlign: selectedtext,
//                 alignItems: style === "centeralign" ? "center" : undefined, // Change dynamically
//                 fontWeight: weight,
//                 width: previewDimensions.width,
//                 height: previewDimensions.minHeight,
//                 borderRadius: `${borderRadius}px`,
//                 backgroundColor: color,
//               }}
//             >
//               {style === "alignstyle" && <div className="secondclass" style={{ backgroundColor: bgColors, borderBottomRightRadius: `${borderRadius}px`, borderTopRightRadius: `${borderRadius}px` }}></div>}
//               <div className="space" style={{ color: headColor, fontWeight: weight, }}><h4>Cookie Setting</h4></div>

//               <div className="padding" style={{ color: paraColor, alignItems: style === "centeralign" ? "center" : undefined, }}>
//                 <span style={{ alignItems: style === "centeralign" ? "center" : undefined, }}>
//                   {language === "English"
//                     ? "We use cookies to provide you with the best possible experience. They also allow us to analyze user behavior in order to constantly improve the website for you."
//                     : language === "Spanish"
//                       ? "Utilizamos cookies para brindarle la mejor experiencia posible. También nos permiten analizar el comportamiento del usuario para mejorar constantemente el sitio web para usted."
//                       : "Nous utilisons des cookies pour vous offrir la meilleure expérience possible. Ils nous permettent également d’analyser le comportement des utilisateurs afin d’améliorer constamment le site Web pour vous."}
//                 </span>

//               </div>
//               <div className="button-wrapp" style={{ justifyContent: style === "centeralign" ? "center" : undefined, }}>
//                 <button className="btn-preferences" style={{ borderRadius: `${buttonRadius}px`, backgroundColor: btnColor }} >Preferences</button>
//                 <button className="btn-reject" style={{ borderRadius: `${buttonRadius}px`, backgroundColor: btnColor }} >Reject</button>
//                 <button className="btn-accept" style={{ borderRadius: `${buttonRadius}px`, backgroundColor: secondcolor }} >Accept</button>
//               </div>
//             </div>

//             {/* ccpa banner */}
//             {/* <div
//               className={`cookie-banner ${animation} ${isActive ? "active" : ""}`}
//               style={{
//                 transition: `transform 0.5s ${easing}, opacity 0.5s ${easing}`,
//                 position: "absolute",
//                 ...(style !== "fullwidth" && {
//                   bottom: "10px",
//                   left: selected === "left" ? "10px" : selected === "center" ? "50%" : "auto",
//                   right: selected === "right" ? "10px" : "auto",
//                   transform: selected === "center" ? "translateX(-50%)" : "none",
//                 }),
//                 transform: selected === "center" ? "translateX(-50%)" : "none",
//                 fontFamily: Font,
//                 textAlign: selectedtext,
//                 alignItems: style === "centeralign" ? "center" : undefined, // Change dynamically
//                 fontWeight: weight, 
//                 width: previewDimensions.width,
//                 height: previewDimensions.height,
//                 borderRadius: `${borderRadius}px`,
//                 backgroundColor: color,
//               }}
//             >
//               {style === "alignstyle" && <div className="secondclass" style={{ backgroundColor: bgColors , borderBottomRightRadius:`${borderRadius}px` , borderTopRightRadius:`${borderRadius}px` }}></div>}
//               <div className="space" style={{ color: headColor, fontWeight: weight, marginBottom:"0px" }}><h4>We value your Privacy</h4></div>

//               <div className="padding" style={{ color: paraColor , alignItems: style === "centeralign" ? "center" : undefined, }}>
//                 <span  style={{ alignItems: style === "centeralign" ? "center" : undefined, }}>
//                   {language === "English"
//                     ? "We use cookies to provide you with the best possible experience. They also allow us to analyze user behavior in order to constantly improve the website for you."
//                     : language === "Spanish"
//                       ? "Utilizamos cookies para brindarle la mejor experiencia posible. También nos permiten analizar el comportamiento del usuario para mejorar constantemente el sitio web para usted."
//                       : "Nous utilisons des cookies pour vous offrir la meilleure expérience possible. Ils nous permettent également d’analyser le comportement des utilisateurs afin d’améliorer constamment le site Web pour vous."}
//                 </span>

//               </div>
//               <div className="button-wrapp"  style={{ justifyContent:  style === "centeralign" ? "center" : undefined, }}>
                
//                 <p className="btn-accept" style={{ borderRadius: `${buttonRadius}px`, backgroundColor: secondcolor }} >do not share my Personal informations</p>
//               </div>
//             </div> */}

//           </div>
//           <div>
//             <div className="preference-banner">
//               <div>

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>  
//     </>
//   );
// };

// export default AdvancedSettings;
