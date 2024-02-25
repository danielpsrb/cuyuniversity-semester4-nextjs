import Image from "next/image"
import Link from "next/link"
import Header from "@/components/Dashboard/Header"
import { authUserSession } from "@/services/auth-services";
import prisma from "@/libs/prisma"

const Page = async () => {
    const user = await authUserSession()
    const collection = await prisma.collection.findMany({where: {user_email: user.email}})

    return (
        <section className="mt-4 w-full px-2">
            <Header title={"My Collection Anime"}/>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {collection.map((collect, index) => {
                    return ( <Link key={index} href={`/anime/${collect.anime_mal_id}`}  className="relative">
                                <Image src={collect.anime_image} alt="{collect.anime_image}" width={200} height={200} className="w-full" />
                                <div className="absolute flex justify-center items-center bottom-0 w-full h-16 bg-color-lightblue">
                                    <h5 className="text-xl text-color-primary text-center">{collect.anime_title}</h5>
                                </div>
                            </Link>
                );
                })}
                
            </div>
        </section>
    )
}

export default Page