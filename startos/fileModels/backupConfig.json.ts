import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

// User-supplied continuous-backup configuration. This file is small, static,
// and IS included in the native StartOS backup — it is the "pointer" (target
// location + credentials) the restore flow needs to pull the live wallet DB
// back from the external target. The heavy db.sqlite is excluded from the
// native backup and shipped continuously by backup-agent.sh instead.
//
// A local on-box backup ALWAYS runs (the agent ships to /data/local-backups
// regardless of this config) as a safety floor; this file configures the
// optional EXTERNAL targets that provide true off-box recoverability.
//
// `rcloneConfig` is a base64-encoded rclone.conf holding one section per
// enabled external target. Secrets inside it are obscured with rclone's
// standard scheme (see obscure() in actions/configureBackup.ts). The snapshot
// is additionally encrypted with a key derived from the wallet mnemonic before
// egress, so the target only ever sees ciphertext. `selectedRcloneRemotes` is
// the list of enabled external remotes (empty = local only). `riskAccepted` is
// the user's acknowledgement that funds can be lost without a current external
// backup and a safeguarded recovery phrase.
export const backupConfigShape = z.object({
  rcloneConfig: z.string().nullable().catch(null),
  selectedRcloneRemotes: z.array(z.string()).nullable().catch(null),
  riskAccepted: z.boolean().catch(false),
})

export type BackupConfigJson = z.infer<typeof backupConfigShape>

export const backupConfigJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: 'backup-config.json' },
  backupConfigShape,
)
