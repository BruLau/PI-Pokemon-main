const request = require("supertest");
const app = require("../../src/app.js");
const { Pokemon } = require("../../src/db.js");
const { expect } = require('chai');

describe("Base de datos", () => {
  beforeEach(() => Pokemon.sync({ force: false }));
  it('Deberia crear un pokemon si se le pasa toda la información correcta', async () =>{
    const newPokemon = await Pokemon.create({name: 'poketest', health:100, attack:100, 
      defense:100, velocity:100, height:100, weight:100,img:"https://www.pngmart.com/files/13/Mewtwo-Download-PNG-Image.png"})
      expect(newPokemon.toJSON()).to.have.property('name','poketest')
      expect(newPokemon.toJSON()).to.have.property('health',100)
      expect(newPokemon.toJSON()).to.have.property('attack',100)
      expect(newPokemon.toJSON()).to.have.property('defense',100)
      expect(newPokemon.toJSON()).to.have.property('velocity',100)
      expect(newPokemon.toJSON()).to.have.property('height',100)
      expect(newPokemon.toJSON()).to.have.property('weight',100)
      expect(newPokemon.toJSON()).to.have.property('img',"https://www.pngmart.com/files/13/Mewtwo-Download-PNG-Image.png")
  })


  it("No deberia crear un pokemon si faltan campos obligatorios", () => {
    return request(app)
      .post("/pokemons")
      .send({
        img: "https://www.pngmart.com/files/13/Mewtwo-Download-PNG-Image.png",
        type: ["fire"],
        health: 20,
        attack: 50,
        defense: 30,
        velocity: 10,
        height: 30,
        weight: 90,
      })
      .expect(404);
  });
});