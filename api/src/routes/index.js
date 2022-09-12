const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Pokemon, Types } = require('../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getApiInfo = async () => {
    try {
        let url = 'https://pokeapi.co/api/v2/pokemon/';
        let pokemons = [];
        do {
            let apiInfo = await axios.get(url);
            let ApiUrl = apiInfo.data.results.map(e => {
                return {
                    name: e.name,
                    url: e.url,
                }
            })
            pokemons.push(...ApiUrl);
            url = apiInfo.data.next;
        } while (url != null && pokemons.length < 40);
           
       
        let pokeInfo = await Promise.all(pokemons.map(async e => {
            let pokemon = await axios.get(e.url);
            return {
                id: pokemon.data.id,
                name: pokemon.data.name,
                img: pokemon.data.sprites.other.home.front_default,
                types: pokemon.data.types.map(e => {
                    return ({
                        name: e.type.name,
                       
                    })
                }),
                health: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                velocity: pokemon.data.stats[5].base_stat,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
            }
        }));
       
        return pokeInfo;
    } catch (e) {
        console.log(e);
    };
};


const getDbInfo = async () => {
    return await Pokemon.findAll({
        include: {
            model: Types,
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
        let pokemonName = await pokemonTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        pokemonName.length ?
        res.status(200).send(pokemonName) :
        res.status(404).send("No existe ese pokemon")
    }
    else{
        res.status(200).send(pokemonTotal)
    }
})


router.get("/types", async (req,res) =>{
    const typeApi = await axios.get("https://pokeapi.co/api/v2/type")
    typeApi.data.results.map(e=> {
    Types.findOrCreate({
        where:{ name: e.name}
    })
})
const allTypes = await Types.findAll()
res.send(allTypes)
})


router.post("/pokemons", async (req,res) =>{
   
    const {name, health, attack, defense, velocity, height, weight, createdInDb, img, type} = req.body;

   if(name){
   var pokeCreated = await Pokemon.create({
    name,
    health,
    attack,
    defense,
    velocity,
    height,
    weight,
    createdInDb,
    img
   })
   let typeDb= await Types.findAll({
    where: {name: type}
   })
   pokeCreated.addTypes(typeDb)
   res.send("Pokemon creado con exito")
}

if(!name) return res.status(404).send('Falta el nombre');

})


router.get("/pokemons/:id", async (req,res) =>{
    let {id}= req.params
    let pokemonTotal = await getAllPokemons();
    if(id){
        let pokemonName = await pokemonTotal.filter(e => e.id== id)
        pokemonName ?
        res.status(200).send(pokemonName) :
        res.status(404).send("No existe ese pokemon")
    }
    
})


module.exports = router;
