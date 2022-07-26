import React from "react";
import { useEffect, useState } from "react";
import { Link,useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../../actions";
import { useDispatch, useSelector} from "react-redux"
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
            input.name !== ""
        ) {
        console.log(input)
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
    function handleSelect(e){
        if(input.type.length < 2)
        {
            setInput({
                ...input,
               type: [...input.type, e.target.value]
            })
        }
        
    }
    function handleDelete(e){
        setInput({
            ...input,
            type: input.type.filter(a=>a!==e)
        })
    }
    useEffect(()=> {
        dispatch(getTypes())
}, [])


return(
    <div>
        <Link to= "/home"><button>Volver a inicio</button></Link>
        <h1>Crea tu propio Pokemon</h1>
<form onSubmit={(e)=>handleSubmit(e)}>
    <div>
    <label>Nombre:</label>
    <input type="text" value={input.name} name ="name" onChange={handleChange}/>
        <p className='error-input'>{errors.name}</p>
    </div>
    <div>
    <label>Vida:</label>
    <input type="number" value={input.health} onChange={handleChange} name ="health" />
    <p className='error-input'>{errors.health}</p>
    
    </div>
    <div>
    <label>Ataque:</label>
    <input type="number" value={input.attack} onChange={handleChange} name ="attack" />
    <p className='error-input'>{errors.attack}</p>
    </div>
    <div>
    <label>Defensa:</label>
    <input type="number" value={input.defense} onChange={handleChange} name ="defense" />
    <p className='error-input'>{errors.defense}</p>
    </div>
    <div>
    <label>Velocidad:</label>
    <input type="number" value={input.velocity} onChange={handleChange} name ="velocity" />
    <p className='error-input'>{errors.velocity}</p>
    </div>
    <div>
    <label>Altura:</label>
    <input type="number" value={input.height} onChange={handleChange} name ="height" />
    <p className='error-input'>{errors.height}</p>
    </div>
    <div>
    <label>Peso:</label>
    <input type="number" value={input.weight} onChange={handleChange} name ="weight" />
    <p className='error-input'>{errors.weight}</p>
    </div>
    <div>
    <select onChange={handleSelect}>
        {types.map((e) => (            
            <option value = {e.name}>{e.name}</option>
        ) )}
    </select>
    </div>
    <div>
    <label>Imagen:</label>
    <input type="text" value={input.img} name ="img" onChange={handleChange}/>
    <p className='error-input'>{errors.img}</p>
    </div>
    
<button type="submit"  >Crear Pokemon</button>
</form>

<ul><li>{input.type.map(e=>
        <div>
            <p>{e}</p>
            <button onClick={()=>handleDelete(e)}>x</button>
        </div> )}            
        </li></ul>


    </div>
)

}