import { serviceMonitor } from '../serviceMonitor';

export const buildStartService = () => ({
  title: `${serviceMonitor.active ? 'stop' : 'start'} service`,
  value: () => {
    serviceMonitor.active ? serviceMonitor.stop() : serviceMonitor.start();
  },
});
