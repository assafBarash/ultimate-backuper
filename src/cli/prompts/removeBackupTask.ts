import prompts from 'prompts';
import fs from 'fs';
import { getBackupListFile } from '../../utils';

export const buildRemoveBackupTask = () => {
  const backupList = fs.readFileSync(getBackupListFile()).toString();
  return {
    title: 'remove backup task',
    disabled: !backupList,
    value: () =>
      prompts({
        name: 'remove',
        type: 'multiselect',
        message: 'select tasks to remove',
        choices: backupList
          .trim()
          .split(';')
          .filter(Boolean)
          .map((val) => {
            const [name, dir] = val.split(',');
            return {
              title: `name: ${name} dir: ${dir}`,
              value: val,
            };
          }),
      }).then(({ remove = [] }) => {
        if (!remove.length) return;

        const content = backupList
          .split(';')
          .filter(Boolean)
          .filter((task) => !remove.includes(task))
          .join(';');

        fs.writeFileSync(getBackupListFile(), content);
      }),
  };
};
