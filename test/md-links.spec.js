const {
  checkPathExists,
  optionStats,
  statsAndValidate,
  filterMD,
} = require('../src/validate.js');

// jest.mock('access');

const arrStats = [
  {
    href: 'https://docs.microsoft.com/sql/t-sql/statements/set-transaction-isolation-level-transact-sql',
    title: 'SET TRANSACTION ISOLATION LEVEL',
    file: 'C:\\Users\\Camila\\Desktop\\dir\\ejemplo2.md',
  },
  {
    href: 'https://github.com/Azure/azure-content/blob/master/contributor-guide/contributor-guide-index.md',
    title: 'contributor guide index',
    file: 'C:\\Users\\Camila\\Desktop\\dir\\ejemplo2.md',
  },
];

const arrStatsWithStatus = [
  {
    href: 'https://docs.microsoft.com/sql/t-sql/statements/set-transaction-isolation-level-transact-sql',
    title: 'SET TRANSACTION ISOLATION LEVEL',
    file: 'C:\\Users\\Camila\\Desktop\\dir\\ejemplo2.md',
    status: 200,
    statusText: 'OK',
  },
  {
    href: 'https://github.com/Azure/azure-content/blob/master/contributor-guide/contributor-guide-index.md',
    title: 'contributor guide index',
    file: 'C:\\Users\\Camila\\Desktop\\dir\\ejemplo2.md',
    status: 404,
    statusText: 'FAIL',
  },
];

const mdFilter = [
  'C:\\Users\\Camila\\Desktop\\archivosrotos.md',
  'C:\\Users\\Camila\\Desktop\\dir\\dibujito.png',
  'C:\\Users\\Camila\\Desktop\\dir\\ejemplo.md',
  'C:\\Users\\Camila\\Desktop\\bye.txt',
  'C:\\Users\\Camila\\Desktop\\dir\\ejemplo2.md',
  'C:\\Users\\Camila\\Desktop\\dir\\hola.txt',
];

const filterWithoutMD = [
  'C:\\Users\\Camila\\Desktop\\dir\\dibujito.png',
  'C:\\Users\\Camila\\Desktop\\bye.txt',
  'C:\\Users\\Camila\\Desktop\\dir\\hola.txt',
];

// const path = '../../dir/ejemplo.md';
// const res = [
//   {
//     href: 'https://docs.microsoft.com/sql/t-sql/statements/set-transaction-isolation-level-transact-sql',
//     title: 'SET TRANSACTION ISOLATION LEVEL',
//     file: 'C:\\Users\\Camila\\Desktop\\dir\\ejemplo.md',
//   },
//   {
//     href: 'https://github.com/Azure/azure-content/blob/master/contributor-guide/contributor-guide-index.md',
//     title: 'contributor guide index',
//     file: 'C:\\Users\\Camila\\Desktop\\dir\\ejemplo.md',
//   },
// ];

// describe("access", () => {
//   const access = require('access');
//   const path = '../../dir/ejemplo.m'
// it("validateLink", () => {
//   expect(checkPathExists(path, err)).rejects.toEqual(objectResolve);
// });

describe('checkPathExists', () => {
  it('should return a promise', () => {
    expect(typeof checkPathExists).toBe('function');
  });
});

describe('optionStats', () => {
  it('should return a function', () => {
    expect(typeof optionStats).toBe('function');
  });
  it('should return an object with the total value of links and unique links', () => {
    expect(optionStats(arrStats)).toEqual({ total: 2, unique: 2 });
  });
  it('should return an object with the total value of links and unique links', () => {
    expect(optionStats(arrStatsWithStatus)).toEqual({ total: 2, unique: 2 });
  });
});

describe('statsAndValidate', () => {
  it('should return a function', () => {
    expect(typeof optionStats).toBe('function');
  });
  it('should return an object with the total value of links and unique links', () => {
    expect(statsAndValidate(arrStats)).not.toEqual({ total: 2, unique: 2, broken: 1 });
  });
  it('should return an object with the total value of links and unique links', () => {
    expect(statsAndValidate(arrStatsWithStatus)).toEqual({ total: 2, unique: 2, broken: 1 });
  });
});

describe('filterMD', () => {
  it('should to be a function', () => {
    expect(typeof filterMD).toBe('function');
  });
  it('should return an array with file paths with extension .md', () => {
    return expect(filterMD(mdFilter)).resolves.toEqual([
      'C:\\Users\\Camila\\Desktop\\archivosrotos.md',
      'C:\\Users\\Camila\\Desktop\\dir\\ejemplo.md',
      'C:\\Users\\Camila\\Desktop\\dir\\ejemplo2.md',
    ]);
  });
  it('should return an array with file paths with extension .md', () => {
    return filterMD(filterWithoutMD).catch((response) => {
      expect(response).toBe(console.error('Please enter a directory with .md files inside or files with .md extension'));
    });
  });
});
