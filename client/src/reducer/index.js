const intialState = {
    pokemons : [],
    allPokemons:[],
    types:[],
    detail:[],
    comparation: []
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
            
            return {
                ...state,
                pokemons: typeFiltered
            };

    case "FILTER_BY_DB":
        let filterDb = state.allPokemons;
        let filtroDb 
        if(action.payload === 'created'){filtroDb = filterDb.filter(e=> e.createdInDb && e.name !== "poketest") }
        else if(action.payload === 'api'){ filtroDb = filterDb.filter(e=> !e.createdInDb)}
        else if(action.payload === 'all'){ filtroDb = filterDb.filter(e=> e.name !== "poketest")}
        return{
            ...state,
            pokemons: filtroDb
        }
    
        case "ORDER_NAME":
            
        let arrOrd
        if(action.payload === "asc" ){
        arrOrd = state.pokemons.sort((a,b)=>{
            
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return 1;
            }
            if(a.name.toLowerCase() < b.name.toLowerCase()){
                return -1;
            } 
            return 0;
        }) }
        else if(action.payload === "desc"){
        arrOrd =  state.pokemons.sort((a,b)=>{
            if(a.name.toLowerCase() < b.name.toLowerCase()){
                return 1;
            }
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return -1;
            } 
            return 0;
        })}
        else if(action.payload === "may"){
            arrOrd =  state.pokemons.sort((a,b)=>{
                if(a.attack < b.attack){
                    return 1;
                }
                if(a.attack > b.attack){
                    return -1;
                } 
                return 0;
            })}

        else if(action.payload === "men"){
            arrOrd =  state.pokemons.sort((a,b)=>{
                if(a.attack > b.attack){
                    return 1;
                }
                if(a.attack < b.attack){
                    return -1;
                } 
                return 0;
            })}
        
        return{
            ...state,
            pokemons: arrOrd
        }
              
        case "SEARCH":
            let validSearch = action.payload
            if(Array.isArray(validSearch))
            {
            return{
                ...state,
                pokemons: action.payload
            }
            }
            else{
                alert("No existe un pokemon con ese nombre")
                return{
                    ...state,
                    pokemons: state.pokemons
                }
            }

      case "POST_POKEMON":
        return{
            ...state
        }
        case "DETAIL":
            return{
                ...state,
                detail: action.payload
            }

      case "GET_TYPES":
      return{
        ...state,
        types: action.payload
      }







default: return state;
}
}
export default rootReducer;