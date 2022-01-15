type ICompareObj = Record<string, unknown>;
/**
 * @description Compare Object with conditions
 * @param item - any object
 * @param conditions - should contain ony object fields with values for compare
 *
 * @remarks
 * Example: item: {id: 1, name: 'Bobby'} -> conditions: {id: 1} return true; {name: 'Marie'} return false;
 *
 * @return boolean;
 */
export const compareConditions = (item: ICompareObj, conditions: Partial<ICompareObj>):boolean => {
    let result = true;

    Object.keys(conditions).forEach((key) => {
        if (!item[key] || item[key] !== conditions[key]) result = false;
    })

    return result;
}
