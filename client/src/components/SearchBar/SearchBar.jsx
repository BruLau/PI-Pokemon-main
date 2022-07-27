import React from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { searchBar } from "../../actions";
import styles from './SearchBar.module.css'
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
    <div className={styles.form}>
        <input type="text" placeholder="" className={styles.input} id="input" onChange={(e)=>handleInputChange(e)}/>
        <button type="submit"  className={styles.button} onClick={(e)=> handleInputSubmit(e)}>Buscar</button>
       
    </div>
)
}