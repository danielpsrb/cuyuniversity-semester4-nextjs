"use client"

import React, { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlass } from '@phosphor-icons/react'

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
                placeholder="Search" 
                className="input input-bordered w-80 md:w-auto p-2 pr-10" 
                ref={searchRef}
                onKeyDown={handleSearchBtn}
                required
            />
            <button className='absolute top-3 end-2' onClick={handleSearchBtn}>
                <MagnifyingGlass size={24} />
            </button>
        </div>
    )
}

export default InputSearch
