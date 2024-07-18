import React, { useState, useEffect } from "react";

const lightTheme = {
  backgroundColor: "#fff",
  textColor: {
    primary: "#000",
    primaryWithOpacity: "rgba(0, 0, 0, 0.3)",
    secondary: "#474747",
  },
  primaryColor: "#4f6cf0",
  navbar: {
    background: "rgba(255, 255, 255, 0.5)",
  },
  boxshadow: {
    primary: "rgba(31, 38, 135, 0.37)",
  },
  border: {
    secondary: "rgba(172, 172, 172, 0.432)",
  },
  cover: {
    imageDark: "rgba(0, 0, 0, 0.25)",
    seeThroughtDark: "rgba(0, 0, 0, 0.5)",
  },
};

const darkTheme = {
  backgroundColor: "#fff",
  textColor: {
    primary: "#000",
    primaryWithOpacity: "rgba(0, 0, 0, 0.5)",
    secondary: "#474747",
  },
  primaryColor: "#4f6cf0",
  navbar: {
    background: "rgba(255, 255, 255, 0.5)",
  },
  boxshadow: {
    primary: "rgba(31, 38, 135, 0.37)",
  },
  border: {
    secondary: "rgba(172, 172, 172, 0.432)",
  },
  cover: {
    imageDark: "rgba(0, 0, 0, 0.25)",
    seeThroughtDark: "rgba(0, 0, 0, 0.5)",
  },
};

export const useTheme = () => {
  const [theme, setTheme] = useState(lightTheme); // Default to light theme

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  useEffect(() => {
    // You can store the theme preference in localStorage or any other state management solution
    // For demonstration, I'm using localStorage here
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  }, []);

  useEffect(() => {
    // Update the localStorage when the theme changes
    localStorage.setItem("theme", theme === darkTheme ? "dark" : "light");
  }, [theme]);

  return { theme, toggleTheme };
};
