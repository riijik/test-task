import { Animal } from "@/interfaces/animal";

//task1.1
export function task11(array: Animal[]) {
    const reduceResult = array.reduce(reduceTask11, {
        dogs: 0,
        cats: 0,
        sumAge: 0,
        count: 0,
    });

    return {
        cats: reduceResult.cats,
        dogs: reduceResult.dogs,
        avgage: reduceResult.sumAge / reduceResult.count,
    };
}

interface ReduceCounter {
    dogs: number,
    cats: number,
    sumAge: number,
    count: number
}

function reduceTask11(acc: ReduceCounter, animal: Animal) {
    const sumAge = acc.sumAge + animal.age;
    const count = acc.count + 1;
    const animalType = animal.type;

    switch (animalType) {
        case "dog":
            return {
                ...acc,
                sumAge,
                count,
                dogs: acc.dogs + 1
            }
        case "cat":
            return {
                ...acc,
                sumAge,
                count,
                cats: acc.cats + 1,
            }
    }
}

//task1.2
export function task12(array: Animal[]): number {
    return array.filter(animal => animal.breed && animal.features.includes("black") && animal.type === "dog").length;
}

//task1.3
export function task13(array: Animal[]): Animal[] {
    return array.filter(filterTask13);
}

function filterTask13(animal: Animal) {
    switch (true) {
        case animal.type === "dog" && animal.features.includes("black"):
            return {
                ...animal
            }
        case animal.type === "cat" && animal.features.includes("white"):
            return {
                ...animal
            }
    }
}

//task1.4
export function task14(array: Animal[]): Animal[] {
    const sortedCats: Animal[] = array.filter(animal => animal.type === "cat").sort((currentCat, nextCat) => nextCat.age - currentCat.age);
    const sortedDogs: Animal[] = array.filter(animal => animal.type === "dog").sort((currentDog, nextDog) => currentDog.age - nextDog.age);
    return sortedCats.concat(sortedDogs);
}