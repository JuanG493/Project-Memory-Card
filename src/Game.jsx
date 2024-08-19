import { useEffect, useState } from "react";
import CardComp from "./card";
import listNames from "./information";

function Game() {
    const [animes, setAnimes] = useState([]);
    const [listSelected, setListSelected] = useState([]);
    const [bestScore, setBestScore] = useState(0);
    const [currentId, setCurrentId] = useState(0);
    const [timeStart, setTimeStart] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [bestTime, setBestTime] = useState(500);


    useEffect(() => {
        let timer
        if (timeStart != 0) {
            timer = setInterval(myTimer, 1000)
            function myTimer() {
                let currentTIme = Math.floor((Date.now() - timeStart) / 1000);
                setTimeElapsed(currentTIme)
            }
        }
        return () => clearInterval(timer);

    }, [timeStart])

    useEffect(() => {
        if (listSelected.length > bestScore && bestScore <= animes.length) {
            setBestScore(listSelected.length)
            setBestTime(timeElapsed)
        }

    }, [currentId])


    function handleOnClick(id) {

        //only run when click
        if (listSelected.length == 0) {
            setTimeStart(new Date());
        }

        let newOrder = getListRandomN();
        let animesReorder = [];
        for (let i = 0; i < animes.length; i++) {
            animesReorder[newOrder[i]] = animes[i]
        }
        setAnimes(animesReorder)

        //wrong election
        if (listSelected.includes(id)) {
            setListSelected([])
            setTimeStart(new Date());

            if (timeElapsed < bestTime && listSelected.length > bestScore) {
                setBestTime(timeElapsed);
            }
        } else {
            setListSelected([...listSelected, id])
        }
        setCurrentId(id);
    }



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
                let random = Math.floor(Math.random()* infoObj.data.length)
                console.log(random);
                
                return infoObj.data[random].attributes;
            }))
            return responses;
        }
        fetchUrl(listNames).then(res => setAnimes(res));

    }, [])

    return (
        <div>
            <div className="dataInfo d-flex justify-content-around p-2 align-items-center text-warning bg-dark mb-2 ">
                <h1>Card Memory Game</h1>
                <h6>Click all, do not repeat!</h6>
                <h4>Time: {timeElapsed}</h4>
                <h4>score: {listSelected.length}</h4>
                <h4>Best: {bestScore}</h4>
                <h4>Best Time: {bestTime}s</h4>
            </div>
            <div className="containerCards">
                {animes.map(anime => {
                    return (
                        <CardComp
                            key={anime.slug}
                            url={anime.posterImage.small}
                            title={anime.canonicalTitle}
                            handlerClick={handleOnClick} >
                        </CardComp>
                    )
                })}
            </div>
        </div>
    )
}
export default Game