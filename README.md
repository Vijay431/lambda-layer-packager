# Lambda Layer Packager

![Lambda Layer Package Logo](src/assets/icons/logo.jpg)

Lambda Layer Packager is a CLI application that compresses libraries in the `node_modules` directory into a `.zip` file for easy deployment on AWS Serverless Lambda functions. This `.zip` file can be used for deployment with Serverless and TerraForm (IaaS)

[![Version](https://img.shields.io/npm/v/lambda-layer-packager.svg)](https://npmjs.org/package/lambda-layer-packager)
[![License](https://img.shields.io/npm/l/lambda-layer-packager.svg)](https://github.com/Vijay431/lambda-layer-packager/blob/master/package.json)
[![Downloads/week](https://img.shields.io/npm/dw/lambda-layer-packager.svg)](https://npmjs.org/package/lambda-layer-packager)

## Available in

- esm (ES2022) - compatible with **.js**
- cjs (CommonJS) - compatible with **.ts**

### Available for

- npm
- yarn
- pnpm

## Table of Contents

- [Usage](#usage)
- [Commands](#commands)

## Usage

```bash
# To make the package globally available
npm install -g lambda-layer-packager@latest

# To make the package available only for specific application
npm install --save-dev lambda-layer-packager@latest

# To verify the installation
packager --version
```

## Commands

- [`packager commands`](#packager-commands)
- [`packager package`](#packager-package)

## `packager commands`

Display help for **commands** command.

```bash
USAGE
  $ packager commands

ARGUMENTS
  commands To list the available commands.

DESCRIPTION
  To show the available commands in CLI.
```

## `packager package`

Display help for **package** command.

```bash
USAGE
  $ packager package

ARGUMENTS
  package  Command to pack the modules.

FLAGS
  --name [default: "layer"]
      output file name with default extension .zip
  --package-manager [default: "npm"]  
      What package manager is being utilized in this project?
  --dir [default: "nodejs/default"]   
      archived file directory where libs will be stored in the archive file
  --only-prod [default: true]             
      Should only production dependencies be packed?
  --help                              
      output commands available

DESCRIPTION
  It runs the process to archive the required node_modules into a zip file.
```

## Acknowledgements

This project uses the following open-source libraries:

[figlet](https://www.npmjs.com/package/figlet): Used for creating ASCII Art from text. Licensed under the [MIT](https://opensource.org/license/mit/) License.

[commander](https://www.npmjs.com/package/commander): Used for handling command-line interfaces. Licensed under the [MIT](https://opensource.org/license/mit/) License.

[archiver](https://www.npmjs.com/package/archiver): Used for creating archives in Node.js. Licensed under the [MIT](https://opensource.org/license/mit/) License.

[spinnies](https://www.npmjs.com/package/spinnies): Used for creating spinner animations in the terminal. Licensed under the [MIT](https://opensource.org/license/mit/) License.

I thank the authors of these libraries for their work.

Thanks for the community :heart:
