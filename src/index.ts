import { parse, stringify } from "./dateUtils";

function main() {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		console.log(`
Usage:
	Parse a date string:
		npm start parse "now-1d"

	Convert a date to string format:
		npm start stringify "2020-05-01T00:00:00.000Z"
`);
		return;
	}

	const command = args[0];
	const input = args[1];

	try {
		if (command === "parse") {
			const date = parse(input);
			console.log(`Parsed date: ${date.toISOString()}`);
		} else if (command === "stringify") {
			const date = new Date(input);
			const result = stringify(date);
			console.log(`Stringified date: ${result}`);
		} else {
			console.error('Error: Unknown command. Use "parse" or "stringify"');
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(`Error: ${error.message}`);
		} else {
			console.error("Error: An unknown error occurred");
		}
	}
}

main();
