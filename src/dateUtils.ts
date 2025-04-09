// Type definition for valid time units
type TimeUnit = "d" | "M" | "y" | "h" | "m" | "s" | "w";

// Constants for time unit conversions to milliseconds
const TIME_UNITS = {
	y: 365 * 24 * 60 * 60 * 1000, // year
	M: 30 * 24 * 60 * 60 * 1000, // month
	w: 7 * 24 * 60 * 60 * 1000, // week
	d: 24 * 60 * 60 * 1000, // day
	h: 60 * 60 * 1000, // hour
	m: 60 * 1000, // minute
	s: 1000, // second
} as const;

// Helper function to convert a time unit and value to milliseconds
function parseTimeUnit(unit: TimeUnit, value: number): number {
	return value * TIME_UNITS[unit];
}

// Helper function to round a date to the start of a given time unit
function roundToUnit(date: Date, unit: TimeUnit): Date {
	const result = new Date(date);

	switch (unit) {
		case "y":
			result.setMonth(0, 1);
			result.setHours(0, 0, 0, 0);
			break;
		case "M":
			result.setDate(1);
			result.setHours(0, 0, 0, 0);
			break;
		case "d":
			result.setHours(0, 0, 0, 0);
			break;
		case "h":
			result.setMinutes(0, 0, 0);
			break;
		case "m":
			result.setSeconds(0, 0);
			break;
		case "s":
			result.setMilliseconds(0);
			break;
		case "w":
			// Set to start of week (Sunday)
			const day = result.getDay();
			result.setDate(result.getDate() - day);
			result.setHours(0, 0, 0, 0);
			break;
	}

	return result;
}

// Main function to parse a date string into a Date obj
export function parse(dateStr: string): Date {
	if (!dateStr.startsWith("now")) {
		throw new Error('Date string must start with "now"');
	}

	let date = new Date();
	const parts = dateStr.slice(3).split("/");
	const operations = parts[0];
	const roundUnit = parts[1] as TimeUnit | undefined;

	// Handle case with no operations (just "now" or "now/{unit}")
	if (!operations) {
		return roundUnit ? roundToUnit(date, roundUnit) : date;
	}

	// Process each operation in the string (e.g., "+1d", "-2h")
	const operationRegex = /([+-])(\d+)([dMyhms])/g;
	let match;

	while ((match = operationRegex.exec(operations)) !== null) {
		const [_, operator, value, unit] = match;
		const numValue = parseInt(value, 10);
		const timeUnit = unit as TimeUnit;
		const ms = parseTimeUnit(timeUnit, numValue);

		if (operator === "+") {
			date = new Date(date.getTime() + ms);
		} else {
			date = new Date(date.getTime() - ms);
		}
	}

	// Apply rounding if specified
	return roundUnit ? roundToUnit(date, roundUnit) : date;
}

// Main function to convert a Date object into a date string
export function stringify(date: Date): string {
	const now = new Date();
	const diff = date.getTime() - now.getTime();

	// Handle "now" case for very small differences
	if (Math.abs(diff) < 1000) {
		return "now";
	}

	const isPositive = diff > 0;
	const absDiff = Math.abs(diff);
	let result = "now";

	// For differences less than a day, use hours/minutes/seconds
	if (absDiff < TIME_UNITS.d) {
		const hours = Math.floor(absDiff / TIME_UNITS.h);
		const minutes = Math.floor((absDiff % TIME_UNITS.h) / TIME_UNITS.m);
		const seconds = Math.floor((absDiff % TIME_UNITS.m) / TIME_UNITS.s);

		if (hours > 0) result += (isPositive ? "+" : "-") + hours + "h";
		if (minutes > 0) result += (isPositive ? "+" : "-") + minutes + "m";
		if (seconds > 0) result += (isPositive ? "+" : "-") + seconds + "s";
		return result;
	}

	// For differences of a day or more, use years/months/weeks/days
	let remaining = absDiff;

	const years = Math.floor(remaining / TIME_UNITS.y);
	if (years > 0) {
		result += (isPositive ? "+" : "-") + years + "y";
		remaining %= TIME_UNITS.y;
	}

	const months = Math.floor(remaining / TIME_UNITS.M);
	if (months > 0) {
		result += (isPositive ? "+" : "-") + months + "M";
		remaining %= TIME_UNITS.M;
	}

	const weeks = Math.floor(remaining / TIME_UNITS.w);
	if (weeks > 0) {
		result += (isPositive ? "+" : "-") + weeks + "w";
		remaining %= TIME_UNITS.w;
	}

	const days = Math.floor(remaining / TIME_UNITS.d);
	if (days > 0) {
		result += (isPositive ? "+" : "-") + days + "d";
	}

	return result;
}
