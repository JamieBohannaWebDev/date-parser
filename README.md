# Date String Parser

A TypeScript implementation of a date string parser that supports Elasticsearch-like date string syntax.

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
npm start stringify "2020-05-01T00:00:00.000Z"
```

### Examples

```typescript
import { parse, stringify } from './dateUtils';

// Parse examples
parse('now-1y/y')    // Returns: 2019-01-01T00:00:00.000Z
parse('now/y')       // Returns: 2020-01-01T00:00:00.000Z
parse('now-1d')      // Returns: 2020-04-30T00:00:00.000Z
parse('now+1d')      // Returns: 2020-05-02T00:00:00.000Z
parse('now-4d-4h')   // Returns: 2020-04-26T20:00:00.000Z

// Stringify examples
stringify(new Date('2019-01-01T00:00:00.000Z'))  // Returns: "now-1y"
stringify(new Date('2021-01-01T00:00:00.000Z'))  // Returns: "now+1y"
stringify(new Date('2020-05-01T00:00:00.000Z'))  // Returns: "now"
```

## Testing

```bash
npm test
```

## License

ISC 