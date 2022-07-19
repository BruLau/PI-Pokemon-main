const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Pokemon, Tipo } = require('../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    try {
        let url = 'https://pokeapi.co/api/v2/pokemon/';
        let pokemons = [];
            let apiInfo = await axios.get(url);
            let ApiUrl = apiInfo.data.results.map(e => {
                return {
                    name: e.name,
                    url: e.url,
                }
            })
            pokemons.push(...ApiUrl);
           
       
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
                vida: pokemon.data.stats[0].base_stat,
                ataque: pokemon.data.stats[1].base_stat,
                defensa: pokemon.data.stats[2].base_stat,
                velocidad: pokemon.data.stats[5].base_stat,
                altura: pokemon.data.height,
                peso: pokemon.data.weight,
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
    Tipo.findOrCreate({
        where:{ name: e.name}
    })
})
const allTypes = await Tipo.findAll()
res.send(allTypes)
})

router.post("/pokemons", async (req,res) =>{
   
    const {name, vida, ataque, defensa, velocidad, altura, peso, createdInDb, tipo} = req.body;

   if(name){
   var pokeCreated = await Pokemon.create({
    name,
    vida,
    ataque,
    defensa,
    velocidad,
    altura,
    peso,
    createdInDb
   })
   let tipoDb= await Tipo.findAll({
    where: {name: tipo}
   })
   pokeCreated.addTipo(tipoDb)
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
