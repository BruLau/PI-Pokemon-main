const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Pokemon, Tipo } = require('../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () =>{
    const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon")
    const apiInfo = await apiUrl.data.results.map(async e => {
    const img = await axios.get(e.url)
        return {
            name: e.name, 
            url: img
        }
    })
    return apiInfo;
}

const getDbInfo = async () => {
    return await Pokemon.findAll({
        include: {
            model: Tipo,
            attributes: ["name"],
            through:{
                attributes: [],
            }
        }
    })
}

const getAllPokemons = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo)
    return infoTotal;
}

router.get("/pokemons", async (req,res) =>{
    const name= req.query.name
    let pokemonTotal = await getAllPokemons();
    if(name){
        let pokemonName = await pokemonTotal.filter(e => e.name.toLower().Caseincludes(name.toLowerCase()))
        pokemonName.length ?
        res.status(200).send(pokemonName) :
        res.status(404).send("No existe ese pokemon")
    }
    else{
        res.status(200).send(pokemonTotal)
    }
})


module.exports = router;
