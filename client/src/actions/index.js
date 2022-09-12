import axios from "axios"

export function getPokemons(){
    return async function(dispatch){
        var json = await axios.get("/pokemons", {
           
        })
        return dispatch({
            type:"GET_POKEMONS",
            payload: json.data
        })
}
}   

export function getTypes(){
    return async function(dispatch){
        var json = await axios.get("/types", {
            
        })
        return dispatch({
            type:"GET_TYPES",
            payload: json.data
        })
}
} 

export function postPokemon(payload){
    return async function(dispatch){
        var json = await axios.post("/pokemons", payload)
        return json
}
} 

export const filterPokemonByType = (payload) => {
    return {
        type: "FILTER_BY_TYPE",
        payload
    };
}
    export const filterPokemonByDb = (payload) => {
        return {
            type: "FILTER_BY_DB",
            payload
        };
};

export const orderName= (payload) => {
    return {
        type: "ORDER_NAME",
        payload
    };
};

export const detail= (id)=>{
return async function (dispatch){
    try {
        var json = await axios.get("/pokemons/" + id)
        return dispatch({
            type:"DETAIL",
            payload: json.data
        })
    } catch (error) {
        console.log(error)
    }
}
}



export const searchBar= (payload) => {
    return async function (dispatch){
        try {
            var json = await axios.get("http://localhost:3001/pokemons?name=" + payload)
            return dispatch({
                type:"SEARCH",
                payload: json.data
            })
        } catch (error) {
            return dispatch({
                type:"SEARCH",
                payload: error
            })
        }
    }
};

