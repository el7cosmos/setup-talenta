import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import {download} from './download'
import {getLatestVersion} from './getLatestVersion'

async function run(): Promise<void> {
  try {
    const version =
      core.getInput('version') ||
      (await core.group('Get latest version from github release', async () => {
        const latestVersion = await getLatestVersion(core.getInput('token'))
        core.info(`Using version: ${latestVersion}`)
        return latestVersion
      }))
    const cache =
      tc.find('talenta', version) ||
      (await core.group('Cache not found, downloading', async () =>
        download(version)
      ))
    core.addPath(cache)
  } catch (e) {
    core.setFailed(e)
  }
}

run()
