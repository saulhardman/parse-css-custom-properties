import { promisify } from 'util';

import asyncGlob from 'glob';
import fsExtra from 'fs-extra';
import postcss from 'postcss';

const glob = promisify(asyncGlob);
const { readFile } = fsExtra;

const DEFAULT_OPTIONS = {
  globOptions: undefined,
};

export default async (patterns = [], { globOptions } = DEFAULT_OPTIONS) => {
  if (
    !Array.isArray(patterns) ||
    !patterns.every((pattern) => typeof pattern === 'string')
  ) {
    throw new Error('`patterns` argument must be an `Array` of `String`s');
  }

  const filepaths = (
    await Promise.all(patterns.map((pattern) => glob(pattern, globOptions)))
  ).flat();

  const customProperties = await Promise.all(
    filepaths.map(async (filepath) => {
      const css = await readFile(filepath, 'utf8');
      const root = postcss.parse(css, { from: filepath });
      const props = {};

      root.walkRules(':root', (rule) => {
        rule.walkDecls(/^--/, ({ prop, value }) => {
          props[prop] = value;
        });
      });

      return props;
    }),
  );

  return customProperties.reduce(
    (acc, props) => ({
      ...acc,
      ...props,
    }),
    {},
  );
};
