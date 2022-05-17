#!/usr/bin/env node
const {
    checkPathExists,
    saveFiles,
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
    return new Promise((res) => {
        checkPathExists(path)
        .then((arrPath) => saveFiles(arrPath))
        .then((filesMd) => filterMD(filesMd))
        .then((links) => getLinks(links))
        .then((arr) => arr.flat())
        .then((arr) => {
        if (options.validate && !options.stats) {
            httpReq(arr).then((response) => {
                console.log(response);
                res(response);
            });
        } else if (options.stats && !options.validate) {
            console.log(optionStats(arr));
            res(optionStats(arr));
        } else if (options.stats && options.validate) {
            httpReq(arr).then((response) => {
                console.log(statsAndValidate(response));
                res(statsAndValidate(response));
            });
        } if (!options.validate && !options.stats) {
            console.log(arr);
            res(arr);
        }
    })
    .catch((err) => err);
    });
};

mdLinks(route, options).then((res) => res);
// .then((res) => console.log(res));

module.exports = { mdLinks };
