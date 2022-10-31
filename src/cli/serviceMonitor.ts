import path from 'path';
import pm2 from 'pm2';
import os from 'os';
import { spawn } from 'child_process';

const serviceMain = path.join(process.cwd(), 'dist', 'service', 'main.js');
const processId = 'ultimate-backuper';

class ServiceMonitor {
  public ready: Promise<any>;
  public active: boolean;

  constructor() {
    this.ready = new Promise((resolve, reject) =>
      pm2.connect((err) => {
        if (err) return reject(err);

        pm2.list((err, apps) => {
          this.active = !!apps.find(({ name }) => name === processId);
          resolve(undefined);
        });
      })
    );
  }

  public start() {
    this.ready.then(() => {
      pm2.start({ script: serviceMain, name: processId }, () => {});
      const save = spawn('npx', ['pm2', 'save'], { shell: true });
      const startup = spawn('npx', ['pm2', 'startup', os.platform()], {
        shell: true,
      });

      startup.stdout.on('data', (data) =>
        console.log('@@-startupOut', data.toString())
      );
      startup.stderr.on('data', (data) =>
        console.log('@@-startupErr', data.toString())
      );

      save.stdout.on('data', (data) =>
        console.log('@@-startupOut', data.toString())
      );
      save.stderr.on('data', (data) =>
        console.log('@@-startupErr', data.toString())
      );
    });
    this.active = true;
    return this;
  }

  public stop() {
    this.ready.then(() =>
      pm2.delete(processId, () => {
        spawn('npx', ['pm2', 'unstartup']);
        pm2.disconnect();
      })
    );
    this.active = false;
    return this;
  }
}

export const serviceMonitor = new ServiceMonitor();
