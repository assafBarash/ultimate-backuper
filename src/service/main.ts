import fs from 'fs';
import { getBackupListFile } from '../utils';

console.log(
  '@@-service',
  fs.readFileSync(getBackupListFile()).toString().split(';')
);
