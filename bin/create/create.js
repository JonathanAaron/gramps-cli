import path from 'path';
import nodePlop from 'node-plop';

export const builder = yargs => {
  yargs.positional('name', {
    describe: 'Name of the new data source',
    type: 'string',
  });
};

export const handler = async argv => {
  const plopPath = path.resolve(__dirname, './plopfile.js');
  const plop = nodePlop(plopPath);
  const generator = plop.getGenerator('source');
  generator
    .runPrompts(argv.name ? [argv.name] : [])
    .then(generator.runActions)
    .then(obj => {
      obj.changes.forEach(({ path }) => console.log('[SUCCESS]', path));
      obj.failures.forEach(({ error }) => console.log('[FAIL]', error));
      console.log(`Created data-source-${argv.name}`);
    });
};
