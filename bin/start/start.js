import path from 'path';
import shell from 'shelljs';
import { getGrampsMode, getDataSource } from './lib/cli';

export const builder = yargs => {
  yargs
    .group('data-source-dir', 'Register a data source for mock development:')
    .options({
      'data-source-dir': {
        alias: 'd',
        description: 'path to a data source directory',
        default: '',
      },
    })
    .group(['live', 'mock'], 'Choose real or mock data:')
    .options({
      live: {
        alias: 'l',
        conflicts: 'mock',
        description: 'run GraphQL with live data',
      },
      mock: {
        alias: 'm',
        conflicts: 'live',
        description: 'run GraphQL offline with mock data',
      },
    });
};

export const handler = async argv => {
  // Get the full path to the GrAMPS root directory
  const rootDir = path.resolve(__dirname, '..');
  const mode = getGrampsMode(argv.live);
  const source = getDataSource(rootDir, argv.dataSourceDir);

  // Move into the GrAMPS root and start the service.
  shell.cd(rootDir);
  shell.exec(`node dist/dev/server.js`, {
    env: { GRAMPS_MODE: mode, GQL_DATA_SOURCES: source },
  });
};
