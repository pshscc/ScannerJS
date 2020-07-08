# ScannerJS
This was created to replicate basic functionality of the [Scanner](https://docs.oracle.com/javase/10/docs/api/java/util/Scanner.html) class in Java and be used in PSHS's annual coding scimmage for beginners.

## Prequisites
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/index.html)

## Building
To build this repository, enter the following in command prompt:
```shell
git clone https://github.com/pshscc/scannerjs.git
cd scannerjs
npm install
```

## Scripts
To run these scripts, enter the following in command prompt: 
```shell
npm run <name of script>
```
| Name | Description |
| :-: | - |
| `compile` | Compiles `scanner.ts` and generates `scanner.js`. |
| `compile:rc` | Compiles `scanner.ts` and generates `scanner.js` with no comments. |
| `docs` | Produces documention for `scanner.js`. |
| `test` | Runs the tests for `scanner.js`. |

## Documentation
All documentation is located in the generated `./docs` folder and can also be found [here](https://pshscc.github.io/scannerjs/docs).