/**
 * @param url - the url to fetch
 * @returns {Promise<any>}
 * @desc A utility function for fetching the JSON
 * response from an endpoint.
 */
async function getJSON(url) {
    try {
        const res = await fetch(url);
        return await res.json();
    } catch (e) {
        throw e;
    }
}

/**
 * @param breed
 * @param subBreed
 * @returns {Promise<any>}
 * @desc Makes a request to the Dogs API by breed and sub-breed.
 * Dogs API: https://dog.ceo/dog-api/documentation/
 */
export function fetchDogs(breed, subBreed = null) {
    let url = `https://dog.ceo/api/breed/${breed}/`;
    if (subBreed) url += `${subBreed}/`;
    url += "images";
    return getJSON(url);
}

/**
 * @returns {Promise<any>}
 * @desc Makes a request to the Dogs API for the list of breeds.
 */
export function fetchBreeds() {
    const url = "https://dog.ceo/api/breeds/list/all";
    return getJSON(url);
}