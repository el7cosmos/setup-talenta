import {getLatestVersion} from '../src/getLatestVersion'

jest.mock('@actions/github', () => {
  return {
    getOctokit: jest.fn().mockReturnValue({
      repos: {
        getLatestRelease: jest.fn().mockReturnValue({
          data: {
            tag_name: '0.0.1'
          }
        })
      }
    })
  }
})

test('getLatestVersion', async () => {
  await expect(getLatestVersion('token')).resolves.toBe('0.0.1')
})
