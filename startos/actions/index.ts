import { sdk } from '../sdk'
import { setUiPassword } from './setUiPassword'
import { configureBackup } from './configureBackup'
import { acknowledgeRisk } from './acknowledgeRisk'
import { backupNow } from './backupNow'

export const actions = sdk.Actions.of()
  .addAction(setUiPassword)
  .addAction(configureBackup)
  .addAction(acknowledgeRisk)
  .addAction(backupNow)
