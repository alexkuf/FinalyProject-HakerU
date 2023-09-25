import { useEffect, useState } from "react";

const ProgressBar = ({ isRunning }) => {
  const [filled, setFilled] = useState(0);
  useEffect(() => {
    if (filled < 100 && isRunning) {
      setTimeout(() => setFilled((prev) => (prev += 3)), 50);
    }
  }, [filled, isRunning]);
  return (
    <div>
      <div className="progressbar">
        <div
          style={{
            height: "100%",
            width: `${filled}`,
            backgroundColor: "#a66cff",
            transition: "width 0.5s",
          }}
        ></div>
        <span className="porogressPercent" style={{ width: `${filled}` }}>
          {filled}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
