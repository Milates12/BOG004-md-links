#!/usr/bin/env node
const {
    checkPathExists,
    saveFilesMD,
    filterMD,
    getLinks,
    httpReq,
    optionStats,
    statsAndValidate,
} = require('./validate.js');

const route = process.argv[2];
const options = {
    validate: false,
    stats: false,
};
if (process.argv.includes('--validate')) {
    options.validate = true;
}
if (process.argv.includes('--stats')) {
    options.stats = true;
}

const mdLinks = (path, options) => {
    checkPathExists(path)
    .then((arrPath) => saveFilesMD(arrPath))
    .then((filesMd) => filterMD(filesMd))
    .then((links) => getLinks(links))
    .then((arr) => arr.flat())
    .then((arr) => {
        if (options.validate && !options.stats) {
            httpReq(arr).then((response) => {
                console.log(response);
            });
        } else if (options.stats && !options.validate) {
            console.table(optionStats(arr));
        } else if (options.stats && options.validate) {
            httpReq(arr).then((response) => {
                console.table(statsAndValidate(response));
            });
        } if (!options.validate && !options.stats) {
            console.log(arr);
        }
    })
    .catch((err) => err);
};

mdLinks(route, options);
