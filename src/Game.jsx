import { useEffect, useState } from "react";
import CardComp from "./card";
import listNames from "./information";

function Game() {
    const [animes, setAnimes] = useState([]);
    const [listSelected, setListSelected] = useState([]);
    const [best, setBest] = useState(0);
    const [currentId, setCurrentId] = useState(0);
    
    function handleOnClick(id) {

        let newOrder = getListRandomN();
        let animesReorder = [];
        for (let i = 0; i < animes.length; i++) {
            animesReorder[newOrder[i]] = animes[i]
        }
        setAnimes(animesReorder)
        
        if(listSelected.includes(id)){
            setListSelected([])
        }else{
            setListSelected([...listSelected, id])
        }
        setCurrentId(id);
    }

    useEffect(() => {
            if (listSelected.length > best && best <= animes.length) {
                setBest(listSelected.length)
            }
    },[currentId])

    function getListRandomN() {
        let list = [];
        let num;
        for (let i = 0; i < 12; i++) {

            do {
                num = Math.floor(Math.random() * 12)
            } while (list.includes(num));

            list.push(num)
        }
        return list;
    }

    useEffect(() => {
        async function fetchUrl(listNames) {

            const responses = await Promise.all(listNames.map(async elm => {
                let raw = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${elm.name}`, { mode: "cors" })
                let infoObj = await raw.json();
                return infoObj.data[0].attributes;
            }))
            return responses;
        }
        fetchUrl(listNames).then(res => setAnimes(res));

    }, [])

    return (
        <>
            <div className="d-flex justify-content-around p-1 align-items-center c-primary">
                <h1>Card Memory Game</h1>
                <h4>Click all, do not repat!</h4>
                <h3>score: {listSelected.length}</h3>
                <h3>Best:{best}</h3>
            </div>
            <div className="containerCards">
                {animes.map(anime => {
                    return (
                        <CardComp
                            key={anime.slug}
                            url={anime.posterImage.small}
                            title={anime.slug}
                            handlerClick={handleOnClick} >
                        </CardComp>
                    )
                })}
            </div>
        </>
    )
}
export default Game