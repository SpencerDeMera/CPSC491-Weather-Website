import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import TogglerContext from "./TogglerContext";

export default function TogglerState({ children }) {
  const [mode, setMode] = useState("");

  useEffect(() => {
    // check if the value is not present in local storage than set its state value and localstorage value to light else get the stored value and set it in state
    if (!localStorage.getItem("weather-theme-mode")) {
      localStorage.setItem("weather-theme-mode", "light");
      document.body.classList.add("light");
      setMode("light");
    } else {
      setMode(localStorage.getItem("weather-theme-mode"));
      document.body.classList.add(localStorage.getItem("weather-theme-mode"));
    }
  }, []);

  return (
    <TogglerContext.Provider value={{ mode, setMode }}>
      {children}
    </TogglerContext.Provider>
  );
}
