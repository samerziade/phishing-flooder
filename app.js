// @flow

import send from './src/Client';
import getSchemas from './src/SchemaLoader';

const configs = getSchemas();

configs.forEach(config => {
  send(config);
});
