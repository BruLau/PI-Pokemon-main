import React from "react";

export default function PokeCard({name,types, img}){
    return(
        <div style= {{position: "static"}}>
            <img src= {img} alt="img not found" width="200px" heigth ="250px" /> 
            <h3>{name}</h3>
            <h5>{types?.map((e) => {return (e.name + " ")}) }</h5>
            
        </div>
    )
}