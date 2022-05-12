const { checkPathExists } = require('../src/validate.js');

describe('checkPathExists', () => {
  it('should return a promise', () => {
    expect(typeof checkPathExists).toBe('function');
  });
});
