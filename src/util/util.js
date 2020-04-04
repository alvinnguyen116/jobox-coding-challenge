import {cloneDeep, random, difference, memoize} from "lodash";

/**
 * @param num
 * @param n
 * @returns {number}
 * @desc Javascript's native modulo does
 * not work as expected for negative numbers.
 * This is a work-around.
 */
export function mod(num,n) {
    return ((num % n) + n) % n;
}

/**
 * @param str
 * @returns {string}
 * @desc Capitalize a single word.
 */
function capitalize(str) {
    return str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * @param breed
 * @param subBreed
 * @returns {string}
 * @desc Prettify a breed for display.
 */
export function prettifyBreed({breed, subBreed = null}) {
    return `${subBreed ? capitalize(subBreed) : ""} ${capitalize(breed)}`.trim();
}

/**
 * @param src
 * @returns {Promise<unknown>}
 * @desc Promisify an image src which
 * resolves when the image has loaded.
 */
export function promisifyImage(src) {
    return new Promise(resolve => {
        const img = new Image();
        img.addEventListener("load", resolve);
        img.setAttribute("src", src);
    });
}

/**
 * @param photos
 * @desc Promisify a list of photos which
 * resolves when all of the photos have settled
 * (rejected or resolved).
 */
export function promisifyPhotos(photos) {
    const promises = photos.map(promisifyImage);
    return Promise.allSettled(promises);
}

/**
 * @param n {int} - the amount of random dogs to generate
 * @param dogs {string[]} - the original dog array
 * @param prev {string[]} - the previous array of dogs
 * @desc Generate n more unique random dogs that do not
 * exists in the previous array of dogs.
 */
export function randomDogs(n, dogs, prev=[]) {
    const diff = difference(dogs, prev);
    const result = [...prev];
    while(n > 0) {
        if (diff.length === 0) break;
        const randIndex = random(0,diff.length-1);
        const randValue = diff.splice(randIndex, 1);
        if (randValue.length) {
            result.push(randValue[0]);
            n--;
        }
    }
    return result;
}

/**
 * @param breed
 * @param subBreed
 * @desc Use this function to convert a
 * breed into a key. Ensures the same key is
 * used throughout the app.
 */
export function breedToKey({breed, subBreed}) {
    return JSON.stringify({breed, subBreed});
}

/**
 * @param key {string}
 * @desc Use this function to convert a key
 * to a breed.
 */
export function keyToBreed(key) {
    return JSON.parse(key);
}

/**
 * @param prevDogs
 * @param breed
 * @param subBreed
 * @param dogs
 * @desc Update a previous dog object with a new
 * dog object. A set is used to ensure uniqueness.
 */
export function updateDogs(prevDogs, {breed, subBreed, dogs}) {
    const key = breedToKey({breed, subBreed});
    const newDogs = cloneDeep(prevDogs);
    if (!(key in newDogs)) {
        newDogs[key] = new Set(dogs);
    } else {
        newDogs[key] = new Set([...newDogs[key], ...dogs]);
    }
    return newDogs;
}

function filterList(items, inputVal) {
    return items.filter(breed => // substring match
        prettifyBreed(breed).toLowerCase().includes(inputVal.toLowerCase())
    );
}

export const memoizeFilterList = memoize(filterList, (...args) => args[1]);



