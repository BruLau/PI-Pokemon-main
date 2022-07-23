const intialState = {
    pokemons : [],
    allPokemons:[]
}

function rootReducer (state = intialState, action){
switch(action.type){
case "GET_POKEMONS":
    return{
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload
    }
    case "FILTER_BY_TYPE":
            let filterType = state.allPokemons;
            
            let typeFiltered = action.payload === 'todos' ? filterType : filterType.filter(e => e.types.some(e => e.name === action.payload));
            console.log(action.payload)
            return {
                ...state,
                pokemons: typeFiltered
            };

    case "FILTER_BY_DB":
        let filterDb = state.allPokemons;
        const filtroDb = action.payload === 'created' ? filterDb.filter(e=> e.createdInDb) : filterDb.filter(e=> !e.createdInDb)
        return{
            ...state,
            pokemons: action.payload === "All" ? state.allPokemons : filtroDb
        }




default: return state;
}
}
export default rootReducer;