import prompts from 'prompts';
import fs from 'fs';
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

      const content = fs.readFileSync(getBackupListFile());
      fs.writeFileSync(getBackupListFile(), `${content}${name},${dir};`.trim());
    }),
});
