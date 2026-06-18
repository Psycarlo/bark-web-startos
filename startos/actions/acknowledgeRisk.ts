import { backupConfigJson } from '../fileModels/backupConfig.json'
import { sdk } from '../sdk'

// Behind the critical Backup Safety task: an explanation of how backups work
// and a required acknowledgement that the user understands the situation and
// accepts that funds can be lost without an external backup AND a safeguarded
// seed. This is informed consent, required of every user — not contingent on
// the current target config. Configure Backups stays practical.
const WARNING = `<b>Please read — this is how your Bark wallet is backed up, and what you must do to keep your funds safe.</b>

Bark backs up your whole wallet <b>continuously</b> — every change is snapshotted and <b>encrypted with a key derived from your 12-word recovery phrase</b> (so it's safe to store anywhere, but your recovery phrase is the only key to it). A backup only protects you if it is <b>current</b> when you restore it.

<b>What a stale backup costs you.</b> Restoring an out-of-date backup rolls your wallet back to the moment that backup was taken. <b>Any Ark or Lightning funds you received or moved since then can be permanently lost</b> — the Ark server cannot rebuild them from your recovery phrase. (Funds untouched since that moment, and on-chain funds, stay recoverable from your seed.)

<b>Local vs. external — it's about staleness.</b> Bark always keeps a <b>local</b> backup on this server. It stays current day to day, but if you lose this server you can only get it back from a <b>StartOS backup, which you take manually</b> — so it's usually older than your real balance by the time you need it. An <b>external</b> target (Google Drive, Dropbox, Nextcloud, or SFTP on another machine) is updated live and stored off this server, so it's far more likely to be current at the moment you restore.

<b>To keep your funds safe you must do BOTH:</b>
• <b>Configure an external backup target</b> under "Configure Backups".
• <b>Write down and safeguard your 12-word recovery phrase</b> — it is the only key to your backups; lose it and nothing, local or external, can recover your wallet.

By accepting below you confirm you understand this and accept that <b>you may permanently lose funds if you do not keep a current external backup and safeguard your recovery phrase.</b>`

export const acknowledgeRisk = sdk.Action.withInput(
  'accept-backup-risk',

  async ({ effects }) => ({
    name: 'Backup Safety',
    description:
      'How your Bark wallet is backed up, and a required acknowledgement that you understand you can lose funds without an external backup and a safeguarded recovery phrase.',
    warning: WARNING,
    allowedStatuses: 'any',
    group: 'Backups',
    visibility: 'enabled',
  }),

  sdk.InputSpec.of({
    accept: sdk.Value.toggle({
      name: 'I understand and accept responsibility',
      description:
        'I understand how my wallet is backed up, and I accept that I may permanently lose my funds if I do not keep an external backup and safeguard my recovery phrase.',
      default: false,
    }),
  }),

  async ({ effects }) => {
    const cfg = await backupConfigJson
      .read()
      .once()
      .catch(() => null)
    return { accept: !!cfg?.riskAccepted }
  },

  async ({ effects, input }) => {
    if (!input.accept)
      throw new Error(
        'You must confirm that you understand the backup situation and accept responsibility before continuing.',
      )
    await backupConfigJson.merge(effects, { riskAccepted: true })
    return null
  },
)
