module.exports.compareConditions = (item, conditions) => {
    let result = true;

    Object.keys(conditions).forEach((key) => {
        if (!item[key] || item[key] !== conditions[key]) result = false;
    })

    return result;
}
