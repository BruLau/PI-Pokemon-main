import React from "react";
export default function Paginado ({ pokemonsPerPage, allPokemons, paginado }){
    const numeroPagina =[]

    for(let i=1; i<=Math.ceil(allPokemons/pokemonsPerPage); i++)
    {
        numeroPagina.push(i)
    }

    return(
        <nav>
            <ul className="paginado">
               {numeroPagina && 
                numeroPagina.map(numero =>(
                    <li className="numero" key={numero} >
                    <a onClick={()=> paginado(numero)}>{numero}</a>
                    </li>
                ))} 
            </ul>
        </nav>
    )
}
