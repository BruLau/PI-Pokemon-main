import React from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { searchBar } from "../../actions";

export default function SearchBar(){
    const dispatch = useDispatch()
const [name, setName] = useState("")

function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
    
}
function handleInputSubmit(e){
    e.preventDefault()
    dispatch(searchBar(name))
    
}

return(
    <div>
        <input type="text" placeholder="buscar" id="input" onChange={(e)=>handleInputChange(e)}/>
        <button type="submit" onClick={(e)=> handleInputSubmit(e)}>Buscar</button>
       
    </div>
)
}