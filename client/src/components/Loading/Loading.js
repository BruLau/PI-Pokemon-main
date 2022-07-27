import React from "react";
import {gif, cagandoimg} from "../imagenes/imagenes"
import styles from './Loading.module.css'

export default function Loading(){
    return(
        <div className={styles.bg} >
         
         <img src={gif} className={styles.gif} alt="no encontre la imagen" ></img>
         <div>
             <img src={cagandoimg} className={styles.loading} alt="no encontre la imagen" ></img>
             </div>
        </div>
    )
}