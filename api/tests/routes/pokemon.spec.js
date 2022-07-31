/* eslint-disable import/no-extraneous-dependencies */
const session = require('supertest-session');
const app = require('../../src/app.js');
const agent = session(app);
  describe('GET /pokemons', () => {
    it('Responde con un status 200 al obtener un listado de los pokemons desde pokeapi', (done) => {
      agent.get('/pokemons').expect(200);
      done();
    }).timeout(5000);
  });

  describe('GET /pokemons/:id', () => {
    it('Responde con un status 200 al obtener el detalle de un pokemon en particular', (done) => {
      agent.get('/pokemons:id').expect(200);
      done();
    }).timeout(2000);
  });

  describe('POST /pokemons', () => {
    it('POST agrega un nuevo pokemon', (done) => {
      agent.post('/pokemons')
      .send({
        name: 'Zaraza',
        hp: '100',
        attack: '120',
        defense: '55',
        speed: '97',
        height: '126',
        weight: '55',
        img: 'https://w7.pngwing.com/pngs/801/726/png-transparent-pokemon-pokeball-nintendo-ball-thumbnail.png'
      })
      .expect(200);
      done();
    }).timeout(3000);
  })

