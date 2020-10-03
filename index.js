import { promisify } from 'util';

import glob, { sync as globSync } from 'glob';
import fsExtra from 'fs-extra';
import postcss from 'postcss';

const globAsync = promisify(glob);
const { readFile, readFileSync } = fsExtra;

const DEFAULT_OPTIONS = {
  globOptions: undefined,
};

const checkArgs = ([patterns = [], options = DEFAULT_OPTIONS]) => {
  if (
    !Array.isArray(patterns) ||
    !patterns.every((pattern) => typeof pattern === 'string')
  ) {
    throw new Error('`patterns` argument must be an `Array` of `String`s');
  }

  if (typeof options !== 'object') {
    throw new Error('`options` argument must be of type `Object`');
  }

  return { patterns, options };
};

const parseCustomProperties = (css, filepath) => {
  const root = postcss.parse(css, { from: filepath });
  const customProperties = {};

  root.walkRules(':root', (rule) => {
    rule.walkDecls(/^--/, ({ prop: name, value }) => {
      customProperties[name] = value;
    });
  });

  return customProperties;
};

const mergeCustomProperties = (customProperties) =>
  customProperties.reduce(
    (acc, props) => ({
      ...acc,
      ...props,
    }),
    {},
  );

export const sync = (...args) => {
  const {
    patterns,
    options: { globOptions },
  } = checkArgs(args);

  const filepaths = patterns
    .map((pattern) => globSync(pattern, globOptions))
    .flat();

  const customPropertiesByFile = filepaths.map((filepath) => {
    const css = readFileSync(filepath, 'utf8');

    return parseCustomProperties(css, filepath);
  });

  return mergeCustomProperties(customPropertiesByFile);
};

export default async (...args) => {
  const {
    patterns,
    options: { globOptions },
  } = checkArgs(args);

  const filepaths = (
    await Promise.all(
      patterns.map((pattern) => globAsync(pattern, globOptions)),
    )
  ).flat();

  const customPropertiesByFile = await Promise.all(
    filepaths.map(async (filepath) => {
      const css = await readFile(filepath, 'utf8');

      return parseCustomProperties(css, filepath);
    }),
  );

  return mergeCustomProperties(customPropertiesByFile);
};
