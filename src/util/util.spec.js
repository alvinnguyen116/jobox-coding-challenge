import * as util from "./util";

describe("Modulo", () => {
    it("should work for negative and positive numbers", () => {
        const {mod} = util;

        expect(mod(4,2)).toBe(0);
        expect(mod(3,2)).toBe(1);
        expect(mod(13,17)).toBe(13);
        expect(mod(-2,4)).toBe(2);
        expect(mod(-2,3)).toBe(1);
        expect(mod(0,10)).toBe(0);
    });
});

describe("Prettify Breed", () => {
    const {prettifyBreed} = util;

    it("should capitalize and space separate breed and sub-breed", () => {
        const breed = "alvin";
        const subBreed = "nguyen";

        expect(prettifyBreed({breed,subBreed})).toBe("Nguyen Alvin");
    });

    it("should be able to prettify without a subBreed", () => {
        expect(prettifyBreed({breed: "pop"})).toBe("Pop");
    });

    it("should be able to prettify single letters", () => {
        const breed = "a";
        const subBreed = "j";

        expect(prettifyBreed({breed,subBreed})).toBe("J A");
    });

    it("should be able to prettify uppercase letters", () => {
        const breed = "aLVIN";
        const subBreed = "ngUyeN";

        expect(prettifyBreed({breed,subBreed})).toBe("Nguyen Alvin");
    });
});

describe("Promisify Image", () => {
    const {promisifyImage} = util;
    const img = "https://images.dog.ceo/breeds/cattledog-australian/IMG_4386.jpg";

    it("should return a promise", () => {
        expect(promisifyImage(img)).toBeInstanceOf(Promise);
    });
});

describe("Random dogs", () => {
    const {randomDogs} = util;
    const prevDogs = [1,2,3,4];
    const dogs = [1,3,4,5,2,6,7,8,10,1];

    it("should generate n more dogs", () => {
        expect(randomDogs(2,dogs,prevDogs).length).toBe(6);
        expect(randomDogs(0,dogs,prevDogs).length).toBe(4);
    });

    it("should generate a list of non-duplicates", () => {
        for (let n of [2, 4]) {
            const newDogs = randomDogs(n,dogs,prevDogs);
            const setSize = new Set(newDogs).size;

            expect(newDogs.length).toBe(setSize);
        }
    });

    it("should contain all of the previous dogs", () => {
        const newDogs = randomDogs(3,dogs,prevDogs);
        for (const prevDog of prevDogs) {
            expect(newDogs.includes(prevDog)).toBeTruthy();
        }
    });

    it("should break early if there are not enough unique values", () => {
        const newDogs = randomDogs(10,dogs,prevDogs);
        expect(newDogs.length).toBeLessThan(14);
    });
});

describe("Breed to Key", () => {
   const {breedToKey, keyToBreed} = util;
   const breed = {breed: "bread", subBreed: "pudding"};
   const key = '{"breed":"bread","subBreed":"pudding"}';

   it("should be able to convert breed to key", () => {
       expect(breedToKey(breed)).toBe(key);
   });

    it("should be able to convert key to breed", () => {
        expect(keyToBreed(key)).toEqual(breed);
    });
});

describe("Update dogs", () => {
    const {updateDogs} = util;
    const prevDogs = {
        "{\"breed\":\"german\",\"subBreed\":null}": new Set([1,2,3])
    };

    it("should add a new property if it doesn't exists", () => {
       const breed = "alvin";
       const subBreed = "nguyen";
       const dogs = [4,5,6];
       const result = {
           "{\"breed\":\"german\",\"subBreed\":null}": new Set([1,2,3]),
           "{\"breed\":\"alvin\",\"subBreed\":\"nguyen\"}": new Set([4,5,6])
       };
       expect(updateDogs(prevDogs,{breed,subBreed,dogs})).toEqual(result);
    });

    it("should be able to update a property", () => {
        const breed = "german";
        const subBreed = null;
        const dogs = [3,4];
        const result = {
            "{\"breed\":\"german\",\"subBreed\":null}": new Set([1,2,3,4])
        };

        expect(updateDogs(prevDogs,{breed,subBreed,dogs})).toEqual(result);
    });

    it("should NOT mutate the previous dog state", () => {
        const breed = "alicia";
        const subBreed = "keys";
        const dogs = [3,4,3,4,1];
        updateDogs(prevDogs,{breed,subBreed,dogs});
        const result = {
            "{\"breed\":\"german\",\"subBreed\":null}": new Set([1,2,3])
        };

        expect(prevDogs).toEqual(result);
    });
});

describe("Memoized filter list", () => {
    const {memoizeFilterList} = util;

    it("should provide substring matches", () => {
       const items = [
           {
               breed: 'Alvin',
               subBreed: 'Nguyen'
           },
           {
               breed: 'apple',
               subBreed: 'tree'
           },
           {
               breed: 'wishful',
               subBreed: 'treants'
           }
       ];
       const target = "tre";
       const result = [
           {
               breed: 'apple',
               subBreed: 'tree'
           },
           {
               breed: 'wishful',
               subBreed: 'treants'
           }
       ];
       expect(memoizeFilterList(items,target)).toEqual(result);
    });

    it("should be case-insensitive", () => {
        const items =  [
            {
                breed: 'aLvin',
                subBreed: 'Nguyen'
            },
            {
                breed: 'lowes',
                subBreed: 'mandellA'
            },
            {
                breed: 'A Little trick',
                subBreed: 'treants'
            }
        ];
        const target = "a l";
        const result = [
            {
                breed: 'lowes',
                subBreed: 'mandellA'
            },
            {
                breed: 'A Little trick',
                subBreed: 'treants'
            }
        ];
        expect(memoizeFilterList(items,target)).toEqual( result);
    });
});