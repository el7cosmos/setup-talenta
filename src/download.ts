import * as tc from '@actions/tool-cache'
import os from 'os'

export async function download(version: string): Promise<string> {
  const baseUrl = `https://github.com/el7cosmos/talenta/releases/download/${version}/talenta-${version}`
  let arch: string
  switch (os.platform()) {
    case 'win32':
      arch = 'x86_64-pc-windows-msvc'
      break
    case 'darwin':
      arch = 'x86_64-apple-darwin'
      break
    case 'linux':
      arch = 'x86_64-unknown-linux-gnu'
      break
    default:
      throw new Error('Unsupported platform')
  }
  const tool = await tc.downloadTool(`${baseUrl}-${arch}.tar.gz`)
  const path = await tc.extractTar(tool)
  return tc.cacheFile(`${path}/talenta`, 'talenta', 'talenta', version)
}
