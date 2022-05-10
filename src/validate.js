import {
    access,
    constants,
    statSync,
    readdirSync,
    readFile,
} from 'fs';
import { resolve, join, extname } from 'path';
import { marked } from 'marked';
import fetch from 'node-fetch';
import { error } from 'console';

// const rutaRelativa = process.argv[2]
const rutaRelativa = '../../../MD-fuera';
// Validando si esxiste o no existe la ruta
const checkPathExists = (route) => new Promise((res, rej) => {
        access(route, constants.F_OK, (err) => {
            if (!err) {
                const pathResolve = resolve(route);
                res(pathResolve);
            } else {
                rej(err);
                // throw error('Please enter a exist path');
            }
        });
    });
// Obtenemos el arrelo de archivos
const saveFilesMD = (route) => {
    let arrPath = [];
    if (statSync(route).isFile()) {
        arrPath.push(route);
    } else {
        readdirSync(route).forEach((file) => {
            const saveFiles = join(route, file);
            if (statSync(saveFiles).isDirectory()) {
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
    const filterFile = arrFiles.filter((file) => extname(file) === '.md');
    // console.log(filterFile)
    if (filterFile.length > 0) {
        // console.log(filterFile);
        return filterFile;
    }
    throw error(
        'Please enter a directory with .md files inside or files with .md extension',
    );
};

// Obtener array de links con información sin options
const getLinks = (arrFiles) => Promise.all(arrFiles.map((fileMD) => new Promise((res, rej) => {
    readFile(fileMD, 'utf8', (err, data) => {
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

const httpReq = (objLinks) => {
    let result = [];
    result = objLinks.map((link) => {
        return fetch(link.href).then((response) => {
            if (response.status >= 200 && response.status < 400) {
                link.status = response.status;
                link.statusText = response.statusText;
            } if (response.status >= 400) {
                link.status = response.status;
                link.statusText = 'FAIL';
            }
            return link;
        });
    });
    Promise.all(result).then((respuesta) => console.log(respuesta));
};

// Encadenando la promesa
checkPathExists(rutaRelativa)
    .then((arrPath) => saveFilesMD(arrPath))
    .then((filesMd) => filterMD(filesMd))
    .then((links) => getLinks(links))
    .then((arr) => console.log(arr.flat()))
    .then((request) => httpReq(request))
    .catch((erro) => console.log(erro));

export { getLinks, checkPathExists };
