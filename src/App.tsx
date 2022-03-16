import React from "react";
import { render } from "react-dom";
import { MySelect } from "./components/AutocompleteSelect";
import { ReactSelect } from "./components/AutocompleteSelect";
import { data } from "./data/data";
import style from "./App.css";

function App() {
    return (
        <div className={style.wrapper}>
            <MySelect data={data} />
            <ReactSelect data={data} />
        </div>
    );
}
render(<App />, document.body);