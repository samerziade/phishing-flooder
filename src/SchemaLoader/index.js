// @flow

import fs from 'fs';
import Config from '../../config';

import type { DataSchema } from '../../schemas/schema.flow';

const configs: Array<DataSchema> = [];

const loadConfigs = () => {
  const files = fs.readdirSync(Config.dataDir);
  const basePath = `../../${Config.dataDir}`;

  files.filter(file => file !== 'schema.flow.js').forEach(file => {
    configs.push(require(`${basePath}/${file}`).default);
  });
};

export default (): Array<DataSchema> => {
  if (configs.length === 0) {
    loadConfigs();
  }

  return configs;
};
