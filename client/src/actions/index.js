import axios from "axios"

export function getPokemons(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/pokemons", {
            
        })
        return dispatch({
            type:"GET_POKEMONS",
            payload: json.data
        })
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