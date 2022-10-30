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
          console.log('@@-', name, dir);
          const content = fs
            .readFileSync(path.join(process.cwd(), 'service-test.txt'))
            .toString();
          fs.writeFileSync(
            path.join(process.cwd(), 'service-test.txt'),
            content + '\n' + name + '|' + dir
          );
        })
    )
    .forEach((job) => job.start());
}

main();
