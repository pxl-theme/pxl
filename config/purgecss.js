export const content = ['dist/**/*.html', 'dist/**/*.js'];
export const css = ['static/style/index.m.css'];
export const keyframes = true;
export const fontFace = true;
export const variables = true;
export const safelist = [/^t-mod/, /^o-rustygrid/, /^o-frame/];
// export const whitelistPatternsChildren: [/^t-variant/, /^t-mod/]
export default {
    content,
    css,
    keyframes,
    fontFace,
    variables,
	// whitelistPatternsChildren,
    safelist
};
