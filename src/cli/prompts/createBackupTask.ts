import prompts from 'prompts';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { getBackupListFile } from '../../utils';

export const buildCreateBackupTask = () => ({
  title: 'create backup task',
  value: () =>
    prompts([
      {
        name: 'name',
        message: 'task name',
        type: 'text',
      },
      {
        name: 'dir',
        message: 'task dir',
        type: 'text',
      },
    ]).then(({ name, dir }) => {
      if (!name) return console.log(`invalid task name ${name}`);
      if (!dir) return console.log(`invalid task dir ${dir}`);

      if (!fs.existsSync(path.join(os.homedir(), dir)))
        return console.log(`dir ${dir} doesn't exists`);

      const content = fs.readFileSync(getBackupListFile());
      fs.writeFileSync(getBackupListFile(), `${content}${name},${dir};`.trim());
    }),
});
