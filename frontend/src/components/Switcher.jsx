import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../utils/useDarkSide";

const Switcher = () => {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(colorTheme === "light");
  
    const toggleDarkMode = (checked) => {
      const newTheme = checked ? "light" : "dark";
      setTheme(newTheme);
      setDarkSide(checked);
    };
  
    return (
      <>
        <DarkModeSwitch
          style={{ marginBottom: "1px" }}
          checked={darkSide}
          onChange={toggleDarkMode}
          size={20}
          moonColor="black"
          sunColor="white"
        />
      </>
    );
  };
  

export default Switcher