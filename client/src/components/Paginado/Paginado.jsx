import React from "react";
import styles from './Paginado.module.css'

export default function Paginado ({ pokemonsPerPage, allPokemons, paginado }){
    const numeroPagina =[]

    for(let i=1; i<=Math.ceil(allPokemons/pokemonsPerPage); i++)
    {
        numeroPagina.push(i)
    }

    return(
        <nav className={styles.paginado}>
            
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
    )
}
