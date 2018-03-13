const Util = {};

// 数组去重
Util.getFilteredArray = function (array) {
    const res = [];
    const hash = {};
    for (let i = 0; i < array.length; i++) {
        const _self = array[i];
        if (!hash[_self]) {
            res.push(_self);
            hash[_self] = 1;
        }
    }
    return res;
};

export default Util;
