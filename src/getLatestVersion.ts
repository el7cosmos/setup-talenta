import * as github from '@actions/github'

export async function getLatestVersion(token: string): Promise<string> {
  const octokit = github.getOctokit(token)

  const {data} = await octokit.rest.repos.getLatestRelease({
    owner: 'el7cosmos',
    repo: 'talenta'
  })
  return data.tag_name
}
