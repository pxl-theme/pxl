module.exports = {
	content: ['dist/**/*.html', 'dist/**/*.js'],
	css: ['static/style/index.m.css'],
	keyframes: true,
	fontFace: true,
	variables: true,
	// whitelistPatternsChildren: [/^t-variant/, /^t-mod/]
	safelist: [/^t-mod/, /^o-rustygrid/, /^o-frame/]
}
