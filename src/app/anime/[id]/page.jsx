import { getAnimeResponse } from "@/services/api-services"
import VideoPlayer from "@/components/Utilities/VideoPlayer"
import Image from "next/image"
import CollectionButton from "@/components/AnimeList/CollectionButton"
import { authUserSession } from "@/services/auth-services";
import prisma from "@/libs/prisma"
import CommentInput from "@/components/AnimeList/CommentInput"
import CommentBox from "@/components/AnimeList/CommentBox"

const Page = async ({ params: { id } }) => {
    const anime = await getAnimeResponse(`anime/${id}`)
    const user = await authUserSession()
    
    const collection = await prisma.collection.findFirst({
        where: { user_email: user?.email, anime_mal_id: id }
    });

    const comments = await prisma.comment.findMany({
        where: { anime_mal_id: id },
        select: {id: true},
    });
    // console.log(comments)

    return (
        <>
            <div className="pt-4 px-4">
                <h3 className="lg:text-2xl text-xl text-color-primary text-center">{anime.data.title_english} - {anime.data.year}</h3>
                {
                    !collection && user && <CollectionButton anime_mal_id={id} user_email={user?.email} anime_image={anime.data.images.webp.image_url} anime_title={anime.data.title}/>
                }
            </div>
            <div className="pt-4 px-4 flex  gap-2 lg:justify-center text-color-greenyellow overflow-x-auto gap-x-4 whitespace-nowrap">
                <div className="w-36 flex-shrink-0 flex flex-col justify-center items-center rounded-md border-2 border-color-greenyellow p-2 m-2">
                    <h3>PERINGKAT</h3>
                    <p>{anime.data.rank}</p>
                </div>
                <div className="w-36 flex-shrink-0 flex flex-col justify-center items-center rounded-md border-2 border-color-greenyellow p-2 m-2">
                    <h3>SKOR</h3>
                    <p>{anime.data.score}</p>
                </div>
                <div className="w-36 flex-shrink-0 flex flex-col justify-center items-center rounded-md border-2 border-color-greenyellow p-2 m-2">
                    <h3>JUMLAH SUKA</h3>
                    <p>{anime.data.scored_by}</p>
                </div>
                <div className="w-36 flex-shrink-0 flex flex-col justify-center items-center rounded-md border-2 border-color-greenyellow p-2 m-2">
                    <h3>DURASI WAKTU</h3>
                    <p>{anime.data.duration}</p>
                </div>
                <div className="w-36 flex-shrink-0 flex flex-col justify-center items-center rounded-md border-2 border-color-greenyellow p-2 m-2">
                    <h3>ANGGOTA</h3>
                    <p>{anime.data.members}</p>
                </div>
                <div className="w-36 flex-shrink-0 flex flex-col justify-center items-center rounded-md border-2 border-color-greenyellow p-2 m-2">
                    <h3>EPISODE</h3>
                    <p>{anime.data.episodes}</p>
                </div>
                <div className="w-36 flex-shrink-0 flex flex-col justify-center items-center rounded-md border-2 border-color-greenyellow p-2 m-2">
                    <h3>Status Tayang</h3>
                    <p>{anime.data.status}</p>
                </div>
            </div>
            <div className="flex flex-col md:gap-2` py-4 md:mx-4 mx-2">
                <div className="grid md:grid-cols-2 gap-2 grid-cols-1 mb-4">
                    <Image
                        src={anime.data.images.webp.image_url}
                        alt={anime.data.images.jpg.image_url}
                        width={500}
                        height={350}
                        className="w-full rounded-sm object-cover max-h-96"
                        priority={true}
                    />
                    <iframe src={anime.data.trailer.embed_url} width="100%" height={384} allowFullScreen  ></iframe>
                </div>
                <a href={`https://myanimelist.net/anime/${id}`} className="relative text-color-lavender text-center text-xl mb-2">
                    <span className="no-underline">👉</span> <span className="hover:underline">Go to Official Website</span> <span className="no-underline">👈</span>
                </a>

                <div className="border-2 border-color-gold p-2 bg-color-accent rounded-lg select-none ">
                    <p className="text-justify text-xl text-color-black">{anime.data.synopsis}</p>
                </div>
            </div>
            <div className="p-4">
                <div className="text-color-primary text-2xl mb-4 w-56 border-2 border-color-gainsboro bg-color-black rounded-md text-nowrap p-1 mx-auto">
                    <h3 className="select-none text-center">Komentar Penonton</h3>
                </div>
                <CommentBox anime_mal_id={id} user_email={user?.email} suppressHydrationWarning />
                { user && <CommentInput anime_mal_id={id} user_email={user?.email} username={user?.name} anime_title={anime.data.title_english} /> }
            </div>
            <div>
                <VideoPlayer youtubeId={anime.data.trailer.youtube_id}/>
            </div>
        </>
    )
}

export default Page
