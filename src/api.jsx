import { useEffect, useState } from "react";

function FetchData({ animeObj }) {
    const [animes, setAnimes] = useState([]);
    const [selectIndex, setSelectedIndex] = useState([]);

    function handleOnClick(e) {
        //    console.log(e.target);
        console.log(animes);

    }

    useEffect(() => {
        async function fetchUrl(name) {

            let url = `https://kitsu.io/api/edge/anime?filter[text]=${name}`;

            try {
                let rawData = await fetch(url, { mode: "cors" });
                let infoObj = await rawData.json();
                // let newLinkImg = infoObj.data[0].attributes.posterImage.large;
                let attributesAnime = infoObj.data[0].attributes;

                setAnimes([
                    ...animes,
                    attributesAnime
                ])

            } catch (error) {
                console.error("Error fetching JSON data:", error);
            }
        }

        fetchUrl(animeObj)

    }, [])

    // useEffect(() => {
    //     if (animes.length == 10) {
    //         console.log(animes);
    //     }
    // }, [])

    return (
        <>
            {console.log(animes)}
            {animes.map(anime => {
                return (
                    <li key={anime.youtubeVideoId} onClick={(e) => handleOnClick(e)}>
                        {/* {console.log(animes)} */}
                        <img src={anime.posterImage.large}></img>
                        {anime.slug}</li>
                )
            })}
        </>
    )
}
export default FetchData