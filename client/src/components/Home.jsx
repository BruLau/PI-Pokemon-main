import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux"
import { getPokemons , filterPokemonByType, filterPokemonByDb, orderName} from "../actions";
import {Link} from "react-router-dom"
import PokeCard from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
export default function Home(){
    const dispatch =  useDispatch()
    const allPokemons = useSelector((state)=>state.pokemons)
    const [order, setOrder] = useState("")
    const [currentPage, setcurrentPage] = useState(1);
    const [pokemonPerPage, setpokemonPerPage] = useState(12);
    const indexOfLastPokemon= currentPage * pokemonPerPage
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage
    const currentPokemon = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)
    const paginado = (pageNumber)=> {
        setcurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getPokemons())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault()
        paginado(1)
        dispatch(getPokemons())
    }
    const handleFilterType = (e) => {
        e.preventDefault();
        paginado(1)
        dispatch(filterPokemonByType(e.target.value)); 
        
      };
    const handleFilterDb = (e) => {
        e.preventDefault();
        paginado(1)
        dispatch(filterPokemonByDb(e.target.value)); 
        document.getElementById("input").value = "";
    };
    const handleSort= (e) => {
        e.preventDefault()
        dispatch(orderName(e.target.value));
        paginado(1)
        setOrder(`Ordenado ${e.target.value}`)
        document.getElementById("input").value = "";
    }

    return(
        <div>
            <Link to= "/Pokemon">Crear Pokemon</Link>
            <h1>Pokemon</h1>
            <button onClick={e=>{handleClick(e)}}>
                Volver a cargar todos los pokemons
            </button>
            <div>
                <select placeholder="buscar"  onChange={e => {handleSort(e)}} name="" id="">
                    <option value="ord">ordenar:</option>
                    <option value="asc">ascendente</option>
                    <option value="desc">descendente</option>
                    <option value="may">mayor ataque</option>
                    <option value="men">menos ataque</option>
                </select>
                <select onChange={e => {handleFilterDb(e)}} name="" id="">
                    <option value="all">todos</option>
                    <option value="created">creados</option>
                    <option value="api">existente</option>
                </select>
                <select onChange={e => {handleFilterType(e)}} name="" id="">
                    <option value="todos">todos</option>
                    <option value="normal">normal</option>
                    <option value="fighting">fighting</option>
                    <option value="flying">flying</option>
                    <option value="poison">poison</option>
                    <option value="ground">ground</option>
                    <option value="rock">rock</option>
                    <option value="bug">bug</option>
                    <option value="ghost">ghost</option>
                    <option value="steel">steel</option>
                    <option value="water">water</option>
                    <option value="fire">fire</option>
                    <option value="grass">grass</option>
                    <option value="electric">electric</option>
                    <option value="ice">ice</option>
                    <option value="psychic">psychic</option>
                    <option value="dragon">dragon</option>
                    <option value="dark">dark</option>
                    <option value="fairy">fairy</option>
                    <option value="unknown">unknown</option>
                    <option value="shadow">shadow</option>
                </select>
                <SearchBar></SearchBar>
              <Paginado
                pokemonsPerPage={pokemonPerPage}
                allPokemons={allPokemons.length}
                paginado={paginado}
              />
              
                { currentPokemon?.map((e)=>{
                    return(
                        <fragment>
                            <Link to={"/home/" }>
                            <PokeCard name={ e.name} types={e.types} attack={e.attack} id={e.id}  img={e.img} />
                            </Link>
                        </fragment>
                    )
                })
                }
            </div>
        </div>
    )

}