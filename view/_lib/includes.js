export default (function (arr, key, value) {
    return arr.filter(item => {
        const keys = key.split('.');
        const reduce = keys.reduce((object, key) => {
            return object[key];
        }, item);
        const str = String(reduce);
        return (str.includes(value) ? item : false);
    });
});
