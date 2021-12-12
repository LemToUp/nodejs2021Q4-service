module.exports = (res, data, code = 200) => {
    res.type('application/json');
    res.code(code);
    res.send(JSON.stringify(data));

    return res;
}
