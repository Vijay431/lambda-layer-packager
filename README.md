Lambda Layer Packager
=================

[![Version](https://img.shields.io/npm/v/lambda-layer-packager.svg)](https://npmjs.org/package/lambda-layer-packager)
[![Downloads/week](https://img.shields.io/npm/dw/lambda-layer-packager.svg)](https://npmjs.org/package/lambda-layer-packager)
[![License](https://img.shields.io/npm/l/lambda-layer-packager.svg)](https://github.com/Vijay431/lambda-layer-packager/blob/master/package.json)

`lambda-layer-packager` is to pack the **node_modules** based on the package managers of nodejs

- npm
- yarn (will be released in the upcoming version 1.1.0)
- pnpm (will be released in upcoming version 1.2.0)

# Topics
<!-- toc -->
* [Topics](#topics)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g lambda-layer-packager
$ packager COMMAND
running command...
$ packager (--version)
lambda-layer-packager/0.0.0 win32-x64 node-v18.12.1
$ packager --help [COMMAND]
USAGE
  $ packager COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`packager hello`](#packager-hello)
* [`packager help [COMMANDS]`](#packager-help-commands)
* [`packager package`](#packager-package)
* [`packager plugins`](#packager-plugins)
* [`packager plugins:install PLUGIN...`](#packager-pluginsinstall-plugin)
* [`packager plugins:inspect PLUGIN...`](#packager-pluginsinspect-plugin)
* [`packager plugins:install PLUGIN...`](#packager-pluginsinstall-plugin-1)
* [`packager plugins:link PLUGIN`](#packager-pluginslink-plugin)
* [`packager plugins:uninstall PLUGIN...`](#packager-pluginsuninstall-plugin)
* [`packager plugins:uninstall PLUGIN...`](#packager-pluginsuninstall-plugin-1)
* [`packager plugins:uninstall PLUGIN...`](#packager-pluginsuninstall-plugin-2)
* [`packager plugins:update`](#packager-pluginsupdate)

## `packager hello`

Hello from Lambda Layer Packager!

```
USAGE
  $ packager hello

DESCRIPTION
  Hello from Lambda Layer Packager!

EXAMPLES
  $ packager package --help
    To get to know about the package command
```

_See code: [dist/commands/hello/index.ts](https://github.com/Vijay431/lambda-layer-packager/blob/v0.0.0/dist/commands/hello/index.ts)_

## `packager help [COMMANDS]`

Display help for packager.

```
USAGE
  $ packager help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for packager.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `packager package`

Pack the node modules into a zipped file, to get easily deployed

```
USAGE
  $ packager package [--package-manager <value>] [--dir <value>] [--only-prod]

FLAGS
  dir=<value>              [default: nodejs/node_modules] Path of the packed node modules inside a zipped folder
  only-prod                Pack only prod dependencies?
  package-manager=<value>  [default: npm] Which package manager being used in this project?

DESCRIPTION
  Pack the node modules into a zipped file, to get easily deployed

EXAMPLES
  $ packager package
    packages node modules with all default options
```

_See code: [dist/commands/package/index.ts](https://github.com/Vijay431/lambda-layer-packager/blob/v0.0.0/dist/commands/package/index.ts)_

## `packager plugins`

List installed plugins.

```
USAGE
  $ packager plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ packager plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `packager plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ packager plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ packager plugins:add

EXAMPLES
  $ packager plugins:install myplugin 

  $ packager plugins:install https://github.com/someuser/someplugin

  $ packager plugins:install someuser/someplugin
```

## `packager plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ packager plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ packager plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/inspect.ts)_

## `packager plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ packager plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ packager plugins:add

EXAMPLES
  $ packager plugins:install myplugin 

  $ packager plugins:install https://github.com/someuser/someplugin

  $ packager plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/install.ts)_

## `packager plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ packager plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ packager plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/link.ts)_

## `packager plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ packager plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ packager plugins:unlink
  $ packager plugins:remove
```

## `packager plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ packager plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ packager plugins:unlink
  $ packager plugins:remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/uninstall.ts)_

## `packager plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ packager plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ packager plugins:unlink
  $ packager plugins:remove
```

## `packager plugins:update`

Update installed plugins.

```
USAGE
  $ packager plugins:update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/update.ts)_
<!-- commandsstop -->
