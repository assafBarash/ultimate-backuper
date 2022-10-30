import { validOrExist } from '../utils';
import commandExists from 'command-exists';

const checkGitExists = (): Promise<boolean> =>
  commandExists('git')
    .then(() => true)
    .catch(() => false);

export const validateGit = async () => {
  const gitExists = await checkGitExists();
  validOrExist(
    !gitExists,
    'git doesnt exist. please install it using the following link: https://git-scm.com/downloads'
  );
};
