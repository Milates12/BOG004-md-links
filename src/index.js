// module.exports = () => {
//   // ...
// };

import { access } from 'fs/promises';
import { constants } from 'fs';
import { relative, resolve, } from 'path';
import { fileURLToPath } from 'url';

/*Ejemplos de rutas para obtener los argumentos*/
const rutaAbsoluta = 'C:/Users/Camila/Desktop/MD-fuera/ejemplo.md';
const rutaRelativa = '../../../MD-fuera';
const dontExist = '../../../MD-fuera/ejemplo.md'

const siRutaExiste = access(dontExist, constants.F_OK)
.then(() => {
    const absolutePath = resolve(dontExist);
    console.log(`El archivo existe y se convierte en ruta absoluta: ${absolutePath}`)
})
.catch(() => console.error('Please, enter a path to an existing file or directory'));

// const exist = access(dontExist, constants.F_OK, (err) => {
//     const validateExistPath = err ? 'does not exist' : 'exists';
//     if (validateExistPath === 'does not exist'){
//         console.log('Please, enter a path to an existing file or directory');
//     } else if (validateExistPath === 'exists'){
//         const absolutePath = resolve(dontExist);
//         // return absolutePath;
//         console.log('La ruta existe y se convierte a ruta absoluta', absolutePath);
//     }
// });







