export const getAnimeResponse = async (resource, query) => {
    try {
        const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`
        )
        const anime = await response.json()
        return anime
    } catch (error) {
        console.error(error)
        throw new Error("Failed to fetch Anime")
    }
}

export const getNestedAnimeResponse = async(resource, objectProperty) => {
    const response = await getAnimeResponse(resource)
    // return response?.data?.flatMap(item => item[objectProperty]) || [];
    return response.data.flatMap(item => item[objectProperty])
}

export const reproduce = (data, gap) => {
    const first = ~~(Math.random() * (data.length - gap) + 1)
    const last = first + gap

    const response = {
        data: data.slice(first, last)
    }

    return response
}
