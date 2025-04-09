import { parse, stringify } from "../src/dateUtils";

describe("Unit Tests", () => {
	describe("Unit Tests for Parse", () => {
		it("should parse now-1d correctly", () => {
			const result = parse("now-1d");
			const expected = new Date();
			expected.setDate(expected.getDate() - 1);
			expect(result.getTime()).toBeCloseTo(expected.getTime(), -1); // Allow up to 10ms difference
		});

		it("should parse now+1d correctly", () => {
			const result = parse("now+1d");
			const expected = new Date();
			expected.setDate(expected.getDate() + 1);
			expect(result.getTime()).toBeCloseTo(expected.getTime(), -1);
		});

		it("should parse now-4d-4h correctly", () => {
			const result = parse("now-4d-4h");
			const expected = new Date();
			expected.setDate(expected.getDate() - 4);
			expected.setHours(expected.getHours() - 4);
			expect(result.getTime()).toBeCloseTo(expected.getTime(), -1);
		});

		it("should round to year correctly", () => {
			const result = parse("now/y");
			const expected = new Date();
			expected.setMonth(0, 1);
			expected.setHours(0, 0, 0, 0);
			expect(result.toISOString()).toBe(expected.toISOString());
		});

		it("should round to month correctly", () => {
			const result = parse("now/M");
			const expected = new Date();
			expected.setDate(1);
			expected.setHours(0, 0, 0, 0);
			expect(result.toISOString()).toBe(expected.toISOString());
		});

		it("should round to day correctly", () => {
			const result = parse("now/d");
			const expected = new Date();
			expected.setHours(0, 0, 0, 0);
			expect(result.toISOString()).toBe(expected.toISOString());
		});
	});

	describe("Unit Tests for Stringify", () => {
		it("should stringify a date 1 year in the future", () => {
			const date = new Date();
			date.setFullYear(date.getFullYear() + 1);
			expect(stringify(date)).toBe("now+1y");
		});

		it("should stringify a date 15 days in the past", () => {
			const date = new Date();
			date.setHours(0, 0, 0, 0);
			date.setDate(date.getDate() - 15);
			expect(stringify(date)).toBe("now-2w-1d");
		});

		it("should stringify a date 2 hours in the future", () => {
			const date = new Date();
			date.setHours(date.getHours() + 2);
			expect(stringify(date)).toBe("now+2h");
		});

		it("should stringify the current date as now", () => {
			const date = new Date();
			expect(stringify(date)).toBe("now");
		});

		it("should stringify a date less than 1 second different as now", () => {
			const date = new Date();
			date.setMilliseconds(date.getMilliseconds() + 500);
			expect(stringify(date)).toBe("now");
		});
	});
});
