Documentation for [ScannerJS](https://github.com/pshscc/ScannerJS).

## Examples
**Note: These examples utilize Node.js functionalities.**  
The following example obtains the sum from a string of numbers and outputs the value.  
[Run it](https://repl.it/@MiniDomo/scannerjs-example-1)
```js
const scanner = require('./scanner.js'); // loads the scanner function
const input = '1 1 1 1 1';
const scan = scanner(input); // creates a Scanner object
let sum = 0;
while (scan.hasNextNumber())
    sum += scan.nextNumber();
console.log(sum); // outputs 5
```
The following example reads a file named `words.txt` and outputs individual words on separate lines.  
[Run it](https://repl.it/@MiniDomo/scannerjs-example-2)
```js
const scanner = require('./scanner.js'); // loads the scanner function
const fs = require('fs'); // loads Node.js File System module
const filepath = './words.txt';
const stream = fs.createReadStream(filepath, { encoding: 'utf8' });
let input = [];
stream.on('readable', () => {
    let chunk;
    while ((chunk = stream.read()) !== null)
        input.push(chunk); // fill the input array with the contents of words.txt
});
stream.on('end', () => {
    const scan = scanner(input); // creates a Scanner object
    while (scan.hasNext())
        console.log(scan.next()); // output individual words on separate lines
});
```

## Remarks
[ScannerJS](https://github.com/pshscc/ScannerJS) is designed to model basic functionality of the [Scanner](https://docs.oracle.com/javase/10/docs/api/java/util/Scanner.html) class in Java and be used in PSHS's annual coding scimmage for beginners. Use [ScannerJS](https://github.com/pshscc/ScannerJS) to parse strings or arrays of strings.  
For a list of methods, see [Global](../doc/global.html).

## Templates
Templates designed for competitive programming utilizing [ScannerJS](https://github.com/pshscc/ScannerJS).  
- [Kattis](https://github.com/pshscc/ScannerJS/tree/master/templates/kattis)
- [HackerRank](https://github.com/pshscc/ScannerJS/tree/master/templates/hackerrank)