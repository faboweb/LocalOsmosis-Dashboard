module.exports = {
	'**/*.ts?(x)': filenames =>
		`next lint --fix --file ${filenames.map(file => file.split(process.cwd())[1]).join(' --file ')}`,

	// this will Format MarkDown and JSON
	'**/*.(md|json)': filenames => `yarn prettier --write ${filenames.join(' ')}`,
};
