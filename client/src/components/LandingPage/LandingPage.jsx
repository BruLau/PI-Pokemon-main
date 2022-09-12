import React from "react";
import {Link} from "react-router-dom";
import {landingImg, landingCredit} from "../imagenes/imagenes"
import styles from './LandingPage.module.css'


export default function LandingPage(){
    return(
        <div className={styles.bg} >
            <img src={landingImg} className={styles.image} alt="no encontre la imagen" ></img>
         <div>
                <Link to= "/home">
                <button className={styles.button}><div className={styles.intro}></div> </button>
                </Link>
                </div>
            <div>
             <img src={landingCredit} className={styles.imagecredit} alt="no encontre la imagen" ></img>
             </div>
        </div>
    )
}