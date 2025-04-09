# Date String Format

This library provides a simple way to parse and stringify dates using a custom format. The format is designed to be human-readable and easy to use.

## Format

The format is as follows:

```
now[+/-Nunit][+/-Nunit...][/unit]
```

Where:
- `now` is the current date and time
- `+/-` is the operator (add or subtract)
- `N` is a number
- `unit` is one of:
  - `d` day
  - `M` month
  - `y` year
  - `h` hour
  - `m` minute
  - `s` second
  - `w` week
- `/unit` is an optional rounding operator

## Features

- Parse date strings in the format `now[+-]value[unit][/unit]`
- Convert dates to the same string format
- Support for all time units: d (day), M (month), y (year), h (hour), m (minute), s (second), w (week)
- Support for addition (+) and subtraction (-) operations
- Support for rounding to specific time units

## Installation

```bash
npm install
```

## Usage

### CLI

```bash
# Parse a date string
npm start parse "now-1d"

# Convert a date to string format
npm start stringify "2024-03-14T00:00:00.000Z"
```

### Examples

```typescript
import { parse, stringify } from './dateUtils';

// Parse examples
parse('now-1y/y')    // Returns: 2023-01-01T00:00:00.000Z
parse('now/y')       // Returns: 2024-01-01T00:00:00.000Z
parse('now-1d')      // Returns: 2024-03-13T00:00:00.000Z
parse('now+1d')      // Returns: 2024-03-15T00:00:00.000Z
parse('now-4d-4h')   // Returns: 2024-03-10T20:00:00.000Z

// Stringify examples
stringify(new Date('2023-01-01T00:00:00.000Z'))  // Returns: "now-1y"
stringify(new Date('2025-01-01T00:00:00.000Z'))  // Returns: "now+1y"
stringify(new Date('2024-03-14T00:00:00.000Z'))  // Returns: "now"
```

## Testing

```bash
npm test
```

## License

ISC 