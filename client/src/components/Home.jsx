import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux"
import { getPokemons } from "../actions";
import {Link} from "react-router-dom"
import PokeCard from "./Card";


export default function Home(){
    const dispatch =  useDispatch()
    const allPokemons = useSelector((state)=>state.pokemons)

    useEffect(()=>{
        dispatch(getPokemons())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault()
        dispatch(getPokemons())
    }

    return(
        <div>
            <Link to= "/Pokemon">Crear Pokemon</Link>
            <h1>Pokemon</h1>
            <button onClick={e=>{handleClick(e)}}>
                Volver a cargar todos los pokemons
            </button>
            <div>
                <select name="" id="">
                    <option value="asc">ascendente</option>
                    <option value="desc">descendente</option>
                </select>
                <select name="" id="">
                    <option value="all">todos</option>
                    <option value="created">creados</option>
                    <option value="api">existente</option>
                </select>
                <select name="" id="">
                    <option value="normal">normal</option>
                    <option value="rock">rock</option>
                    <option value="water">water</option>
                    <option value="ghost">ghost</option>
                    <option value="fire">fire</option>
                    <option value="electric">electric</option>
                </select>
                { allPokemons?.map((e)=>{
                    return(
                        <fragment>
                            <Link to={"/home/" }>
                            <PokeCard name={ e.name} img={ e.img} />
                            </Link>
                        </fragment>
                    )
                })
            
                }
            </div>
        </div>
    )

}