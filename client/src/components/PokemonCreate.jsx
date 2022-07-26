import React from "react";
import { useEffect, useState } from "react";
import { Link,useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../actions";
import { useDispatch, useSelector} from "react-redux"
      


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

    const validate = (input) =>
    {
        let noEmpty = /\S+/;
        let validateName = /^[a-z]+$/i;
        let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;
        let errors={}
        if(!noEmpty.test(input.name))
        {
            errors.name ="Se requiere un nombre"
        }
        else if( input.name.length < 3){
            errors.name ="El nombre debe tener como minimo 3 caracteres"
        }
        else if(!validateName.test(input.name)){
            errors.name ="El nombre no puede contener numeros"
        }
        else if (!input.health ) {
            errors.health = "Debes completar este campo";
        }
        else if(parseInt(input.health) < 1){
            errors.health = "Debe ser mayor a 1";
        }
        else if (!input.attack ) {
            errors.attack = "Debes completar este campo";
        }
        else if(parseInt(input.attack) < 1){
            errors.attack= "Debe ser mayor a 1";
        }
        else if (!input.defense ) {
            errors.defense = "Debes completar este campo";
        }
        else if(parseInt(input.defense) < 1){
            errors.defense = "Debe ser mayor a 1";
        }
        else if (!input.velocity) {
            errors.velocity = "Debes completar este campo";
        }
        else if(parseInt(input.velocity) < 1){
            errors.velocity = "Debe ser mayor a 1";
        }
        else if (!input.height ) {
            errors.height = "Debes completar este campo";
        }
        else if(parseInt(input.height) < 1){
            errors.height = "Debe ser mayor a 1";
        }
        else if (!input.weight ) {
            errors.weight = "Debes completar este campo";
        }
        else if(parseInt(input.weight) < 1){
            errors.weight = "Debe ser mayor a 1";
        }
        else if(!input.img){
            errors.img = "Se requiere una URL"
        }
        else if(!validateUrl.test(input.img)){
            errors.img = "Debe ser una URL valida ";
        }



        return errors
    }
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
            !errors.img 
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
    <ul><li>{input.type.map(e=>e + " " )}</li></ul>
<button type="submit"  >Crear Pokemon</button>
</form>

    </div>
)

}