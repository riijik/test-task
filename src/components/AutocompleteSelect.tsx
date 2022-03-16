import React, { useState, useMemo } from "react";
import { Animal } from "@/interfaces/animal";
import style from "../styles/selectorStyle.css";
import Select from 'react-select';
import { getOptionsList } from "@/funcHelpers/getOptionsList";
import makeAnimated from 'react-select/animated';

export function MySelect({ data }: { data: Animal[] }) {
    const [selectValue, setSelectValue] = useState("");

    return (<div className={style.selectContainer}>
        <b>My selector</b>
        <select value={selectValue} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setSelectValue(event.target.value) }}>
            {data.map((animal) => {
                return (
                    <option key={animal.name}>{animal.name}</option>
                );
            })}
        </select>
    </div>);
}

//variant with React Select library, pretty multiselect
export function ReactSelect({ data }: { data: Animal[] }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const animatedComponents = makeAnimated();

    const options: { value: string, label: string }[] = useMemo(() => getOptionsList(data), [data]);

    return (<div className={style.selectContainer}>
        <b>React Select</b>
        <div style={{ width: '300px' }}>
            <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                isMulti
                components={animatedComponents}
            />
        </div>
    </div>
    );
}