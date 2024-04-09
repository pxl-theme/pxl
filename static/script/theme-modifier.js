document.addEventListener("DOMContentLoaded", (event) => {
	// Class Lists of Scope Elements
	const tModRoot = document.querySelector(".t-modRoot");
	const tModBody = document.querySelector(".t-modBody");
	// const tModRoot.classList = document.documentElement.classList;
	// const tModBody.classList = document.body.classList;
	// document.body.tagName.toLowerCase();
	// const tModSwitcher = document.getElementById("t-mod-switcher");
	const tModExport = document.getElementById("t-modExport");
	const tModImport = document.getElementById("t-modImport");
	const rootPrefixes = [
		"-schemeLight",
		"-schemeDark",
		"-styleset",
		"-corner",
		"-borderVal",
		"-borderStyle",
		"-borderColor",
		"-outlineVal",
		"-outlineColor",
		"-shadowType",
		"-shadowColor",
		"-emboss",
	];
	const bodyPrefixes = ["-bg"];
	// Initializing select options based on existing classes
	function initializeClasses(classlist, prefixes) {
		for (const cls of classlist) {
			for (const prefix of prefixes) {
				if (cls.startsWith(prefix)) {
					document.getElementById(`select${prefix}`).value =
						cls.substring(prefix.length);
				} else {
					return false;
				}
			}
		}
	}
	initializeClasses(tModRoot.classList, rootPrefixes);
	initializeClasses(tModBody.classList, bodyPrefixes);
	// Function to handle class changes
	function handleClassChange(select, prefix, classlist) {
		if (classlist.contains(prefix + select.value)) {
			return;
		}
		for (const cls of classlist) {
			if (cls.startsWith(prefix)) {
				classlist.remove(cls);
			}
		}
		classlist.add(prefix + select.value);
	}
	// Event listeners for select changes
	function listenClassChange(prefixes, classlist) {
		for (const prefix of prefixes) {
			if (document.getElementById(`select${prefix}`)) {
				document
					.getElementById(`select${prefix}`)
					.addEventListener("change", function () {
						handleClassChange(this, prefix, classlist);
						updateExportTextarea();
					});
			}
		}
	}
	listenClassChange(rootPrefixes, tModRoot.classList);
	listenClassChange(bodyPrefixes, tModBody.classList);
	// Function to update the Export textarea
	function updateExportTextarea() {
		const filteredClasses = Array.from(tModRoot.classList).filter((cls) => {
			return rootPrefixes.some((prefix) => cls.startsWith(prefix));
		});
		const exportText = `|root ${filteredClasses.join(
			" ",
		)} |body ${Array.from(tModBody.classList).find((cls) =>
			bodyPrefixes.some((prefix) => cls.startsWith(prefix)),
		)}`;
		tModExport.value = exportText;
	}
	// Function to submit the import textarea
	document.getElementById("submitImport").addEventListener("click", () => {
		const regex = /\|root\s(.*?)\s\|body\s(.*?)$/;
		const matches = tModImport.value.match(regex);
		if (matches) {
			const tModRootRegex = matches[1].split(" ");
			const tModBodyRegex = matches[2].split(" ");
			for (const cls of tModRootRegex) {
				for (const prefix of rootPrefixes) {
					if (cls.startsWith(prefix)) {
						const selectMenu = document.getElementById(
							`select${prefix}`,
						);
						if (selectMenu) {
							selectMenu.value = cls.substring(prefix.length);
							handleClassChange(
								selectMenu,
								prefix,
								tModRoot.classList,
							);
						}
					}
				}
			}
			for (const cls of tModBodyRegex) {
				for (const prefix of bodyPrefixes) {
					if (cls.startsWith(prefix)) {
						const selectMenu = document.getElementById(
							`select${prefix}`,
						);
						if (selectMenu) {
							selectMenu.value = cls.substring(prefix.length);
							handleClassChange(
								selectMenu,
								prefix,
								tModBody.classList,
							);
						}
					}
				}
			}
		}
	});
	// Function to randomize select menus
	document
		.getElementById("randomizeSelects")
		.addEventListener("click", () => {
			for (const select of document.querySelectorAll(
				"select[id^=select-]:not([data-randomize=no])",
			)) {
				const options = select.querySelectorAll("option");
				const randomIndex = Math.floor(Math.random() * options.length);
				select.value = options[randomIndex].value;
				// console.log(
				// 	rootPrefixes.some((prefix) => {
				// 		return select.id.endsWith(prefix);
				// 	}),
				// );
				// const prefix = rootPrefixes.some((prefix)=> {return (select.id.endsWith(prefix))}) ? rootPrefixes : bodyPrefixes;
				const prefix = select.id.replace("select", "");
				const classlist = rootPrefixes.some((prefix) => {
					return select.id.endsWith(prefix);
				})
					? tModRoot.classList
					: tModBody.classList;
				handleClassChange(select, prefix, classlist);
				updateExportTextarea();
			}
		});
	// Function to reset select menus
	document.getElementById("resetSelects").addEventListener("click", () => {
		for (const select of document.querySelectorAll("select[id^=select-]")) {
			select.selectedIndex = 0;
			const prefix = select.id.replace("select", "");
			const classlist = rootPrefixes.some((prefix) => {
				return select.id.endsWith(prefix);
			})
				? tModRoot.classList
				: tModBody.classList;
			handleClassChange(select, prefix, classlist);
			updateExportTextarea();
		}
	});
	for (const checkbox of document.querySelectorAll(
		'label[for^="select-"] + input[type=checkbox]',
	)) {
		checkbox.nextElementSibling.dataset.randomize = checkbox.checked
			? "yes"
			: "no";
		checkbox.addEventListener("click", () => {
			checkbox.nextElementSibling.dataset.randomize = checkbox.checked
				? "yes"
				: "no";
		});
	}
});
