import { getAnimeResponse } from "@/services/api-services";
import AnimeList from "@/components/AnimeList"
import Header from "@/components/AnimeList/Header";

const Page = async ({ params }) => {
    const { keyword } = params

    const decodedKeyword = decodeURI(keyword)
    const searchAnime = await getAnimeResponse("anime", `q=${decodedKeyword}`)

    return (
        <>
        <section>
            <Header title={`Pencarian Untuk ${decodedKeyword}...`} linkTitle="" linkHref="/populer"/>
            <AnimeList api={searchAnime} />
        </section>
        </>
    )
}

export default Page