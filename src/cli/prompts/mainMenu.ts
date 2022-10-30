import prompts from 'prompts';
import { buildCreateBackupTask } from './createBackupTask';
import { buildQuit } from './quit';
import { buildRemoveBackupTask } from './removeBackupTask';
import { buildStartService } from './startService';

export const buildMainMenu = (): prompts.PromptObject => ({
  name: 'action',
  message: '',
  type: 'select',
  choices: [
    buildStartService(),
    buildCreateBackupTask(),
    buildRemoveBackupTask(),
    buildQuit(),
  ],
});
