import _cliJson from './cli.json';

type Cli = {
  [x in keyof typeof _cliJson]: {
    summary: string;
    description: string;
  };
};

export const cli: Cli = _cliJson;
