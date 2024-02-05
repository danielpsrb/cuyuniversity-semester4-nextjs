"use client"
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';

const LoginSuccessMessage = () => {
    const [isMessageDisplayed, setIsMessageDisplayed] = useState(false);

    useEffect(() => {
        const isDisplayed = localStorage.getItem("isLoginSuccessMessageDisplayed");

        if (!isDisplayed) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });

            Toast.fire({
                icon: "success",
                title: "Signed in successfully"
            });

            localStorage.setItem("isLoginSuccessMessageDisplayed", "true");
            setIsMessageDisplayed(true);
        }
    }, []);

    return (
        <div>
            {/* Tampilkan komponen hanya jika pesan belum ditampilkan */}
            {!isMessageDisplayed && <div></div>}
        </div>
    );
};

export default LoginSuccessMessage;