const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('Arroja un error si el nombre es nulo', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('Debería funcionar cuando es un nombre válido', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
      it('no debería funcionar cuando no hay nombre', () => {
        Pokemon.create({ attack: '76' })
        .then(() => done(new Error('Requiere un nombre.')))
        .catch(() => done());
      });
    });    
  });
});
