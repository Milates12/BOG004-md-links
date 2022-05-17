const { mdLinks } = require('../src/index.js');

const path = 'ejemploMD';

describe('mdLinks', () => {
  it('should be a function', () => {
      expect(typeof mdLinks).toBe('function');
  });
  it('Should be returned a promise', (done) => {
    expect(mdLinks('ejemploMD', {}) instanceof Promise).toBeTruthy();
    done();
  });
  it('It should return an array with href, title and file', (done) => {
    mdLinks(path, {}).then((response) => {
      const expected = [
        {
          href: 'https://docs.microsoft.com/sql/t-sql/statements/set-transaction-isolation-level-transact-sql',
          title: 'SET TRANSACTION ISOLATION LEVEL',
          file: 'C:\\Users\\Camila\\Desktop\\PROYECTOS\\BOG004-md-links\\ejemploMD\\hola.md',
        },
        {
          href: 'https://github.com/Azure/azure-content/blob/master/contributor-guide/contributor-guide-index.md',
          title: 'contributor guide index',
          file: 'C:\\Users\\Camila\\Desktop\\PROYECTOS\\BOG004-md-links\\ejemploMD\\hola.md',
        },
      ];
      // console.log(response);
      expect(response).toStrictEqual(expected);
      done();
    });
  });
  it('It should return an array with href, title, file, status and statusText', (done) => {
    mdLinks(path, { validate: true }).then((response) => {
      const expected = [
        {
          href: 'https://docs.microsoft.com/sql/t-sql/statements/set-transaction-isolation-level-transact-sql',
          title: 'SET TRANSACTION ISOLATION LEVEL',
          file: 'C:\\Users\\Camila\\Desktop\\PROYECTOS\\BOG004-md-links\\ejemploMD\\hola.md',
          status: 200,
          statusText: 'OK',
        },
        {
          href: 'https://github.com/Azure/azure-content/blob/master/contributor-guide/contributor-guide-index.md',
          title: 'contributor guide index',
          file: 'C:\\Users\\Camila\\Desktop\\PROYECTOS\\BOG004-md-links\\ejemploMD\\hola.md',
          status: 404,
          statusText: 'FAIL',
        },
      ];
      expect(response).toStrictEqual(expected);
      done();
    });
  });
  it('It should return an array with href, title, file, status and statusText', (done) => {
    mdLinks(path, { stats: true }).then((response) => {
      const expected = { total: 2, unique: 2 };
      expect(response).toStrictEqual(expected);
      done();
    });
  });
  it('It should return an array with href, title, file, status and statusText', (done) => {
    mdLinks(path, { validate: true, stats: true }).then((response) => {
      const expected = { total: 2, unique: 2, broken: 1 };
      expect(response).toEqual(expected);
      done();
    });
  });
});
