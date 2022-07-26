import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux"
import { detail } from "../actions";

export default function Detail(props){
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(detail(props.match.params.id))
        console.log(props.match.params.id)
    },[dispatch])

    const pokemon = useSelector((state)=> state.detail)

    return (
        <div>
            {
                pokemon.length>0 ?
                <div>
                    <h1>{pokemon[0].name}</h1>
                    <img src ={pokemon[0].img} alt="" width="400px" height="400px"></img>
                    <h3>Ataque: {pokemon[0].attack}</h3>
                    <h3>Defensa: {pokemon[0].defense}</h3>
                    <h3>Velocidad: {pokemon[0].velocity}</h3>
                    <h3>Altura: {pokemon[0].height}</h3>
                    <h3>Peso: {pokemon[0].weight}</h3>
                    <h4>Tipos: {pokemon[0].types.map(e=>e.name+ " ")} </h4>
                </div>:
                <p>Loading...</p>
            }
            <Link to= "/home">
                <button>Volver a inicio</button>
            </Link>
        </div>
    )
}