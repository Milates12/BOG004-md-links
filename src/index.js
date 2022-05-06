const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
// const rutaRelativa = process.argv[2]
const rutaRelativa = '../../../MD-fuera';
// Validando si esxiste o no existe la ruta
const checkPathExists = (route) => new Promise((res, rej) => {
    fs.access(route, fs.constants.F_OK, (err) => {
        if (!err) {
            const pathResolve = path.resolve(route);
            res(pathResolve);
        } else {
            rej(err);
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
const filterMD = (arrMD) => {
    const arrFiles = arrMD;
    const filterFile = arrFiles.filter((file) => path.extname(file) === '.md');
    // console.log(filterFile)
    if (filterFile.length > 0) {
        // console.log(filterFile);
        return filterFile;
    }
    // console.error('No existen archivos .md');
};

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
                    title: text,
                    file: fileMD,
                });
            };
            marked(data, { renderer });
            // console.log(saveLinks);
        }
        res(arr);
    });
})));

checkPathExists(rutaRelativa)
    .then((arrPath) => saveFilesMD(arrPath))
    .then((filesMd) => filterMD(filesMd))
    .then((links) => getLinks(links))
    .then((arr) => console.log(arr.flat()))
    .catch((error) => error);
