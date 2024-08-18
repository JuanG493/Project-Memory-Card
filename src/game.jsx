import { useState } from "react";
import FetchData from "./api";
import listNames from "./information";

export default function Game() {
    const [animes, setAnimes] = useState([]);

    function handleClick() {

    }

    return (
        <>
            <h1> HOLA</h1>
            <ul>
                {listNames.map(elm => (
                    <FetchData key={elm.id} animeObj={elm.name} ></FetchData>
                ))}
            </ul>
        </>
    )
}