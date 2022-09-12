import React from "react";
import { NavLink } from "react-router-dom";
import styles from './Card.module.css'
export default function PokeCard({id, name,types, attack, img}){
    return(
        <NavLink to={`/pokemon/${id}`} className={styles.navlink}>
        <div className={styles.card} >
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
            <link href="https://fonts.googleapis.com/css2?family=Hammersmith+One&display=swap" rel="stylesheet"></link>
            <div>
            <img className={styles.img} src= {img} alt="img not found" width="200px" height ="250px" /> 
            <h3 className={styles.h3}>{name}</h3>
            <h5 className={styles.h5}>{types?.map((e) => {return (e.name + " ")}) } {attack} </h5>
            </div>
        </div>
        </NavLink>
    )
}