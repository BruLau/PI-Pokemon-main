import React from "react";
import styles from './Paginado.module.css'

export default function Paginado ({ pokemonsPerPage, allPokemons, paginado }){
    const numeroPagina =[]

    for(let i=1; i<=Math.ceil(allPokemons/pokemonsPerPage); i++)
    {
        numeroPagina.push(i)
    }

    return(
        <div className={styles.paginado}>
        <nav >
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
<link href="https://fonts.googleapis.com/css2?family=Hammersmith+One&display=swap" rel="stylesheet"></link> 
            <ul >
            <div className={styles.borde}>
               {numeroPagina && 
                numeroPagina.map(numero =>(
                    
                    <li  key={numero} >
                    
                    <a onClick={()=> paginado(numero)}>{numero}</a>
                    
                    </li>
                   
                ))} 
                </div>
            </ul>
        </nav>
        </div>
    )
}
