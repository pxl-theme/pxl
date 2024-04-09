export default (class ExcerptGenerator {
    getExcerpt(content, length) {
        let excerptParagraphs = [];
        let currentLength = 0;
        const paragraphs = content.match(/<p>.*?<\/p>/gs) || [];
        for (let paragraph of paragraphs) {
            // Strip HTML from the paragraph
            const text = paragraph.replace(/(<([^>]+)>)/gi, "");
            if (currentLength > 0 && currentLength + text.length > length) {
                break;
            }
            excerptParagraphs.push(text);
            currentLength += text.length;
        }
        return excerptParagraphs.join(" ");
    }
});
