"use client"

import React from 'react'
import { IoWarningOutline } from "react-icons/io5";


const Page = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                <IoWarningOutline className="text-[#FF0000] text-5xl mr-4" />
                <div>
                <h1 className="md:text-2xl text-xl text-center text-gray-800 font-bold mb-2 select-none">401 - Unauthorized</h1>
                <p className="text-lg text-center text-gray-600">Sorry, you are not authorized to access this page.</p>
                <p className='text-lg text-center text-gray-500'>You don't have permission to access this page, please sign in first!</p>
                </div>
            </div>
        </div>
    )
}

export default Page