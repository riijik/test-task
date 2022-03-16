import { task11, task12, task13, task14 } from "./taskOne";
import { myPowFunc, myFlatFunc } from "./taskTwo";
import { data } from "@/data/data";

function main() {
    console.log(task11(data));
    console.log(task12(data));
    console.log(task13(data));
    console.log(task14(data));
    console.log(myPowFunc(3, 4));
    console.log(myFlatFunc([1, 3, 5, [1, [4, 5], 'asdf', [76, [56, [66, 59]]]]]));
}

main();