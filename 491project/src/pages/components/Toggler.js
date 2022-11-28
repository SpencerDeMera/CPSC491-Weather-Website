import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import TogglerContext from "../../context/TogglerContext";
import sun from "../assets/images/sun.png";
import moon from "../assets/images/moon.png";

export default function Toggler() {
  const modeContent = useContext(TogglerContext);

  const { mode, setMode } = modeContent;

  const handleToggle = () => {
    if (mode === "light") {
      setMode("dark");
      localStorage.setItem("weather-theme-mode", "dark");
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      setMode("light");
      localStorage.setItem("weather-theme-mode", "light");
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  };

  useEffect(() => {}, [mode]);

  return (
    <div className="toggler" onClick={() => handleToggle()}>
      <img src={mode === "light" ? moon : sun} alt={mode} />
    </div>
  );
}
