import { configureBackup } from '../actions/configureBackup'
import { sdk } from '../sdk'

// Important onboarding task, created ONCE on first install: recommend adding an
// off-box backup target. Clears when the user runs Configure Backups. Not
// re-created if they later remove all targets — the "Wallet Backup" health
// check is the ongoing indicator for that.
export const taskAddBackupTarget = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') return
  await sdk.action.createOwnTask(effects, configureBackup, 'important', {
    reason:
      'Add an external backup target (Google Drive, Dropbox, Nextcloud, or SFTP). A local backup runs on this server, but recovering it depends on a manual StartOS backup and is likely stale — an off-box target stays current.',
  })
})
