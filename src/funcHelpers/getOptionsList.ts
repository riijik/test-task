import { Animal } from "@/interfaces/animal";

export function getOptionsList(data: Animal[]) {
    const optionsList = data.map((animal) => {
        return { value: animal.name, label: animal.name };
    });
    return optionsList;
}