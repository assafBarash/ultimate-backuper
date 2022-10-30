import path from 'path';
import pm2 from 'pm2';

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
          console.log(
            '@@-',
            apps.map(({ name }) => name)
          );
          resolve(undefined);
        });
      })
    );
  }

  public start() {
    this.ready.then(() =>
      pm2.start({ script: serviceMain, name: processId }, () => {})
    );
    this.active = true;
    return this;
  }

  public stop() {
    this.ready.then(() => pm2.stop(processId, () => pm2.disconnect()));
    this.active = false;
    return this;
  }
}

export const serviceMonitor = new ServiceMonitor();
