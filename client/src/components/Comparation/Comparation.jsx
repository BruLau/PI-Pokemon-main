import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux"
import { landingImg} from "../imagenes/imagenes"
import styles from './Comparation.module.css'
import { getPokemons } from "../../actions";
import PokedexLoading from "../PokedexLoading/PokedexLoading";

export default function Comparation(){

    const allPokemons = useSelector((state)=>state.pokemons)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getPokemons())
    }, [dispatch])

    const [input, setInput] = useState({
        pokemon1:[],
        pokemon2:[]
    })
    function handleOne(e){
        e.preventDefault();
        if(input.pokemon1[0]=== undefined){
            setInput({
                ...input,
                pokemon1: allPokemons.filter(l=> l.name === e.target.value)
            })
        }
        else{
            input.pokemon1.pop()
            setInput({
                ...input,
                pokemon1 :  allPokemons.filter(l=> l.name === e.target.value)
            })
        }
 
    }
    function handleTwo(e){
        e.preventDefault();
        if(input.pokemon2[0]=== undefined){
            setInput({
                ...input,
                pokemon2: allPokemons.filter(l=> l.name === e.target.value)
            })
        }
        else{
            input.pokemon2.pop()
            setInput({
                ...input,
                pokemon2 :  allPokemons.filter(l=> l.name === e.target.value)
            })
        }
   
    }

    return (
        <div className={styles.bg}>
            
            <div className={styles.pokedex}>
            <h2 className={styles.titulo}>Selecciona 2 pokemon:</h2>
             <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
            <link href="https://fonts.googleapis.com/css2?family=Hammersmith+One&display=swap" rel="stylesheet"></link>
            <img src={landingImg} className={styles.image} alt="no encontre la imagen" ></img>
            <div className={styles.glass}>
           
            {   
                <div className={styles.selects}>  
              
                  <select  className={styles.poke1} onChange={e => {handleOne(e)}}  name="" id="">
                    <option value="todos"  disabled selected  >Pokemon 1:</option>
                        { allPokemons.map((e) => (     
                                   
                            <option value = {e.name}>{e.name}</option>
                          
                        ) )}
                </select>
                
                <select className={styles.poke2} onChange={e => {handleTwo(e)}} name="" id="">
                    <option value="todos" disabled selected>Pokemon 2:</option>
                        { allPokemons.map((e) => (            
                            <option value = {e.name}>{e.name}</option>
                        ) )}
                </select>   
               
                </div> 
                  
            }  
            
            <div className={styles.columna}>
            {  input.pokemon1.length ?
                <div className={styles.c1}>
                    <img src ={input.pokemon1[0].img}  className={styles.pokeimage} alt="" width="250px" height="250px"></img>
                    <h1 >{input.pokemon1[0].name}</h1>
                    <div className={styles.info}> 
                    <div className={styles.data1}>
                    <h3 className={input.pokemon2.length && input.pokemon2[0].attack!==input.pokemon1[0].attack ? input.pokemon2[0].attack>input.pokemon1[0].attack ?styles.per : styles.vic: styles.none}>Ataque: {input.pokemon1[0].attack} </h3>
                    <h3 className={input.pokemon2.length && input.pokemon2[0].defense!==input.pokemon1[0].defense ? input.pokemon2[0].defense>input.pokemon1[0].defense ?styles.per : styles.vic: styles.none}>Defensa: {input.pokemon1[0].defense}</h3>
                    <h3 className={input.pokemon2.length && input.pokemon2[0].velocity!==input.pokemon1[0].velocity ? input.pokemon2[0].velocity>input.pokemon1[0].velocity?styles.per : styles.vic: styles.none}>Velocidad: {input.pokemon1[0].velocity}</h3>
                    
                    </div>
                    <div className={styles.data2}>
                    <h3 className={input.pokemon2.length && input.pokemon2[0].health!==input.pokemon1[0].health ? input.pokemon2[0].health>input.pokemon1[0].health ?styles.per : styles.vic: styles.none}>Vida: {input.pokemon1[0].health}</h3>
                    <h3 className={input.pokemon2.length && input.pokemon2[0].height!==input.pokemon1[0].height ? input.pokemon2[0].height>input.pokemon1[0].height ?styles.per : styles.vic: styles.none}>Altura: {(input.pokemon1[0].height)/10}m</h3>
                    <h3 className={input.pokemon2.length && input.pokemon2[0].weight!==input.pokemon1[0].weight ? input.pokemon2[0].weight>input.pokemon1[0].weight ?styles.per : styles.vic: styles.none}>Peso: {input.pokemon1[0].weight}g</h3>
                    </div>
                    </div>
                    <h3>Tipos: {input.pokemon1[0].types.map(e=>e.name+ " ")} </h3>
                    
                </div>:
                <div></div>
            }
           
             {  input.pokemon2.length ?
                <div  className={styles.c2}>
                    <img src ={input.pokemon2[0].img}  className={styles.pokeimage} alt="" width="250px" height="250px"></img>
                    <h1>{input.pokemon2[0].name}</h1>
                    <div className={styles.info}> 
                    <div className={styles.data1}>
                    <h3 className={input.pokemon1.length && input.pokemon2[0].attack!==input.pokemon1[0].attack ? input.pokemon2[0].attack<input.pokemon1[0].attack ?styles.per : styles.vic: styles.none}>Ataque: {input.pokemon2[0].attack} </h3>
                    <h3 className={input.pokemon1.length && input.pokemon2[0].defense!==input.pokemon1[0].defense ? input.pokemon2[0].defense<input.pokemon1[0].defense ?styles.per : styles.vic: styles.none}>Defensa: {input.pokemon2[0].defense}</h3>
                    <h3 className={input.pokemon1.length && input.pokemon2[0].velocity!==input.pokemon1[0].velocity ? input.pokemon2[0].velocity<input.pokemon1[0].velocity?styles.per : styles.vic: styles.none}>Velocidad: {input.pokemon2[0].velocity}</h3>
                    
                    </div>
                    <div>
                    <h3 className={input.pokemon1.length && input.pokemon2[0].health!==input.pokemon1[0].health ? input.pokemon2[0].health<input.pokemon1[0].health ?styles.per : styles.vic: styles.none}>Vida: {input.pokemon2[0].health}</h3>
                    <h3 className={input.pokemon1.length && input.pokemon2[0].height!==input.pokemon1[0].height ? input.pokemon2[0].height<input.pokemon1[0].height ?styles.per : styles.vic: styles.none}>Altura: {(input.pokemon2[0].height)/10}m</h3>
                    <h3 className={input.pokemon1.length && input.pokemon2[0].weight!==input.pokemon1[0].weight ? input.pokemon2[0].weight<input.pokemon1[0].weight ?styles.per : styles.vic: styles.none}>Peso: {input.pokemon2[0].weight}g</h3>
                    </div>
                    </div>
                    <h3>Tipos: {input.pokemon2[0].types.map(e=>e.name+ " ")} </h3>
                    
                </div>:
                <div></div>
            }
            </div>
            
            <h1  className={ input.pokemon2.length >0 && input.pokemon1.length >0 ? styles.vs : styles.v1}>VS</h1>
        </div>
        <Link to= "/home">
                    <button className={styles.button}>Volver a inicio</button>
                    </Link>
        </div>
        </div>
    )
}