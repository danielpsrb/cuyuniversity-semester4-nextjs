"use client"

import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import { Search } from "@mui/icons-material"

const InputSearch = () => {
    const SearchRef = useRef()
    const router = useRouter()

    const handleSearch = (event) => {
        if (event.key === "Enter" || event.type === "click") {
            event.preventDefault();
            const keyword = SearchRef.current.value;
    
            // Check if the keyword is not empty before initiating the search
            if (keyword.trim() !== "") {
                router.push(`/search/${keyword}`);
            }
        }
    };    

    return (
        <div className="relative">
            <input 
                placeholder="Search for..." 
                className="w-full p-2 pr-10 rounded-lg bg-color-gainsboro focus:outline-none focus:border-color-lightblue focus:ring focus:ring-color-lightblue " 
                ref={SearchRef}
                onKeyDown={handleSearch}
                required
            />
            <button className="absolute top-2 end-2" onClick={handleSearch}>
                <Search sx={{color: "blue"}} />
            </button>
        </div>
    )
}

export default InputSearch