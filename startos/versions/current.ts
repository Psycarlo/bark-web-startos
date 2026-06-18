import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.2.6:1',
  releaseNotes: {
    en_US:
      'Adds continuous, encrypted external backup. A stale Bark backup loses funds, so the wallet database is now snapshotted on every change and shipped — encrypted with a key derived from your seed — to a target you choose (Google Drive, Dropbox, Nextcloud, or SFTP). Configure it under Actions → Backups. Restoring a StartOS backup now pulls the latest wallet state automatically.',
    es_ES:
      'Añade copia de seguridad externa continua y cifrada. Una copia obsoleta de Bark pierde fondos, así que la base de datos del monedero se respalda en cada cambio y se envía —cifrada con una clave derivada de tu frase semilla— al destino que elijas (Google Drive, Dropbox, Nextcloud o SFTP). Configúralo en Acciones → Copias. Al restaurar una copia de StartOS ahora se recupera automáticamente el último estado del monedero.',
    de_DE:
      'Fügt kontinuierliche, verschlüsselte externe Sicherung hinzu. Eine veraltete Bark-Sicherung führt zu Geldverlust, daher wird die Wallet-Datenbank bei jeder Änderung gesichert und – mit einem aus Ihrem Seed abgeleiteten Schlüssel verschlüsselt – an ein von Ihnen gewähltes Ziel gesendet (Google Drive, Dropbox, Nextcloud oder SFTP). Einrichtung unter Aktionen → Sicherungen. Beim Wiederherstellen einer StartOS-Sicherung wird der neueste Wallet-Stand jetzt automatisch geladen.',
    pl_PL:
      'Dodaje ciągłą, szyfrowaną kopię zapasową zewnętrzną. Nieaktualna kopia Bark oznacza utratę środków, więc baza danych portfela jest teraz zapisywana przy każdej zmianie i wysyłana — zaszyfrowana kluczem pochodnym z frazy seed — do wybranego celu (Google Drive, Dropbox, Nextcloud lub SFTP). Skonfiguruj w Akcje → Kopie zapasowe. Przywrócenie kopii StartOS automatycznie pobiera najnowszy stan portfela.',
    fr_FR:
      'Ajoute une sauvegarde externe continue et chiffrée. Une sauvegarde Bark obsolète fait perdre des fonds ; la base de données du portefeuille est donc désormais capturée à chaque changement et envoyée — chiffrée avec une clé dérivée de votre phrase de récupération — vers une cible de votre choix (Google Drive, Dropbox, Nextcloud ou SFTP). Configurez-la dans Actions → Sauvegardes. La restauration d’une sauvegarde StartOS récupère désormais automatiquement le dernier état du portefeuille.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
