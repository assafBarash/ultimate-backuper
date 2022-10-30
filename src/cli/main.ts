import prompts from 'prompts';
import fs from 'fs';
import { BACKUP_LIST_FILE } from './utils';
import { buildMainMenu } from './prompts/mainMenu';
import { validateGit, validateSsh } from './requirementValidators';
import { serviceMonitor } from './serviceMonitor';

const setup = () =>
  !fs.existsSync(BACKUP_LIST_FILE) && fs.writeFileSync(BACKUP_LIST_FILE, '');

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
