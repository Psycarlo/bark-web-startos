# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## Gotchas

- **Continuous backup, not StartOS backup.** A stale Bark DB loses funds, so the wallet `db.sqlite` is **excluded** from the native StartOS backup (`startos/backups.ts`) and shipped continuously by `backup-agent.sh` (the `backup-agent` daemon) to a user-configured target, encrypted with a key derived from the wallet mnemonic. The native backup carries only the pointer (mnemonic, `store.json`, `backup-config.json`). Don't "fix" the exclude back to a full-volume backup. See README → "Backups and Restore".
- **Editing `backup-agent.sh` does not trigger a local rebuild.** `start-cli s9pk list-ingredients` (which drives `make`'s dependency tracking) lists `bark.Dockerfile` but **not** the files the Dockerfile `COPY`s. So after editing `backup-agent.sh`, `make` thinks the `.s9pk` is up to date and reuses a stale image. Force it: `touch bark.Dockerfile && make x86 install` (Docker re-COPYs the new script; the heavy layers stay cached). CI clean-builds, so this only bites local incremental builds.
- **Reinstalling the same version keeps the old image.** When iterating, `start-cli package install` over an identical version string won't swap the running image — `uninstall` then `install` to deploy a fresh build.
