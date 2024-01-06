# Lambda Layer Packager

Lambda Layer Packager is a CLI application that compresses libraries in the `node_modules` directory into a `.zip` file for easy deployment on AWS Serverless Lambda functions. The generated `.zip` file is compatible with both Terraform and Serverless frameworks.

[![Version](https://img.shields.io/npm/v/lambda-layer-packager.svg)](https://npmjs.org/package/lambda-layer-packager)
[![License](https://img.shields.io/npm/l/lambda-layer-packager.svg)](https://github.com/Vijay431/lambda-layer-packager/blob/master/package.json)
[![Downloads/week](https://img.shields.io/npm/dw/lambda-layer-packager.svg)](https://npmjs.org/package/lambda-layer-packager)

## Available for

- npm
- yarn
- pnpm (upcoming)

## Table of Contents

- [Usage](#usage)
- [Commands](#commands)

## Usage

```sh-session
npm install -g lambda-layer-packager
```

## Commands

- [`packager commands`](#packager-commands)
- [`packager package`](#packager-package)

## `packager commands`

Display help for **commands** command.

```
USAGE
  $ packager commands

ARGUMENTS
  commands  Command to show help for.

FLAGS
  -s, --show  [default: true] shows all available commands
  -h, --help  output commands available

DESCRIPTION
  Display help for commands command.
```

## `packager package`

Display help for **package** command.

```
USAGE
  $ packager package

ARGUMENTS
  package  Command to show help for.

FLAGS
  --package-manager  [default: npm] What package manager is being utilized in this project?
  -d, --dir          [default: nodejs/default] Location of the compressed node_modules within the zipped folder
  --only-prod        [default: true] Should only production dependencies be packed?
  -h, --help         output commands available

DESCRIPTION
  Display help for commands command.
```
