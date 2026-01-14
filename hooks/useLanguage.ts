"use client";

import { useEffect, useState } from "react";

export const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "tr", label: "Turkish", flag: "🇹🇷" },
  { code: "el", label: "Greek", flag: "🇬🇷" },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "fr", label: "French", flag: "🇫🇷" }, 
  { code: "fa", label: "Persian", flag: "🇮🇷" },
];

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: any;
  }
}

export const useLanguage = () => {
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {

    if (!document.querySelector('script[src*="translate.google.com"]')) {
      const addScript = document.createElement("script");
      addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      addScript.async = true;
      document.body.appendChild(addScript);
    }
    
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",

          includedLanguages: "en,fa,tr,de,ar,el,fr", 
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const detectUserLanguage = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const countryCode = data.country_code;

        let targetLang = "en"; 

        if (countryCode === "TR") targetLang = "tr";
        else if (countryCode === "IR") targetLang = "fa";
        else if (countryCode === "DE") targetLang = "de";
        else if (countryCode === "GR") targetLang = "el";
        else if (countryCode === "FR") targetLang = "fr"; 
        else if (["AE", "SA", "QA", "IQ"].includes(countryCode)) targetLang = "ar";

        const savedLang = getCookie("googtrans");
        
        if (!savedLang && targetLang !== "en") {

          setTimeout(() => changeLanguage(targetLang), 1000);
        }
      } catch (error) {
        console.error("IP Detection failed, defaulting to English");
      }
    };

    detectUserLanguage();
  }, []);

  const changeLanguage = (langCode: string) => {
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
      setCurrentLang(langCode);
    }
  };

  return { currentLang, changeLanguage };
};

function getCookie(name: string) {
  const v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
}