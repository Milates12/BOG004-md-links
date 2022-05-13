const { checkPathExists } = require('../src/validate.js');
const { mdLinks } = require('../src/index.js');

describe('checkPathExists', () => {
    it('Should to be a function', () => {
      expect(typeof checkPathExists).toBe('function');
    });
});

describe('mdLinks', () => {
  it('Should to be a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
});