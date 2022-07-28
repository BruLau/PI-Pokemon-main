import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux"
import { landingImg} from "../imagenes/imagenes"
import styles from './Detail.module.css'
import { detail } from "../../actions";
import PokedexLoading from "../PokedexLoading/PokedexLoading";
export default function Detail(props){
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(detail(props.match.params.id))
        console.log(props.match.params.id)
    },[dispatch])
    

    const pokemon = useSelector((state)=> state.detail)

    function handleBack(e){
        pokemon.pop()
    }
    return (
        <div>
             <link rel="preconnect" href="https://fonts.googleapis.com"></link>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
<link href="https://fonts.googleapis.com/css2?family=Hammersmith+One&display=swap" rel="stylesheet"></link>
            {
                pokemon.length>0 ?
                <div className={styles.bg}>
                    <div className={styles.pokedex} >
                    <div className={styles.glass}>
                    <img src={landingImg} className={styles.image} alt="no encontre la imagen" ></img>
                    
                    <h1>{pokemon[0].name}</h1>
                    <img src ={pokemon[0].img}  className={styles.pokeimage} alt="" width="300px" height="300px"></img>
                    <div className={styles.info}> 
                    <h3>Ataque: {pokemon[0].attack} </h3>
                    <h3>Defensa: {pokemon[0].defense}</h3>
                    <h3>Velocidad: {pokemon[0].velocity}</h3>
                    <h3>Altura: {(pokemon[0].height)/10}m</h3>
                    <h3>Peso: {pokemon[0].weight}g</h3>
                    <h3>Tipos: {pokemon[0].types.map(e=>e.name+ " ")} </h3>
                    </div>
                    {console.log(pokemon)}
                    <Link to= "/home">
                <button className={styles.button} onClick={handleBack}>Volver a inicio</button>
            </Link>
          </div>
          </div>
         
                </div>:
                <div>
                <PokedexLoading></PokedexLoading>
                     </div>
            }
          
        </div>
    )
}