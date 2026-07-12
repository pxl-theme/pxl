// https://purgecss.com/configuration.html#options
export default {
    // content: [''], // Already defined in command
    // css: [''], // Already defined in command
    keyframes: true,
    fontFace: true,
    variables: true,
    // whitelistPatternsChildren: [/^t-color/, /^t-mod/],
    safelist: {
        standard: [/^t-mod/, /^o-rustygrid/, /^o-frame/, /^c-nav/],
        // deep: [],
        // greedy: [],
        // keyframes: [],
        // variables: []
    }
};
