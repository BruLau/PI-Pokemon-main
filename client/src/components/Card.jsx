import React from "react";
import { NavLink } from "react-router-dom";

export default function PokeCard({id, name,types, attack, img}){
    return(
        <NavLink to={`/pokemon/${id}`}>
        <div style= {{position: "static"}}>
            <img src= {img} alt="img not found" width="200px" heigth ="250px" /> 
            <h3>{name}</h3>
            <h5>{types?.map((e) => {return (e.name + " ")}) } {attack} </h5>
           
        </div>
        </NavLink>
    )
}