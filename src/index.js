// module.exports = () => {
//   // ...
// };

const fs = require("fs");
const path = require("path");

//const path = process.argv[2]
const rutaRelativa = '../../../MD-fuera/ejemplo.txt';

const checkFileExists = (filepath) => {
    return new Promise((res, rej) => {
    fs.access(filepath, fs.constants.F_OK, (err) => {
        const validation = err ? 'does not exist' : 'exists';
        console.log(validation);
        if (validation === 'exists'){
            res(console.log(path.resolve(filepath)));
        } else if (validation === 'does not exist'){
            rej(console.log('No existe esa ruta'));
        }
    });
});
}

checkFileExists(rutaRelativa)
.then(()=>{})
.catch(()=>{})

/*Ejemplos de rutas para obtener los argumentos*/
// const rutaAbsoluta = 'C:/Users/Camila/Desktop/MD-fuera/ejemplo.md';
// const rutaRelativa = '../../../MD-fuera';
// const dontExist = process.argv[2]
// //'../../../MD-fuera/ejemplo.md'

// const existingPath = access(dontExist, constants.F_OK)
// .then(() => {
//     const absolutePath = resolve(dontExist);
//     console.log(`El archivo existe y se convierte en ruta absoluta: ${absolutePath}`)
// })
// .catch(() => console.error('Please, enter a path to an existing file or directory'));


    
;