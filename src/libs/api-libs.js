export const getAnimeResponse = async(resource, query) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`)
    const anime = await response.json()
    return anime
}

export const getNestedAnimeResponse = async (resource, objectProperty) => {
    const response = await getAnimeResponse(resource);
    // console.log("Response:", response); // Add this logging statement
    if (response && response.data) {
        // console.log("Response data:", response.data); // Add this logging statement
        return response.data.flatMap(item => item[objectProperty]);
    } else {
        console.error("Response or response data is undefined");
        return []; // Return an empty array or handle the error as appropriate
    }
};

// export const getNestedAnimeResponse = async(resource, objectProperty) => {
//     const response = await getAnimeResponse(resource)
//     return response.data.flatMap(item => item[objectProperty])
// }

export const reproduce = (data, gap) => {
    const first = ~~(Math.random() * (data.length - gap) + 1)
    const last = first + gap

    const response = {
        data: data.slice(first, last)
    }

    return response
}