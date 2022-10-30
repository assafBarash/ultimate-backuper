import { execSync } from 'child_process';
import { validOrExist } from '../utils';

export const validateSsh = () => {
  const sshExists = !!execSync('cat ~/.ssh/id_rsa.pub').toString();
  validOrExist(!sshExists, 'ssh not exist');
};
