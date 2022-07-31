import React from "react";
import { useEffect, useState } from "react";
import { Link,useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../../actions";
import { useDispatch, useSelector} from "react-redux"
import {landingImg} from "../imagenes/imagenes"
import styles from './PokemonCreate.module.css'
 import validate from "./validation";     


export default function PokemonCreate(){
    const dispatch= useDispatch()
    const types = useSelector((state=> state.types))
const history = useHistory()
const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
    health: "",
    attack: "",
    defense:"",
    velocity:"",
    height:"",
    weight:"",
    type: [],
    img: ""
    })

    function handleSubmit(e){
        e.preventDefault()
        if (
            !errors.name &&
            !errors.hp &&
            !errors.attack &&
            !errors.defense &&
            !errors.speed &&
            !errors.height &&
            !errors.weight &&
            !errors.img  &&
            input.name !== "" &&
            input.type[0] !== undefined
        ) {
        
        
        dispatch(postPokemon(input))  
        alert("pokemon creado correctamente!!")
        setInput({
            name: "",
            health: "",
            attack: "",
            defense:"",
            velocity:"",
            height:"",
            weight:"",
            type: [],
            img: ""
        })    
        history.push("/home")
    }
    else{alert("Alguno de los campos es incorrecto")}
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }
    var valid=0
    function handleSelect(e){
     
        if(input.type.length < 2)
        {
            valid = valid + 1
            setInput({
                ...input,
               type: [...input.type, e.target.value]
            })
            setErrors(validate({
                ...input,
                type: [...input.type, e.target.value]
            }))
        }
        
    }
    function handleDelete(e){
        valid = valid - 1
        setInput({
            ...input,
            type: input.type.filter(a=>a!==e)
        })
        setErrors(validate({
            ...input,
            type: input.type.filter(a=>a!==e)
        }))
        
    }
    useEffect(()=> {
        dispatch(getTypes())
}, [])


return(
    <div  className={styles.bg}>
      
        
      
<form onSubmit={(e)=>handleSubmit(e)} className={styles.pokedex}>

<div className={styles.glass}>
<h1>Crea tu propio Pokemon</h1>
<link rel="preconnect" href="https://fonts.googleapis.com"></link>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
<link href="https://fonts.googleapis.com/css2?family=Hammersmith+One&display=swap" rel="stylesheet"></link>
<img src={landingImg} className={styles.image} alt="no encontre la imagen" ></img>
<div className={styles.c1}>
    <div className={styles.a}>
    <h3>Nombre: </h3>
    <input className={styles.ord} type="text" value={input.name} name ="name" onChange={handleChange}/>
   {console.log(input.type)}
    </div>
    <div className={styles.a}>
    <h3>Vida:</h3>
    <input className={styles.ord} type="number" value={input.health} onChange={handleChange} name ="health" />
    
    
    </div>
    <div className={styles.a}>
    <h3>Ataque: </h3>
    <input className={styles.ord} type="number" value={input.attack} onChange={handleChange} name ="attack" />
    
    </div>
    <div className={styles.a}>
    <h3>Defensa:</h3>
    <input className={styles.ord} type="number" value={input.defense} onChange={handleChange} name ="defense" />
    
    </div>
</div>
<div className={styles.c2}>
    <div className={styles.a}>
    <h3>Velocidad:</h3>
    <input className={styles.ord} type="number" value={input.velocity} onChange={handleChange} name ="velocity" />
    
    </div>
    <div className={styles.a}>
    <h3>Altura:</h3>
    <input className={styles.ord} type="number" value={input.height} onChange={handleChange} name ="height" />
   
    </div>
    <div className= {styles.a}>
    <h3>Peso:</h3>
    <input className={styles.ord} type="number" value={input.weight} onChange={handleChange} name ="weight" />
    
    </div>
    <div className= {styles.a}>
    <h3>Imagen:</h3>
    <input className={styles.ord} placeholder="URL imagen" type="text" value={input.img} name ="img" onChange={handleChange}/>
    
    </div>
    </div>
   <div>
    <div className={styles.submit} >
    <div className={styles.types}> 
    
    <select onChange={handleSelect} className={styles.ord}>
   
        {types.map((e) => (            
            <option value = {e.name}>{e.name}</option>
        ) )}
       
    </select>
    </div>
    <h4 className={styles.h4type}>Selecciona el tipo de pokemon:</h4>
    <h5 className={styles.h5type}>Recuerda que solo puedes elegir 2 tipos</h5>
    <button type="submit"  className={styles.button}>Crear Pokemon</button>
<Link to= "/home"><button className={styles.button1}>Volver a inicio</button></Link>


</div>

</div>
{Object.entries(errors).length !== 0 ?

<div >
<p className={errors.name ? styles.errors : styles.errors1}>{errors.name}</p>
<p className={errors.health? styles.errors : styles.errors1}>{errors.health}</p>
<p className={errors.defense ? styles.errors : styles.errors1}>{errors.defense}</p>
<p className={errors.attack ? styles.errors : styles.errors1}>{errors.attack}</p>
<p className={errors.img ? styles.errors : styles.errors1}>{errors.img}</p>
<p className={errors.velocity ? styles.errors : styles.errors1}>{errors.velocity}</p>
<p className={errors.height ? styles.errors : styles.errors1}>{errors.height}</p>
<p className={errors.weight ? styles.errors : styles.errors1}>{errors.weight}</p>
<p className={errors.type ? styles.errors : styles.errors1}>{errors.type}</p>
</div>:
<div className={styles.errors1}></div>
}

</div>
</form>
<div className={styles.classtype}>
<ul><li>{input.type.map(e=>
        <div className={styles.quitcard}>
            <p>{e}</p>
            <button className={styles.button2} onClick={()=>handleDelete(e)}>x</button>
        </div> )}            
        </li></ul>
</div>
        
    </div>
)

}