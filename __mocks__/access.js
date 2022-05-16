const access = jest.fn((path, (cb) => {
    const result = {
        code: 'ENOENT',
    };
    const err = error;
    cb(result);
}));

module.exports = { access };
