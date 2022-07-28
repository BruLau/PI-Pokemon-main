
import {landingImg, cagandoimg, gif} from "../imagenes/imagenes"
import styles from './PokedexLoading.module.css'
export default function PokedexLoading(){
    return(
        
        <div className={styles.bg}>
            <div className={styles.pokedex} >
                <img src={landingImg} className={styles.image} alt="no encontre la imagen" ></img>

                        <div className={styles.center} >
                            <div className={styles.follow}>
                        <img src={gif} className={styles.gif} alt="no encontre la imagen" ></img>
                        </div>
                        <div className={styles.follow2}>
                        <img src={cagandoimg} className={styles.loading} alt="no encontre la imagen" ></img>
                        </div>
                        </div>
                        
            </div>  
        </div>  
    )
}