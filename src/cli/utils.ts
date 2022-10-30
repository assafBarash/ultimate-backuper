import path from 'path';

export const BACKUP_LIST_FILE = path.join(__dirname, 'backup-list.txt');

export const validOrExist = (predicate: boolean, existMessage: string) => {
  if (predicate) {
    console.error(existMessage);
    process.exit(1);
  }
};
