"use client";
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faDesktop } from '@fortawesome/free-solid-svg-icons';

const Theme = () => {
    const [theme, setTheme] = useState("system");

    const options = [
        { icon: faSun, text: "light" },
        { icon: faMoon, text: "dark" },
        { icon: faDesktop, text: "system" }
    ];

    // Jalankan hanya di client
    useEffect(() => {
        const element = document.documentElement;
        const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

        function onWindowMatch() {
            if (
                localStorage.theme === "dark" ||
                (!("theme" in localStorage) && darkQuery.matches)
            ) {
                element.classList.add("dark");
            } else {
                element.classList.remove("dark");
            }
        }

        onWindowMatch(); // cek awal

        switch (theme) {
            case "dark":
                element.classList.add("dark");
                localStorage.setItem("theme", "dark");
                break;
            case "light":
                element.classList.remove("dark");
                localStorage.setItem("theme", "light");
                break;
            default:
                localStorage.removeItem("theme");
                onWindowMatch();
                break;
        }
    }, [theme]);

    return (
        <div>
            {options.map((opt) => (
                <button
                    key={opt.text}
                    className={`w-8 h-8 leading-9 text-2xl rounded-md m-1 ${theme === opt.text ? "text-color-blue" : ""
                        }`}
                    onClick={() => setTheme(opt.text)}
                >
                    <FontAwesomeIcon icon={opt.icon} className="w-6 h-6" />
                </button>
            ))}
        </div>
    );
};

export default Theme;
