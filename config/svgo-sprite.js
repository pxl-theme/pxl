module.exports = {
	plugins: [
		{
			name: "preset-default",
			params: {
				overrides: {
					cleanupIds:false,
					removeHiddenElems:false,
					convertColors: {
						params: {
							currentColor: true
						}
					}
				}
			}
		},
		"convertStyleToAttrs",
		"reusePaths"
	]
}
