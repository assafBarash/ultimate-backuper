import prompts from 'prompts';
import fs from 'fs';
import { buildMainMenu } from './prompts/mainMenu';
import { validateGit, validateSsh } from './requirementValidators';
import { serviceMonitor } from './serviceMonitor';
import { getBackupListFile, getUltimateBackuperDir } from '../utils';

const setup = () => {
  fs.mkdirSync(getUltimateBackuperDir(), { recursive: true });
  !fs.existsSync(getBackupListFile()) &&
    fs.writeFileSync(getBackupListFile(), '');
};

const validateRequirements = async () => {
  await validateGit();
  validateSsh();
  await serviceMonitor.ready;
};

const run = async () => {
  const { action } = await prompts(buildMainMenu());
  const shouldStop = await action();
  shouldStop ? process.exit() : await run();
};

export async function main() {
  setup();
  await validateRequirements();
  await run();
}
