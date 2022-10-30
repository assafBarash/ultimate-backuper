import os from 'os';
import path from 'path';
import { ULTIMATE_BACKUPER_DIR, BACKUP_LIST_FILE } from './config.json';

export const getBackupListFile = () =>
  path.join(getUltimateBackuperDir(), BACKUP_LIST_FILE);

export const getUltimateBackuperDir = () =>
  path.join(os.homedir(), ULTIMATE_BACKUPER_DIR);
