import { useEffect, useState } from "react";
import axios from 'axios';

//img api
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg

//pokemon api
// https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20

export default function PokemonApp(){
    const [data, setdata] = useState([]);
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon')
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();

    //changeUrlPrev
    const changeUrlPrev = ()=>{
        setUrl(prevUrl)
    }
    //changeUrlPrev
    const changeUrlNext = ()=>{
        setUrl(nextUrl)
    }

    const fetchPokemonId = (items)=>{
        const promises =  items.map(async(ele)=>{
            const res = await axios.get(ele.url);
            return { ...ele, id : res.data.id}
        })
        return Promise.all(promises);
    }


    async function fetchPokemonData(){
        const responseData = await axios.get(url);
        fetchPokemonId(responseData.data.results).then((values)=>{
            setdata(values)
        })
        setNextUrl(responseData.data.next)
        setPrevUrl(responseData.data.previous)
    }
    
    useEffect(()=>{
        fetchPokemonData()
    },[url])

    return(
        <div className="container">
            <div className="pokemonContainer">
            {
                data.map((ele,i)=>{
                    return(<div key={i} className="pokemonBlock">
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ele.id}.svg`} alt="" />
                        <p>{ele.name}</p>
                    </div>)
                })
            }
            </div>
            <div className="btn-grp">
            <button onClick={changeUrlPrev}>Previous</button>
            <button onClick={changeUrlNext}>Next</button>
            </div>
        </div>
    )

}