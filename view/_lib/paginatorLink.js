export default (function (str) {
    return str.replace(/p\/(?:\d)\//g, '');
});
