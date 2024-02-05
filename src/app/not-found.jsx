"use client"

import { Warning } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"

const Page = () => {
    const router = useRouter()

    return (
        <div className="min-h-screen max-w-xl mx-auto flex justify-center items-center">
            <div className="flex justify-center items-center gap-4 flex-col">
                <Warning size={45} className="text-color-red"/>
                <h3 className="text-color-red text-4xl font-bold">NOT FOUND</h3>
                <button onClick={() => router.back()} className="text-color-primary hover:text-color-orange transition-all underline">Kembali</button>
            </div>
        </div>
    )
}

export default Page