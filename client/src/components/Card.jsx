import React from "react";

export default function PokeCard({name, img}){
    return(
        <div>
            <h3>{name}</h3>
            
            <img src= {img} alt="img not found" width="200px" heigth ="250px" /> 
        </div>
    )
}