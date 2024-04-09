export default (function (str) {
    const { hostname } = new URL(str);
    return hostname.replace(/(?:www\.)?/g, '');
});
