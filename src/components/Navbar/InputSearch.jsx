"use client"

import React, { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { FaSearch } from "react-icons/fa";


const InputSearch = () => {

    const searchRef = useRef()
    const router = useRouter()

    const handleSearchBtn = (event) => {
        if (event.key === "Enter" || event.type === "click") {
            event.preventDefault();
            const keywords = searchRef.current.value;
    
            if (keywords.trim() !== "") {
                router.push(`/search/${keywords}`);
            }
        }
    }

    return (
        <div className='relative'>
            <input 
                type="text" 
                placeholder="search anime.." 
                className="input input-bordered bg-color-primary dark:text-color-gainsboro text-color-black dark:bg-color-dark w-80 md:w-auto p-2 pr-10" 
                ref={searchRef}
                onKeyDown={handleSearchBtn}
                required
            />
            <button className='absolute top-3 end-2' onClick={handleSearchBtn}>
                <FaSearch size={24} />
            </button>
        </div>
    )
}

export default InputSearch
