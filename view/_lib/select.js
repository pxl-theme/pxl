export default (function (arr, key, value) {
    return arr.filter(item => {
        const keys = key.split('.');
        const reduce = keys.reduce((object, key) => {
            return object[key];
        }, item);
        return (reduce === value ? item : false);
    });
});
