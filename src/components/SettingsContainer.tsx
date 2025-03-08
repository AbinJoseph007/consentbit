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
