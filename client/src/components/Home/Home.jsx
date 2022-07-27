import React from "react";
import { useEffect, useState } from "react";
import {landingImg} from "../imagenes/imagenes"
import { useDispatch, useSelector} from "react-redux"
import { getPokemons , filterPokemonByType, filterPokemonByDb, orderName, getTypes} from "../../actions";
import {Link} from "react-router-dom"
import PokeCard from "../Card/Card";
import styles from './Home.module.css'
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import Loading from "../Loading/Loading";
export default function Home(){
    const dispatch =  useDispatch()
    const allPokemons = useSelector((state)=>state.pokemons)
    const types = useSelector((state=> state.types))
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
        dispatch(getTypes())
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
        <div className={styles.bg}>
            
             { allPokemons.length > 0 ?
             <div className={styles.pokedex} >
                <img src={landingImg} className={styles.image} alt="no encontre la imagen" ></img>
            <Link to= "/Pokemon">Crear Pokemon</Link>
            <h1>Pokemon</h1>
            <button onClick={e=>{handleClick(e)}}>
                Volver a cargar todos los pokemons
            </button>
            <div className={styles.bgfijo}>
            <h3 className={styles.filtrarh1}>Filtrar por:</h3>
                <div className={styles.filtro}>
                
                <select placeholder="buscar" className={styles.ord} onChange={e => {handleSort(e)}} name="" id="">
                    <option value="ord">ordenar:</option>
                    <option value="asc">ascendente</option>
                    <option value="desc">descendente</option>
                    <option value="may">mayor ataque</option>
                    <option value="men">menos ataque</option>
                </select>
                <select className={styles.created} onChange={e => {handleFilterDb(e)}} name="" id="">
                    <option value="all">todos</option>
                    <option value="created">creados</option>
                    <option value="api">existente</option>
                </select>
                <select className={styles.type} onChange={e => {handleFilterType(e)}} name="" id="">
                    <option value="todos">todos</option>
                        { types.map((e) => (            
                            <option value = {e.name}>{e.name}</option>
                        ) )}
                </select>
                </div>
                <h3 className={styles.buscadorh1}>Buscador:</h3>
                <div className={styles.buscador}>
                <SearchBar></SearchBar>
                </div>
              <Paginado
                pokemonsPerPage={pokemonPerPage}
                allPokemons={allPokemons.length}
                paginado={paginado}
              />
              
                { currentPokemon?.map((e)=>{
                    return(
                        <div className={styles.follow} >
                            <Link to={"/home/" }>
                            <PokeCard name={ e.name} types={e.types} attack={e.attack} id={e.id}  img={e.img} />
                            
                            </Link>
                        </div>
                    )
                })
            }
                </div>
                </div>:
               
                <Loading/>
                
 
        }   
        </div>     
    )
}