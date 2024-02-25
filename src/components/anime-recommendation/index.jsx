import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const ReccomendedAnimeList = ({ api }) => {
    return (
        <div className='grid md:grid-cols-6 sm:grid-cols-2 grid-cols-3 gap-4 px-4'>
            {api.data?.map((anime, index) => {
                return (
                    <Link href={`/anime/${anime.mal_id}`} className='cursor-pointer text-white hover:text-yellow-500 transition-all' key={index}>
                        <Image 
                            src={anime.images.webp.image_url} 
                            alt='animeImages' 
                            width={350} 
                            height={350} 
                            className="w-full max-h-80 object-cover" 
                            priority={true} />
                        <h3 className='font-bold md:text-xl text-sm p-4'>{anime.title}</h3>
                    </Link>
                )
            })}
        </div>
    )
}

export default ReccomendedAnimeList
