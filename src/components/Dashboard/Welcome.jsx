"use client"
import React, { useState, useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { authUserSession } from "@/libs/auth-libs";

const Welcome = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await authUserSession();
            setUser(userData);
        };
        fetchUserData();
    }, []);

    const[text] = useState([
        "Welcome to Website Dans Animelist",
    ])

    return (
        <div className="border-2 border-color-deepskyblue bg-color-black p-2 rounded-xl shadow-xl text-center sm:text-left">
            <h5 className="text-xl font-bold select-none mb-2 text-center mr-2">Hello {user?.name}</h5> 
            <div className='text-xl font-semibold inline select-none'>
                <Typewriter
                    loop
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                    words={text}
                />
            </div>
        </div>
    );
};

export default Welcome;