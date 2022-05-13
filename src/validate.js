const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const chalk = require('chalk');

// const rutaRelativa = process.argv[2]
// const rutaRelativa = '../../../MD-fuera';
// Validando si esxiste o no existe la ruta
const checkPathExists = (route) => new Promise((res, rej) => {
    fs.access(route, (err) => {
        if (!err) {
            console.log(path.resolve());
            const pathResolve = path.resolve(route);
            // console.log(pathResolve);
            res(pathResolve);
        } else {
            console.log(err);
            rej(console.error(chalk.red('Please enter an existing route')));
        }
    });
});

// Obtenemos el arrelo de archivos
const saveFilesMD = (route) => {
    let arrPath = [];
    if (fs.statSync(route).isFile()) {
        arrPath.push(route);
    } else {
        fs.readdirSync(route).forEach((file) => {
            const saveFiles = path.join(route, file);
            if (fs.statSync(saveFiles).isDirectory()) {
                arrPath = arrPath.concat(saveFilesMD(saveFiles));
            } else {
                arrPath.push(saveFiles);
            }
        });
    }
    return arrPath;
};

// Filtrar los archivos .md
const filterMD = (arrMD) => new Promise((res, rej) => {
    const arrFiles = arrMD;
    const filterFile = arrFiles.filter((file) => path.extname(file) === '.md');
    // console.log(filterFile)
    if (filterFile.length > 0) {
        // console.log(filterFile);
        res(filterFile);
    } if (filterFile.length <= 0) {
        rej(console.error(chalk.red('Please enter a directory with .md files inside or files with .md extension')));
    }
});

// Obtener array de links con información sin options
const getLinks = (arrFiles) => Promise.all(arrFiles.map((fileMD) => new Promise((res, rej) => {
    fs.readFile(fileMD, 'utf8', (err, data) => {
        const arr = [];
        if (err) {
            rej(err);
        } else {
            const renderer = new marked.Renderer();
            renderer.link = (href, title, text) => {
                arr.push({
                    href,
                    title: text.substring(0, 50),
                    file: fileMD,
                });
            };
            marked(data, { renderer });
            // console.log(saveLinks);
        }
        res(arr);
    });
})));

// Obteniendo el array con la validación
const httpReq = (objLinks) => {
    return Promise.all(objLinks.map((link) => {
        return fetch(link.href).then((response) => {
            const newLink = {
                href: link.href,
                    title: link.title,
                    file: link.file,
                    status: response.status,
                    statusText: 'FAIL',
            };
            if (response.status >= 200 && response.status < 400) {
                newLink.statusText = response.statusText;
            }
            return newLink;
        });
    }));
};

// Si el usuario ingresa la opcion stats
const optionStats = (arr) => {
        const uniqueLinks = new Set(arr.map((elem) => elem.href));
        return ({
            total: arr.length,
            unique: uniqueLinks.size,
        });
};

// Si el usuario ingresa  --stats y --validate

const statsAndValidate = (arr) => {
        const uniqueLinks = new Set(arr.map((elem) => elem.href));
        const brokenLinks = arr.filter((elem) => elem.statusText === 'FAIL');
        return ({
            total: arr.length,
            unique: uniqueLinks.size,
            broken: brokenLinks.length,
        });
};

module.exports = {
    checkPathExists,
    saveFilesMD,
    filterMD,
    getLinks,
    httpReq,
    optionStats,
    statsAndValidate,
};
