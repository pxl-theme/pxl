/* Forked from https://github.com/mikestreety/mikestreety/blob/main/app/content/diary.njk */

// Date Utils
import { DateTime } from "luxon"

const nth = function(d) {
	if (d > 3 && d < 21) {
		return 'th';
	}
	switch (d % 10) {
		case 1:
			return 'st';
		case 2:
			return 'nd';
		case 3:
			return 'rd';
		default:
			return 'th';
	}
};

const jsDate = (a) => DateTime.fromJSDate(a);
const dayOrdinal = (a) => {
	let day = jsDate(a).day;
	return day + nth(day)
}

export default {
	allArchive: function() {

		// Select the collection we want to loop
		// let entries = this.collections.archive,
		let entries = this.collections.sitemap,
		// let entries = this.collections.post,
			// Create our placeholder array
			output = [];

		// Loop through each of the entries
		for(let item of entries) {
			// Check we have both a date and title
			if(item.data.title && item.date) {
				// Extract the year and month number (Jan = 0)
				let y = jsDate(item.date).year,
					m = jsDate(item.date).month - 1;

				// If the year hasn't been seen before, make a stub object
				if(!output[y]) {
					output[y] = {
						title: y,
						months: []
					};
				}

				// If the month hasn't been seen before, make a stub object
				// with a nice month name as the title
				if(!output[y].months[m]) {
					output[y].months[m] = {
						number: m + 1,
						title: jsDate(item.date).monthLong,
						entries: []
					};
				}

				// Add the entry to the keyed year/month array - only add the info we need
				output[y].months[m].entries.push({
					title: item.data.title,
					description: item.data.description,
					metadata: item.data.metadata,
					language: item.data.lang,
					url: item.url,
					type: item.data.parent,
					// metadatatype: item.data.metadata.type ? item.data.metadata.type : false,
					date: item.date,
					// publication: item.data.publication ? item.data.publication : false,
					// This is just the date plus ordinal (e.g. 23rd)
					dayordinal: dayOrdinal(item.date)
				});
			}
		}

		output = output.map(y => {
			y.count = 0;
			for(let m of y.months) {
				if(m && m.entries) {
					y.count += m.entries.length;
				}
			}

			return y;
		});

		// Return our array
		return output
			// Reverse the months (most recent first)
			.map(y => {
				y.months.reverse();
				return y;
			})
			// Filter out any null years
			.filter(a => a)
			// Reverse the years (recent first)
			.reverse();
	 }
};
