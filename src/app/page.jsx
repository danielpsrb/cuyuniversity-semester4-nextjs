import AnimeList from "@/components/AnimeList"
import Header from "@/components/AnimeList/Header";
import { getAnimeResponse, getNestedAnimeResponse, reproduce } from "@/libs/api-libs";
import Footer from "@/components/Footer/Footer";
import { authUserSession } from "@/libs/auth-libs";
import LoginSuccessMessage from "@/components/Dashboard/LoginSucessMessage";

const Page = async() => {
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?limit=8`)
  // const topAnime = await response.json()

  const user = await authUserSession();


  const topAnime = await getAnimeResponse("top/anime", "limit=8")
  let recommendedAnime = await getNestedAnimeResponse("recommendations/anime", "entry")
  recommendedAnime = reproduce(recommendedAnime, 4)
  
  return (
    <>
      {user && <LoginSuccessMessage />}
      <section>
        <Header title="Paling Populer" linkTitle="Lihat Semua" linkHref="/populer"/>
        <AnimeList api={topAnime}/>
      </section>
      <section>
        <Header title="Rekomendasi"/>
        <AnimeList api={recommendedAnime}/>
      </section>
      <Footer/>
    </>
  )
}

export default Page