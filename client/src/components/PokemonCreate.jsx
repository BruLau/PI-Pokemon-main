import React from "react";
import { useEffect, useState } from "react";
import { Link,useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../actions";
import { useDispatch, useSelector} from "react-redux"
      


export default function PokemonCreate(){
    const dispatch= useDispatch()
    const types = useSelector((state=> state.types))
const history = useHistory()
const [errors, setErrors] = useState({
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

    const validate = (input) =>
    {
        let error={}
        if(!input.name)
        {
            error.name ="Se requiere un nombre"
        }
        else if(!input.health)
        {
            error.health="Se requiere indicar la vida"
        }
    }
    
    function handleSubmit(e){
        e.preventDefault()
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

    const handleChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
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
    {console.log(input)}
    {console.log(errors)}
    </div>
    <div>
    <label>Vida:</label>
    <input type="number" value={input.health} onChange={handleChange} name ="health" />
    
    </div>
    <div>
    <label>Ataque:</label>
    <input type="number" value={input.attack} onChange={handleChange} name ="attack" />
    </div>
    <div>
    <label>Defensa:</label>
    <input type="number" value={input.defense} onChange={handleChange} name ="defense" />
    </div>
    <div>
    <label>Velocidad:</label>
    <input type="number" value={input.velocity} onChange={handleChange} name ="velocity" />
    </div>
    <div>
    <label>Altura:</label>
    <input type="number" value={input.height} onChange={handleChange} name ="height" />
    </div>
    <div>
    <label>Peso:</label>
    <input type="number" value={input.weight} onChange={handleChange} name ="weight" />
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
    </div>
    <ul><li>{input.type.map(e=>e + " " )}</li></ul>
<button type="submit"  >Crear Pokemon</button>
</form>

    </div>
)

}