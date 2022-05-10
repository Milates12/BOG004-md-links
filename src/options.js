const arregloSinReq = [
    {
        href: 'https://docs.microsoft.com/sql/t-sql/statements/set-transaction-isolation-level-transact-sql',
        title: 'SET TRANSACTION ISOLATION LEVEL',
        file: 'C:\\Users\\Camila\\Desktop\\MD-fuera\\ejemplo.md',
    },
    {
        href: 'https://github.com/Azure/azure-content/blob/master/contributor-guide/contributor-guide-index.md',
        title: 'contributor guide index',
        file: 'C:\\Users\\Camila\\Desktop\\MD-fuera\\ejemplo.md',
    },
    {
        href: 'https://github.com/Azure/azure-content/blob/master/contributor-guide/contributor-guide-index.md',
        title: 'contributor guide index',
        file: 'C:\\Users\\Camila\\Desktop\\MD-fuera\\ejemplo.md',
    },
    {
        href: 'https://github.com/Azure/azure-content/blob/master/contributor-guide/contributor-guide-index.md',
        title: 'contributor guide index',
        file: 'C:\\Users\\Camila\\Desktop\\MD-fuera\\ejemplo.md',
    },
];

const arregloConReq = [
    {
        href: 'https://docs.microsoft.com/sql/t-sql/statements/set-transaction-isolation-level-transact-sql',
        title: 'SET TRANSACTION ISOLATION LEVEL',
        file: 'C:\\Users\\Camila\\Desktop\\MD-fuera\\ejemplo.md',
        status: 200,
        statusText: 'OK',
    },
    {
        href: 'https://github.com/Azure/azure-content/blob/master/contributor-guide/contributor-guide-index.md',
        title: 'contributor guide index',
        file: 'C:\\Users\\Camila\\Desktop\\MD-fuera\\ejemplo.md',
        status: 404,
        statusText: 'FAIL',
    },
];

// Option stats
const stats = (arr) => {
    return new Promise((res, rej) => {
        const uniqueLinks = new Set(arr.map((elem) => elem.href));
        res({
            total: arr.length,
            unique: uniqueLinks.size,
        });
    });
};

stats(arregloSinReq);

// Option Validate and Stats
