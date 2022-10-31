import fs from 'fs';
import path from 'path';
import { getBackupListFile } from '../utils';
import { CronJob } from 'cron';

function main() {
  fs.readFileSync(getBackupListFile())
    .toString()
    .split(';')
    .filter(Boolean)
    .map((row) => row.split(','))
    .map(
      ([name, dir]) =>
        new CronJob('0-59 * * * *', () => {
          fs.writeFileSync(
            path.join(process.cwd(), 'service-test.txt'),
            name + '|' + dir + '\n',
            { flag: 'w' }
          );
        })
    )
    .forEach((job) => job.start());
}

main();
