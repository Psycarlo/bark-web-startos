import { actions } from '../actions'
import { restoreInit } from '../backups'
import { setDependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { sdk } from '../sdk'
import { versionGraph } from '../versions'
import { seedFiles } from './seedFiles'
import { taskSetPassword } from './taskSetPassword'
import { taskAcknowledgeRisk } from './taskAcknowledgeRisk'
import { taskAddBackupTarget } from './taskAddBackupTarget'

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  seedFiles,
  setInterfaces,
  setDependencies,
  actions,
  taskSetPassword,
  taskAcknowledgeRisk,
  taskAddBackupTarget,
)

export const uninit = sdk.setupUninit(versionGraph)
