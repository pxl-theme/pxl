import markdown from "./markdown-it.config.js";
export default (function (str, value) {
    if (value === 'inline') {
        return markdown.renderInline(str);
    }
    return markdown.render(str);
});
