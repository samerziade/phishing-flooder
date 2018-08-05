import * as fs from 'fs';
import Config from '../config';

import { DataSchema } from '../../schemas/schema';

const configs: Array<DataSchema> = [];

const loadConfigs = () => {
  const files = fs.readdirSync(Config.dataDir);
  const basePath = `../../${Config.dataDir}`;

  files.filter(file => file !== 'schema.ts').forEach(file => {
    configs.push(require(`${basePath}/${file}`).default);
  });
};

export default (): Array<DataSchema> => {
  if (configs.length === 0) {
    loadConfigs();
  }

  return configs;
};
