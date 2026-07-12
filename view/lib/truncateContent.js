import truncate from "truncate-html";
export default (function truncateContent(content, words) {
	if (!content.hasOwnProperty('templateContent')) {
		console.warn('Content has no property `templateContent`, skipping…');
		return;
	}
	const html = content.templateContent,
		options = {
			byWords: true,
			ellipsis: "…",
			reserveLastWord: true,
			// excludes: ['img', 'picture']
		}
	return truncate(html, words, options);
});
