"use client"
import React, { useEffect } from 'react';
import { useRouter, redirect } from 'next/navigation';
import Swal from 'sweetalert2';

const NoCommentMessage = () => {
    const router = useRouter();
    
    useEffect(() => {
        Swal.fire({
            icon: 'info',
            title: 'No Comment Found',
            showConfirmButton: true,
            confirmButtonText: 'Back', // Mengganti teks tombol OK
        }).then((result) => {
            if (result.isConfirmed) {
                router.back();
            }
        });
    }, []); 

    return (
        <div></div>
    );
};

export default NoCommentMessage;
