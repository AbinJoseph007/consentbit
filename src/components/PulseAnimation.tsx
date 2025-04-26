import React, { useEffect, useState } from 'react';
import "../style/styless.css";
const dots = new URL("../assets/dots fo load.svg", import.meta.url).href;
const circle = new URL("../assets/round shape.svg", import.meta.url).href;
const logo = new URL("../assets/logo of consentbit'.svg", import.meta.url).href;
const blob = new URL("../assets/Union.svg", import.meta.url).href;

const PulseAnimation: React.FC = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timings = [0, 200, 400, 700, 1000, 1300];
    let timeouts: NodeJS.Timeout[] = [];

    const startSequence = () => {
      timings.forEach((time, index) => {
        const timeout = setTimeout(() => setStage(index), time);
        timeouts.push(timeout);
      });

      const resetTimeout = setTimeout(() => {
        setStage(0);
        startSequence(); // Loop
      }, 2000 + timings[timings.length - 1]);
      timeouts.push(resetTimeout);
    };

    startSequence();

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="pulse-wrapper">
      {stage === 0 && <img src={circle} className="pulse-stage stage-circle" />}
      {stage >= 1 && (
        <img src={blob} className={`pulse-stage stage-blob ${stage >= 2 ? 'rotate' : ''}`} />
      )}
      {stage >= 2 && stage < 4 && (
        <img src={dots} className="pulse-stage stage-dots" />
      )}
      {stage === 4 && (
        <img src={dots} className="pulse-stage stage-dots fade-out-dots" />
      )}
      {stage === 5 && (
        <div className="pulse-stage consentbit-logos">
          <img src={logo} alt="ConsentBit Logo" />
        </div>
      )}
    </div>
  );
};

export default PulseAnimation;
